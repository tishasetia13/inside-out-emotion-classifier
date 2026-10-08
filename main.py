# Import FastAPI to build the API, and BaseModel/Field from Pydantic to describe request shapes
from fastapi import FastAPI
from pydantic import BaseModel, Field

# Import our story-level predictor; importing this file also loads the model once at startup
from predict import predict_story

# Create the app object: our "restaurant", where endpoints get attached
app = FastAPI()


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