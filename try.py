# Scratch file for experiments, not part of the real project
from predict import predict_emotion, predict_story, split_into_chunks


def show(title, probs):
    # Print emotions from most to least likely
    print(title)
    for name, p in sorted(probs.items(), key=lambda x: -x[1]):
        print(f"   {name:8s} {p:.1%}")


stories = [
    # joy, fits
    "For months I had been practicing for the state level debate. When the judges announced my name as the winner, I could not stop smiling. My whole family was cheering in the audience and my mother was crying happily.",

    # fear, fits
    "Last summer I was trekking with my cousins when the weather suddenly changed. The fog became so thick that we lost the trail. When I heard a growl somewhere close in the dark, my heart started pounding and I froze.",

    # anger, emotion at the START of a long story
    "I was furious when I found out my group partner had not done any of her work. I had stayed up for three nights writing the report, rewriting her sections and fixing the slides. On the day of the presentation she walked in late, stood in front of the teacher and took credit for everything while I stood there silently.",

    # sadness, emotion only at the END of a long story
    "It was a regular Sunday. I woke up late, made tea and cleaned my room. In the afternoon we went to the market to buy vegetables and fruits for the week, and my dad stopped to chat with a shopkeeper he had known for years. When we came back home, my aunt called. My grandmother, who had raised me, had passed away in her sleep, and I sat on the floor unable to speak.",

    # disgust, long
    "We went to a famous restaurant for my sister's birthday dinner. The table was sticky and the menu smelled of old oil. Halfway through the meal I saw a cockroach crawling out of the plate of rice that was meant for our table, and the waiter just wiped it away with his bare hand and walked off.",

    # mixed, starts scary, ends happy
    "I was so afraid walking into the hall for my interview that my knees were shaking and I forgot my own name for a second. But the panel was kind, the questions went well, and an hour later they called to say I was selected. I ran outside and laughed with relief.",
]

# Run every notebook story through the full pipeline.
# For each one: show the top emotion of each chunk, then the combined result
for s in stories:
    chunks = split_into_chunks(s)
    print("STORY:", s[:60] + "...")

    # Per-chunk view: the single most likely emotion in each chunk
    for i, c in enumerate(chunks):
        top = max(predict_emotion(c).items(), key=lambda x: x[1])
        print(f"   chunk {i}: {top[0]} ({top[1]:.0%})")

    # Combined view: the averaged result from predict_story
    show("   COMBINED", predict_story(s))
    print("-" * 40)