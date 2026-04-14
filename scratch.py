import json

index_file = 'data/activity-index.json'

with open(index_file, 'r', encoding='utf-8') as f:
    index_data = json.load(f)

new_item = {
    "id": "spring-informational-texts-advanced",
    "category": "reading",
    "title": "Spring Informational Texts (Advanced)",
    "sourceFile": "activities/reading/index.html?activity=spring-informational-texts-advanced",
    "type": "content-driven"
}

if not any(item['id'] == 'spring-informational-texts-advanced' for item in index_data['activities']):
    insert_idx = 0
    for i, item in enumerate(index_data['activities']):
        if item['id'] == 'spring-informational-texts-update':
            insert_idx = i + 1
            break
            
    if insert_idx > 0:
        index_data['activities'].insert(insert_idx, new_item)
    else:
        index_data['activities'].append(new_item)

with open(index_file, 'w', encoding='utf-8') as f:
    json.dump(index_data, f, indent=2, ensure_ascii=False)

print("Successfully updated activity-index.json")
