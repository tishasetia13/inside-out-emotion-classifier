# Import FastAPI to build the API, and BaseModel/Field from Pydantic to describe request shapes
from fastapi import FastAPI
from pydantic import BaseModel, Field
# Middleware that adds the CORS headers to every response (and answers preflight requests)
from fastapi.middleware.cors import CORSMiddleware

# Import our story-level predictor; importing this file also loads the model once at startup
from predict import predict_story

# Create the app object: our "restaurant", where endpoints get attached
app = FastAPI()

# Only these sites may call this API from a browser: our live site on Vercel,
# and the local dev server so we can still test on our own laptop.
ALLOWED_ORIGINS = [
    "https://inside-out-emotion-classifier.vercel.app",
    "http://localhost:5173",
]

# Register the CORS middleware on the app so it runs on every request.
app.add_middleware(
    CORSMiddleware,
    # Which sites the browser is told it may read responses for
    allow_origins=ALLOWED_ORIGINS,
    # Which HTTP methods are allowed; we only need POST for /predict and GET for the health check
    allow_methods=["GET", "POST"],
    # Which request headers are allowed; Content-Type is what lets us send JSON
    allow_headers=["Content-Type"],
)

# Describe what a valid request body looks like: one text field, between 1 and 5000 characters
class StoryRequest(BaseModel):
    """The JSON package a client must send to /predict."""
    text: str = Field(min_length=1, max_length=5000)


# Keep the health check from before, handy for confirming the server is alive later too
@app.get("/")
def health_check():
    """Return a small JSON message so we can confirm the server is running."""
    return {"status": "ok"}


# Register a POST endpoint at /predict; FastAPI parses the JSON body into a StoryRequest for us
@app.post("/predict")
def predict(request: StoryRequest):
    """Run the emotion model on a story and return each emotion as a percentage."""
    # Ask the model for the averaged probabilities across all chunks of the story
    probabilities = predict_story(request.text)

    # Convert each probability (0 to 1) into a percentage rounded to 2 decimals
    percentages = {emotion: round(float(p) * 100, 2) for emotion, p in probabilities.items()}

    # Return a dict; FastAPI turns it into JSON automatically
    return {"emotions": percentages}