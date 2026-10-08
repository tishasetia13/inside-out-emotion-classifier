# Baseline experiment: a simple model to compare DistilBERT against.
# Not part of the server, just for the project's results.
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

DATA_URL = "https://huggingface.co/datasets/gsri-18/ISEAR-dataset-complete/resolve/main/ISEAR_dataset_complete.csv"
EMOTIONS = ["joy", "sadness", "anger", "fear", "disgust"]


def load_splits():
    """Loads ISEAR, cleans it exactly like the notebook, and returns the same train/val/test split."""

    # Step 1: download the dataset and keep only our 5 emotions
    df = pd.read_csv(DATA_URL)
    df = df[df["emotion"].isin(EMOTIONS)]
    df = df.drop(columns=["Unnamed: 2"])

    # Step 2: clean the text (remove literal \n and extra spaces), same as the notebook
    df["content"] = df["content"].str.replace("\\n", " ", regex=False)
    df["content"] = df["content"].str.replace(r"\s+", " ", regex=True).str.strip()
    df = df.reset_index(drop=True)

    # Step 3: the same 70/15/15 split with the same random_state, so the test set is identical
    train_df, temp_df = train_test_split(df, test_size=0.3, stratify=df["emotion"], random_state=42)
    val_df, test_df = train_test_split(temp_df, test_size=0.5, stratify=temp_df["emotion"], random_state=42)
    return train_df, val_df, test_df


if __name__ == "__main__":
    train_df, val_df, test_df = load_splits()

    # Step 1: turn text into TF-IDF numbers. Single words AND word pairs (ngram_range=(1, 2)),
    # so "not happy" is seen as a pair too. fit_transform LEARNS the vocabulary from the
    # training stories only, then converts them
    vectorizer = TfidfVectorizer(ngram_range=(1, 2))
    X_train = vectorizer.fit_transform(train_df["content"])

    # Step 2: train logistic regression to connect those numbers to the emotion labels
    clf = LogisticRegression(max_iter=1000)
    clf.fit(X_train, train_df["emotion"])

    # Step 3: convert the TEST stories using the vocabulary learned from training
    # (transform, not fit_transform), then predict and score
    X_test = vectorizer.transform(test_df["content"])
    preds = clf.predict(X_test)

    print(f"Baseline test accuracy: {accuracy_score(test_df['emotion'], preds):.4f}")
    print(classification_report(test_df["emotion"], preds, digits=3))