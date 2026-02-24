import json
import re

def parse_data():
    with open('data.txt', 'r') as f:
        content = f.read()

    paragraphs = re.split(r'\*\*PARAGRAPH \d+ — (.*?)\*\*', content)
    
    items = []
    current_context = ""
    
    # paragraphs[0] is everything before the first paragraph header
    # paragraphs[1] is the title of the first paragraph, paragraphs[2] is its content, etc.
    
    for i in range(1, len(paragraphs), 2):
        current_context = paragraphs[i].strip()
        text = paragraphs[i+1]
        
        # Split by item e.g. "**1. child -> ?**"
        item_blocks = re.split(r'\*\*(\d+)\.\s+(.*?)\s+→\s+\?\*\*', text)
        
        for j in range(1, len(item_blocks), 3):
            item_num = int(item_blocks[j])
            singular = item_blocks[j+1].strip()
            item_content = item_blocks[j+2]
            
            # Extract hint
            hint_match = re.search(r'\*Hint:\s*(.*?)\*', item_content)
            hint = hint_match.group(1).strip() if hint_match else ""
            
            # Extract options A) B) C)
            options_text = item_content[hint_match.end() if hint_match else 0:]
            
            # Clean up newlines
            options_text = options_text.replace('\n', ' ')
            
            opt_matches = re.finditer(r'[A-C]\)\s+(\*\*)?(.*?)(\*\*)?(?=\s+[A-C]\)|\s*$)', options_text)
            choices = []
            correct = ""
            for m in opt_matches:
                opt_raw = m.group(2).strip()
                choices.append(opt_raw)
                if '**' in m.group(0): # It was bolded
                    correct = opt_raw
                    
            if not correct and len(choices) > 0:
                # Fallback if parsing missed bold marks
                for c in choices:
                    if '**' in c:
                        correct = c.replace('**', '')
                choices = [c.replace('**', '') for c in choices]
            
            items.append({
                "id": item_num,
                "word": singular,
                "context": current_context,
                "hint": hint,
                "choices": choices,
                "correct": correct
            })

    print(json.dumps(items, indent=4))
    
    with open('data.json', 'w') as f:
        json.dump(items, f, indent=4)

if __name__ == '__main__':
    parse_data()
