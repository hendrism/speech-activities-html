import json

def patch():
    with open('data/vocabulary.json', 'r') as f:
        data = json.load(f)
    
    data['bugHomes'] = [
      {
        "id": "bug-home-1",
        "bug": "Ant",
        "bugImage": "images/animals/ant.png",
        "correctHome": "Anthill",
        "correctHomeImage": "images/animal-homes/anthill.png",
        "incorrectHome": "Beehive",
        "incorrectHomeImage": "images/animal-homes/beehive.png"
      },
      {
        "id": "bug-home-2",
        "bug": "Bee",
        "bugImage": "images/animals/bee.png",
        "correctHome": "Beehive",
        "correctHomeImage": "images/animal-homes/beehive.png",
        "incorrectHome": "Spiderweb",
        "incorrectHomeImage": "images/animal-homes/spiderweb.png"
      },
      {
        "id": "bug-home-3",
        "bug": "Spider",
        "bugImage": "images/animals/spider.png",
        "correctHome": "Spiderweb",
        "correctHomeImage": "images/animal-homes/spiderweb.png",
        "incorrectHome": "Wasp Nest",
        "incorrectHomeImage": "images/animal-homes/wasp-nest.png"
      },
      {
        "id": "bug-home-4",
        "bug": "Wasp",
        "bugImage": "images/animals/wasp.png",
        "correctHome": "Wasp Nest",
        "correctHomeImage": "images/animal-homes/wasp-nest.png",
        "incorrectHome": "Anthill",
        "incorrectHomeImage": "images/animal-homes/anthill.png"
      },
      {
        "id": "bug-home-5",
        "bug": "Earthworm",
        "bugImage": "images/animals/earthworm.png",
        "correctHome": "Dirt",
        "correctHomeImage": "images/animal-homes/dirt.png",
        "incorrectHome": "Leaf",
        "incorrectHomeImage": "images/animal-homes/leaf.png"
      },
      {
        "id": "bug-home-6",
        "bug": "Caterpillar",
        "bugImage": "images/animals/caterpillar.png",
        "correctHome": "Leaf",
        "correctHomeImage": "images/animal-homes/leaf.png",
        "incorrectHome": "Dirt",
        "incorrectHomeImage": "images/animal-homes/dirt.png"
      },
      {
        "id": "bug-home-7",
        "bug": "Fly",
        "bugImage": "images/animals/fly.png",
        "correctHome": "Garbage Can",
        "correctHomeImage": "images/animal-homes/garbage-can.png",
        "incorrectHome": "Puddle",
        "incorrectHomeImage": "images/nature/puddle.png"
      },
      {
        "id": "bug-home-8",
        "bug": "Mosquito",
        "bugImage": "images/animals/mosquito.png",
        "correctHome": "Puddle",
        "correctHomeImage": "images/nature/puddle.png",
        "incorrectHome": "Garbage Can",
        "incorrectHomeImage": "images/animal-homes/garbage-can.png"
      },
      {
        "id": "bug-home-9",
        "bug": "Beetle",
        "bugImage": "images/animals/beetle.png",
        "correctHome": "Under a Rock",
        "correctHomeImage": "images/nature/rock.png",
        "incorrectHome": "Tall Grass",
        "incorrectHomeImage": "images/nature/grass.png"
      },
      {
        "id": "bug-home-10",
        "bug": "Grasshopper",
        "bugImage": "images/animals/grasshopper.png",
        "correctHome": "Tall Grass",
        "correctHomeImage": "images/nature/grass.png",
        "incorrectHome": "Under a Rock",
        "incorrectHomeImage": "images/nature/rock.png"
      },
      {
        "id": "bug-home-11",
        "bug": "Butterfly",
        "bugImage": "images/animals/butterfly.png",
        "correctHome": "Flower",
        "correctHomeImage": "images/plants/daisy.png",
        "incorrectHome": "Spiderweb",
        "incorrectHomeImage": "images/animal-homes/spiderweb.png"
      }
    ]

    with open('data/vocabulary.json', 'w') as f:
        json.dump(data, f, indent=2)

    with open('data/vocabulary.json', 'r') as f:
        json_data = f.read()

    js_content = f"window.ActivityData = window.ActivityData || {{}};\nwindow.ActivityData.vocabulary = {json_data};\n"

    with open('data/vocabulary.js', 'w') as f:
        f.write(js_content)

if __name__ == "__main__":
    patch()
