import re
import json
import sys

# The raw text of the vocabulary questions
RAW_TEXT = """
**Story 1**

Q: "She gave him a crooked carrot nose." What does crooked mean?
💡 Hint: Think about how you would stick a carrot into a snowman's face — would it always go in perfectly straight?
- A) Very long
- B) Not straight, bent to one side ✓
- C) Broken in half
- D) Pointing downward

Q: "Nothing but a puddle, a carrot, and a soggy scarf sitting in the mud." What does soggy mean?
💡 Hint: Think about what happens to fabric when it sits in mud and melting snow for days.
- A) Torn and dirty
- B) Frozen solid
- C) Wet and heavy from soaking up water ✓
- D) Faded and old looking

---

**Story 2**

Q: "Max had been cooped up inside all winter." What does cooped up mean?
💡 Hint: Think about how Max acted the moment the door opened — what does that tell you about how he had been feeling?
- A) Sick and resting inside
- B) Stuck inside with no room to run or play ✓
- C) Sleeping most of the day
- D) Bored but comfortable inside

Q: "All four paws were caked in dark mud." What does caked mean?
💡 Hint: Think about what mud looks like when it dries on something — is it a little bit or a lot?
- A) Lightly dusted with mud
- B) Dripping with wet mud
- C) Covered in a thick layer of mud that stuck on ✓
- D) Stained a dark color permanently

Q: "She filled it with lukewarm water." What does lukewarm mean?
💡 Hint: Think about why she would not use freezing cold or boiling hot water on a dog.
- A) Very cold
- B) Slightly warm, not hot or cold ✓
- C) Soapy and bubbly
- D) Very hot

---

**Story 3**

Q: "A few stubborn patches of snow in the corners of the yard." What does stubborn mean here?
💡 Hint: Think about the fact that most of the snow had already melted — why was this snow still there?
- A) Very heavy and deep
- B) Dirty and gray colored
- C) Refusing to melt like the rest of the snow ✓
- D) Packed tightly by the wind

Q: "A plump little bird with a rust-red chest." What does plump mean?
💡 Hint: Think about what a well-fed bird might look like compared to a skinny one.
- A) Very small and lightweight
- B) Round and full bodied ✓
- C) Tall and long legged
- D) Fluffy from its winter feathers

Q: "Robins came back when the ground started to thaw." What does thaw mean?
💡 Hint: Think about what the ground does when temperatures rise after being frozen all winter.
- A) Get covered in rain
- B) Dry out and crack
- C) Soften as ice and frost melt away ✓
- D) Get muddy from too much water

---

**Story 4**

Q: "There was still snow on the ground, but just barely." What does barely mean?
💡 Hint: Think about how much snow Jake found — was there a lot or almost none?
- A) Completely gone
- B) Only a small amount remaining ✓
- C) More than enough to play in
- D) Hidden under a layer of ice

Q: "He packed a handful together." What does packed mean here?
💡 Hint: Think about what you have to do with snow to make it hold together as a ball.
- A) Picked it up loosely in one hand
- B) Pressed and squeezed it tightly together ✓
- C) Scooped it into a cup shape
- D) Mixed it with water to make it stick

Q: "Watched the wet clump splatter against the bark." What does splatter mean?
💡 Hint: Think about what wet soft snow does when it hits something hard at speed.
- A) Bounce off cleanly in one piece
- B) Stick to the bark without breaking
- C) Break apart and spread out in all directions ✓
- D) Slide slowly down the trunk

---

**Story 5**

Q: "The ground was soft and soggy in a way that pulled at her boots." What does soggy mean?
💡 Hint: Think about what the ground looks and feels like after days of melting snow soaking into it.
- A) Frozen just below the surface
- B) Completely dry and cracked
- C) So wet and soft it could barely hold its shape ✓
- D) Covered in a thin layer of ice

Q: "She squished the rest of the way home." What does squished mean here?
💡 Hint: Think about what wet boots sound and feel like with every step.
- A) She ran home as fast as she could
- B) She walked carefully trying not to slip
- C) She walked with wet boots making a soft sound each step ✓
- D) She hopped on one foot to keep her sock dry

---

**Story 6**

Q: "She could see the water still liquid underneath." What does liquid mean?
💡 Hint: Think about the two forms water can take in winter — what is the opposite of ice?
- A) Warm and steamy
- B) Flowing and unfrozen ✓
- C) Dark and murky
- D) Shallow and clear

Q: "Her sneaker was soaked through." What does soaked mean?
💡 Hint: Think about what happened when cold water rushed over her shoe — how much water got in?
- A) A little damp on the outside
- B) Wet only on the bottom
- C) Completely wet all the way through ✓
- D) Wet but drying quickly in the cold air

---

**Story 7**

Q: "Water dripped steadily from the edge of the roof." What does steadily mean?
💡 Hint: Think about whether the dripping was stopping and starting or happening in a consistent way.
- A) Very fast and splashing loudly
- B) Slowly and occasionally
- C) At a slow even pace without stopping ✓
- D) In loud heavy drops

Q: "Tom was not doing anything in particular." What does in particular mean?
💡 Hint: Think about what Tom was actually doing — was he focused on one specific thing or just existing outside?
- A) He was doing something very important
- B) He had no focus on any one specific thing ✓
- C) He was trying to decide what to do
- D) He was doing something he does every day

---

**Story 8**

Q: "A crinkled seed packet with a picture of sunflowers on the front." What does crinkled mean?
💡 Hint: Think about what happens to paper when it gets old, bent, or stored for a long time.
- A) Faded and hard to read
- B) Torn along the edges
- C) Wrinkled and creased from being stored ✓
- D) Damp from sitting in the garage

Q: "Her mom looked at the row of cups and raised an eyebrow, a little skeptical." What does skeptical mean?
💡 Hint: Think about what raising an eyebrow usually means when someone looks at something surprising.
- A) Excited and impressed by the idea
- B) Confused about what she was looking at
- C) Doubtful the plan would actually work ✓
- D) Angry that Maria had made a mess

---

**Story 9**

Q: "The pond had been solid enough to skate on." What does solid mean here?
💡 Hint: Think about what ice needs to be like for it to be safe to stand and skate on.
- A) Perfectly smooth with no cracks
- B) Thick and hard enough to hold weight ✓
- C) Clear enough to see through
- D) Frozen all the way to the bottom

Q: "The ice had taken on a gray glassy look." What does glassy mean?
💡 Hint: Think about what a window or pane of glass looks like — smooth, clear, a little shiny.
- A) Broken into sharp pieces
- B) Covered in a dull white frost
- C) Smooth and clear with a slight shine ✓
- D) Dark and hard to see

: "The gray sky reflected in the patches of open water." What does reflected mean?
💡 Hint: Think about what you see when you look into still water — what does the surface show you?
- A) The sky was casting shadows on the water
- B) The water was showing a mirror image of the sky ✓
- C) The clouds were making the water look gray
- D) The water was turning dark from the cold

---

**Story 10**

Q: "The bare branches of the oak tree were glistening." What does glistening mean?
💡 Hint: Think about what wet branches look like when light hits them after rain.
- A) Covered in a thin layer of ice
- B) Shining with a wet sparkle from the rain ✓
- C) Starting to grow new leaves
- D) Dark and heavy from the water

Q: "The very tips of the branches had tiny swollen buds on them." What does swollen mean?
💡 Hint: Think about what a bud looks like just before it is about to open — is it flat or puffed out?
- A) Dried out and shriveled
- B) Bright green and fully open
- C) Puffed up and round, getting ready to open ✓
- D) Frozen and stuck to the branch

Q: "The constant dripping and rushing of water." What does constant mean?
💡 Hint: Think about whether the dripping and rushing was stopping and starting or happening the whole time.
- A) Very loud and overwhelming
- B) Stopping and starting with the rain
- C) Going on without stopping the whole time ✓
- D) Coming from one specific spot in the yard
"""

def parse_questions(text):
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
            m = re.match(r"\*\*Story (\d+)\*\*", line)
            current_story = f"story-{m.group(1)}"
            stories[current_story] = []
            i += 1
            continue
        
        if line.startswith("Q:") or line.startswith(":"):
            q_text_match = re.match(r"(?:Q)?:?\s*(.*)", line)
            q_text = q_text_match.group(1).strip()
            
            i += 1
            hint_matched = re.match(r"(?:💡\s*)?Hint:\s*(.*)", lines[i].strip())
            hint = hint_matched.group(1) if hint_matched else lines[i].strip()
            
            choices = []
            i += 1
            while i < len(lines) and lines[i].strip().startswith("- "):
                c_line = lines[i].strip()[2:]
                c_text = c_line[3:].strip() # strip A)
                is_correct = False
                if c_text.endswith("✓"):
                    is_correct = True
                    c_text = c_text[:-1].strip()
                choices.append({"text": c_text, "isCorrect": is_correct})
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
    qs = parse_questions(RAW_TEXT)
    
    html_path = "/Users/Sean-Work/Desktop/speech-activities-html/activities/reading/late-winter-early-spring-reading.html"
    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()
        
    start_str = "const stories = [\n"
    start_idx = html_content.find(start_str)
    if start_idx == -1:
        print("Could not find start_str")
        sys.exit(1)
        
    start_idx += len("const stories = ")
        
    end_str = "];\n        \n        // ── Figurative Language"
    end_idx = html_content.find(end_str)
    if end_idx == -1:
        end_idx = html_content.find("];", start_idx)
        
    json_str = html_content[start_idx:end_idx+1]
    
    try:
        data = json.loads(json_str)
    except Exception as e:
        print(repr(json_str[-50:]))
        raise e
        
    for story in data:
        sid = story["id"]
        # Delete vocabulary field
        if "vocabulary" in story:
            del story["vocabulary"]
            
        if sid in qs:
            vocab_qs = qs[sid]
            if "complex" in story.get("versions", {}):
                if "questions" not in story["versions"]["complex"]:
                    story["versions"]["complex"]["questions"] = {}
                story["versions"]["complex"]["questions"]["vocabulary"] = vocab_qs
                
    new_json_str = json.dumps(data, indent=4)
    new_html = html_content[:start_idx] + new_json_str + html_content[end_idx+1:]
    
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(new_html)
        
    print("Successfully added vocabulary questions and removed old vocabulary string.")

if __name__ == "__main__":
    main()
