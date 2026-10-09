# Start from an official, minimal Linux image that already has Python 3.14 installed
FROM python:3.14-slim

# Create a normal (non-admin) user with ID 1000; Hugging Face Spaces runs containers as this user
RUN useradd -m -u 1000 user

# From here on, every instruction runs as that user instead of as admin
USER user

# Make programs that pip installs for this user (like uvicorn) findable in the terminal
ENV PATH="/home/user/.local/bin:$PATH"

# Set the folder inside the container where our app will live, and move into it
WORKDIR /home/user/app

# Copy only the shopping list first, so Docker can cache the slow install step below
COPY --chown=user requirements.txt .

# Install every library from the shopping list (--no-cache-dir skips saving downloads, keeping the image smaller)
RUN pip install --no-cache-dir -r requirements.txt

# Copy our two code files into the container (after the install, so code edits don't redo the install)
COPY --chown=user main.py predict.py ./

# Document that the app listens on port 7860, the port Hugging Face Spaces expects
EXPOSE 7860

# The command that runs when the container starts: launch Uvicorn serving our FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]