import re
import json

with open('stories_updated.json', 'r', encoding='utf-8') as f:
    new_stories = json.load(f)

with open('late-winter-early-spring-reading.html', 'r', encoding='utf-8') as f:
    html_text = f.read()

# Replace everything from `const stories = [` up to but not including `];` with a new formatted string
# First, let's find the extent
start_idx = html_text.find('const stories = [')

bracket_count = 0
in_string = False
escape = False
end_idx = -1
for i in range(start_idx + len('const stories = '), len(html_text)):
    char = html_text[i]
    if not in_string:
        if char == '[':
            bracket_count += 1
        elif char == ']':
            bracket_count -= 1
        elif char == '"' or char == "'":
            in_string = True
            quote_char = char
    else:
        if escape:
            escape = False
        elif char == '\\':
            escape = True
        elif char == quote_char:
            in_string = False
    
    if bracket_count == 0:
        end_idx = i + 1
        break

if start_idx != -1 and end_idx != -1:
    old_json = html_text[start_idx + len('const stories = '):end_idx]
    # new_stories directly to json
    new_json_str = json.dumps(new_stories, indent=4)
    # The new string should replace from start_idx + len to end_idx
    new_html = html_text[:start_idx + len('const stories = ')] + new_json_str + html_text[end_idx:]
    with open('late-winter-early-spring-reading_v2.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Success! Written to _v2.html")
else:
    print("Error finding boundaries to replace.")
