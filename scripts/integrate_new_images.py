import os
import shutil
import json
import re

base_dir = '/Users/Sean-Work/Desktop/speech-activities-html/images'
sort_dir = os.path.join(base_dir, 'images-to-sort')
vocab_path = '/Users/Sean-Work/Desktop/speech-activities-html/data/vocabulary-images.json'

with open(vocab_path, 'r') as f:
    vocab = json.load(f)

# 1. Delete Winter Images - All
winter_all = os.path.join(sort_dir, 'Winter Images - All')
if os.path.exists(winter_all):
    shutil.rmtree(winter_all)
    print("Deleted Winter Images duplicates.")

# 2. Move defining_spring_objects_images to objects
spring_objs = os.path.join(sort_dir, 'describing_spring_objects_images')
if os.path.exists(spring_objs):
    for f in os.listdir(spring_objs):
        full_path = os.path.join(spring_objs, f)
        if f in ['butterfly.png', 'kite.png', 'umbrella.png'] or f.startswith('.'):
            if os.path.isfile(full_path): os.remove(full_path)
            continue
        dest = os.path.join(base_dir, 'objects', f)
        shutil.move(full_path, dest)
        name = f.replace('.png', '').replace('.jpg', '').replace('-', ' ').title()
        if 'baseball' in name.lower(): name = "Baseball Glove"
        elif 'birdnest' in name.lower(): name = "Bird Nest"
        elif 'rainboots' in name.lower(): name = "Rain Boots"
        elif 'waterbottle' in name.lower(): name = "Water Bottle"
        vocab[f"objects/{f}"] = { "name": name, "tags": ["object", "spring"] }
    os.rmdir(spring_objs)
    print("Migrated Spring Objects.")

# 3. Move emotions to emotions/
emotions_dir = os.path.join(sort_dir, 'emotions')
if os.path.exists(emotions_dir):
    os.makedirs(os.path.join(base_dir, 'emotions'), exist_ok=True)
    for f in os.listdir(emotions_dir):
        if f.startswith('.'): continue
        dest = os.path.join(base_dir, 'emotions', f)
        shutil.move(os.path.join(emotions_dir, f), dest)
        # Format: boyembarrassed.png -> Boy embarrassed
        name = f.replace('.png', '')
        name = re.sub(r'^(boy|girl)(.*)$', lambda m: m.group(1).title() + ' ' + m.group(2), name)
        vocab[f"emotions/{f}"] = { "name": name, "tags": ["emotion", "feeling", "people"] }
    os.rmdir(emotions_dir)
    print("Migrated Emotions.")

# 4. Move spring-action-words to actions/
actions_dir = os.path.join(sort_dir, 'spring-action-words')
if os.path.exists(actions_dir):
    os.makedirs(os.path.join(base_dir, 'actions'), exist_ok=True)
    for f in os.listdir(actions_dir):
        if f.startswith('.'): continue
        dest = os.path.join(base_dir, 'actions', f)
        shutil.move(os.path.join(actions_dir, f), dest)
        name = f.replace('.png', '').replace('-', ' ').capitalize()
        vocab[f"actions/{f}"] = { "name": name, "tags": ["action", "verb", "spring"] }
    os.rmdir(actions_dir)
    print("Migrated Actions.")

# Save JSON
with open(vocab_path, 'w') as f:
    json.dump(vocab, f, indent=2)

print("Integration script completed and vocabulary JSON updated!")
