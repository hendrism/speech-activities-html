import re

with open('/Users/Sean-Work/Desktop/speech-activities-html/activities/reading/late-winter-early-spring-reading.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Instead of parsing the whole JSON, extract the question prompts and choices using regex.
prompts = re.finditer(r'"prompt":\s*"(.*?)"', text)
choices = re.finditer(r'"text":\s*"(.*?)",\s*"isCorrect":\s*(true|false)', text)

with open('questions_dump.txt', 'w', encoding='utf-8') as out:
    out.write("--- PROMPTS ---\n")
    for p in prompts:
        out.write("- " + p.group(1) + "\n")
    
    out.write("\n--- CHOICES ---\n")
    for c in choices:
        mark = "[*]" if c.group(2) == "true" else "[ ]"
        out.write(f"{mark} {c.group(1)}\n")

print("Created questions_dump.txt")
