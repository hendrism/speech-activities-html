#!/bin/bash
mkdir -p images/actions

update_ref() {
  local OLD="$1"
  local NEW="$2"
  # Replace full path references
  find . -type f ! -path "*/\.git/*" ! -path "*/node_modules/*" \( -name "*.html" -o -name "*.json" -o -name "*.js" \) -exec sed -i '' "s|images/${OLD}|images/${NEW}|g" {} +
  # Replace short path references (usually inside quotes in JSON or JS arrays)
  find . -type f ! -path "*/\.git/*" ! -path "*/node_modules/*" \( -name "*.html" -o -name "*.json" -o -name "*.js" \) -exec sed -i '' "s|\"${OLD}\"|\"${NEW}\"|g" {} +
  find . -type f ! -path "*/\.git/*" ! -path "*/node_modules/*" \( -name "*.html" -o -name "*.json" -o -name "*.js" \) -exec sed -i '' "s|'${OLD}'|'${NEW}'|g" {} +
}

move() {
  local SRC="images/$1"
  local DST="images/$2"
  if [ -f "$SRC" ]; then
    echo "Moving $1 -> $2"
    mv "$SRC" "$DST"
    update_ref "$1" "$2"
  fi
}

# winter_items
move "winter_items/blanket.png" "objects/blanket.png"
move "winter_items/blizzard.jpg" "nature/blizzard.jpg"
move "winter_items/boots.png" "clothing/boots.png"
move "winter_items/cardinal.jpg" "animals/cardinal.jpg"
move "winter_items/fireplace.png" "objects/fireplace.png"
move "winter_items/frost.jpg" "nature/frost.jpg"
move "winter_items/gloves.png" "clothing/gloves.png"
move "winter_items/hockey_stick.jpg" "objects/hockey_stick.jpg"
move "winter_items/ice_1.jpg" "nature/ice_1.jpg"
move "winter_items/ice_scraper.png" "objects/ice_scraper.png"
move "winter_items/icicle.jpg" "nature/icicle.jpg"
move "winter_items/mittens.png" "clothing/mittens.png"
move "winter_items/pine_tree.png" "plants/pine_tree.png"
move "winter_items/scarf.png" "clothing/scarf.png"
move "winter_items/skis.jpg" "objects/skis.jpg"
move "winter_items/sled.jpg" "objects/sled.jpg"
move "winter_items/snow-shovel.jpg" "objects/snow-shovel.jpg"
move "winter_items/snow_2.jpg" "nature/snow_2.jpg"
move "winter_items/snow_fort.png" "objects/snow_fort.png"
move "winter_items/snow_plow.jpg" "objects/snow_plow.jpg"
move "winter_items/snowball.jpg" "objects/snowball.jpg"
move "winter_items/snowflake.jpg" "nature/snowflake.jpg"
move "winter_items/snowman.jpg" "objects/snowman.jpg"
move "winter_items/soup.jpg" "food/soup.jpg"
move "winter_items/space_heater.png" "objects/space_heater.png"
move "winter_items/thermos.jpg" "objects/thermos.jpg"
move "winter_items/winter-coat.png" "clothing/winter-coat.png"
move "winter_items/winter-hat.jpg" "clothing/winter-hat.jpg"

# new_winter_items
move "new_winter_items/broom.jpg" "objects/broom.jpg"
move "new_winter_items/ice_skates.jpg" "objects/ice_skates.jpg"
move "new_winter_items/penguins.jpg" "animals/penguins.jpg"
move "new_winter_items/polar_bear.jpg" "animals/polar_bear.jpg"
move "new_winter_items/raincoat.jpg" "clothing/raincoat.jpg"
move "new_winter_items/snow.jpg" "nature/snow.jpg"
move "new_winter_items/snowboard.jpg" "objects/snowboard.jpg"
move "new_winter_items/warm_tea.jpg" "food/warm_tea.jpg"

# winter_actions
move "winter_actions/dogplaysnow.png" "actions/dogplaysnow.png"
move "winter_actions/drink-hotchocolate.png" "actions/drink-hotchocolate.png"
move "winter_actions/kidmakesnowman.png" "actions/kidmakesnowman.png"
move "winter_actions/kidsiceskate.png" "actions/kidsiceskate.png"
move "winter_actions/kidsled.png" "actions/kidsled.png"
move "winter_actions/manshovel.png" "actions/manshovel.png"
move "winter_actions/throw_snowball.png" "actions/throw_snowball.png"

echo "Done migrating standard winter files. Empty directories check:"
rmdir images/winter_items 2>/dev/null || echo "images/winter_items not empty"
rmdir images/new_winter_items 2>/dev/null || echo "images/new_winter_items not empty"
rmdir images/winter_actions 2>/dev/null || echo "images/winter_actions not empty"
