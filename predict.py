import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import re

REPO_ID = "tishasetia13/inside-out-emotion-classifier"
MAX_LENGTH = 64

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

tokenizer = AutoTokenizer.from_pretrained(REPO_ID)
model = AutoModelForSequenceClassification.from_pretrained(REPO_ID).to(device)
model.eval()

LABELS = [model.config.id2label[i] for i in range(model.config.num_labels)]

#

def split_into_chunks(text: str, max_tokens: int = MAX_LENGTH - 2) -> list:
    """Splits a long story into pieces, each short enough for the model to read fully."""
    
    sentences = re.split(r"(?<=[.!?])\s+", text.strip())
    chunks = []
    current = ""

    for sentence in sentences:
        candidate = (current + " " + sentence).strip()
        n_tokens = len(tokenizer(candidate, add_special_tokens=False)["input_ids"])
        if n_tokens <= max_tokens or not current:
            current = candidate           
        else:
            chunks.append(current)        
            current = sentence
    if current:
        chunks.append(current)

    return chunks

#

def predict_emotion(text: str) -> dict:
    """Takes a story as text and returns a dict of 5 emotion probabilities (they add up to 1)."""
    enc = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        max_length=MAX_LENGTH,
    ).to(device)

    with torch.no_grad():
        logits = model(
            input_ids=enc["input_ids"],
            attention_mask=enc["attention_mask"],
        ).logits

    probs = torch.softmax(logits, dim=-1)[0]
    return {label: p for label, p in zip(LABELS, probs.tolist())}

#

def predict_story(text: str) -> dict:
    """Reads a story of any length: splits it into chunks, scores each chunk, and averages the 5 emotion probabilities."""

    chunks = split_into_chunks(text)
    results = [predict_emotion(chunk) for chunk in chunks]
    return {
        label: sum(r[label] for r in results) / len(results)
        for label in LABELS
    }


