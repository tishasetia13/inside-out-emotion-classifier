# Inside Out Emotion Classifier 

A PyTorch text classifier that reads a personal story (e.g. "I lost my badminton match because...") and predicts which core emotion is driving it — using the five emotions from Pixar's *Inside Out*: **Joy, Sadness, Anger, Fear, and Disgust**.

## The idea

Most emotion classifiers stop at "positive vs negative." This one goes further — given a short first-person account of something that happened, it predicts which single emotion is most in control, mapped onto Inside Out's five core emotions.

## Dataset

Built on the **ISEAR dataset** (International Survey on Emotion Antecedents and Reactions) — real, first-person accounts of emotional experiences, originally labeled across 7 emotions (joy, fear, anger, sadness, disgust, shame, guilt).

For this project, the dataset is filtered down to the 5 emotions Inside Out actually uses, dropping shame and guilt.

**Why ISEAR over other emotion datasets (like GoEmotions):** ISEAR is written as personal narrative text — much closer to how someone would actually describe "what happened to them" — versus Reddit-comment or tweet-style datasets, which don't match this project's use case as well.

## Project status

🚧 **In progress**

- [x] Dataset sourced and cleaned (ISEAR, filtered to 5 emotions, ~5,400 balanced examples)
- [x] Text artifacts cleaned, train/val/test split done (stratified)
- [x] Tokenization
- [x] Model architecture + training loop (PyTorch)
- [x] Evaluation
- [x] Inference demo

## Tech stack

- Python, PyTorch
- pandas, scikit-learn (data prep)
- Built and trained in Google Colab

## Why this project

Personal exploration into multi-class text classification with genuinely ambiguous, real-world labels — most stories carry more than one emotion at once, and part of this project is learning to work honestly with that ambiguity rather than pretending it away.

---
*Work in progress — updates as the model gets built.*
