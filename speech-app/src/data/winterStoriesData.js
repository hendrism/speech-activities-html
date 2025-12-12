export const winterStoriesData = [
    {
        title: "The Snowy Shortcut",
        image: "/images/winter_short_story_comprehension_progressive/story_1.png",
        alt: "A snowy path behind a library with a bench",
        text: [
            "Lena took a new path home after school because the usual sidewalk was blocked by a large pile of snow.",
            "The shortcut led behind the old library, where the wind was stronger and the ground was icy.",
            "Halfway through, she saw a small stray cat shivering under a bench. She stopped walking and tried to coax it toward her, unsure what to do next."
        ],
        literal: [
            {
                q: "Who is the main character?",
                correct: "Lena",
                wrong: ["Maya", "Weston", "Erin"],
                hint: "Look for the name at the start."
            },
            {
                q: "What was blocked by snow?",
                correct: "The sidewalk",
                wrong: ["The road", "The store", "The bus stop"],
                hint: "Think about what she normally walks on."
            },
            {
                q: "Where did the shortcut go?",
                correct: "Behind the old library",
                wrong: ["Behind a house", "Behind the school", "Behind a store"],
                hint: "It went behind a building."
            },
            {
                q: "What animal did Lena see?",
                correct: "A cat",
                wrong: ["A dog", "A squirrel", "A rabbit"],
                hint: "It was shivering under a bench."
            },
            {
                q: "Why might the cat be shivering?",
                correct: "It was cold outside",
                wrong: ["It was hungry", "It was tired from running", "It liked to shake"],
                hint: "Think about the weather."
            }
        ],
        inferential: [
            {
                q: "Why did Lena take the shortcut?",
                correct: "Her usual way was blocked",
                wrong: ["She wanted to see the library", "She was chasing the cat", "She liked the wind"],
                hint: "Think about the pile of snow."
            },
            {
                q: "How did the shortcut feel compared to the sidewalk?",
                correct: "Colder and icier",
                wrong: ["Warmer", "Safer", "Crowded"],
                hint: "Check the description of the wind and ground."
            },
            {
                q: "Why did she stop for the cat?",
                correct: "She was concerned for it",
                wrong: ["She was afraid of it", "She wanted to take a picture", "She needed a rest"],
                hint: "Think about why she tried to coax it."
            }
        ],
        retell: [
            { prompt: "Who was the main character?", hint: "Look for the name at the start.", slot: "character", choices: ["Lena", "Maya", "Weston", "Erin"] },
            { prompt: "What did they want?", hint: "Think about where she was going.", slot: "want", choices: ["To walk home safely", "To buy a book", "To find a cat", "To play in snow"] },
            { prompt: "What was the problem?", hint: "Something was under the bench.", slot: "problem", choices: ["She found a shivering stray cat in the cold", "She got lost", "She fell on ice", "The library was closed"] },
            { prompt: "What did they do to solve the problem?", hint: "She tried to help.", slot: "solution", choices: ["She stopped and tried to coax the cat to her", "She walked away fast", "She yelled at the cat", "She called the police but left"] },
            { prompt: "What was the end result?", hint: "She wasn't sure yet.", slot: "result", choices: ["She stood there unsure of what to do next", "She took the cat home immediately", "She left the cat alone", "The cat ran away"] }
        ],
        definitions: [
            { word: "shortcut", clue: "A quicker way to go.", context: "Lena took a new shortcut home.", choices: ["A faster path", "A long trip", "A slow walk"] },
            { word: "stray", clue: "An animal with no home.", context: "She saw a small stray cat.", choices: ["Homeless animal", "Pet dog", "Wild bear"] },
            { word: "coax", clue: "To gently persuade.", context: "Tried to coax it toward her.", choices: ["Gently call", "Scare away", "Ignore"] }
        ]
    },
    {
        title: "The Frozen Window Pattern",
        image: "/images/winter_short_story_comprehension_progressive/story_2.png",
        alt: "Frost shapes on a bedroom window",
        text: [
            "Jamal woke up and saw strange patterns on his bedroom window. The frost made shapes that looked like trees and mountains.",
            "He pressed his hand to the glass and wondered if the shapes meant the weather was getting colder.",
            "His mom called him downstairs to help warm the car before school, but he kept thinking about the designs."
        ],
        literal: [
            { q: "Who saw the frost patterns?", correct: "Jamal", wrong: ["Eli", "Rowan", "Mateo"], hint: "Look for the name at the beginning." },
            { q: "What did Jamal see on his window?", correct: "Frost patterns", wrong: ["Rain drops", "Stickers", "Dirt"], hint: "It looked like trees and mountains." },
            { q: "Where was Jamal when he saw the shapes?", correct: "His bedroom", wrong: ["The kitchen", "The bus", "The library"], hint: "Think of a room in a house." },
            { q: "Why might the frost make shapes?", correct: "Ice forms in patterns", wrong: ["Someone drew on it", "It was painted", "Jamal scratched it"], hint: "Cold air can freeze water on glass." },
            { q: "How might Jamal feel when he sees the shapes?", correct: "Curious", wrong: ["Angry", "Bored", "Scared of noise"], hint: "Think about seeing something surprising." }
        ],
        inferential: [
            { q: "Why did he touch the glass?", correct: "To feel if it was cold or check the frost", wrong: ["To break it", "To clean it", "To close it"], hint: "He was wondering about the weather." },
            { q: "Why did his mom call him?", correct: "To help start the car", wrong: ["To eat breakfast", "To go to bed", "To watch TV"], hint: "It was a cold morning before school." },
            { q: "Why might the car need warming?", correct: "It is freezing outside", wrong: ["It is broken", "It is old", "It has no gas"], hint: "Winter mornings affect cars." }
        ],
        retell: [
            { prompt: "Who was the main character?", hint: "Look for the boy's name.", slot: "character", choices: ["Jamal", "Eli", "Rowan", "Mateo"] },
            { prompt: "What did they want?", hint: "Think about the frosty window.", slot: "want", choices: ["Know what the frost shapes meant", "Go back to sleep", "Open the window wide", "Find a lost toy"] },
            { prompt: "What was the problem?", hint: "He had a question about the weather.", slot: "problem", choices: ["He did not know why the frost was there", "He forgot his lunch", "The window was broken", "He could not find his shoes"] },
            { prompt: "What did they do to solve the problem?", hint: "He tried to check the cold glass.", slot: "solution", choices: ["He touched the window and kept thinking while going to warm the car", "He yelled at the frost", "He wiped the whole window clean", "He ignored the frost"] },
            { prompt: "What was the end result?", hint: "Think about what he did after seeing the shapes.", slot: "result", choices: ["He went to help warm the car and still wondered about the designs", "He forgot all about the patterns", "He stayed home from school", "He broke the glass"] }
        ],
        synonyms: [
            { word: "patterns", clue: "Repeating designs.", context: "Jamal saw strange patterns.", choices: ["designs", "sounds", "smells"] },
            { word: "wondered", clue: "Had a question.", context: "He wondered if the shapes meant cold.", choices: ["thought", "yelled", "ran"] },
            { word: "strange", clue: "Not usual.", context: "Saw strange patterns.", choices: ["unusual", "normal", "boring"] }
        ]
    },
    {
        title: "The Light in the Woods",
        image: "/images/winter_short_story_comprehension_progressive/story_3.png",
        alt: "A glowing lantern under snowy trees",
        text: [
            "During a quiet walk in the woods, Mira noticed a soft blue light shining under the snow near a fallen log.",
            "She brushed the snow away and found a tiny lantern someone must have dropped. She wanted to return it, but she was not sure who it belonged to.",
            "She picked it up and headed toward the trail sign in case someone came looking."
        ],
        literal: [
            { q: "Who found the lantern?", correct: "Mira", wrong: ["Aria", "Tasha", "Lena"], hint: "Look for the girl's name." },
            { q: "What did Mira find under the snow?", correct: "A small lantern", wrong: ["A book", "A hat", "A map"], hint: "It gave off light." },
            { q: "Where was Mira walking?", correct: "In the woods", wrong: ["In a classroom", "In her kitchen", "In the store"], hint: "Think of a outdoor place with trees." },
            { q: "What covered the lantern at first?", correct: "Snow", wrong: ["Leaves", "Water", "Mud"], hint: "It is cold and white." },
            { q: "When did Mira plan to look for the owner?", correct: "When she walked to the trail sign", wrong: ["When she got home", "When school ended", "When she reached the store"], hint: "She headed toward something that helps people find their way." }
        ],
        inferential: [
            { q: "Why might someone have dropped the lantern?", correct: "They lost it while walking", wrong: ["They threw it for fun", "They did not like it", "It was broken on purpose"], hint: "Think of the woods." },
            { q: "How might Mira feel about finding it?", correct: "Surprised", wrong: ["Angry", "Worried about homework", "Sleepy"], hint: "Think of finding something unexpected." },
            { q: "Why does she take the lantern with her?", correct: "To find the owner", wrong: ["To play with it", "To hide it", "To sell it"], hint: "She wants to return it." },
            { q: "What problem does she face?", correct: "She does not know who owns it", wrong: ["She does not like the woods", "She forgot her phone", "She is too tired to walk"], hint: "She does not know something important." },
            { q: "Why might the light be special?", correct: "It stayed bright even in the cold", wrong: ["It was a toy", "It made loud sounds", "It changed colors every second"], hint: "It was glowing under snow." }
        ],
        future: [
            { q: "What will Mira probably do when she reaches the trail sign?", correct: "She will wait near the sign to see if someone comes looking", wrong: ["She will bury the lantern again", "She will throw the lantern into the air", "She will forget about the lantern and run home"], hint: "She wants to give the lantern back." },
            { q: "If no one comes for the lantern, what might Mira do next?", correct: "She will bring it to a park worker or another adult", wrong: ["She will leave it in the snow forever", "She will smash it on a rock", "She will toss it in a river"], hint: "Think about who else could keep it safe." }
        ],
        retell: [
            { prompt: "Who was the main character?", hint: "Look for the girl who found the light.", slot: "character", choices: ["Mira", "Aria", "Tasha", "Lena"] },
            { prompt: "What did they want?", hint: "Think about the lantern.", slot: "want", choices: ["Return the tiny lantern to its owner", "Hide the lantern", "Throw the lantern away", "Sell the lantern"] },
            { prompt: "What was the problem?", hint: "She was not sure about something important.", slot: "problem", choices: ["She did not know who owned it", "She was late for lunch", "She lost her shoes", "She forgot the trail map"] },
            { prompt: "What did they do to solve the problem?", hint: "She moved toward a place with signs.", slot: "solution", choices: ["She picked it up and walked to the trail sign to find the owner", "She buried it in the snow", "She left it on the log", "She threw it in the air"] },
            { prompt: "What was the end result?", hint: "Think about what she hoped would happen next.", slot: "result", choices: ["She carried the lantern, hoping someone would come for it", "She forgot about the lantern", "She broke the lantern", "She dropped the lantern back in the snow"] }
        ],
        definitions: [
            { word: "lantern", clue: "A light you can carry.", context: "Found a tiny lantern.", choices: ["A light to hold", "A shovel", "A toy car"] },
            { word: "glowing", clue: "It gives off a soft light.", context: "A soft blue light glowing.", choices: ["Shining softly", "Burning hot", "Dark"] },
            { word: "trail", clue: "An outside path.", context: "Headed toward the trail sign.", choices: ["Path", "Road", "River"] }
        ]
    },
    {
        title: "The Skating Lesson",
        image: "/images/winter_short_story_comprehension_progressive/story_4.png",
        alt: "Two people ice skating at an outdoor rink",
        text: [
            "Eli agreed to help his younger cousin learn how to ice skate at the outdoor rink. The ice was a little bumpy from last night's snow, and they both slipped a few times.",
            "Eli tried to stay patient and showed his cousin how to glide instead of stepping.",
            "His cousin held tightly to his coat, afraid of falling again."
        ],
        literal: [
            { q: "Who is helping his cousin skate?", correct: "Eli", wrong: ["Jamal", "Rowan", "Weston"], hint: "Look for the older boy's name." },
            { q: "What are they trying to do?", correct: "Learn to skate", wrong: ["Do homework", "Build a snowman", "Ride bikes"], hint: "Think of the ice." },
            { q: "Where are they practicing?", correct: "At an outdoor rink", wrong: ["At school", "In a gym", "In the backyard"], hint: "It is outside." },
            { q: "What made the ice harder to skate on?", correct: "It was bumpy", wrong: ["It was colorful", "It was warm", "It was dry"], hint: "Snow fell last night." },
            { q: "What does the cousin hold onto?", correct: "Eli's coat", wrong: ["A tree", "A bench", "A rope"], hint: "He is scared of falling." }
        ],
        inferential: [
            { q: "Why might the cousin be nervous?", correct: "He does not want to fall", wrong: ["He wants a snack", "He is cold", "He lost his phone"], hint: "Think of ice." },
            { q: "How is Eli showing patience?", correct: "Teaching calmly", wrong: ["Yelling loudly", "Skating away", "Sitting down"], hint: "He is helping step-by-step." },
            { q: "Why do they slip sometimes?", correct: "The ice is uneven", wrong: ["Their shoes are too big", "The rink is too warm", "They are running"], hint: "Think about the condition of the ice." },
            { q: "How might the cousin feel when Eli helps him?", correct: "Safe", wrong: ["Angry", "Confused", "Silly"], hint: "Think of someone helping you." },
            { q: "Why are they practicing at the rink instead of somewhere else?", correct: "The rink has ice to skate on", wrong: ["It is close to a store", "It has warm benches", "It is the only place open"], hint: "Ice is needed." }
        ],
        future: [
            { q: "What will Eli keep doing to help his cousin skate?", correct: "He will keep guiding him to glide smoothly and stay patient", wrong: ["He will stop helping and play video games", "He will make the ice bumpier on purpose", "He will push his cousin so he falls"], hint: "Think about how he was teaching." },
            { q: "After some practice, what might his cousin be able to do?", correct: "He will skate with more balance on his own", wrong: ["He will forget how to stand", "He will fly off the rink", "He will never step on ice again"], hint: "Think about improving on the ice." }
        ],
        retell: [
            { prompt: "Who was the main character?", hint: "He was the older helper.", slot: "character", choices: ["Eli", "Jamal", "Rowan", "Weston"] },
            { prompt: "What did they want?", hint: "Think about the ice lesson.", slot: "want", choices: ["Help his cousin learn to skate", "Buy skates at a store", "Watch a movie", "Build a snow fort"] },
            { prompt: "What was the problem?", hint: "The ice did not make it easy.", slot: "problem", choices: ["The ice was bumpy and his cousin kept slipping", "They had no helmets", "They were hungry", "They had no music"] },
            { prompt: "What did they do to solve the problem?", hint: "He showed how to move feet smoothly.", slot: "solution", choices: ["He stayed patient and showed how to glide", "He stopped the lesson", "He left the rink", "He told his cousin to skate alone"] },
            { prompt: "What was the end result?", hint: "Think about the cousin's next step.", slot: "result", choices: ["His cousin held his coat and kept trying to skate", "His cousin quit right away", "They went home angry", "They took off their skates forever"] }
        ],
        definitions: [
            { word: "glide", clue: "Move smoothly.", context: "Showed how to glide.", choices: ["Move smooth", "Jump", "Stop"] },
            { word: "bumpy", clue: "Not smooth.", context: "Ice was bumpy.", choices: ["Uneven", "Flat", "Soft"] },
            { word: "patient", clue: "Calm while waiting.", context: "Tried to stay patient.", choices: ["Calm", "Angry", "Fast"] }
        ]
    },
    {
        title: "The Missing Mittens",
        image: "/images/winter_short_story_comprehension_progressive/story_5.png",
        alt: "A student locker with winter mittens missing",
        text: [
            "Aria opened her locker before recess and realized her mittens were gone. She needed them because the class planned to build snow shelters outside.",
            "She checked under her books and in her backpack, but they were not there. Her friend Weston suggested looking in the lost and found before the class went out."
        ],
        literal: [
            { q: "Who lost her mittens?", correct: "Aria", wrong: ["Mira", "Erin", "Tasha"], hint: "Look for her name." },
            { q: "What were the students planning to build?", correct: "Snow shelters", wrong: ["Snowmen", "Snowballs", "Snow forts in a video game"], hint: "They go outside in the snow." },
            { q: "Where did Aria look first?", correct: "Her locker", wrong: ["The office", "The gym", "The bus"], hint: "A place where school things go." },
            { q: "Who gave her an idea?", correct: "Weston", wrong: ["Eli", "Jamal", "Rowan"], hint: "Look for a friend in the story." },
            { q: "When did Aria notice the mittens were gone?", correct: "Before recess", wrong: ["After school", "At breakfast", "At night"], hint: "Think about before recess." }
        ],
        inferential: [
            { q: "Why does Aria need the mittens?", correct: "To stay warm outside", wrong: ["To play video games", "To clean her locker", "To write a story"], hint: "Think about the cold activity." },
            { q: "How might Aria feel when she cannot find them?", correct: "Worried", wrong: ["Excited", "Bored", "Proud"], hint: "Think of losing something you need." },
            { q: "Why might the mittens be in the lost and found?", correct: "Someone picked them up", wrong: ["She put them there on purpose", "The teacher hid them", "They melted"], hint: "Think of things people misplace." },
            { q: "How is Weston helping her?", correct: "Suggesting where to look", wrong: ["Taking her mittens", "Telling her to go home", "Hiding things"], hint: "He gives her an idea." },
            { q: "Why might it be important for Aria to solve the problem quickly?", correct: "Recess is starting soon", wrong: ["She wants to nap", "She wants to read a book", "She wants to take the bus"], hint: "Think about recess coming soon." }
        ],
        future: [
            { q: "What will Aria likely do before recess starts?", correct: "She will go to the lost and found to look for her mittens", wrong: ["She will decide not to play outside at all", "She will throw away her coat", "She will ask to skip recess forever"], hint: "Think about Weston's idea." },
            { q: "If she finds her mittens, what will she do outside?", correct: "She will wear them while building the snow shelters", wrong: ["She will keep them in her desk and stay indoors", "She will trade them for candy", "She will bury them in the snow"], hint: "Remember the class plan for recess." }
        ],
        retell: [
            { prompt: "Who was the main character?", hint: "Look for the student who lost something.", slot: "character", choices: ["Aria", "Mira", "Erin", "Tasha"] },
            { prompt: "What did they want?", hint: "Think about recess plans.", slot: "want", choices: ["Find her mittens for the snow shelter activity", "Get a new backpack", "Skip recess", "Hide in the classroom"] },
            { prompt: "What was the problem?", hint: "She could not find something warm.", slot: "problem", choices: ["Her mittens were missing from her locker", "Her coat was too big", "The bell was broken", "The snow melted"] },
            { prompt: "What did they do to solve the problem?", hint: "She searched and listened to a friend's idea.", slot: "solution", choices: ["She checked her locker and backpack and planned to look in the lost and found with Weston", "She stayed at her desk", "She asked the teacher to cancel recess", "She went outside without any mittens"] },
            { prompt: "What was the end result?", hint: "Think about the next place she would go.", slot: "result", choices: ["She got ready to go to the lost and found before recess", "She forgot about the mittens", "She found them in the gym", "She went home instead of to recess"] }
        ],
        synonyms: [
            { word: "realized", clue: "Understood suddenly.", context: "Aria realized her mittens were gone.", choices: ["understood", "forgot", "hid"] },
            { word: "checked", clue: "Looked at carefully.", context: "She checked under her books.", choices: ["looked", "slept", "broke"] },
            { word: "missing", clue: "Lost.", context: "Mittens were missing.", choices: ["lost", "clean", "new"] }
        ]
    },
    {
        title: "The Quiet Bus Ride",
        image: "/images/winter_short_story_comprehension_progressive/story_6.png",
        alt: "A school bus driving on snowy roads",
        text: [
            "The school bus moved slowly on the snowy roads. Most students were silent, watching the tall piles of snow pass by.",
            "Maya noticed the driver looked tired from concentrating so much. She decided to sit still and avoid talking so the bus stayed calm. She hoped everyone would get home safely."
        ],
        literal: [
            { q: "Who is watching the driver carefully?", correct: "Maya", wrong: ["Aria", "Mira", "Tasha"], hint: "A girl on the bus." },
            { q: "What vehicle are they riding in?", correct: "A school bus", wrong: ["A car", "A train", "A bike"], hint: "It carries many students." },
            { q: "Where are the students looking?", correct: "Out the windows", wrong: ["At the ceiling", "At the driver's chair", "Under the seats"], hint: "Think of winter weather outside." },
            { q: "What is outside the bus?", correct: "Tall piles of snow", wrong: ["A swimming pool", "A playground", "A park in summer"], hint: "Think of winter." },
            { q: "When do the students ride the bus?", correct: "During a school day", wrong: ["At midnight", "During a field trip", "After dinner"], hint: "Think of going home or to school." }
        ],
        inferential: [
            { q: "Why might the driver look tired?", correct: "Driving in snow is hard", wrong: ["He did not eat lunch", "He wants to watch TV", "He is sleepy from reading"], hint: "Think of hard winter driving." },
            { q: "How might Maya feel seeing the driver so focused?", correct: "Respectful and calm", wrong: ["Angry", "Bored", "Wild and silly"], hint: "Think of wanting to help." },
            { q: "Why does Maya stay quiet?", correct: "To help keep the bus calm", wrong: ["To hide from someone", "To take a nap", "To look for her homework"], hint: "She wants the ride to stay safe." },
            { q: "Why might the bus be moving slowly?", correct: "Snow makes the roads slippery", wrong: ["The driver likes slow music", "The bus is almost broken", "The bus is too full"], hint: "Think of the road conditions." },
            { q: "How could loud talking affect the driver?", correct: "It could distract him", wrong: ["It could help him focus", "It could clean the windows", "It could warm up the bus"], hint: "Think about distractions." }
        ],
        future: [
            { q: "What will Maya keep doing during the snowy bus ride?", correct: "She will stay quiet and still so the driver can focus", wrong: ["She will start shouting songs", "She will stand up and dance", "She will tell jokes loudly to everyone"], hint: "She wanted the bus to stay calm." },
            { q: "When the bus reaches the students' stops, what will probably happen?", correct: "Everyone will get off safely because the ride stayed calm", wrong: ["The bus will drive past everyone on purpose", "No one will be allowed to leave", "The students will start a snowball fight inside the bus"], hint: "Think about the goal of a careful ride." }
        ],
        retell: [
            { prompt: "Who was the main character?", hint: "Look for the student watching the driver.", slot: "character", choices: ["Maya", "Aria", "Mira", "Tasha"] },
            { prompt: "What did they want?", hint: "Think about the bus ride.", slot: "want", choices: ["Keep the bus calm and safe on the snowy ride", "Make the bus go faster", "Tell jokes to everyone", "Open all the windows"] },
            { prompt: "What was the problem?", hint: "The weather made riding tricky.", slot: "problem", choices: ["The snowy roads made the driver tired and busy", "The bus had no seats", "The lights were too bright", "The heater was too loud"] },
            { prompt: "What did they do to solve the problem?", hint: "She tried to help by what she did with her voice and body.", slot: "solution", choices: ["She sat still and stayed quiet to help", "She sang loudly", "She asked to drive the bus", "She jumped in the aisle"] },
            { prompt: "What was the end result?", hint: "Think about the bus mood after she decided to be calm.", slot: "result", choices: ["The bus stayed quiet while she hoped everyone got home safely", "The bus became wild and loud", "Everyone got off the bus right away", "She left the bus in the snow"] }
        ],
        synonyms: [
            { word: "quiet", clue: "Very still or silent.", context: "Most students were silent.", choices: ["silent", "noisy", "crowded"] },
            { word: "noticed", clue: "Saw.", context: "Maya noticed the driver.", choices: ["saw", "ignored", "dropped"] },
            { word: "calm", clue: "Relaxed and steady.", context: "So the bus stayed calm.", choices: ["relaxed", "upset", "loud"] }
        ]
    },
    {
        title: "The Warm Coat Exchange",
        image: "/images/winter_short_story_comprehension_progressive/story_7.png",
        alt: "Kids trading winter coats at a community center",
        text: [
            "At the community center, kids were trading winter items that no longer fit them. Mateo brought a coat that was too small and hoped to find a better one.",
            "He spotted a thick red coat on the rack, but another boy reached for it at the same time. They both paused, unsure who should take it."
        ],
        literal: [
            { q: "Who is trying to find a new coat?", correct: "Mateo", wrong: ["Eli", "Rowan", "Jamal"], hint: "Look for the boy's name." },
            { q: "What kind of place are they in?", correct: "A community center", wrong: ["A movie theater", "A bus", "A diner"], hint: "It is open to the public." },
            { q: "What color is the coat both boys reach for?", correct: "Red", wrong: ["Green", "Blue", "Black"], hint: "A bright color." },
            { q: "What are kids doing at the event?", correct: "Trading winter items", wrong: ["Buying snacks", "Playing games", "Singing songs"], hint: "They bring clothing that does not fit." },
            { q: "When do Mateo and the other boy pause?", correct: "When they both grab the coat", wrong: ["When the lights turn off", "When the teacher calls them", "When music starts"], hint: "They both reach at the same time." }
        ],
        inferential: [
            { q: "Why do they both pause?", correct: "They are unsure who should take it", wrong: ["They want to argue", "They do not like the coat", "The coat is too heavy"], hint: "Think of reaching at the same time." },
            { q: "How might Mateo feel about this moment?", correct: "Unsure or shy", wrong: ["Angry at everyone", "Sleepy", "Excited to leave"], hint: "He wanted the coat." },
            { q: "Why might a coat trade be helpful?", correct: "Kids grow and need new sizes", wrong: ["It makes coats taste better", "It helps with homework", "It makes kids taller"], hint: "Clothes get too small." },
            { q: "Why might the other boy want the same coat?", correct: "It fits him well", wrong: ["He wants to collect coats", "He wants to prank someone", "He wants to sell it"], hint: "Think about winter needs." },
            { q: "What could Mateo do next?", correct: "Talk with the boy to decide", wrong: ["Grab the coat fast", "Walk away angry", "Hide the coat"], hint: "Think of sharing or talking." }
        ],
        future: [
            { q: "What will Mateo and the other boy likely do after they pause?", correct: "They will talk it out and decide who should take the red coat", wrong: ["They will both rip the coat apart", "They will throw the coat outside in the snow", "They will leave without any coats"], hint: "Think about solving the coat choice together." },
            { q: "If the red coat does not fit Mateo, what will he probably do?", correct: "He will look for another coat that fits at the exchange", wrong: ["He will give up on getting any coat", "He will wear his too-small coat forever", "He will stop coming to the center"], hint: "He still needs a warmer coat." }
        ],
        retell: [
            { prompt: "Who was the main character?", hint: "He brought a too-small coat.", slot: "character", choices: ["Mateo", "Eli", "Rowan", "Jamal"] },
            { prompt: "What did they want?", hint: "Think about why he came to the exchange.", slot: "want", choices: ["Find a warm coat that fit", "Buy a hat", "Get candy", "Play a video game"] },
            { prompt: "What was the problem?", hint: "Someone else wanted the same coat.", slot: "problem", choices: ["Another boy reached for the same red coat", "The coats were all wet", "The room was closed", "No one else was there"] },
            { prompt: "What did they do to solve the problem?", hint: "They paused together.", slot: "solution", choices: ["They both paused to talk and decide who should take it", "Mateo grabbed the coat and ran", "They left the coat on the floor", "Mateo went home angry"] },
            { prompt: "What was the end result?", hint: "Think about choosing fairly.", slot: "result", choices: ["They could decide together so someone got the coat", "No one ever got a coat", "The coat disappeared", "They stopped being polite"] }
        ],
        definitions: [
            { word: "exchange", clue: "Trade with someone.", context: "Kids were at a coat exchange.", choices: ["Trade items", "Break items", "Hide items"] },
            { word: "fit", clue: "The right size.", context: "Hoped to find one that would fit.", choices: ["The size that works", "Too heavy", "For parties"] },
            { word: "paused", clue: "Stopped for a short time.", context: "They both paused.", choices: ["Stopped briefly", "Ran fast", "Dropped something"] }
        ]
    },
    {
        title: "The Frozen Pond Discovery",
        image: "/images/winter_short_story_comprehension_progressive/story_8.png",
        alt: "Two kids standing on a frozen pond",
        text: [
            "When the pond froze over, two friends, Tasha and Erin, walked across the surface near the shallow end. Light snow fell as they moved carefully.",
            "They spotted something dark under the ice. At first they thought it was a branch, but then they realized it was an old fishing net someone left behind. They wondered if they should try to pull it out or leave it for an adult."
        ],
        literal: [
            { q: "Who is walking on the frozen pond?", correct: "Tasha and Erin", wrong: ["Mira and Aria", "Lena and Eli", "Rowan and Mateo"], hint: "Two friends." },
            { q: "What do they see under the ice?", correct: "A fishing net", wrong: ["A fish", "A phone", "A toy"], hint: "Not a branch after all." },
            { q: "Where are they walking?", correct: "On a frozen pond", wrong: ["On a sidewalk", "In the cafeteria", "On a roof"], hint: "Solid water." },
            { q: "What is falling during their walk?", correct: "Light snow", wrong: ["Heavy rain", "Leaves", "Dust"], hint: "It is winter." },
            { q: "When do they try to figure out what to do?", correct: "After noticing the net", wrong: ["Before walking outside", "After going home", "Before eating lunch"], hint: "After seeing the object." }
        ],
        inferential: [
            { q: "Why might the net be under the ice?", correct: "Someone left it there", wrong: ["It grew from the ice", "It fell from a tree", "It is a toy"], hint: "Think of fishing." },
            { q: "How might the girls feel when they see it?", correct: "Curious", wrong: ["Angry", "Sleepy", "Hungry"], hint: "Something surprising." },
            { q: "Why do they wonder whether to pull it out?", correct: "They do not know if it is safe", wrong: ["They want to hurt the ice", "They want to play a game", "They want to race"], hint: "Think about safety." },
            { q: "How might the shallow part help them?", correct: "It may be safer to stand on", wrong: ["It makes the ice melt faster", "It makes them run faster", "It keeps things hidden"], hint: "Not deep water." },
            { q: "Why might an adult need to help?", correct: "To safely remove the net", wrong: ["To take pictures", "To build a snowman", "To teach a math lesson"], hint: "Adults handle tricky situations." }
        ],
        future: [
            { q: "What will Tasha and Erin probably do about the net?", correct: "They will ask an adult to help decide what to do", wrong: ["They will jump on the ice without thinking", "They will forget about the net forever", "They will push each other toward it"], hint: "They were thinking about safety." },
            { q: "If an adult says it's safe to move the net, what might they do next?", correct: "They will carefully pull it out together near the shallow end", wrong: ["They will kick the ice until it breaks apart", "They will leave the net frozen for years", "They will throw snowballs at the net for fun"], hint: "Think about removing it carefully." }
        ],
        retell: [
            { prompt: "Who was the main character?", hint: "Two friends on the ice.", slot: "character", choices: ["Tasha and Erin", "Mira and Aria", "Lena and Eli", "Rowan and Mateo"] },
            { prompt: "What did they want?", hint: "Think about their walk on the frozen pond.", slot: "want", choices: ["Explore the frozen pond safely", "Swim in the pond", "Ride bikes on the ice", "Build a house there"] },
            { prompt: "What was the problem?", hint: "They saw something under the ice.", slot: "problem", choices: ["They found an old net under the ice and were not sure if it was safe to move", "The ice was melting fast", "They dropped their skates", "It started to rain hard"] },
            { prompt: "What did they do to solve the problem?", hint: "They thought about who should help.", slot: "solution", choices: ["They thought about asking an adult before pulling it out", "They jumped on the net", "They ignored the net", "They ran home right away without thinking"] },
            { prompt: "What was the end result?", hint: "Think about their next safe step.", slot: "result", choices: ["They planned to ask an adult for help", "They left the pond forever", "They kept the net secret", "They used the net as a game"] }
        ],
        definitions: [
            { word: "shallow", clue: "Not deep.", context: "Near the shallow end.", choices: ["Not deep", "Very deep", "Hard to see"] },
            { word: "visible", clue: "It is not hidden.", context: "Something dark, barely visible.", choices: ["Able to be seen", "Hidden", "Gone"] },
            { word: "realized", clue: "Suddenly understand.", context: "They realized it was a net.", choices: ["Understood", "Forgot", "Missed"] }
        ]
    },
    {
        title: "The Storm at Lunch",
        image: "/images/winter_short_story_comprehension_progressive/story_9.png",
        alt: "Students at lunch hearing about a snowstorm",
        text: [
            "During lunch, the school announced that a sudden snowstorm was coming. Students were told they might have to leave early.",
            "Rowan felt excited at first, but then worried because his younger sister needed to be picked up from her school. He checked his phone to see if his parents had texted."
        ],
        literal: [
            { q: "Who is worried about his sister?", correct: "Rowan", wrong: ["Eli", "Jamal", "Weston"], hint: "Look for the boy's name." },
            { q: "What did the school announce?", correct: "A sudden snowstorm", wrong: ["A new club", "A field trip", "A fire drill"], hint: "Something about weather." },
            { q: "Where is Rowan when he hears the news?", correct: "The cafeteria", wrong: ["The bus", "The gym", "The office"], hint: "Students eat there." },
            { q: "What does Rowan check?", correct: "His phone", wrong: ["A clock", "A book", "A map"], hint: "A device." },
            { q: "When might students go home?", correct: "Early", wrong: ["Late at night", "On Saturday", "During summer"], hint: "Think about the storm." }
        ],
        inferential: [
            { q: "Why might Rowan feel mixed emotions?", correct: "He likes early dismissal but worries about his sister", wrong: ["He wants more homework", "He is bored of lunch", "He wants a new phone"], hint: "Storms can be fun and stressful." },
            { q: "Why does he check his phone?", correct: "To see if his parents texted", wrong: ["To play a game", "To take a picture", "To change the time"], hint: "Think of family plans." },
            { q: "What problem is Rowan thinking about?", correct: "Who will pick her up", wrong: ["What to eat", "Which book to read", "How to draw snow"], hint: "His sister." },
            { q: "How might other students feel?", correct: "Excited or nervous", wrong: ["Hungry", "Sleepy", "Angry at Rowan"], hint: "Snow changes plans." },
            { q: "Why does the school tell them early?", correct: "To keep everyone safe", wrong: ["To make lunch shorter", "To clean the building", "To start a movie"], hint: "Safety." }
        ],
        future: [
            { q: "What will the school probably do because of the snowstorm?", correct: "It will send students home early if needed", wrong: ["It will keep everyone overnight for fun", "It will cancel lunch forever", "It will make students walk home during the storm"], hint: "Think about the early dismissal announcement." },
            { q: "After checking his phone, what might Rowan do next?", correct: "He will contact his parents or wait for their plan about his sister", wrong: ["He will throw his phone away", "He will start a snowball fight", "He will forget about his sister completely"], hint: "He wants his sister to be safe." }
        ],
        retell: [
            { prompt: "Who was the main character?", hint: "He worried about his sister.", slot: "character", choices: ["Rowan", "Eli", "Jamal", "Weston"] },
            { prompt: "What did they want?", hint: "Think about his younger sister.", slot: "want", choices: ["Make sure his sister was picked up during the storm", "Eat lunch faster", "Join a new club", "Build a snow fort"] },
            { prompt: "What was the problem?", hint: "Weather changed the school day.", slot: "problem", choices: ["A sudden snowstorm might send students home early", "The lunch line was long", "The power went out", "No one had homework"] },
            { prompt: "What did they do to solve the problem?", hint: "He used his phone.", slot: "solution", choices: ["He checked his phone for a message from his parents", "He shouted for help", "He left school without telling anyone", "He ignored the storm"] },
            { prompt: "What was the end result?", hint: "Think about what he waited for.", slot: "result", choices: ["He waited for his parents' plan so his sister would be safe", "He stopped worrying", "He forgot he had a sister", "He missed the bus on purpose"] }
        ],
        definitions: [
            { word: "announced", clue: "Said to everyone.", context: "School announced a storm.", choices: ["Told everyone", "Whispered", "Quiet"] },
            { word: "sudden", clue: "Happens quickly.", context: "A sudden snowstorm.", choices: ["Happens fast", "Slow", "At night"] },
            { word: "concern", clue: "Something you worry about.", context: "Rowan's main concern.", choices: ["A worry", "A surprise", "A joke"] }
        ]
    },
    {
        title: "The Snow Sculpture Surprise",
        image: "/images/winter_short_story_comprehension_progressive/story_10.png",
        alt: "Kids building a snow sculpture in a park",
        text: [
            "In the park, a group of friends worked on a snow sculpture for a winter contest. They planned to make a tall polar bear, but halfway through the snow started crumbling.",
            "One friend suggested switching the design to a short penguin instead. Everyone agreed and quickly changed their plan."
        ],
        literal: [
            { q: "Who is making the snow sculpture?", correct: "A group of friends", wrong: ["One teacher", "Two strangers", "One student alone"], hint: "More than one person." },
            { q: "What were they making first?", correct: "A polar bear", wrong: ["A penguin", "A dog", "A snow fox"], hint: "A tall animal." },
            { q: "What was happening to the sculpture?", correct: "It was crumbling", wrong: ["It was growing", "It was melting fast", "It was changing color"], hint: "It was falling apart." },
            { q: "What new shape did they choose?", correct: "A penguin", wrong: ["A moose", "A fish", "A rabbit"], hint: "A short animal." },
            { q: "Where are they building it?", correct: "The park", wrong: ["The classroom", "The gym", "A hallway"], hint: "A public outdoor place." }
        ],
        inferential: [
            { q: "Why might the bear shape be hard to build?", correct: "It was too tall", wrong: ["It was too hot", "It was too colorful", "It was too loud"], hint: "Think about size." },
            { q: "How might the group feel about changing plans?", correct: "Okay with trying something new", wrong: ["Angry and yelling", "Tired of snow", "Ready to go home immediately"], hint: "Think of teamwork." },
            { q: "Why does the penguin work better?", correct: "It is smaller and easier to shape", wrong: ["It makes noise", "It floats", "It melts slower"], hint: "Think of size again." },
            { q: "What does this show about the group?", correct: "They can solve problems", wrong: ["They argue all the time", "They do not like snow", "They never finish anything"], hint: "Think about working together." },
            { q: "How might the sculpture look when finished?", correct: "Short and smooth", wrong: ["Tall and scary", "Bright red", "Covered in leaves"], hint: "Think of a penguin made of snow." }
        ],
        future: [
            { q: "After changing the design, what will the friends do next?", correct: "They will build the shorter penguin together", wrong: ["They will quit building anything", "They will forget the contest completely", "They will turn the snow into soup"], hint: "Think about the new plan." },
            { q: "If the penguin turns out sturdy, what will they do for the contest?", correct: "They will enter the penguin sculpture in the winter contest", wrong: ["They will break it before judging", "They will hide it so no one sees", "They will pretend they never built it"], hint: "They still want to take part." }
        ],
        retell: [
            { prompt: "Who was the main character?", hint: "Think of the team working together.", slot: "character", choices: ["A group of friends", "One teacher", "Two strangers", "One student alone"] },
            { prompt: "What did they want?", hint: "Think about the contest idea.", slot: "want", choices: ["Build a tall polar bear snow sculpture for the contest", "Have a snowball fight", "Take a long nap", "Go to the movies"] },
            { prompt: "What was the problem?", hint: "Something was happening to the bear shape.", slot: "problem", choices: ["The snow bear started crumbling", "There was no snow", "They forgot their tools", "They had no time to meet"] },
            { prompt: "What did they do to solve the problem?", hint: "They chose a new idea.", slot: "solution", choices: ["They switched to a short penguin design", "They stopped building anything", "They left the park", "They yelled at each other"] },
            { prompt: "What was the end result?", hint: "Think about the team's choice after changing the plan.", slot: "result", choices: ["They all agreed and kept building the new penguin", "They gave up and went home", "They knocked down the penguin", "They changed to a new plan every minute"] }
        ],
        definitions: [
            { word: "sculpture", clue: "A shape someone makes.", context: "Worked on a snow sculpture.", choices: ["A built shape", "A snack", "A hill"] },
            { word: "crumbling", clue: "Breaking apart.", context: "Snow started crumbling.", choices: ["Breaking pieces", "Growing", "Floating"] },
            { word: "agreed", clue: "Thought the same thing.", context: "Everyone agreed.", choices: ["Decided together", "Argued", "Didn't listen"] }
        ]
    }
];
