import json

with open("data/vocabulary.json", "r") as f:
    data = json.load(f)

data["picturePreferenceChoices"] = [
    {
        "id": "pref-001",
        "text": "Do you like butterflies or bees?",
        "type": "either_or",
        "choices": [
            { "label": "Butterflies", "image": "images/animals/butterfly.png" },
            { "label": "Bees", "image": "images/animals/bee.png" }
        ]
    },
    {
        "id": "pref-002",
        "text": "Do you like daffodils or tulips?",
        "type": "either_or",
        "choices": [
            { "label": "Daffodils", "image": "images/plants/daffodil.png" },
            { "label": "Tulips", "image": "images/plants/tulip.png" }
        ]
    },
    {
        "id": "pref-003",
        "text": "Do you like rain?",
        "type": "yes_no",
        "image": "images/nature/puddle.png"
    },
    {
        "id": "pref-004",
        "text": "Do you like playing in the snow?",
        "type": "yes_no",
        "image": "images/actions/kidmakesnowman.png"
    },
    {
        "id": "pref-005",
        "text": "Do you like to fly a kite?",
        "type": "yes_no",
        "image": "images/objects/kite.png"
    },
    {
        "id": "pref-006",
        "text": "Do you like winter coats or raincoats?",
        "type": "either_or",
        "choices": [
            { "label": "Winter Coat", "image": "images/clothing/winter-coat.png" },
            { "label": "Raincoat", "image": "images/clothing/raincoat.png" }
        ]
    },
    {
        "id": "pref-007",
        "text": "Do you like to go sledding or ice skating?",
        "type": "either_or",
        "choices": [
            { "label": "Sledding", "image": "images/actions/kidsled.png" },
            { "label": "Ice Skating", "image": "images/actions/kidsiceskate.png" }
        ]
    },
    {
        "id": "pref-008",
        "text": "Do you like strawberries?",
        "type": "yes_no",
        "image": "images/food/strawberry.png"
    }
]

with open("data/vocabulary.json", "w") as f:
    json.dump(data, f, indent=2)

with open("data/vocabulary.js", "w") as f:
    f.write("window.ActivityData = window.ActivityData || {};\n")
    f.write("window.ActivityData.vocabulary = ")
    json.dump(data, f, indent=2)
    f.write(";\n")

