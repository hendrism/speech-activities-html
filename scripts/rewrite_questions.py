import json
import shutil

HTML_PATH = "/Users/Sean-Work/Desktop/speech-activities-html/activities/reading/late-winter-early-spring-reading.html"
BACKUP_PATH = HTML_PATH + ".backup"

# ── New question data ────────────────────────────────────────────────────────

NEW_QUESTIONS = {

"story-1": {
    "simple": {
        "literal": [
            {"prompt": "Who built the snowman?", "clue": "The main character in the story.", "choices": [{"text": "Jake", "isCorrect": False}, {"text": "Mia", "isCorrect": True}, {"text": "Max", "isCorrect": False}, {"text": "Sam", "isCorrect": False}]},
            {"prompt": "Where did Mia build the snowman?", "clue": "Outside her home.", "choices": [{"text": "At the park", "isCorrect": False}, {"text": "In her yard", "isCorrect": True}, {"text": "On the sidewalk", "isCorrect": False}, {"text": "At school", "isCorrect": False}]},
            {"prompt": "When did Mia build the snowman?", "clue": "Not today — look for a time word.", "choices": [{"text": "This morning", "isCorrect": False}, {"text": "Last week", "isCorrect": True}, {"text": "Yesterday", "isCorrect": False}, {"text": "Last month", "isCorrect": False}]},
            {"prompt": "What did the snowman have for a nose?", "clue": "An orange vegetable.", "choices": [{"text": "A rock", "isCorrect": False}, {"text": "A stick", "isCorrect": False}, {"text": "A carrot", "isCorrect": True}, {"text": "A button", "isCorrect": False}]},
            {"prompt": "How did Mia feel when she saw the puddle?", "clue": "The story tells you her feeling directly.", "choices": [{"text": "Happy", "isCorrect": False}, {"text": "Sad", "isCorrect": True}, {"text": "Scared", "isCorrect": False}, {"text": "Angry", "isCorrect": False}]}
        ],
        "inferential": [
            {"prompt": "How do you think Mia felt when she saw the puddle? Why?", "clue": "The story says she felt sad. What made her sad?", "choices": [{"text": "Sad because her snowman was gone", "isCorrect": True}, {"text": "Sad because she got wet", "isCorrect": False}, {"text": "Happy to see the puddle", "isCorrect": False}, {"text": "She did not feel anything", "isCorrect": False}]},
            {"prompt": "Why did Mia smile at the end of the story?", "clue": "What did she decide to look for?", "choices": [{"text": "She found a new scarf", "isCorrect": False}, {"text": "Thinking about spring made her feel hopeful", "isCorrect": True}, {"text": "She built a new snowman", "isCorrect": False}, {"text": "She forgot why she was sad", "isCorrect": False}]},
            {"prompt": "Why was the snowman melting?", "clue": "What did the story say about the sun?", "choices": [{"text": "Mia poured water on it", "isCorrect": False}, {"text": "The air was getting warmer", "isCorrect": True}, {"text": "It was raining", "isCorrect": False}, {"text": "The wind blew it down", "isCorrect": False}]},
            {"prompt": "Why did Mia look for a flower instead of building a new snowman?", "clue": "She was already thinking about spring.", "choices": [{"text": "There was no more snow", "isCorrect": False}, {"text": "She did not like snowmen", "isCorrect": False}, {"text": "She was ready for spring", "isCorrect": True}, {"text": "Flowers are easier to make", "isCorrect": False}]}
        ]
    },
    "complex": {
        "literal": [
            {"prompt": "What did Mia find where the snowman used to be?", "clue": "Three things were left behind — what were they?", "choices": [{"text": "A hat, a scarf, and a stick", "isCorrect": False}, {"text": "A puddle, a carrot, and a soggy scarf", "isCorrect": True}, {"text": "A carrot, a puddle, and a flower", "isCorrect": False}, {"text": "Just a big muddy puddle", "isCorrect": False}]},
            {"prompt": "When did Mia build the snowman?", "clue": "It was before the story takes place.", "choices": [{"text": "Yesterday", "isCorrect": False}, {"text": "Last week", "isCorrect": True}, {"text": "Last month", "isCorrect": False}, {"text": "That same morning", "isCorrect": False}]},
            {"prompt": "What did Mia do with her scarf at the end of the story?", "clue": "She found it in the mud — what did she do with it?", "choices": [{"text": "Left it in the mud", "isCorrect": False}, {"text": "Threw it away", "isCorrect": False}, {"text": "Picked it up", "isCorrect": True}, {"text": "Hung it on the fence", "isCorrect": False}]},
            {"prompt": "What month was it when the snow started melting?", "clue": "The month before March.", "choices": [{"text": "January", "isCorrect": False}, {"text": "December", "isCorrect": False}, {"text": "February", "isCorrect": True}, {"text": "April", "isCorrect": False}]},
            {"prompt": "What did Mia compare losing the snowman to?", "clue": "It felt like losing something that really mattered.", "choices": [{"text": "Losing her favorite toy", "isCorrect": False}, {"text": "Losing a friend", "isCorrect": True}, {"text": "Losing her way home", "isCorrect": False}, {"text": "Losing a game", "isCorrect": False}]}
        ],
        "inferential": [
            {"prompt": "What does 'her stomach sank' tell you about how Mia felt?", "clue": "Think about what that expression means — is it a happy or sad feeling?", "choices": [{"text": "She was hungry for breakfast", "isCorrect": False}, {"text": "She felt sudden sadness when she saw the snowman was gone", "isCorrect": True}, {"text": "She was excited to see the puddle", "isCorrect": False}, {"text": "She was confused about what happened", "isCorrect": False}]},
            {"prompt": "Why do you think Mia smiled when she noticed the flower near the fence?", "clue": "A flower growing in late winter usually means something hopeful.", "choices": [{"text": "She recognized it as her favorite kind of flower", "isCorrect": False}, {"text": "She wanted to pick it and bring it inside", "isCorrect": False}, {"text": "Seeing something new growing made her feel hopeful about spring", "isCorrect": True}, {"text": "She thought the flower looked funny", "isCorrect": False}]},
            {"prompt": "What do the words 'Maybe something new could be just as special' tell you about Mia's feelings?", "clue": "How did her feelings change from the beginning to the end of the story?", "choices": [{"text": "She was still very sad and forcing herself to be positive", "isCorrect": False}, {"text": "She had decided spring was better than winter", "isCorrect": False}, {"text": "She was starting to feel okay about things changing", "isCorrect": True}, {"text": "She was pretending to feel better than she did", "isCorrect": False}]},
            {"prompt": "Why was the snow melting a little more each day?", "clue": "What season comes after winter?", "choices": [{"text": "Mia had poured water on the yard", "isCorrect": False}, {"text": "It had been raining hard", "isCorrect": False}, {"text": "The temperature was rising as February got warmer", "isCorrect": True}, {"text": "The snowman had blocked the cold wind", "isCorrect": False}]}
        ]
    }
},

"story-2": {
    "simple": {
        "literal": [
            {"prompt": "Who gave Max a bath?", "clue": "The person who takes care of him.", "choices": [{"text": "His friend", "isCorrect": False}, {"text": "His owner", "isCorrect": True}, {"text": "The neighbor", "isCorrect": False}, {"text": "A vet", "isCorrect": False}]},
            {"prompt": "Where did Max run and get muddy?", "clue": "Where did Max go at the start of the story?", "choices": [{"text": "At the park", "isCorrect": False}, {"text": "In the yard", "isCorrect": True}, {"text": "In the house", "isCorrect": False}, {"text": "At the lake", "isCorrect": False}]},
            {"prompt": "What did Max get all over his paws?", "clue": "It is wet and brown.", "choices": [{"text": "Snow", "isCorrect": False}, {"text": "Mud", "isCorrect": True}, {"text": "Paint", "isCorrect": False}, {"text": "Leaves", "isCorrect": False}]},
            {"prompt": "When Max came to the door, what did his owner do?", "clue": "She did not want mud in the house.", "choices": [{"text": "Let him inside", "isCorrect": False}, {"text": "Gave him food", "isCorrect": False}, {"text": "Gave him a bath", "isCorrect": True}, {"text": "Put him back in the yard", "isCorrect": False}]},
            {"prompt": "How did Max feel about the bath?", "clue": "The story tells you directly.", "choices": [{"text": "Loved it", "isCorrect": False}, {"text": "Did not like it", "isCorrect": True}, {"text": "Fell asleep", "isCorrect": False}, {"text": "Did not care", "isCorrect": False}]}
        ],
        "inferential": [
            {"prompt": "How do you think Max felt when he ran outside?", "clue": "He had been stuck inside all winter.", "choices": [{"text": "Scared because it was cold", "isCorrect": False}, {"text": "Happy and excited to be free outside", "isCorrect": True}, {"text": "Confused about where he was", "isCorrect": False}, {"text": "Tired and ready to come back in", "isCorrect": False}]},
            {"prompt": "How do you think the owner felt when she saw Max covered in mud?", "clue": "She did not want mud in the house.", "choices": [{"text": "Happy and proud of Max", "isCorrect": False}, {"text": "Annoyed but not surprised", "isCorrect": True}, {"text": "Scared Max was hurt", "isCorrect": False}, {"text": "She did not care at all", "isCorrect": False}]},
            {"prompt": "Why did the owner not let Max in the house right away?", "clue": "Look at what was on Max's paws.", "choices": [{"text": "She was busy cooking", "isCorrect": False}, {"text": "She did not want mud inside", "isCorrect": True}, {"text": "Max was too loud", "isCorrect": False}, {"text": "It was not his dinnertime yet", "isCorrect": False}]},
            {"prompt": "Why was the yard so muddy?", "clue": "The story says something was happening to the snow.", "choices": [{"text": "It had been raining for days", "isCorrect": False}, {"text": "Max dug up the ground", "isCorrect": False}, {"text": "The snow was melting", "isCorrect": True}, {"text": "Someone left the hose on", "isCorrect": False}]}
        ]
    },
    "complex": {
        "literal": [
            {"prompt": "What did Max do the moment the back door opened?", "clue": "The story compares him to something fast.", "choices": [{"text": "Trotted out slowly", "isCorrect": False}, {"text": "Shot outside like a rocket", "isCorrect": True}, {"text": "Ran straight to his food bowl", "isCorrect": False}, {"text": "Barked at the yard", "isCorrect": False}]},
            {"prompt": "Where did Max's owner get the tub?", "clue": "She had to go get it from somewhere nearby.", "choices": [{"text": "The basement", "isCorrect": False}, {"text": "The bathroom", "isCorrect": False}, {"text": "The garage", "isCorrect": True}, {"text": "The hallway closet", "isCorrect": False}]},
            {"prompt": "How did Max behave during his bath?", "clue": "The story uses a specific word for the sound he made.", "choices": [{"text": "Barked at the water", "isCorrect": False}, {"text": "Whined the whole time", "isCorrect": True}, {"text": "Stood perfectly still", "isCorrect": False}, {"text": "Tried to run away", "isCorrect": False}]},
            {"prompt": "What was Max doing right after his bath ended?", "clue": "He was already thinking about the yard again.", "choices": [{"text": "Shaking water off his fur", "isCorrect": False}, {"text": "Running back inside to dry off", "isCorrect": False}, {"text": "Eyeing the muddy yard again", "isCorrect": True}, {"text": "Lying down to rest", "isCorrect": False}]},
            {"prompt": "Who had Max been stuck inside with all winter before finally getting to run?", "clue": "The person who opened the door for him.", "choices": [{"text": "His neighbor", "isCorrect": False}, {"text": "His owner", "isCorrect": True}, {"text": "His dog friends", "isCorrect": False}, {"text": "Nobody — he had been alone", "isCorrect": False}]}
        ],
        "inferential": [
            {"prompt": "Why do you think Max ran outside like a rocket?", "clue": "Consider how long he had been cooped up inside.", "choices": [{"text": "He heard another dog barking outside", "isCorrect": False}, {"text": "He was chasing a squirrel", "isCorrect": False}, {"text": "After being stuck inside all winter, he was bursting to run", "isCorrect": True}, {"text": "He was trying to get away from his owner", "isCorrect": False}]},
            {"prompt": "Why do you think Max was already eyeing the muddy yard again right after his bath?", "clue": "Consider what Max seemed to love most in this story.", "choices": [{"text": "He was looking for a dry spot to lie down", "isCorrect": False}, {"text": "Running outside was so much fun he wanted to go right back", "isCorrect": True}, {"text": "He was watching for other animals in the yard", "isCorrect": False}, {"text": "He forgot he had just had a bath", "isCorrect": False}]},
            {"prompt": "How do you think Max's owner felt when she saw his mud-caked paws at the door?", "clue": "She shook her head and pointed him back to the yard.", "choices": [{"text": "Surprised and upset", "isCorrect": False}, {"text": "Amused but not thrilled about the mess", "isCorrect": True}, {"text": "Angry and ready to scold him", "isCorrect": False}, {"text": "She did not mind at all", "isCorrect": False}]},
            {"prompt": "Why did the owner shake her head and point back at the yard instead of letting Max in?", "clue": "She didn't say anything — but think about what she saw.", "choices": [{"text": "She wanted Max to keep playing outside", "isCorrect": False}, {"text": "She was worried he would slip on the floor", "isCorrect": False}, {"text": "She did not want muddy paw prints all through the house", "isCorrect": True}, {"text": "Max was not allowed inside until dinnertime", "isCorrect": False}]}
        ]
    }
},

"story-3": {
    "simple": {
        "literal": [
            {"prompt": "Who saw the robin from the window?", "clue": "A person in the story.", "choices": [{"text": "Mia", "isCorrect": False}, {"text": "A girl", "isCorrect": True}, {"text": "A boy", "isCorrect": False}, {"text": "Her mom", "isCorrect": False}]},
            {"prompt": "What was the robin looking for?", "clue": "It lives underground and wiggles.", "choices": [{"text": "Seeds", "isCorrect": False}, {"text": "Berries", "isCorrect": False}, {"text": "Worms", "isCorrect": True}, {"text": "Insects on the fence", "isCorrect": False}]},
            {"prompt": "Where did the robin fly?", "clue": "It was outside near the girl's house.", "choices": [{"text": "Into a tree", "isCorrect": False}, {"text": "Into the yard", "isCorrect": True}, {"text": "Onto the roof", "isCorrect": False}, {"text": "Past the window", "isCorrect": False}]},
            {"prompt": "When did the robin come?", "clue": "What kind of day was it?", "choices": [{"text": "On a cold snowy day", "isCorrect": False}, {"text": "One of the first warm days", "isCorrect": True}, {"text": "On a rainy morning", "isCorrect": False}, {"text": "In the middle of winter", "isCorrect": False}]},
            {"prompt": "How did the girl feel when she saw the robin?", "clue": "The story tells you her feeling directly.", "choices": [{"text": "Scared", "isCorrect": False}, {"text": "Bored", "isCorrect": False}, {"text": "Excited", "isCorrect": True}, {"text": "Sad", "isCorrect": False}]}
        ],
        "inferential": [
            {"prompt": "Why was the girl excited to see the robin?", "clue": "What did she think the robin meant?", "choices": [{"text": "She had never seen a robin before", "isCorrect": False}, {"text": "She knew spring was coming", "isCorrect": True}, {"text": "She wanted to catch it", "isCorrect": False}, {"text": "She was surprised birds existed", "isCorrect": False}]},
            {"prompt": "How do you think the girl felt about winter ending?", "clue": "She was excited about spring — what does that tell you?", "choices": [{"text": "She was sad winter was ending", "isCorrect": False}, {"text": "She was happy and looking forward to warmer days", "isCorrect": True}, {"text": "She did not care about the seasons", "isCorrect": False}, {"text": "She wished it would stay winter longer", "isCorrect": False}]},
            {"prompt": "Why was the ground wet?", "clue": "What happens to snow when it gets warm?", "choices": [{"text": "It had rained all week", "isCorrect": False}, {"text": "The snow was melting", "isCorrect": True}, {"text": "Someone left the hose on", "isCorrect": False}, {"text": "There was a flood nearby", "isCorrect": False}]},
            {"prompt": "Why was the robin able to find food in the ground now?", "clue": "Think about what worms need to come to the surface.", "choices": [{"text": "The ground was wet and no longer frozen", "isCorrect": True}, {"text": "The robin dug very deep holes", "isCorrect": False}, {"text": "The girl put worms out for the bird", "isCorrect": False}, {"text": "Worms always come out in winter", "isCorrect": False}]}
        ]
    },
    "complex": {
        "literal": [
            {"prompt": "What was the robin doing when Dani spotted it?", "clue": "The story describes exactly how the bird was moving and searching.", "choices": [{"text": "Sitting still on the fence", "isCorrect": False}, {"text": "Hopping across the muddy ground and jabbing its beak into the soil", "isCorrect": True}, {"text": "Singing from the top of the oak tree", "isCorrect": False}, {"text": "Flying low over the yard looking for seeds", "isCorrect": False}]},
            {"prompt": "Where was Dani when she spotted the robin?", "clue": "She pressed her face against something cold.", "choices": [{"text": "Standing in the backyard", "isCorrect": False}, {"text": "At her window, pressed against the cold glass", "isCorrect": True}, {"text": "On the front porch", "isCorrect": False}, {"text": "Outside near the fence", "isCorrect": False}]},
            {"prompt": "What did Dani do right after she spotted the robin?", "clue": "She did this every year on the same occasion.", "choices": [{"text": "Opened the window to get a closer look", "isCorrect": False}, {"text": "Called her friend to come see", "isCorrect": False}, {"text": "Grabbed her notebook and wrote down the date", "isCorrect": True}, {"text": "Took a photo with her phone", "isCorrect": False}]},
            {"prompt": "When did Dani spot the robin?", "clue": "The story tells you both the day and time of day.", "choices": [{"text": "On a Saturday afternoon", "isCorrect": False}, {"text": "On a Tuesday morning", "isCorrect": True}, {"text": "On a Sunday evening", "isCorrect": False}, {"text": "Early Monday before school", "isCorrect": False}]},
            {"prompt": "What did the yard look like when the robin arrived?", "clue": "There was still some winter weather visible.", "choices": [{"text": "Green grass and no snow at all", "isCorrect": False}, {"text": "Deep snow covering everything", "isCorrect": False}, {"text": "Frost on the grass and stubborn patches of snow in the corners", "isCorrect": True}, {"text": "Mud everywhere with no snow left", "isCorrect": False}]}
        ],
        "inferential": [
            {"prompt": "What does 'winter was finally loosening its grip' mean?", "clue": "Picture someone who is holding something tightly — what happens when they loosen their grip?", "choices": [{"text": "Winter was getting stronger and colder", "isCorrect": False}, {"text": "Winter was slowly coming to an end", "isCorrect": True}, {"text": "Winter had been very mild that year", "isCorrect": False}, {"text": "The grip of cold air was getting tighter", "isCorrect": False}]},
            {"prompt": "Why do you think Dani writes down the date every year when she sees the first robin?", "clue": "She has done this for years — what does the date mean to her?", "choices": [{"text": "She is writing a report about birds for school", "isCorrect": False}, {"text": "The date matters to her as a personal sign that winter is ending", "isCorrect": True}, {"text": "She is trying to prove robins come back on the same day each year", "isCorrect": False}, {"text": "Her teacher told her to keep a nature journal", "isCorrect": False}]},
            {"prompt": "How do you think Dani felt when she finally spotted the first robin?", "clue": "The story says she had been watching and waiting for weeks.", "choices": [{"text": "Confused about why the bird came to her yard", "isCorrect": False}, {"text": "Relieved and happy — the long cold winter was finally ending", "isCorrect": True}, {"text": "Disappointed the robin was not bigger", "isCorrect": False}, {"text": "Nervous because she was not sure if it really was a robin", "isCorrect": False}]},
            {"prompt": "Why do robins come back when the ground starts to thaw?", "clue": "Think about what robins eat and what the ground needs to be like for them to find it.", "choices": [{"text": "Robins prefer cold weather over warm", "isCorrect": False}, {"text": "The soft, warming ground makes worms easier to find near the surface", "isCorrect": True}, {"text": "Robins migrate because of the longer daylight hours only", "isCorrect": False}, {"text": "Robins return because other birds have already left", "isCorrect": False}]}
        ]
    }
},

"story-4": {
    "simple": {
        "literal": [
            {"prompt": "Who is the story about?", "clue": "The main character's name.", "choices": [{"text": "Sam", "isCorrect": False}, {"text": "Jake", "isCorrect": True}, {"text": "Tom", "isCorrect": False}, {"text": "Max", "isCorrect": False}]},
            {"prompt": "Where did Jake go on a cold morning?", "clue": "He went out of his house.", "choices": [{"text": "To the park", "isCorrect": False}, {"text": "Outside", "isCorrect": True}, {"text": "To a friend's house", "isCorrect": False}, {"text": "To school", "isCorrect": False}]},
            {"prompt": "When did Jake go outside?", "clue": "What kind of morning was it?", "choices": [{"text": "A warm spring morning", "isCorrect": False}, {"text": "A cold morning", "isCorrect": True}, {"text": "A rainy morning", "isCorrect": False}, {"text": "After a big snowstorm", "isCorrect": False}]},
            {"prompt": "What did Jake make out of the snow?", "clue": "Something you throw.", "choices": [{"text": "A snowman", "isCorrect": False}, {"text": "A snowball", "isCorrect": True}, {"text": "A snow fort", "isCorrect": False}, {"text": "A snow angel", "isCorrect": False}]},
            {"prompt": "What did Jake throw the snowball at?", "clue": "Something big and made of wood.", "choices": [{"text": "A fence", "isCorrect": False}, {"text": "A wall", "isCorrect": False}, {"text": "A tree", "isCorrect": True}, {"text": "A snowman", "isCorrect": False}]}
        ],
        "inferential": [
            {"prompt": "How do you think Jake felt about the snow melting away?", "clue": "He knew the snow would be gone soon — how might that feel?", "choices": [{"text": "Happy that winter was over", "isCorrect": False}, {"text": "A little sad to see winter go", "isCorrect": True}, {"text": "Scared of the snow going away", "isCorrect": False}, {"text": "He did not care at all", "isCorrect": False}]},
            {"prompt": "Why do you think Jake smiled after throwing the snowball?", "clue": "He knew it might be the last snowball of the year.", "choices": [{"text": "He missed the target", "isCorrect": False}, {"text": "He was enjoying one last winter moment", "isCorrect": True}, {"text": "He built a new snowman", "isCorrect": False}, {"text": "His friend saw him throw it", "isCorrect": False}]},
            {"prompt": "Why was the snowball falling apart?", "clue": "What was happening to all the snow?", "choices": [{"text": "Jake squeezed it too hard", "isCorrect": False}, {"text": "The snow was too old", "isCorrect": False}, {"text": "The snow was wet and melting", "isCorrect": True}, {"text": "He dropped it on the ground", "isCorrect": False}]},
            {"prompt": "Why did Jake know the snow would be gone soon?", "clue": "What was the snow like in his hands?", "choices": [{"text": "He saw it on the news", "isCorrect": False}, {"text": "His mom told him", "isCorrect": False}, {"text": "The snow was wet and soft — a sign of warmer weather", "isCorrect": True}, {"text": "He counted the days until spring", "isCorrect": False}]}
        ]
    },
    "complex": {
        "literal": [
            {"prompt": "When did Jake check the yard?", "clue": "He did it before a normal morning routine activity.", "choices": [{"text": "After getting dressed", "isCorrect": False}, {"text": "Before breakfast", "isCorrect": True}, {"text": "After school", "isCorrect": False}, {"text": "Right before bed", "isCorrect": False}]},
            {"prompt": "Where were the remaining snow patches in the yard?", "clue": "They were only in spots where something blocked the sun.", "choices": [{"text": "In the middle of the yard", "isCorrect": False}, {"text": "Along the driveway", "isCorrect": False}, {"text": "In the shady corners", "isCorrect": True}, {"text": "Under the porch", "isCorrect": False}]},
            {"prompt": "How did Jake describe this snow compared to January snow?", "clue": "The story contrasts two different types of snow.", "choices": [{"text": "This snow was deeper and colder", "isCorrect": False}, {"text": "This snow was wet and heavy, not the dry fluffy kind", "isCorrect": True}, {"text": "This snow was lighter and easier to pack", "isCorrect": False}, {"text": "This snow was the same as always", "isCorrect": False}]},
            {"prompt": "What did Jake throw the snowball at?", "clue": "A specific tree he could see from the yard.", "choices": [{"text": "The fence post", "isCorrect": False}, {"text": "The garage door", "isCorrect": False}, {"text": "The old oak tree", "isCorrect": True}, {"text": "A snow pile near the house", "isCorrect": False}]},
            {"prompt": "What did Jake hear at the end of the story?", "clue": "It was a sound that told you the snow was leaving.", "choices": [{"text": "Birds beginning to sing", "isCorrect": False}, {"text": "The dripping sound of snow melting off the roof", "isCorrect": True}, {"text": "Wind blowing through the bare trees", "isCorrect": False}, {"text": "Children playing in the street", "isCorrect": False}]}
        ],
        "inferential": [
            {"prompt": "Why were the snow patches only in the shady corners of the yard?", "clue": "Think about what melts snow — and what would block it.", "choices": [{"text": "The wind had pushed all the snow to the corners", "isCorrect": False}, {"text": "Those corners were never shoveled all winter", "isCorrect": False}, {"text": "The sun had melted the snow everywhere except where it could not reach", "isCorrect": True}, {"text": "The corners had colder ground than the rest of the yard", "isCorrect": False}]},
            {"prompt": "Why do you think Jake paused and looked at the snowball before throwing it?", "clue": "He knew something about what this snowball meant.", "choices": [{"text": "He was deciding where to aim it", "isCorrect": False}, {"text": "He realized it was probably the last snow of the year and wanted a moment with it", "isCorrect": True}, {"text": "He was worried about getting in trouble for throwing it", "isCorrect": False}, {"text": "He wanted to see how fast the snow was melting", "isCorrect": False}]},
            {"prompt": "What does the image of Jake standing quietly, listening to snow drip off the roof, suggest about how he felt?", "clue": "He is not doing anything — just standing and listening. What kind of feeling makes you do that?", "choices": [{"text": "He was bored and had nothing to do", "isCorrect": False}, {"text": "He felt a quiet, bittersweet sadness about winter ending", "isCorrect": True}, {"text": "He was listening for birds returning to the yard", "isCorrect": False}, {"text": "He was trying to figure out if it would snow again", "isCorrect": False}]},
            {"prompt": "Why was the snow 'wet and heavy' instead of dry and fluffy?", "clue": "Think about what rising temperatures do to snow.", "choices": [{"text": "January had a lot of ice mixed into the snow", "isCorrect": False}, {"text": "It had rained on top of the snow the night before", "isCorrect": False}, {"text": "Warmer temperatures were beginning to melt the snow and change its texture", "isCorrect": True}, {"text": "The snow was old and had been packed down over the winter", "isCorrect": False}]}
        ]
    }
},

"story-5": {
    "simple": {
        "literal": [
            {"prompt": "Who is the story about?", "clue": "Her name starts with L.", "choices": [{"text": "Maya", "isCorrect": False}, {"text": "Lily", "isCorrect": True}, {"text": "Mia", "isCorrect": False}, {"text": "Anna", "isCorrect": False}]},
            {"prompt": "Where was Lily walking?", "clue": "She was on her way home.", "choices": [{"text": "To the park", "isCorrect": False}, {"text": "Home from school", "isCorrect": True}, {"text": "To a friend's house", "isCorrect": False}, {"text": "Around the block", "isCorrect": False}]},
            {"prompt": "When Lily pulled her boot, what happened?", "clue": "Something came off her foot.", "choices": [{"text": "She fell down", "isCorrect": False}, {"text": "Her boot came off", "isCorrect": True}, {"text": "Her sock ripped", "isCorrect": False}, {"text": "The mud splashed her", "isCorrect": False}]},
            {"prompt": "What part of Lily got wet and muddy?", "clue": "She was wearing it on her foot.", "choices": [{"text": "Her coat", "isCorrect": False}, {"text": "Her pants", "isCorrect": False}, {"text": "Her sock", "isCorrect": True}, {"text": "Her bag", "isCorrect": False}]},
            {"prompt": "How did Lily react when her boot came off?", "clue": "She thought it was funny.", "choices": [{"text": "She cried", "isCorrect": False}, {"text": "She got angry", "isCorrect": False}, {"text": "She laughed", "isCorrect": True}, {"text": "She sat down in the mud", "isCorrect": False}]}
        ],
        "inferential": [
            {"prompt": "How do you think Lily felt when her boot got stuck in the mud?", "clue": "Has that ever happened to you? How would it feel?", "choices": [{"text": "Calm and not bothered at all", "isCorrect": False}, {"text": "Surprised and maybe a little frustrated", "isCorrect": True}, {"text": "Very scared", "isCorrect": False}, {"text": "Proud of herself", "isCorrect": False}]},
            {"prompt": "What does it tell you about Lily that she laughed and kept walking?", "clue": "She did not get upset — she kept going.", "choices": [{"text": "She did not care about her muddy sock", "isCorrect": False}, {"text": "She has a good sense of humor and does not let small problems ruin her day", "isCorrect": True}, {"text": "She thought mud was fun to play in", "isCorrect": False}, {"text": "She forgot her sock was wet", "isCorrect": False}]},
            {"prompt": "Why was the path so muddy?", "clue": "What does the story say was happening to the snow?", "choices": [{"text": "It had been raining all week", "isCorrect": False}, {"text": "The snow was melting and making the ground wet", "isCorrect": True}, {"text": "Someone spilled water on the path", "isCorrect": False}, {"text": "The path was always muddy", "isCorrect": False}]},
            {"prompt": "Why did Lily's boot come off when she pulled?", "clue": "The mud was holding something.", "choices": [{"text": "Her boot was too big for her foot", "isCorrect": False}, {"text": "The mud held the boot while her foot kept moving", "isCorrect": True}, {"text": "Her laces were untied", "isCorrect": False}, {"text": "She pulled too hard", "isCorrect": False}]}
        ]
    },
    "complex": {
        "literal": [
            {"prompt": "Where was Lily walking when her boot got stuck?", "clue": "She chose a specific route — not the normal way.", "choices": [{"text": "Down the main road", "isCorrect": False}, {"text": "Across the field on the shortcut path", "isCorrect": True}, {"text": "Along the sidewalk near school", "isCorrect": False}, {"text": "Through the park", "isCorrect": False}]},
            {"prompt": "What did Lily's boot look like after it got stuck in the mud?", "clue": "The story describes it in a funny way.", "choices": [{"text": "Lying flat on its side in the mud", "isCorrect": False}, {"text": "Floating in a puddle", "isCorrect": False}, {"text": "Standing upright in the mud like it had decided to stay", "isCorrect": True}, {"text": "Half buried under more mud", "isCorrect": False}]},
            {"prompt": "When Lily's boot got stuck, what did she do next?", "clue": "She kept moving — even without the boot.", "choices": [{"text": "Stopped and waited for someone to help her", "isCorrect": False}, {"text": "Kept walking, leaving her foot in the mud in a sock", "isCorrect": True}, {"text": "Jumped over the muddy patch", "isCorrect": False}, {"text": "Turned around and went back home", "isCorrect": False}]},
            {"prompt": "What sound did the boot make when Lily yanked it free?", "clue": "It was a loud, wet sound.", "choices": [{"text": "A loud crack", "isCorrect": False}, {"text": "A splashing noise", "isCorrect": False}, {"text": "A loud sucking sound", "isCorrect": True}, {"text": "A squeaking noise", "isCorrect": False}]},
            {"prompt": "How did Lily finish the walk home after getting her boot back?", "clue": "The mud made every step noisy.", "choices": [{"text": "She ran as fast as she could", "isCorrect": False}, {"text": "She took her boots off and carried them", "isCorrect": False}, {"text": "She squished the rest of the way home", "isCorrect": True}, {"text": "She waited until the path dried out", "isCorrect": False}]}
        ],
        "inferential": [
            {"prompt": "Why do you think Lily burst out laughing when her boot was standing alone in the mud?", "clue": "Picture what that must have looked like.", "choices": [{"text": "She was embarrassed and laughing to hide it", "isCorrect": False}, {"text": "The whole situation was so ridiculous she could not help it", "isCorrect": True}, {"text": "She was laughing at someone watching her", "isCorrect": False}, {"text": "She was relieved her boot did not get lost", "isCorrect": False}]},
            {"prompt": "What does Lily's reaction to the whole situation tell you about her personality?", "clue": "She laughed, yanked her boot free, and squished the rest of the way home.", "choices": [{"text": "She gets embarrassed easily", "isCorrect": False}, {"text": "She is easygoing and handles small mishaps with humor", "isCorrect": True}, {"text": "She does not care about getting dirty", "isCorrect": False}, {"text": "She avoids problems by laughing them off", "isCorrect": False}]},
            {"prompt": "Why did Lily take the shortcut even though she knew it would be muddy?", "clue": "She knew — but she went anyway. What does that suggest?", "choices": [{"text": "She forgot it was muddy this time of year", "isCorrect": False}, {"text": "She decided getting home faster was worth the risk", "isCorrect": True}, {"text": "She wanted to get muddy on purpose", "isCorrect": False}, {"text": "She had no other option", "isCorrect": False}]},
            {"prompt": "What does 'the ground was soft and soggy in a way that pulled at her boots' mean?", "clue": "Think about what thick wet mud does when you step in it.", "choices": [{"text": "The mud was sticky and grabbed onto her boots with each step", "isCorrect": True}, {"text": "The ground was shaking under her feet", "isCorrect": False}, {"text": "Her boots were pulling her forward as she walked", "isCorrect": False}, {"text": "The ground was so soft she sank all the way in", "isCorrect": False}]}
        ]
    }
},

"story-6": {
    "simple": {
        "literal": [
            {"prompt": "Who found the frozen puddle?", "clue": "A girl on her way to school.", "choices": [{"text": "Mia", "isCorrect": False}, {"text": "Anna", "isCorrect": True}, {"text": "Lily", "isCorrect": False}, {"text": "Maya", "isCorrect": False}]},
            {"prompt": "Where was Anna going when she found the puddle?", "clue": "She was on her way somewhere every morning.", "choices": [{"text": "To the park", "isCorrect": False}, {"text": "To school", "isCorrect": True}, {"text": "To a friend's house", "isCorrect": False}, {"text": "To the store", "isCorrect": False}]},
            {"prompt": "When Anna stepped on the ice, what happened?", "clue": "It was not thick enough.", "choices": [{"text": "Nothing happened", "isCorrect": False}, {"text": "The ice cracked and her shoe got wet", "isCorrect": True}, {"text": "She slipped and fell", "isCorrect": False}, {"text": "The ice held but made a loud sound", "isCorrect": False}]},
            {"prompt": "What was on top of the puddle?", "clue": "It forms when water gets very cold.", "choices": [{"text": "Snow", "isCorrect": False}, {"text": "Mud", "isCorrect": False}, {"text": "A thin layer of ice", "isCorrect": True}, {"text": "Leaves", "isCorrect": False}]},
            {"prompt": "What did Anna do after her shoe got wet?", "clue": "She shook something and kept going.", "choices": [{"text": "Went home to change her shoe", "isCorrect": False}, {"text": "Sat down on the path", "isCorrect": False}, {"text": "Shook her foot and kept walking", "isCorrect": True}, {"text": "Waited for her shoe to dry", "isCorrect": False}]}
        ],
        "inferential": [
            {"prompt": "Why do you think Anna stepped on the ice even though she knew she shouldn't?", "clue": "Has anything ever made you too curious to stop yourself?", "choices": [{"text": "She was in a hurry to get to school", "isCorrect": False}, {"text": "She was curious and wanted to see what would happen", "isCorrect": True}, {"text": "She did not see the ice", "isCorrect": False}, {"text": "She thought the ice was thick enough", "isCorrect": False}]},
            {"prompt": "How do you think Anna felt after her shoe got wet?", "clue": "She knew it was probably her own fault.", "choices": [{"text": "Happy it happened", "isCorrect": False}, {"text": "Annoyed but knew she had brought it on herself", "isCorrect": True}, {"text": "Scared and upset", "isCorrect": False}, {"text": "She did not mind at all", "isCorrect": False}]},
            {"prompt": "Why was there ice on top of the puddle?", "clue": "What happens to water when the temperature gets below freezing overnight?", "choices": [{"text": "Someone poured water and it froze there", "isCorrect": False}, {"text": "It was still cold enough at night to freeze the water", "isCorrect": True}, {"text": "The puddle was always frozen", "isCorrect": False}, {"text": "A truck drove through and iced it", "isCorrect": False}]},
            {"prompt": "Why did the ice crack when Anna stepped on it?", "clue": "Think about how thick the ice might have been.", "choices": [{"text": "Anna stomped too hard", "isCorrect": False}, {"text": "The ice was too thin to hold her weight", "isCorrect": True}, {"text": "The puddle was very deep", "isCorrect": False}, {"text": "The ground was shaking", "isCorrect": False}]}
        ]
    },
    "complex": {
        "literal": [
            {"prompt": "What did the ice look like on top of the puddle?", "clue": "The story describes both its thickness and its color/appearance.", "choices": [{"text": "Thick and clear", "isCorrect": False}, {"text": "Thin and cloudy", "isCorrect": True}, {"text": "Dark and cracked already", "isCorrect": False}, {"text": "White and solid-looking", "isCorrect": False}]},
            {"prompt": "How did Anna first test the ice?", "clue": "She was cautious — she did not jump on it.", "choices": [{"text": "Tapped it with her hand", "isCorrect": False}, {"text": "Threw a rock on it", "isCorrect": False}, {"text": "Pressed the toe of her sneaker against the edge", "isCorrect": True}, {"text": "Stepped on the middle with both feet", "isCorrect": False}]},
            {"prompt": "What happened right after the ice cracked?", "clue": "Two things happened very quickly.", "choices": [{"text": "Anna fell into the puddle completely", "isCorrect": False}, {"text": "Cold water rushed over her shoe and she gasped and jumped back", "isCorrect": True}, {"text": "The ice shattered into many pieces", "isCorrect": False}, {"text": "Anna laughed and kept stepping on more ice", "isCorrect": False}]},
            {"prompt": "When had the puddle frozen over?", "clue": "The story gives you a time word.", "choices": [{"text": "During the afternoon", "isCorrect": False}, {"text": "Over several days", "isCorrect": False}, {"text": "Overnight", "isCorrect": True}, {"text": "That very morning", "isCorrect": False}]},
            {"prompt": "What thought did Anna have at the very end of the story?", "clue": "She summed up the whole experience with one idea.", "choices": [{"text": "She promised herself never to do it again", "isCorrect": False}, {"text": "She wished she had tested it more carefully", "isCorrect": False}, {"text": "It had seemed worth testing at the time", "isCorrect": True}, {"text": "She was glad nobody saw what happened", "isCorrect": False}]}
        ],
        "inferential": [
            {"prompt": "Why do you think Anna decided to test the ice even though she knew she probably should not?", "clue": "Think about that feeling of wanting to know even when you know the risk.", "choices": [{"text": "She thought the warning signs were wrong", "isCorrect": False}, {"text": "She was too curious to resist — she had to see for herself", "isCorrect": True}, {"text": "She was in too much of a hurry to go around the puddle", "isCorrect": False}, {"text": "She did it to impress someone nearby", "isCorrect": False}]},
            {"prompt": "What does the last line — 'It had seemed worth testing at the time' — tell you about how Anna felt about what happened?", "clue": "She is not panicking or upset — think about the tone of those words.", "choices": [{"text": "She was very angry at herself for being careless", "isCorrect": False}, {"text": "She accepted the outcome with a bit of humor — she knew the risk and took it", "isCorrect": True}, {"text": "She was relieved nothing worse happened", "isCorrect": False}, {"text": "She was already planning to test the next puddle she found", "isCorrect": False}]},
            {"prompt": "Why did the puddle have ice on top but still have liquid water underneath?", "clue": "Think about how freezing works — does cold air freeze all the way down at once?", "choices": [{"text": "The puddle was too deep to freeze all the way through in one night", "isCorrect": True}, {"text": "The water underground was warm enough to keep the bottom liquid", "isCorrect": False}, {"text": "The puddle had been frozen solid but was starting to melt from the top", "isCorrect": False}, {"text": "Someone had poured warm water into it that morning", "isCorrect": False}]},
            {"prompt": "Why do you think Anna kept walking to school instead of going home to change her shoe?", "clue": "Think about how she responded to the whole situation.", "choices": [{"text": "She lived too far from school to turn back", "isCorrect": False}, {"text": "She did not realize her shoe was soaked through", "isCorrect": False}, {"text": "A wet shoe was not worth being late for school over", "isCorrect": True}, {"text": "She was embarrassed and did not want to go home", "isCorrect": False}]}
        ]
    }
},

"story-7": {
    "simple": {
        "literal": [
            {"prompt": "Who is the story about?", "clue": "A boy who goes outside.", "choices": [{"text": "Jake", "isCorrect": False}, {"text": "Sam", "isCorrect": False}, {"text": "Tom", "isCorrect": True}, {"text": "Max", "isCorrect": False}]},
            {"prompt": "Where did Tom sit outside?", "clue": "Near the front of the house.", "choices": [{"text": "In the grass", "isCorrect": False}, {"text": "On the steps", "isCorrect": True}, {"text": "Under the tree", "isCorrect": False}, {"text": "On a bench", "isCorrect": False}]},
            {"prompt": "When did this story happen?", "clue": "It was a specific season and time of day.", "choices": [{"text": "A cold morning in January", "isCorrect": False}, {"text": "A warm afternoon in late February", "isCorrect": True}, {"text": "A rainy day in March", "isCorrect": False}, {"text": "A snowy morning in December", "isCorrect": False}]},
            {"prompt": "What did Tom watch dripping off the roof?", "clue": "The warm air was making it melt.", "choices": [{"text": "Rain", "isCorrect": False}, {"text": "Leaves", "isCorrect": False}, {"text": "Snow", "isCorrect": True}, {"text": "Ice", "isCorrect": False}]},
            {"prompt": "How did the sun feel on Tom's face?", "clue": "The story says it felt a certain way.", "choices": [{"text": "Too hot", "isCorrect": False}, {"text": "Cold", "isCorrect": False}, {"text": "Good", "isCorrect": True}, {"text": "Nothing — he did not feel it", "isCorrect": False}]}
        ],
        "inferential": [
            {"prompt": "How do you think Tom felt sitting in the warm sunshine?", "clue": "He did not want to go back inside — what does that tell you?", "choices": [{"text": "Cold and uncomfortable", "isCorrect": False}, {"text": "Happy and relaxed", "isCorrect": True}, {"text": "Bored and restless", "isCorrect": False}, {"text": "Worried about something", "isCorrect": False}]},
            {"prompt": "Why do you think Tom did not want to go back inside?", "clue": "Think about what winter had been like before this warm day.", "choices": [{"text": "He was waiting for a friend", "isCorrect": False}, {"text": "The warmth felt so good after a long cold winter", "isCorrect": True}, {"text": "He had nothing to do inside", "isCorrect": False}, {"text": "His mom told him to stay outside", "isCorrect": False}]},
            {"prompt": "Why did Tom go outside without his coat?", "clue": "What was different about the weather that day?", "choices": [{"text": "He forgot it inside", "isCorrect": False}, {"text": "It was warm enough that he did not need one", "isCorrect": True}, {"text": "He lost his coat", "isCorrect": False}, {"text": "He wanted to feel the cold air", "isCorrect": False}]},
            {"prompt": "What does the snow dripping off the roof tell you about the weather?", "clue": "What makes snow melt?", "choices": [{"text": "It was raining outside", "isCorrect": False}, {"text": "The sun was causing the snow to melt", "isCorrect": True}, {"text": "The wind was blowing the snow off", "isCorrect": False}, {"text": "Someone was clearing the roof", "isCorrect": False}]}
        ]
    },
    "complex": {
        "literal": [
            {"prompt": "When did Tom step outside?", "clue": "The story tells you what part of the day it was.", "choices": [{"text": "Early in the morning", "isCorrect": False}, {"text": "After lunch", "isCorrect": True}, {"text": "Just before dinner", "isCorrect": False}, {"text": "Right when he woke up", "isCorrect": False}]},
            {"prompt": "What was dripping from the edge of the roof?", "clue": "It had been there all winter and was now letting go.", "choices": [{"text": "Rain from a storm", "isCorrect": False}, {"text": "Water from melting snow", "isCorrect": True}, {"text": "Melting ice from the gutters", "isCorrect": False}, {"text": "Water from a leaking pipe", "isCorrect": False}]},
            {"prompt": "Where did Tom sit while he listened to the sounds outside?", "clue": "It was near the entrance of his house.", "choices": [{"text": "On a bench in the yard", "isCorrect": False}, {"text": "Under the oak tree", "isCorrect": False}, {"text": "On the front steps", "isCorrect": True}, {"text": "At a picnic table", "isCorrect": False}]},
            {"prompt": "What kind of bird did Tom hear in the tree above him?", "clue": "It has a name that sounds like what it calls.", "choices": [{"text": "A robin", "isCorrect": False}, {"text": "A sparrow", "isCorrect": False}, {"text": "A chickadee", "isCorrect": True}, {"text": "A cardinal", "isCorrect": False}]},
            {"prompt": "What did Tom notice about the way the air smelled?", "clue": "He described it with two unusual things.", "choices": [{"text": "It smelled like fresh cut grass", "isCorrect": False}, {"text": "It smelled like wet dirt and something green trying to wake up", "isCorrect": True}, {"text": "It smelled like cold clean winter air", "isCorrect": False}, {"text": "It smelled like rain on a warm road", "isCorrect": False}]}
        ],
        "inferential": [
            {"prompt": "What does it mean that the day 'felt like a promise'?", "clue": "A promise is something that hints at what is coming. What might this day be hinting at?", "choices": [{"text": "Someone had promised Tom he could go outside that day", "isCorrect": False}, {"text": "The warm day felt like a sign that spring was on its way", "isCorrect": True}, {"text": "The weather promised to stay warm all week", "isCorrect": False}, {"text": "Tom was promised something if he stayed outside", "isCorrect": False}]},
            {"prompt": "Why do you think Tom stayed outside for so long, just sitting and doing nothing in particular?", "clue": "Think about what the weather had been like for the past few months.", "choices": [{"text": "He had no homework or chores to do", "isCorrect": False}, {"text": "After months of cold weather, the warmth felt too good to leave", "isCorrect": True}, {"text": "He was waiting to see if the chickadee would come closer", "isCorrect": False}, {"text": "He had fallen asleep on the steps", "isCorrect": False}]},
            {"prompt": "What does the last line — 'It was not quite spring, but it was not really winter anymore either' — tell you about how Tom felt?", "clue": "He is not quite one thing or another — like the season itself.", "choices": [{"text": "He was confused about what season it was", "isCorrect": False}, {"text": "He felt restless and ready for winter to be completely over", "isCorrect": False}, {"text": "He was suspended in a moment between seasons — peaceful and a little uncertain", "isCorrect": True}, {"text": "He was hoping it would snow again before spring came", "isCorrect": False}]},
            {"prompt": "Why did the air smell like 'wet dirt and something green trying to wake up'?", "clue": "Think about what happens underground when the soil starts to warm.", "choices": [{"text": "Someone had just dug up the garden nearby", "isCorrect": False}, {"text": "The sun was drying out puddles left from a rain", "isCorrect": False}, {"text": "The ground was warming and plants were starting to grow beneath the surface", "isCorrect": True}, {"text": "The smell came from the oak tree's bark warming in the sun", "isCorrect": False}]}
        ]
    }
},

"story-8": {
    "simple": {
        "literal": [
            {"prompt": "Who found the seed packet?", "clue": "A girl in the story.", "choices": [{"text": "Anna", "isCorrect": False}, {"text": "Lily", "isCorrect": False}, {"text": "Maria", "isCorrect": True}, {"text": "Maya", "isCorrect": False}]},
            {"prompt": "What did Maria put in the small cups?", "clue": "They need soil to grow.", "choices": [{"text": "Dirt and water", "isCorrect": False}, {"text": "Seeds and soil", "isCorrect": True}, {"text": "Flowers she picked", "isCorrect": False}, {"text": "Rocks and leaves", "isCorrect": False}]},
            {"prompt": "Where did Maria find the seed packet?", "clue": "A place to store things near the house.", "choices": [{"text": "In the kitchen", "isCorrect": False}, {"text": "Under her bed", "isCorrect": False}, {"text": "In the garage", "isCorrect": True}, {"text": "In the backyard", "isCorrect": False}]},
            {"prompt": "Where did Maria put the cups of seeds?", "clue": "A place with lots of sunlight.", "choices": [{"text": "In the closet", "isCorrect": False}, {"text": "On the kitchen table", "isCorrect": False}, {"text": "By the sunny window", "isCorrect": True}, {"text": "In the garage", "isCorrect": False}]},
            {"prompt": "Why couldn't Maria plant the seeds outside yet?", "clue": "Seeds need warm ground to grow.", "choices": [{"text": "She did not have a shovel", "isCorrect": False}, {"text": "The ground was still too cold", "isCorrect": True}, {"text": "It was raining too much", "isCorrect": False}, {"text": "Her mom said no", "isCorrect": False}]}
        ],
        "inferential": [
            {"prompt": "How do you think Maria felt about waiting for spring to plant her seeds?", "clue": "She found the seeds and wanted to plant them right away.", "choices": [{"text": "She was fine with waiting and was patient", "isCorrect": False}, {"text": "She was impatient and eager to get started", "isCorrect": True}, {"text": "She was not very interested in planting", "isCorrect": False}, {"text": "She was worried the seeds would never grow", "isCorrect": False}]},
            {"prompt": "How do you think Maria felt when she finished setting up her cups by the window?", "clue": "She had found a clever solution to a problem.", "choices": [{"text": "Confused about what to do next", "isCorrect": False}, {"text": "Proud and excited about her plan", "isCorrect": True}, {"text": "Worried the seeds would not grow indoors", "isCorrect": False}, {"text": "Bored because she had to wait", "isCorrect": False}]},
            {"prompt": "Why did Maria put the seeds near the sunny window?", "clue": "Think about what plants need to grow.", "choices": [{"text": "The window looked nice", "isCorrect": False}, {"text": "So the seeds could get sunlight to grow", "isCorrect": True}, {"text": "Her mom told her to", "isCorrect": False}, {"text": "She wanted to watch them from her chair", "isCorrect": False}]},
            {"prompt": "Why did Maria use cups instead of planting outside?", "clue": "What was the problem with the ground?", "choices": [{"text": "She did not have enough seeds for the whole yard", "isCorrect": False}, {"text": "She did not want to get muddy", "isCorrect": False}, {"text": "The ground was still too cold to plant anything", "isCorrect": True}, {"text": "Cups are better than ground for seeds", "isCorrect": False}]}
        ]
    },
    "complex": {
        "literal": [
            {"prompt": "What kind of seeds did Maria find in the garage?", "clue": "The packet had a picture on the front.", "choices": [{"text": "Tomato seeds from last summer", "isCorrect": False}, {"text": "Sunflower seeds from last summer", "isCorrect": True}, {"text": "Wildflower seeds from a store", "isCorrect": False}, {"text": "Vegetable seeds she had saved", "isCorrect": False}]},
            {"prompt": "Where did Maria put the seed cups?", "clue": "She chose the spot with the most light in the house.", "choices": [{"text": "On the windowsill in her bedroom", "isCorrect": False}, {"text": "On the sunniest windowsill in the kitchen", "isCorrect": True}, {"text": "On a shelf in the garage", "isCorrect": False}, {"text": "On the dining room table", "isCorrect": False}]},
            {"prompt": "How many seeds did Maria press into each cup?", "clue": "A small number.", "choices": [{"text": "One seed per cup", "isCorrect": False}, {"text": "Two seeds per cup", "isCorrect": True}, {"text": "Three seeds per cup", "isCorrect": False}, {"text": "As many as would fit", "isCorrect": False}]},
            {"prompt": "How did Maria's mom react when she saw the row of cups?", "clue": "She did not say anything — but her face showed her feeling.", "choices": [{"text": "She smiled and praised Maria's idea", "isCorrect": False}, {"text": "She raised an eyebrow — skeptical or surprised", "isCorrect": True}, {"text": "She did not notice them at all", "isCorrect": False}, {"text": "She told Maria it was a bad idea", "isCorrect": False}]},
            {"prompt": "When did Maria plan to move the seedlings outside?", "clue": "She was thinking ahead to when conditions would change.", "choices": [{"text": "Once they had their first leaves", "isCorrect": False}, {"text": "As soon as the snow melted", "isCorrect": False}, {"text": "By the time the ground was warm enough to plant in", "isCorrect": True}, {"text": "At the start of April, no matter what", "isCorrect": False}]}
        ],
        "inferential": [
            {"prompt": "Why do you think Maria was 'done waiting' for spring?", "clue": "She had been watching the snow melt for weeks.", "choices": [{"text": "She had a school project due on gardening", "isCorrect": False}, {"text": "She was impatient and wanted to act instead of just waiting", "isCorrect": True}, {"text": "She was worried the seeds would go bad if she waited longer", "isCorrect": False}, {"text": "Her mom had told her to start the seeds now", "isCorrect": False}]},
            {"prompt": "Why do you think Maria just shrugged when her mom raised an eyebrow?", "clue": "She did not try to explain or defend herself — she just shrugged.", "choices": [{"text": "She was not sure her plan would work", "isCorrect": False}, {"text": "She was confident in her plan and did not feel the need to explain it", "isCorrect": True}, {"text": "She did not notice her mom's reaction", "isCorrect": False}, {"text": "She was embarrassed about the cups and tried to hide her feelings", "isCorrect": False}]},
            {"prompt": "Why was the ground still too cold to plant even though the snow was melting?", "clue": "Think about how deep the cold goes in winter.", "choices": [{"text": "The ground gets colder every year in late February", "isCorrect": False}, {"text": "The ground freezes deep and takes much longer to warm than the air", "isCorrect": True}, {"text": "The melting snow was keeping the ground cold", "isCorrect": False}, {"text": "Maria was in a part of the country with very cold soil", "isCorrect": False}]},
            {"prompt": "What does Maria mean when she says her seedlings would 'already have a head start'?", "clue": "Think about a race — what does it mean to start before the others?", "choices": [{"text": "Her plants would grow faster than plants started from seed outdoors", "isCorrect": False}, {"text": "By starting indoors early, her plants would already be growing when she moved them outside", "isCorrect": True}, {"text": "She would plant them before any of her neighbors", "isCorrect": False}, {"text": "The seedlings would be stronger because of the indoor sunlight", "isCorrect": False}]}
        ]
    }
},

"story-9": {
    "simple": {
        "literal": [
            {"prompt": "Who is the story about?", "clue": "A boy who likes to skate.", "choices": [{"text": "Tom", "isCorrect": False}, {"text": "Jake", "isCorrect": False}, {"text": "Sam", "isCorrect": True}, {"text": "Max", "isCorrect": False}]},
            {"prompt": "Where was the pond?", "clue": "Sam walked there from home.", "choices": [{"text": "At a park far away", "isCorrect": False}, {"text": "Near Sam's house", "isCorrect": True}, {"text": "Behind the school", "isCorrect": False}, {"text": "In the woods", "isCorrect": False}]},
            {"prompt": "When Sam saw the sign, what did he do?", "clue": "He made the safe choice.", "choices": [{"text": "He went on the ice anyway", "isCorrect": False}, {"text": "He called his friends to come see", "isCorrect": False}, {"text": "He turned around and walked home", "isCorrect": True}, {"text": "He waited by the pond for a while", "isCorrect": False}]},
            {"prompt": "What did the sign at the pond say?", "clue": "It was a safety warning.", "choices": [{"text": "No Swimming", "isCorrect": False}, {"text": "Pond Closed", "isCorrect": False}, {"text": "Do Not Walk on Ice", "isCorrect": True}, {"text": "Thin Ice Today", "isCorrect": False}]},
            {"prompt": "What had Sam done at the pond all winter?", "clue": "It requires special boots with blades.", "choices": [{"text": "Fished in it", "isCorrect": False}, {"text": "Skated on the ice", "isCorrect": True}, {"text": "Walked around it", "isCorrect": False}, {"text": "Fed the ducks there", "isCorrect": False}]}
        ],
        "inferential": [
            {"prompt": "How do you think Sam felt when he saw the sign and knew he could not skate?", "clue": "He had been skating there all winter — it was his favorite activity.", "choices": [{"text": "Happy that the season was over", "isCorrect": False}, {"text": "Disappointed and sad that skating was done for the year", "isCorrect": True}, {"text": "Angry at whoever put the sign up", "isCorrect": False}, {"text": "Relieved he did not have to skate", "isCorrect": False}]},
            {"prompt": "Why do you think Sam looked at the pond for a long time before leaving?", "clue": "What did the pond mean to him?", "choices": [{"text": "He was checking if the ice was really dangerous", "isCorrect": False}, {"text": "He was sad to see his favorite winter activity ending", "isCorrect": True}, {"text": "He was looking for something he dropped on the ice", "isCorrect": False}, {"text": "He was waiting for a friend to show up", "isCorrect": False}]},
            {"prompt": "Why was the ice thin and cracked?", "clue": "What happens to ice when it gets warmer outside?", "choices": [{"text": "Too many people had skated on it", "isCorrect": False}, {"text": "The warming weather was melting the ice", "isCorrect": True}, {"text": "A boat broke it", "isCorrect": False}, {"text": "The fish ate it from below", "isCorrect": False}]},
            {"prompt": "What does it tell you about Sam that he followed the sign and went home?", "clue": "It was not easy — he loved skating there.", "choices": [{"text": "He was afraid of the water", "isCorrect": False}, {"text": "He was responsible and made a safe choice even though it was hard", "isCorrect": True}, {"text": "He did not really want to skate that day", "isCorrect": False}, {"text": "He planned to come back later when no one was watching", "isCorrect": False}]}
        ]
    },
    "complex": {
        "literal": [
            {"prompt": "How often had Sam skated at the pond during the winter?", "clue": "The story tells you how frequently he was there.", "choices": [{"text": "Every day after school", "isCorrect": False}, {"text": "Almost every weekend since December", "isCorrect": True}, {"text": "A few times in January", "isCorrect": False}, {"text": "Whenever his friends invited him", "isCorrect": False}]},
            {"prompt": "What did the ice look like when Sam arrived in late February?", "clue": "It was no longer white and smooth.", "choices": [{"text": "White and smooth like earlier in the season", "isCorrect": False}, {"text": "Blue and thick with skate marks", "isCorrect": False}, {"text": "Gray and glassy with thin cracks running from the edges", "isCorrect": True}, {"text": "Completely melted with only puddles", "isCorrect": False}]},
            {"prompt": "When Sam pressed his boot against the ice, what happened?", "clue": "The story describes it in an unusual, almost gentle way.", "choices": [{"text": "The ice was rock solid and did not move", "isCorrect": False}, {"text": "The ice cracked loudly under his boot", "isCorrect": False}, {"text": "The ice gave slightly, like it was sighing", "isCorrect": True}, {"text": "His boot slipped and he almost fell in", "isCorrect": False}]},
            {"prompt": "What did the sign zip-tied to the fence say?", "clue": "It was a direct warning.", "choices": [{"text": "Caution: Thin Ice", "isCorrect": False}, {"text": "No Skating Until Further Notice", "isCorrect": False}, {"text": "DO NOT WALK ON ICE", "isCorrect": True}, {"text": "Pond Closed for the Season", "isCorrect": False}]},
            {"prompt": "Where did Sam go after deciding not to skate?", "clue": "He had come all the way there only to turn around.", "choices": [{"text": "To a different skating rink", "isCorrect": False}, {"text": "To find his friends and tell them", "isCorrect": False}, {"text": "He turned and headed home", "isCorrect": True}, {"text": "He sat on a nearby bench", "isCorrect": False}]}
        ],
        "inferential": [
            {"prompt": "Why did the ice turn gray and glassy instead of staying smooth and white?", "clue": "Think about what happens to ice as it begins to weaken and melt.", "choices": [{"text": "Skaters had scraped off the white top layer all winter", "isCorrect": False}, {"text": "Warming temperatures were weakening the ice and changing its structure", "isCorrect": True}, {"text": "The sky was gray and reflecting onto the ice", "isCorrect": False}, {"text": "The dark pond water was showing through from below", "isCorrect": False}]},
            {"prompt": "Why do you think Sam stayed at the pond for a few extra minutes even after deciding not to skate?", "clue": "Think about what this place meant to him and what the last line says.", "choices": [{"text": "He was hoping the ice might look safer if he waited", "isCorrect": False}, {"text": "He was not ready to let go of something that had meant a lot to him all winter", "isCorrect": True}, {"text": "He wanted to make sure no one else tried to go on", "isCorrect": False}, {"text": "He was waiting to see if his friends would show up", "isCorrect": False}]},
            {"prompt": "What does the last line — 'The season was over' — tell you about how Sam felt?", "clue": "It is only four words. Think about how a very short, plain sentence can carry emotion.", "choices": [{"text": "Sam was relieved and ready to move on to spring", "isCorrect": False}, {"text": "Sam was stating a fact with no feeling behind it", "isCorrect": False}, {"text": "Sam felt a quiet sadness — winter skating was done and he would miss it", "isCorrect": True}, {"text": "Sam was angry that the ice had melted too soon", "isCorrect": False}]},
            {"prompt": "What does it mean that the ice 'gave slightly, like it was sighing'?", "clue": "Think about what that gentle movement — and that word 'sighing' — suggests.", "choices": [{"text": "The ice was perfectly safe but just barely", "isCorrect": False}, {"text": "The ice was weak and bending under pressure — it was no longer solid", "isCorrect": True}, {"text": "The wind was causing the ice to shift", "isCorrect": False}, {"text": "The ice was making a whistling sound", "isCorrect": False}]}
        ]
    }
},

"story-10": {
    "simple": {
        "literal": [
            {"prompt": "Who watched the rain fall?", "clue": "A girl in the story.", "choices": [{"text": "Mia", "isCorrect": False}, {"text": "Anna", "isCorrect": False}, {"text": "Maya", "isCorrect": True}, {"text": "Maria", "isCorrect": False}]},
            {"prompt": "Where was Maya when she watched the rain?", "clue": "She was outside but staying dry.", "choices": [{"text": "At her bedroom window", "isCorrect": False}, {"text": "In the backyard", "isCorrect": False}, {"text": "On the porch", "isCorrect": True}, {"text": "Under a tree", "isCorrect": False}]},
            {"prompt": "When did the warm rain happen?", "clue": "The story gives you a day and a month.", "choices": [{"text": "On a Sunday in January", "isCorrect": False}, {"text": "On a Tuesday in late February", "isCorrect": True}, {"text": "On a Friday in March", "isCorrect": False}, {"text": "On a Wednesday in early spring", "isCorrect": False}]},
            {"prompt": "What was different about this rain?", "clue": "It was not the usual winter rain.", "choices": [{"text": "It rained harder than usual", "isCorrect": False}, {"text": "It was mixed with snow", "isCorrect": False}, {"text": "It was warm, not cold", "isCorrect": True}, {"text": "It lasted all week", "isCorrect": False}]},
            {"prompt": "How did Maya feel when she watched the rain?", "clue": "The story says she did something with her face.", "choices": [{"text": "Sad", "isCorrect": False}, {"text": "Scared", "isCorrect": False}, {"text": "She smiled", "isCorrect": True}, {"text": "She cried", "isCorrect": False}]}
        ],
        "inferential": [
            {"prompt": "Why did Maya smile while watching the rain?", "clue": "The last sentence of the story tells you why.", "choices": [{"text": "She liked getting wet in the rain", "isCorrect": False}, {"text": "She knew spring was almost here", "isCorrect": True}, {"text": "She had no school that day", "isCorrect": False}, {"text": "She saw a rainbow forming", "isCorrect": False}]},
            {"prompt": "How do you think Maya felt about the warm rain coming?", "clue": "Warm rain in February meant something good was happening.", "choices": [{"text": "Worried it would flood the yard", "isCorrect": False}, {"text": "Happy and excited because spring was on its way", "isCorrect": True}, {"text": "She did not care about the rain", "isCorrect": False}, {"text": "She wished it was snowing instead", "isCorrect": False}]},
            {"prompt": "Why did the snow in the yard melt so fast?", "clue": "Two things were helping the snow disappear.", "choices": [{"text": "The wind blew the snow away", "isCorrect": False}, {"text": "Warm rain and rising temperatures were melting it", "isCorrect": True}, {"text": "Someone shoveled the yard", "isCorrect": False}, {"text": "The snow was already melting for weeks", "isCorrect": False}]},
            {"prompt": "Why did the puddles grow so big on the sidewalk?", "clue": "Where was all the water coming from?", "choices": [{"text": "It rained for three days straight", "isCorrect": False}, {"text": "The sidewalk had lots of low spots", "isCorrect": False}, {"text": "Both the rain and the melting snow were adding water", "isCorrect": True}, {"text": "A water pipe broke nearby", "isCorrect": False}]}
        ]
    },
    "complex": {
        "literal": [
            {"prompt": "How was this rain different from the cold, stinging kind that fell in January?", "clue": "The story compares the two kinds of rain directly.", "choices": [{"text": "This rain came with thunder and lightning", "isCorrect": False}, {"text": "This rain was warm — warm enough that Maya did not reach for her coat", "isCorrect": True}, {"text": "This rain was falling much harder than January rain", "isCorrect": False}, {"text": "This rain mixed with snow, unlike the January rain", "isCorrect": False}]},
            {"prompt": "What did Maya notice on the tips of the oak tree's branches?", "clue": "She had not seen these in months — they were very small.", "choices": [{"text": "Small birds sitting in a row", "isCorrect": False}, {"text": "Drops of rain hanging from the twigs", "isCorrect": False}, {"text": "Tiny swollen buds", "isCorrect": True}, {"text": "The first green leaves of the season", "isCorrect": False}]},
            {"prompt": "When did the warm rain start?", "clue": "The story tells you the exact day.", "choices": [{"text": "On a Monday", "isCorrect": False}, {"text": "On a Wednesday", "isCorrect": False}, {"text": "On a Tuesday", "isCorrect": True}, {"text": "On a Thursday", "isCorrect": False}]},
            {"prompt": "Where was Maya standing when she watched the rain and noticed the buds?", "clue": "She was outside but not getting wet.", "choices": [{"text": "In the backyard by the fence", "isCorrect": False}, {"text": "On the porch, leaning against the railing", "isCorrect": True}, {"text": "In the driveway under an umbrella", "isCorrect": False}, {"text": "At the kitchen window inside", "isCorrect": False}]},
            {"prompt": "What was happening to the snow in the yard during the warm rain?", "clue": "The story describes it in a specific way.", "choices": [{"text": "It was piling up against the fence", "isCorrect": False}, {"text": "It was barely melting because the rain was not that warm", "isCorrect": False}, {"text": "It was collapsing in on itself and spreading into wide shallow puddles", "isCorrect": True}, {"text": "It was turning to ice from the rain", "isCorrect": False}]}
        ],
        "inferential": [
            {"prompt": "Why do you think Maya pulled her sleeves over her hands instead of going inside to get a coat?", "clue": "Think about what she was in the middle of watching.", "choices": [{"text": "All her coats were wet from earlier", "isCorrect": False}, {"text": "She did not realize how cold she was", "isCorrect": False}, {"text": "She did not want to miss the moment by going inside", "isCorrect": True}, {"text": "She was planning to go in soon anyway", "isCorrect": False}]},
            {"prompt": "What does Maya's reaction to seeing the buds on the tree tell you about her?", "clue": "Most people would not have noticed tiny buds on a bare winter tree.", "choices": [{"text": "She studies trees for school", "isCorrect": False}, {"text": "She is the kind of person who notices small signs and pays close attention to the world around her", "isCorrect": True}, {"text": "She was specifically looking for buds on the tree that day", "isCorrect": False}, {"text": "She was excited because the buds meant her allergies would start soon", "isCorrect": False}]},
            {"prompt": "What does the last line — 'Winter was not gone, but it was leaving' — tell you about the moment Maya was experiencing?", "clue": "Neither winter nor spring — what is that in-between feeling like?", "choices": [{"text": "Winter was almost completely over and spring had already begun", "isCorrect": False}, {"text": "Maya was confused about the weather that day", "isCorrect": False}, {"text": "The season was in transition — something was ending and something was about to begin", "isCorrect": True}, {"text": "Maya was uncertain whether it would snow again", "isCorrect": False}]},
            {"prompt": "Why was the snow 'collapsing in on itself' instead of melting evenly from the top?", "clue": "Think about where the warmth was coming from — air above, or something else?", "choices": [{"text": "The rain was hitting it so hard it was breaking apart", "isCorrect": False}, {"text": "The snow was melting from below as the ground warmed, losing its structure", "isCorrect": True}, {"text": "The old heavy snow was too weak to hold its shape anymore", "isCorrect": False}, {"text": "The wind was pushing the snow piles over", "isCorrect": False}]}
        ]
    }
},

}  # end NEW_QUESTIONS

# ── Main script ──────────────────────────────────────────────────────────────

def main():
    # Read file
    with open(HTML_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # Make backup
    shutil.copy2(HTML_PATH, BACKUP_PATH)
    print(f"Backup created: {BACKUP_PATH}")

    # Find the stories array bounds
    start_marker = 'const stories = ['
    start_idx = content.find(start_marker) + len(start_marker) - 1  # points to [
    end_idx = content.find('\n];', start_idx) + 1  # points to ]

    if start_idx < 0 or end_idx <= start_idx:
        print("ERROR: Could not find 'const stories = [' in the file.")
        return

    json_str = content[start_idx:end_idx + 1]

    # Parse
    try:
        stories = json.loads(json_str)
    except json.JSONDecodeError as e:
        print(f"ERROR: Could not parse stories JSON: {e}")
        return

    print(f"Parsed {len(stories)} stories successfully.\n")

    # Apply replacements
    for story in stories:
        sid = story['id']
        if sid not in NEW_QUESTIONS:
            print(f"  SKIP {sid} — no new questions provided")
            continue

        replacements = NEW_QUESTIONS[sid]

        for version_key in ('simple', 'complex'):
            if version_key not in replacements:
                continue
            if version_key not in story['versions']:
                print(f"  WARNING: {sid} has no '{version_key}' version in the file")
                continue

            q_block = story['versions'][version_key]['questions']
            ver_replacements = replacements[version_key]

            for qtype in ('literal', 'inferential'):
                if qtype not in ver_replacements:
                    continue
                old_count = len(q_block.get(qtype, []))
                q_block[qtype] = ver_replacements[qtype]
                new_count = len(q_block[qtype])
                print(f"  {sid} | {version_key} | {qtype}: replaced {old_count} -> {new_count} questions")

    # Re-serialize
    new_json = json.dumps(stories, ensure_ascii=False, indent=4)

    # Reconstruct file content
    new_content = content[:start_idx] + new_json + content[end_idx + 1:]

    # Write back
    with open(HTML_PATH, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"\nFile written successfully: {HTML_PATH}")

    # Quick verification
    with open(HTML_PATH, 'r', encoding='utf-8') as f:
        verify_content = f.read()

    v_start = verify_content.find(start_marker) + len(start_marker) - 1
    v_end = verify_content.find('\n];', v_start) + 1
    v_json = verify_content[v_start:v_end + 1]
    verify_stories = json.loads(v_json)
    print(f"\nVerification: re-parsed {len(verify_stories)} stories from written file — OK")

    # Check story-1 literal count as sanity check
    s1_simple_lit = verify_stories[0]['versions']['simple']['questions']['literal']
    s1_complex_inf = verify_stories[0]['versions']['complex']['questions']['inferential']
    print(f"  story-1 simple literal count: {len(s1_simple_lit)} (expected 5)")
    print(f"  story-1 complex inferential count: {len(s1_complex_inf)} (expected 4)")

if __name__ == '__main__':
    main()
