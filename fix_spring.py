import json

with open("data/vocabulary.json", "r") as f:
    data = json.load(f)

spring_choices = [
    {
        "id": "spr_yn_01", "type": "yes_no",
        "text": "Do you like rain?",
        "image": "images/nature/puddle.png"
    },
    {
        "id": "spr_yn_02", "type": "yes_no",
        "text": "Do you like butterflies?",
        "image": "images/animals/butterfly.png"
    },
    {
        "id": "spr_yn_03", "type": "yes_no",
        "text": "Do you like frogs?",
        "image": "images/animals/frog.png"
    },
    {
        "id": "spr_yn_04", "type": "yes_no",
        "text": "Do you like jumping in puddles?",
        "image": "images/actions/jump-puddle.png"
    },
    {
        "id": "spr_yn_05", "type": "yes_no",
        "text": "Do you like watering flowers?",
        "image": "images/actions/water-flowers.png"
    },
    {
        "id": "spr_yn_06", "type": "yes_no",
        "text": "Do you like flying kites?",
        "image": "images/actions/fly-kite.png"
    },
    {
        "id": "spr_yn_07", "type": "yes_no",
        "text": "Do you like bees?",
        "image": "images/animals/bee.png"
    },
    {
        "id": "spr_yn_08", "type": "yes_no",
        "text": "Do you like umbrellas?",
        "image": "images/objects/umbrella.png"
    },
    {
        "id": "spr_yn_09", "type": "yes_no",
        "text": "Do you like rabbits?",
        "image": "images/animals/rabbit.png"
    },
    {
        "id": "spr_yn_10", "type": "yes_no",
        "text": "Do you like birds?",
        "image": "images/animals/bird.png"
    },
    {
        "id": "spr_eo_01", "type": "either_or",
        "text": "Do you like raincoats or rain boots?",
        "choices": [
            {"label": "Raincoats", "image": "images/clothing/raincoat.png"},
            {"label": "Rain Boots", "image": "images/clothing/rain-boots.png"}
        ]
    },
    {
        "id": "spr_eo_02", "type": "either_or",
        "text": "Do you like earthworms or butterflies?",
        "choices": [
            {"label": "Earthworms", "image": "images/animals/earthworm.png"},
            {"label": "Butterflies", "image": "images/animals/butterfly.png"}
        ]
    },
    {
        "id": "spr_eo_03", "type": "either_or",
        "text": "Do you like bees or frogs?",
        "choices": [
            {"label": "Bees", "image": "images/animals/bee.png"},
            {"label": "Frogs", "image": "images/animals/frog.png"}
        ]
    },
    {
        "id": "spr_eo_04", "type": "either_or",
        "text": "Do you like daffodils or tulips?",
        "choices": [
            {"label": "Daffodils", "image": "images/plants/daffodil.png"},
            {"label": "Tulips", "image": "images/plants/tulip.png"}
        ]
    },
    {
        "id": "spr_eo_05", "type": "either_or",
        "text": "Do you like daisies or flowers?",
        "choices": [
            {"label": "Daisies", "image": "images/plants/daisy.png"},
            {"label": "Flowers", "image": "images/objects/flower.png"}
        ]
    },
    {
        "id": "spr_eo_06", "type": "either_or",
        "text": "Do you like picnics or flying kites?",
        "choices": [
            {"label": "Picnics", "image": "images/objects/picnicbasket.png"},
            {"label": "Flying Kites", "image": "images/actions/fly-kite.png"}
        ]
    },
    {
        "id": "spr_eo_07", "type": "either_or",
        "text": "Do you like sunglasses or umbrellas?",
        "choices": [
            {"label": "Sunglasses", "image": "images/clothing/sunglasses.png"},
            {"label": "Umbrellas", "image": "images/objects/umbrella.png"}
        ]
    },
    {
        "id": "spr_eo_08", "type": "either_or",
        "text": "Do you like bird nests or flowers?",
        "choices": [
            {"label": "Bird Nests", "image": "images/objects/birdnest.png"},
            {"label": "Flowers", "image": "images/objects/flower.png"}
        ]
    },
    {
        "id": "spr_eo_09", "type": "either_or",
        "text": "Do you like jumping in puddles or watering flowers?",
        "choices": [
            {"label": "Jumping in Puddles", "image": "images/actions/jump-puddle.png"},
            {"label": "Watering Flowers", "image": "images/actions/water-flowers.png"}
        ]
    },
    {
        "id": "spr_eo_10", "type": "either_or",
        "text": "Do you like strawberries or rabbits?",
        "choices": [
            {"label": "Strawberries", "image": "images/food/strawberry.png"},
            {"label": "Rabbits", "image": "images/animals/rabbit.png"}
        ]
    }
]

data["picturePreferenceChoices"] = spring_choices

with open("data/vocabulary.json", "w") as f:
    json.dump(data, f, indent=2)

with open("data/vocabulary.js", "w") as f:
    f.write("window.ActivityData = window.ActivityData || {};\n")
    f.write("window.ActivityData.vocabulary = ")
    json.dump(data, f, indent=2)
    f.write(";\n")

