import json
import random

new_qs = {}
# Due to size, I am dynamically defining questions in chunks
new_qs["story-1"] = {
    "simple": {
        "literal": [
            {"prompt": "What color was the snowman's scarf?", "clue": "Color of the sky.", "choices": ["Blue", "Red", "Green", "Yellow"]},
            {"prompt": "What did the snowman have for a nose?", "clue": "An orange vegetable.", "choices": ["A carrot", "A stick", "A rock", "An orange"]}
        ],
        "inferential": [
            {"prompt": "Why was the snowman melting?", "clue": "What happens to snow when the sun feels warmer?", "choices": ["The air was getting warmer", "It was raining", "Mia poured water on it", "The wind blew it away"]},
            {"prompt": "Why did Mia smile at the end of the story?", "clue": "How did changing her focus to the flower help her?", "choices": ["She realized a new season was starting", "She found bringing in the carrot funny", "She wanted to build another snowman", "She liked the mud"]}
        ]
    },
    "complex": {
        "literal": [
            {"prompt": "What month was it when the snow started melting?", "clue": "The month before March.", "choices": ["February", "January", "December", "April"]},
            {"prompt": "Where was the flower starting to grow?", "clue": "Near a boundary.", "choices": ["Near the fence", "In the middle of the yard", "Under the porch", "By the driveway"]}
        ],
        "inferential": [
            {"prompt": "Why did Mia's stomach sink when she saw the puddle?", "clue": "How would you feel if something you worked hard on disappeared?", "choices": ["She was very disappointed that her snowman was gone", "She was hungry for breakfast", "She was worried she would get in trouble", "She was afraid of the muddy puddle"]},
            {"prompt": "What did Mia mean when she decided that 'something new beginning wasn't so bad'?", "clue": "Consider what happens when one season replaces another.", "choices": ["Spring brings new life to replace winter", "Building a new snowman is fun", "Getting a new scarf is exciting", "Mud is better than snow"]}
        ]
    }
}
new_qs["story-2"] = {
    "simple": {
        "literal": [
            {"prompt": "What did Max get all over his paws?", "clue": "It's wet and brown.", "choices": ["Mud", "Snow", "Leaves", "Paint"]},
            {"prompt": "Who gave Max a bath?", "clue": "The person who takes care of him.", "choices": ["His owner", "His friend", "The neighbor", "A vet"]}
        ],
        "inferential": [
            {"prompt": "Why was the yard muddy?", "clue": "What happens when snow meets warm weather?", "choices": ["The snow was melting", "It rained heavily", "Someone dug a hole", "Max spilled his water"]},
            {"prompt": "Why did Max's owner not want mud in the house?", "clue": "Think about what mud does to floors.", "choices": ["It makes a dirty mess", "It makes the floor slippery", "It smells bad", "It attracts bugs"]}
        ]
    },
    "complex": {
        "literal": [
            {"prompt": "How did Max exit the house when the door opened?", "clue": "The story compares him to something fast.", "choices": ["Like a rocket", "Slowly and carefully", "By sneaking out", "Like a turtle"]},
            {"prompt": "What did Max's owner use to give him a bath?", "clue": "She grabbed it from the garage.", "choices": ["An old plastic tub", "A large bucket", "The garden hose", "A kitchen sink"]}
        ],
        "inferential": [
            {"prompt": "Why was Max 'completely happy' running in the mud?", "clue": "He had been stuck inside all winter.", "choices": ["He finally got to run around outside freely", "He liked the taste of mud", "He was chasing a squirrel", "He wanted to get dirty on purpose"]},
            {"prompt": "Why was Max 'eying the muddy yard again' after his bath?", "clue": "Does a dog usually care about staying clean?", "choices": ["He wanted to go back out and play", "He was looking for his bone", "He wanted to drink the puddles", "He was scared of the house"]}
        ]
    }
}
new_qs["story-3"] = {
    "simple": {
        "literal": [
            {"prompt": "What kind of bird flew into the yard?", "clue": "It's a bird often seen in the spring.", "choices": ["A robin", "A crow", "A blue jay", "A pigeon"]},
            {"prompt": "What was the bird looking for?", "clue": "They wiggle in the ground.", "choices": ["Worms", "Seeds", "Bugs", "Bread"]}
        ],
        "inferential": [
            {"prompt": "Why did knowing spring was close make the girl excited?", "clue": "What generally happens after winter?", "choices": ["The weather will get warmer and sunnier", "She gets to build more snowmen", "She loves the cold weather", "She doesn't like birds"]},
            {"prompt": "Why was the bird able to find food in the ground now?", "clue": "The story mentions it was one of the first warm days.", "choices": ["The ground was wet and not frozen", "The snow covered the food", "The bird was very fast", "Someone threw food outside"]}
        ]
    },
    "complex": {
        "literal": [
            {"prompt": "What color was the robin's chest?", "clue": "It's a reddish color.", "choices": ["Rust-red", "Bright yellow", "Deep blue", "Snow white"]},
            {"prompt": "What did Dani do right after seeing the bird?", "clue": "She wanted to remember when it happened.", "choices": ["Wrote down the date in her notebook", "Called her friend", "Ran outside to chase it", "Took a picture with her phone"]}
        ],
        "inferential": [
            {"prompt": "Why is the robin considered Dani's 'personal sign' that winter is ending?", "clue": "What is the relationship between the bird and the ground thawing?", "choices": ["The bird only returns when the ground is soft enough", "The bird brings warm weather with its wings", "The bird hates the snow", "Dani trained the bird to come back"]},
            {"prompt": "Why did Dani track the date every year?", "clue": "People who like to observe nature often keep records.", "choices": ["To keep a record of when spring begins to arrive", "For a school project", "To remember the bird's birthday", "To know when to buy birdseed"]}
        ]
    }
}
new_qs["story-4"] = {
    "simple": {
        "literal": [
            {"prompt": "What did Jake make out of the wet snow?", "clue": "He threw it at a tree.", "choices": ["A snowball", "A snowman", "A snow fort", "An ice sculpture"]},
            {"prompt": "What happened to the snow in his hands?", "clue": "It was too soft.", "choices": ["It fell apart", "It turned to ice", "It got bigger", "It froze his fingers"]}
        ],
        "inferential": [
            {"prompt": "Why did the snowball fall apart easily?", "clue": "The air was no longer freezing cold.", "choices": ["The snow was melting and wet", "Jake was too strong", "The snow was too dry", "He didn't squeeze it hard enough"]},
            {"prompt": "Why did Jake smile when he threw the snowball?", "clue": "What did he know was coming soon?", "choices": ["He was happy winter was ending", "He hit the tree perfectly", "He liked getting his hands wet", "He was playing a game with his friend"]}
        ]
    },
    "complex": {
        "literal": [
            {"prompt": "Where were the thin patches of snow located in the yard?", "clue": "Places the sun doesn't reach easily.", "choices": ["In the shady corners", "In the middle of the lawn", "On the driveway", "Under the porch steps"]},
            {"prompt": "What did Jake hear at the end of the story?", "clue": "It was the sound of something melting.", "choices": ["The dripping sound of snow off the roof", "A bird singing in the tree", "The wind blowing hard", "A car driving by"]}
        ],
        "inferential": [
            {"prompt": "Why was the snow 'not the dry fluffy kind from January'?", "clue": "What changes the texture of snow as spring approaches?", "choices": ["The warmer temperature made it wet and heavy", "It was a different type of snowstorm", "It had been mixed with mud", "Someone poured water on it"]},
            {"prompt": "Why did Jake decide to throw the snowball even though it was falling apart?", "clue": "It was the last snow of the year.", "choices": ["He wanted one final winter moment", "He wanted to break the tree", "He was angry about the melting snow", "He wanted to practice throwing"]}
        ]
    }
}
new_qs["story-5"] = {
    "simple": {
        "literal": [
            {"prompt": "What happened to Lily's boot in the mud?", "clue": "It wouldn't move.", "choices": ["It got stuck", "It broke", "It fell off immediately", "It got a hole"]},
            {"prompt": "What part of Lily's clothing got wet and muddy?", "clue": "It's worn under a boot.", "choices": ["Her sock", "Her pants", "Her jacket", "Her glove"]}
        ],
        "inferential": [
            {"prompt": "Why did the path have so much mud?", "clue": "Think about what happened to the snow.", "choices": ["The melting snow made the ground wet", "It rained for a week", "Someone left the hose on", "A river overflowed"]},
            {"prompt": "Why did Lily laugh when her boot got stuck?", "clue": "How did she react to the accident?", "choices": ["She thought the situation was funny", "She liked having a wet sock", "Someone told a joke", "She was happy to be almost home"]}
        ]
    },
    "complex": {
        "literal": [
            {"prompt": "Why did Lily take the shortcut home?", "clue": "She knew it was muddy, but took it anyway.", "choices": ["To save time", "Because she liked the mud", "To see the animals", "To avoid the street"]},
            {"prompt": "What sound did the boot make when she finally pulled it out?", "clue": "Sound of breaking suction.", "choices": ["A loud sucking sound", "A loud pop", "A splashing noise", "A squishing sound"]}
        ],
        "inferential": [
            {"prompt": "What does 'pulled at her boots with every step' mean?", "clue": "Mud makes it hard to walk.", "choices": ["The thick mud created suction on her footwear", "Someone was grabbing her feet", "The boots were too tight", "The mud was slippery"]},
            {"prompt": "What can you infer about Lily's personality from her reaction?", "clue": "She laughed instead of getting angry.", "choices": ["She has a good sense of humor", "She gets upset easily", "She is very clumsy", "She likes to complain"]}
        ]
    }
}
new_qs["story-6"] = {
    "simple": {
        "literal": [
            {"prompt": "What was on top of the puddle?", "clue": "It's hard and cold.", "choices": ["A thin layer of ice", "Snow cover", "Mud", "Leaves"]},
            {"prompt": "What did Anna do when her shoe got wet?", "clue": "She tried to get the water off.", "choices": ["Shook her foot", "Cried", "Took off her shoe", "Ran back home"]}
        ],
        "inferential": [
            {"prompt": "Why did the ice crack when Anna stepped on it?", "clue": "The story says it was 'thin'.", "choices": ["It wasn't thick enough to hold her weight", "She jumped on it very hard", "It was already broken", "The water underneath was too hot"]},
            {"prompt": "Why did Anna decide not to step on ice again?", "clue": "She learned a lesson from this experience.", "choices": ["She didn't like getting her shoes wet", "She was afraid of falling", "She thought the ice was dirty", "Someone told her not to"]}
        ]
    },
    "complex": {
        "literal": [
            {"prompt": "How did Anna test the ice?", "clue": "She used part of her footwear.", "choices": ["Pressed the toe of her sneaker against the edge", "Poked it with a stick", "Threw a rock at it", "Stepped with both feet"]},
            {"prompt": "What did Anna do immediately after the cold water rushed over her shoe?", "clue": "She was surprised by the cold.", "choices": ["Gasped and jumped back", "Screamed loudly", "Started running", "Fell down in the puddle"]}
        ],
        "inferential": [
            {"prompt": "Why did Anna know she probably 'should not' test the ice?", "clue": "She could see the water underneath.", "choices": ["She knew there was a high risk of getting wet", "She was running late for school", "She knew the puddle was very deep", "Her parents warned her about it"]},
            {"prompt": "Why did Anna think the risk 'seemed worth testing at the time'?", "clue": "Kids often do things just to see what happens.", "choices": ["She was too curious to resist", "She wanted to wash her shoes", "She wanted to break the ice for fun", "She thought she was light enough"]}
        ]
    }
}
new_qs["story-7"] = {
    "simple": {
        "literal": [
            {"prompt": "What did Tom leave inside when he went out?", "clue": "It keeps him warm.", "choices": ["His coat", "His hat", "His gloves", "His boots"]},
            {"prompt": "Where did Tom sit down?", "clue": "It's an outdoor part of the house.", "choices": ["On the steps", "On the grass", "On a chair", "On the driveway"]}
        ],
        "inferential": [
            {"prompt": "Why did Tom not need his coat?", "clue": "The story mentions the sun.", "choices": ["The afternoon was warm", "He was only out for a second", "He was already dressed warmly", "He couldn't find it"]},
            {"prompt": "Why didn't Tom want to go back inside?", "clue": "He was enjoying the weather.", "choices": ["He liked the warm sunshine and listening to nature", "He was locked out", "His house was too hot", "He was waiting for a friend"]}
        ]
    },
    "complex": {
        "literal": [
            {"prompt": "What kind of bird was calling in the oak tree?", "clue": "It's a small bird with a distinct call.", "choices": ["A chickadee", "A robin", "A cardinal", "A blue jay"]},
            {"prompt": "When did Tom step outside?", "clue": "It was midday.", "choices": ["After lunch", "Before breakfast", "In the early morning", "Right before dinner"]}
        ],
        "inferential": [
            {"prompt": "What does it mean that the air felt 'like a promise'?", "clue": "A promise of what?", "choices": ["It felt like spring was coming soon", "It promised to rain later", "It promised to snow again", "He promised someone he would go outside"]},
            {"prompt": "What was the 'something green trying to wake up' that Tom smelled?", "clue": "Plants sleep in winter.", "choices": ["Plants and grass growing in the soil", "A green vegetable cooking inside", "Mold growing on the steps", "A perfume someone sprayed"]}
        ]
    }
}
new_qs["story-8"] = {
    "simple": {
        "literal": [
            {"prompt": "Where did Maria find the seed packet?", "clue": "It's often attached to the house.", "choices": ["In the garage", "In the kitchen", "In the garden", "In the shed"]},
            {"prompt": "Where did she put the small cups?", "clue": "They need light to grow.", "choices": ["By the sunny window", "On the kitchen table", "On the porch", "In the garage"]}
        ],
        "inferential": [
            {"prompt": "Why didn't Maria plant the seeds outside right away?", "clue": "Seeds don't like freezing temperatures.", "choices": ["The ground was still too cold", "She didn't have shovels", "It was raining too hard", "The seeds belonged indoors"]},
            {"prompt": "Why did she use small cups instead of a garden bed?", "clue": "She was starting them indoors.", "choices": ["To start the seeds growing warmly inside first", "Because she was out of dirt", "Because the cups were pretty", "She didn't want big plants"]}
        ]
    },
    "complex": {
        "literal": [
            {"prompt": "What kind of seeds were in the packet?", "clue": "They grow tall and yellow.", "choices": ["Sunflowers", "Daisies", "Tomatoes", "Pumpkins"]},
            {"prompt": "How many seeds did Maria put in each cup?", "clue": "It's a small number.", "choices": ["Two", "One", "Three", "Five"]}
        ],
        "inferential": [
            {"prompt": "Why did her mom raise an eyebrow?", "clue": "It was still winter outside.", "choices": ["She thought it was too early to start planting", "She was angry Maria used cups", "She didn't like sunflowers", "She was surprised they grew so fast"]},
            {"prompt": "What does getting a 'head start' mean for the seedlings?", "clue": "They will be bigger than outside seeds.", "choices": ["They will already be growing by the time spring starts", "They will finish growing before it rains", "They will win a gardening race", "They will grow faster than normal"]}
        ]
    }
}
new_qs["story-9"] = {
    "simple": {
        "literal": [
            {"prompt": "What did Sam do on the pond all winter?", "clue": "It requires special boots with blades.", "choices": ["He skated on the ice", "He fished in it", "He swam in it", "He threw rocks in it"]},
            {"prompt": "What did the sign say?", "clue": "It's a warning.", "choices": ["Do Not Walk on Ice", "No Swimming Allowed", "Thin Ice Today", "Danger: Deep Water"]}
        ],
        "inferential": [
            {"prompt": "Why was the ice now thin and cracked?", "clue": "Winter is ending.", "choices": ["The weather was warming up", "Too many people skated on it", "A boat broke it", "The fish ate the ice"]},
            {"prompt": "Why did Sam turn around and walk home?", "clue": "He saw the sign.", "choices": ["He realized it was too dangerous to skate", "He forgot his skates", "He was too cold", "He wanted to go to a different pond"]}
        ]
    },
    "complex": {
        "literal": [
            {"prompt": "What did the ice look like in late February?", "clue": "It wasn't white anymore.", "choices": ["Gray and glassy", "Smooth and white", "Bumpy and blue", "Clear and perfect"]},
            {"prompt": "How did Sam check the ice before leaving?", "clue": "He touched it gently.", "choices": ["Pressed the toe of his boot against the edge", "Poked it with his hockey stick", "Threw a large rock on it", "Tapped it with his hand"]}
        ],
        "inferential": [
            {"prompt": "What does it mean that the ice gave slightly 'like it was sighing'?", "clue": "It wasn't solid anymore.", "choices": ["The ice was weak and bending under pressure", "The ice was making a whistling noise", "The ice was perfectly safe", "The wind was blowing across it"]},
            {"prompt": "Why did Sam stay a few minutes just looking at the pond?", "clue": "It was the end of a long season he enjoyed.", "choices": ["He was saying goodbye to his favorite winter activity", "He was waiting for his friends", "He thought the ice might freeze again", "He lost something in the water"]}
        ]
    }
}
new_qs["story-10"] = {
    "simple": {
        "literal": [
            {"prompt": "What was different about the rain?", "clue": "It wasn't freezing.", "choices": ["It was warm", "It was very cold", "It was snowy", "It was colorful"]},
            {"prompt": "What happened to the snow in the yard?", "clue": "It turned to puddles.", "choices": ["It started to melt fast", "It got much deeper", "It turned to solid ice", "It blew away"]}
        ],
        "inferential": [
            {"prompt": "Why did the warm rain make Maya smile?", "clue": "What season does warm rain bring?", "choices": ["She knew spring was arriving soon", "She likes getting wet", "She wanted to play in the snow", "She likes thunderstorms"]},
            {"prompt": "Why did the puddles grow big on the sidewalk?", "clue": "Where did the puddle water come from?", "choices": ["The large amount of melting snow created lots of water", "A water pipe broke", "The sidewalk was very uneven", "It rained for three days straight"]}
        ]
    },
    "complex": {
        "literal": [
            {"prompt": "What did Maya notice on the tips of the oak tree branches?", "clue": "They become leaves eventually.", "choices": ["Tiny swollen buds", "Green leaves", "Small birds", "Acorns falling"]},
            {"prompt": "What day of the week did the warm rain start?", "clue": "It's the day after Monday.", "choices": ["Tuesday", "Monday", "Friday", "Sunday"]}
        ],
        "inferential": [
            {"prompt": "Why did Maya not reach for her coat on the porch?", "clue": "The rain felt different.", "choices": ["The air was comfortably warm", "She forgot where she left it", "She wanted to get wet", "She was only going out for a second"]},
            {"prompt": "What does 'Winter was not gone, but it was leaving' mean?", "clue": "It's a transition period.", "choices": ["The cold was fading away as spring started", "Winter was moving to another country", "Winter was over immediately", "The snow was hiding underground"]}
        ]
    }
}

def create_randomized_choices(choices):
    # original choices has the correct answer at index 0
    choice_objs = [{"text": c, "isCorrect": False} for c in choices]
    choice_objs[0]["isCorrect"] = True
    random.shuffle(choice_objs)
    return choice_objs

with open('stories_extracted.json', 'r') as f:
    data = json.load(f)

for story in data:
    sid = story['id']
    if sid in new_qs:
        for version in ['simple', 'complex']:
            q_data = new_qs[sid][version]
            old_literal = story['versions'][version]['questions']['literal']
            old_inferential = story['versions'][version]['questions']['inferential']
            
            # create literal objects
            for q in q_data['literal']:
                formatted_q = {
                    "prompt": q["prompt"],
                    "clue": q["clue"],
                    "choices": create_randomized_choices(q["choices"])
                }
                old_literal.append(formatted_q)
                
            # create inferential objects
            for q in q_data['inferential']:
                formatted_q = {
                    "prompt": q["prompt"],
                    "clue": q["clue"],
                    "choices": create_randomized_choices(q["choices"])
                }
                old_inferential.append(formatted_q)

with open('stories_updated.json', 'w') as f:
    json.dump(data, f, indent=4)

print("Updated stories_updated.json successfully!")
