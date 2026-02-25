import json, re

with open('late-winter-early-spring-reading.html', 'r', encoding='utf-8') as f:
    text = f.read()

# the stories array starts at `const stories = [` and ends at `];` before `        function init() {` or something.
m = re.search(r'const stories = (\[.*?\]);\s+const', text, re.DOTALL)
if m:
    stories_json = m.group(1)
    # it might have some issues with single quotes or trailing commas, but it looks like standard JSON
    try:
        data = json.loads(stories_json)
        with open('stories.json', 'w') as out:
            json.dump(data, out, indent=4)
        print("Successfully extracted to stories.json")
    except Exception as e:
        print("Error parsing JSON:", e)
else:
    print("Could not find stories")
