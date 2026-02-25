import re

with open('late-winter-early-spring-reading.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Find the start of the stories array
start = text.find('const stories = [')
if start == -1:
    print("Could not find const stories")
else:
    # Extract the array by matching brackets
    start_idx = start + len('const stories = ')
    bracket_count = 0
    in_string = False
    escape = False
    for i in range(start_idx, len(text)):
        char = text[i]
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

    stories_json = text[start_idx:end_idx]
    with open('stories_extracted.json', 'w', encoding='utf-8') as f:
        f.write(stories_json)
    print("Extracted to stories_extracted.json!")
