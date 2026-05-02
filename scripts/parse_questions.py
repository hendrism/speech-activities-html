import re
import json

with open('/Users/Sean-Work/Desktop/speech-activities-html/activities/reading/late-winter-early-spring-reading.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Find the stories array
match = re.search(r'const stories = (\[.*?\]);\s*<\/script>', text, re.DOTALL)
if match:
    stories_json = match.group(1)
    # The JSON might have some slight JS syntax (like single quotes or trailing commas), 
    # but looking at the snippet, it looks like valid JSON.
    try:
        stories = json.loads(stories_json)
        with open('questions_dump.txt', 'w', encoding='utf-8') as out:
            for story in stories:
                out.write(f"=== Story: {story.get('title')} ===\n")
                for version_name, version_data in story.get('versions', {}).items():
                    out.write(f"  -- Version: {version_name} --\n")
                    questions = version_data.get('questions', {})
                    for q_type, q_list in questions.items():
                        out.write(f"    - Type: {q_type}\n")
                        for idx, q in enumerate(q_list):
                            out.write(f"      Q{idx+1}: {q.get('prompt')}\n")
                            for c_idx, choice in enumerate(q.get('choices', [])):
                                mark = "*" if choice.get("isCorrect") else " "
                                out.write(f"        [{mark}] {choice.get('text')}\n")
                    out.write("\n")
        print("Successfully dumped to questions_dump.txt")
    except json.JSONDecodeError as e:
        print("JSON parse error", e)
else:
    print("Could not find stories JSON in the file.")
