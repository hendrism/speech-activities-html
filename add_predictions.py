import re
import json
import sys

# The raw text of the prediction questions
RAW_TEXT = """
**Story 1**

Q: Mia found a flower starting to grow at the end of the story. What do you think she will do next time she goes outside?
💡 Hint: Think about what she decided to look for and how she felt when she saw the flower.
- A) She will build a new snowman with the leftover snow
- B) She will go back inside and forget about the flower
- C) She will go outside to check on the flower and look for more signs of spring ✓
- D) She will bring the flower inside so it does not freeze

Q: Do you think Mia will feel sad the next time it snows?
💡 Hint: Think about how her feelings changed by the end of the story.
- A) Yes, because she will worry about losing another snowman
- B) No, because she learned that something new always comes after winter ✓
- C) Yes, because she never wants to build another snowman
- D) No, because she does not like snow anymore

---

**Story 2**

Q: Max was already looking at the muddy yard at the end of the story. What do you think he will do the next time the door opens?
💡 Hint: Think about what Max loved most in this story.
- A) He will stay inside because he learned his lesson
- B) He will run straight back into the mud ✓
- C) He will wait by the door but not go out
- D) He will look for a dry spot to play in

Q: Do you think Max's owner will do anything differently the next time Max goes outside?
💡 Hint: Think about what surprised her this time and what a person might do to prepare.
- A) She will never let Max outside again
- B) She will watch him more carefully from the window
- C) She will keep the tub ready so she is prepared to wash him again ✓
- D) She will put boots on Max before he goes out

---

**Story 3**

Q: Dani wrote the date in her notebook when she saw the robin. What do you think she will do as more signs of spring appear?
💡 Hint: Think about why she wrote the date down and what that tells you about her habit.
- A) She will stop writing once she has seen the first robin
- B) She will keep writing down other signs of spring as she notices them ✓
- C) She will share her notebook with her teacher for a grade
- D) She will throw the notebook away once winter is fully over

Q: What do you think Dani will do next February?
💡 Hint: The story says she does this every year — what does that tell you?
- A) She will forget about the robin because it happens every year
- B) She will watch the backyard again and wait for the first robin ✓
- C) She will try to find the robin somewhere else this time
- D) She will stop keeping track because she already knows spring is coming

---

**Story 4**

Q: Jake stood listening to the snow melting off the roof at the end of the story. What do you think he will do when the snow is completely gone?
💡 Hint: Think about how Jake felt about winter ending — did he seem excited about spring or was he sad to let go?
- A) He will stay inside until summer arrives
- B) He will find something new to enjoy now that winter is over ✓
- C) He will try to find more snow somewhere else
- D) He will be too sad about winter to enjoy spring

Q: Next winter, do you think Jake will make a snowball the first time it snows?
💡 Hint: Think about how much Jake clearly loved snow and what he did with the very last bit of it.
- A) No, because he is tired of snowballs after this winter
- B) No, he will wait until the end of winter again
- C) Yes, he will make one right away because he loves the snow ✓
- D) Yes, but only if his friends are there too

---

**Story 5**

Q: Lily took the shortcut even though she knew it would be muddy. What do you think she will do next time she walks home?
💡 Hint: Think about whether Lily seemed bothered by what happened or if she took it in stride.
- A) She will take the long way home to avoid the mud
- B) She will take the shortcut again because it did not really bother her ✓
- C) She will ask her mom to pick her up from school
- D) She will wear different shoes next time

Q: What do you think Lily will tell her family when she gets home?
💡 Hint: Think about how Lily reacted when her boot came off — what does that tell you about her personality?
- A) She will be too embarrassed to tell anyone
- B) She will be upset and complain about the muddy path
- C) She will laugh and tell the story because she thought it was funny ✓
- D) She will ask her parents to fix the muddy path

---

**Story 6**

Q: Anna said it seemed worth testing at the time. Do you think she will test the ice again if she sees another frozen puddle?
💡 Hint: Think about whether Anna seemed like someone who learns from mistakes or someone who gets curious and takes chances.
- A) No, she will walk around every puddle from now on
- B) No, she learned her lesson and will never touch ice again
- C) Maybe — she might be curious again even though she knows what could happen ✓
- D) Yes, she will test it again because she thinks it will hold next time

Q: Anna's shoe was soaked when she got to school. What do you think her day at school was like?
💡 Hint: Think about what it feels like to sit in school with a wet shoe all day.
- A) She dried off quickly and forgot about it
- B) Her shoe stayed wet and uncomfortable for most of the day ✓
- C) Her teacher sent her home to change
- D) She took her shoe off and it dried by lunch

---

**Story 7**

Q: Tom did not want to go back inside at the end of the story. What do you think he will do on the next warm day?
💡 Hint: Think about how much Tom enjoyed just sitting outside doing nothing in particular.
- A) He will plan an outdoor activity with friends
- B) He will go back to his spot on the steps and enjoy the warmth again ✓
- C) He will stay inside now that he has had his fresh air
- D) He will go for a long walk instead of sitting on the steps

Q: The story ends in late February. What do you think Tom will do when spring fully arrives?
💡 Hint: Think about what Tom seemed to love most — was it doing things outside, or just being outside?
- A) He will spend as much time outside as possible now that it is warm ✓
- B) He will go back to staying inside since winter is finally over
- C) He will look for snow since he misses winter
- D) He will start a garden now that the ground is warm

---

**Story 8**

Q: Maria lined her seedlings up on the windowsill at the end of the story. What do you think she will do every day until the ground is ready to plant?
💡 Hint: Think about what seedlings need and how carefully Maria planned this whole thing.
- A) She will leave them alone and hope for the best
- B) She will check on them, water them, and watch for signs of growth ✓
- C) She will move them outside as soon as she sees a sprout
- D) She will forget about them once the excitement wears off

Q: What do you think Maria will do next winter when she is waiting for spring again?
💡 Hint: Think about what worked well for her this time.
- A) She will wait patiently until the ground is warm enough to plant outside
- B) She will start her seeds indoors early again ✓
- C) She will ask her mom to handle the gardening next time
- D) She will try a different hobby while she waits for spring

---

**Story 9**

Q: Sam walked away from the pond at the end of the story. What do you think he will do when the pond freezes again next winter?
💡 Hint: Think about how much skating meant to Sam and what he did almost every weekend.
- A) He will find a different hobby and not go back to the pond
- B) He will be the first one out there skating when the ice is solid again ✓
- C) He will be too sad about this year to enjoy skating next winter
- D) He will only skate if his friends go with him

Q: The sign at the pond said the ice was unsafe. What do you think will happen to the pond over the next few weeks?
💡 Hint: Think about what time of year it is and what has been happening to the ice and snow throughout the story.
- A) The ice will get thicker and safer as February continues
- B) The pond will freeze completely solid again before spring
- C) The ice will keep melting until the pond is fully open water again ✓
- D) The pond will stay partly frozen until summer

---

**Story 10**

Q: Maya noticed tiny buds on the oak tree at the end of the story. What do you think she will do the next time she looks at the tree?
💡 Hint: Think about the kind of person Maya seems to be — she noticed something small that others might miss.
- A) She will forget about the buds now that the rain has stopped
- B) She will check the tree again to see if the buds have grown or opened ✓
- C) She will pick the buds off the tree to look at them up close
- D) She will stop paying attention to the tree once spring arrives

Q: The story ends with winter leaving but not fully gone. What do you think the yard will look like in two or three weeks?
💡 Hint: Think about all the changes that were already happening — the warm rain, the melting snow, the buds on the tree.
- A) The yard will be covered in snow again after one more cold spell
- B) The yard will look the same as it did during the warm rain
- C) The snow will be gone, the ground will be muddy, and the buds will be opening ✓
- D) The yard will be fully green with flowers already blooming
"""

def parse_predictions(text):
    stories = {}
    current_story = None
    lines = text.strip().split('\n')
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue
        if line.startswith("**Story"):
            import re
            m = re.match(r"\*\*Story (\d+)\*\*", line)
            current_story = f"story-{m.group(1)}"
            stories[current_story] = []
            i += 1
            continue
        
        if line.startswith("Q:"):
            # New Question
            q_text = line[2:].strip()
            
            i += 1
            hint_matched = re.match(r"(?:💡\s*)?Hint:\s*(.*)", lines[i].strip())
            hint = hint_matched.group(1) if hint_matched else lines[i].strip()
            
            choices = []
            
            # Read 4 choices
            i += 1
            while i < len(lines) and lines[i].strip().startswith("- "):
                c_line = lines[i].strip()[2:] # remove "- "
                # remove "A) "
                c_text = c_line[3:].strip()
                is_correct = False
                if c_text.endswith("✓"):
                    is_correct = True
                    c_text = c_text[:-1].strip()
                
                choices.append({
                    "text": c_text,
                    "isCorrect": is_correct
                })
                i += 1
            
            stories[current_story].append({
                "prompt": q_text,
                "clue": hint,
                "choices": choices
            })
            continue
            
        i += 1
    return stories

def main():
    predictions = parse_predictions(RAW_TEXT)
    
    html_path = "/Users/Sean-Work/Desktop/speech-activities-html/activities/reading/late-winter-early-spring-reading.html"
    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()
        
    start_str = "const stories = [\n"
    start_idx = html_content.find(start_str)
    if start_idx == -1:
        print("Could not find start_str")
        sys.exit(1)
    
    start_idx += len("const stories = ") # Starts with [
        
    end_str = "];\n        \n        // ── Figurative Language"
    end_idx = html_content.find(end_str)
    if end_idx == -1:
        # Fallback
        end_idx = html_content.find("];", start_idx)
    
    # Include the closing bracket ']' which is at end_idx
    json_str = html_content[start_idx:end_idx+1]
    
    try:
        data = json.loads(json_str)
    except Exception as e:
        print(f"Error parsing JSON: {e}")
        sys.exit(1)
        
    for story in data:
        sid = story["id"]
        if sid in predictions:
            pred_qs = predictions[sid]
            if "simple" in story.get("versions", {}):
                if "questions" not in story["versions"]["simple"]:
                    story["versions"]["simple"]["questions"] = {}
                story["versions"]["simple"]["questions"]["prediction"] = pred_qs
            if "complex" in story.get("versions", {}):
                if "questions" not in story["versions"]["complex"]:
                    story["versions"]["complex"]["questions"] = {}
                story["versions"]["complex"]["questions"]["prediction"] = pred_qs
                
    new_json_str = json.dumps(data, indent=4)
    
    new_html = html_content[:start_idx] + new_json_str + html_content[end_idx+1:]
    
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(new_html)
        
    print("Successfully updated late-winter-early-spring-reading.html")

if __name__ == "__main__":
    main()
