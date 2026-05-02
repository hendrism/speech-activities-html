import re
import json

with open('/Users/Sean-Work/Desktop/speech-activities-html/activities/reading/late-winter-early-spring-reading.html', 'r', encoding='utf-8') as f:
    text = f.read()

match = re.search(r'const stories = (\[.+?\]);\s*const state =', text, re.DOTALL)
if match:
    json_str = match.group(1)
    try:
        stories = json.loads(json_str)
        print("Success!", len(stories), "stories loaded.")
    except Exception as e:
        print("JSON parse error:", e)
else:
    print("regex failed")
