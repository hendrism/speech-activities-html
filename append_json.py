import json

new_items = {
  "objects/blanket.png": { "name": "Blanket", "tags": ["object", "winter", "warm"] },
  "nature/blizzard.jpg": { "name": "Blizzard", "tags": ["nature", "winter", "snow"] },
  "clothing/boots.png": { "name": "Boots", "tags": ["clothing", "winter"] },
  "animals/cardinal.jpg": { "name": "Cardinal", "tags": ["animal", "bird", "winter"] },
  "objects/fireplace.png": { "name": "Fireplace", "tags": ["object", "winter", "warm"] },
  "nature/frost.jpg": { "name": "Frost", "tags": ["nature", "winter", "cold"] },
  "clothing/gloves.png": { "name": "Gloves", "tags": ["clothing", "winter", "warm"] },
  "objects/hockey_stick.jpg": { "name": "Hockey stick", "tags": ["object", "winter", "sports"] },
  "nature/ice_1.jpg": { "name": "Ice", "tags": ["nature", "winter", "cold"] },
  "objects/ice_scraper.png": { "name": "Ice scraper", "tags": ["object", "winter", "car"] },
  "nature/icicle.jpg": { "name": "Icicle", "tags": ["nature", "winter", "cold"] },
  "clothing/mittens.png": { "name": "Mittens", "tags": ["clothing", "winter", "warm"] },
  "plants/pine_tree.png": { "name": "Pine tree", "tags": ["plant", "winter", "tree"] },
  "clothing/scarf.png": { "name": "Scarf", "tags": ["clothing", "winter", "warm"] },
  "objects/skis.jpg": { "name": "Skis", "tags": ["object", "winter", "sports"] },
  "objects/sled.jpg": { "name": "Sled", "tags": ["object", "winter", "play"] },
  "objects/snow-shovel.jpg": { "name": "Snow shovel", "tags": ["object", "winter", "work"] },
  "nature/snow_2.jpg": { "name": "Snow", "tags": ["nature", "winter", "cold"] },
  "objects/snow_fort.png": { "name": "Snow fort", "tags": ["object", "winter", "play"] },
  "objects/snow_plow.jpg": { "name": "Snow plow", "tags": ["object", "winter", "work"] },
  "objects/snowball.jpg": { "name": "Snowball", "tags": ["object", "winter", "play"] },
  "nature/snowflake.jpg": { "name": "Snowflake", "tags": ["nature", "winter", "cold"] },
  "objects/snowman.jpg": { "name": "Snowman", "tags": ["object", "winter", "play"] },
  "food/soup.jpg": { "name": "Soup", "tags": ["food", "winter", "warm"] },
  "objects/space_heater.png": { "name": "Space heater", "tags": ["object", "winter", "warm"] },
  "objects/thermos.jpg": { "name": "Thermos", "tags": ["object", "winter", "warm"] },
  "clothing/winter-coat.png": { "name": "Winter coat", "tags": ["clothing", "winter", "warm"] },
  "clothing/winter-hat.jpg": { "name": "Winter hat", "tags": ["clothing", "winter", "warm"] },
  "objects/broom.jpg": { "name": "Broom", "tags": ["object", "winter"] },
  "objects/ice_skates.jpg": { "name": "Ice skates", "tags": ["object", "winter", "sports"] },
  "animals/penguins.jpg": { "name": "Penguins", "tags": ["animal", "winter", "bird"] },
  "animals/polar_bear.jpg": { "name": "Polar bear", "tags": ["animal", "winter", "mammal"] },
  "clothing/raincoat.jpg": { "name": "Raincoat", "tags": ["clothing", "wet"] },
  "nature/snow.jpg": { "name": "Snow", "tags": ["nature", "winter"] },
  "objects/snowboard.jpg": { "name": "Snowboard", "tags": ["object", "winter", "sports"] },
  "food/warm_tea.jpg": { "name": "Warm tea", "tags": ["food", "winter", "drink"] },
  "actions/dogplaysnow.png": { "name": "Dog playing in snow", "tags": ["action", "winter", "dog"] },
  "actions/drink-hotchocolate.png": { "name": "Drinking hot chocolate", "tags": ["action", "winter", "drink"] },
  "actions/kidmakesnowman.png": { "name": "Making a snowman", "tags": ["action", "winter", "play"] },
  "actions/kidsiceskate.png": { "name": "Ice skating", "tags": ["action", "winter", "play"] },
  "actions/kidsled.png": { "name": "Sledding", "tags": ["action", "winter", "play"] },
  "actions/manshovel.png": { "name": "Shoveling", "tags": ["action", "winter", "work"] },
  "actions/throw_snowball.png": { "name": "Throwing snowballs", "tags": ["action", "winter", "play"] }
}

with open('data/vocabulary-images.json', 'r') as f:
    data = json.load(f)

for k, v in new_items.items():
    if k not in data:
        data[k] = v

with open('data/vocabulary-images.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Updated vocabulary-images.json successfully.")
