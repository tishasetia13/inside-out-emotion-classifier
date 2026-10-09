# Inside Out Emotion Classifier 
## 🧠 How it works

```mermaid
flowchart LR
    User["👤 User<br/>writes a story"] --> Frontend["🌐 Frontend<br/>HTML / CSS / JS<br/>(planned)"]
    Frontend -- "POST /predict<br/>{ text: story }" --> Uvicorn

    subgraph Docker["🐳 Docker container (Hugging Face Space)"]
        Uvicorn["Uvicorn<br/>web server"] --> FastAPI["main.py<br/>FastAPI + request validation"]
        FastAPI --> Predict["predict.py<br/>predict_story"]
        Predict --> Chunk["split_into_chunks<br/>pieces of up to 64 tokens"]
        Chunk --> Model["DistilBERT<br/>predict_emotion on each chunk"]
        Model --> Avg["Average the probabilities"]
    end

    Hub[("🤗 Hugging Face Hub<br/>fine-tuned model weights")] -. "loaded once at startup" .-> Model
    Avg -- "JSON: 5 emotion %" --> Characters["🎭 Inside Out characters<br/>sized by percentage<br/>(planned)"]

    classDef planned stroke-dasharray: 5 5;
    class Frontend,Characters planned;
```

**Request flow:** the story is sent to the API, split into chunks that fit the model's 64-token window, classified chunk by chunk, and averaged into five percentages: joy, sadness, anger, fear and disgust. Stories are never stored.

