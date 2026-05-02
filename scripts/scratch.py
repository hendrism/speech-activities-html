import json
import os

images = [
    ("ant.png", "bug", "Ant"),
    ("bee.png", "bug", "Bee"),
    ("beetle.png", "bug", "Beetle"),
    ("butterfly.png", "bug", "Butterfly"),
    ("caterpillar.png", "bug", "Caterpillar"),
    ("dragonfly.png", "bug", "Dragonfly"),
    ("firefly.png", "bug", "Firefly"),
    ("fly.png", "bug", "Fly"),
    ("grasshopper.png", "bug", "Grasshopper"),
    ("ladybug.png", "bug", "Ladybug"),
    ("mosquito.png", "bug", "Mosquito"),
    ("moth.png", "bug", "Moth"),
    ("spider.png", "bug", "Spider"),
    ("wasp.png", "bug", "Wasp"),
    ("beagle.png", "not-bug", "Beagle"),
    ("cat.png", "not-bug", "Cat"),
    ("cow.png", "not-bug", "Cow"),
    ("duck.png", "not-bug", "Duck"),
    ("elephant.png", "not-bug", "Elephant"),
    ("fish.png", "not-bug", "Fish"),
    ("frog.png", "not-bug", "Frog"),
    ("lion.png", "not-bug", "Lion"),
    ("pig.png", "not-bug", "Pig"),
    ("rabbit.png", "not-bug", "Rabbit"),
    ("squirrel.png", "not-bug", "Squirrel")
]

items = []
for i, (filename, cat, label) in enumerate(images, 1):
    items.append({
        "id": f"bug-sort-{i:03d}",
        "label": label,
        "imageUrl": f"images/animals/{filename}",
        "category": cat
    })

vocab_path = "data/vocabulary.json"
vocab_js_path = "data/vocabulary.js"

with open(vocab_path, "r") as f:
    data = json.load(f)

data["bugSorting"] = items

with open(vocab_path, "w") as f:
    json.dump(data, f, indent=2)

with open(vocab_js_path, "w") as f:
    f.write("window.ActivityData = window.ActivityData || {};\n")
    f.write("window.ActivityData.vocabulary = ")
    json.dump(data, f, indent=2)
    f.write(";\n")

print("Successfully updated vocabulary.json and vocabulary.js")
