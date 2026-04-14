import json

with open('data/stories.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open('data/stories.js', 'w', encoding='utf-8') as f:
    f.write("window.ActivityData = window.ActivityData || {};\n")
    f.write("window.ActivityData.stories = ")
    json.dump(data, f, indent=2, ensure_ascii=False)
    f.write(";\n")
print("Synced data/stories.js")
