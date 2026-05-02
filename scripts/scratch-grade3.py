import json

stories_file = 'data/stories.json'

with open(stories_file, 'r', encoding='utf-8') as f:
    stories_data = json.load(f)

new_activity = {
    "_meta": {
        "title": "Spring Informational Texts (Intermediate)",
        "displayMode": "tabs",
        "level": "medium",
        "tags": ["spring", "reading", "science", "nature", "intermediate"]
    },
    "stories": [
        {
            "id": 1,
            "title": "The Butterfly's Change",
            "text": "In early spring, a tiny caterpillar hatches from its egg. First, it eats its own shell to get energy, and then it starts munching on leaves. It eats all day to grow big and strong. After a few weeks, the caterpillar hangs from a branch and forms a hard shell called a chrysalis. Inside, an amazing change happens! After about two weeks, the shell opens, and a beautiful butterfly comes out. It waits for the sun to dry its wet wings before flying away to find sweet nectar in flowers.",
            "questions": [
                {
                    "type": "multiple-choice",
                    "text": "What does the caterpillar eat right after it hatches?",
                    "options": [
                        "Sweet flower nectar",
                        "Its own eggshell",
                        "A small green leaf"
                    ],
                    "answer": 1
                },
                {
                    "type": "multiple-choice",
                    "text": "What is the hard shell called?",
                    "options": [
                        "A branch",
                        "A chrysalis",
                        "An egg"
                    ],
                    "answer": 1
                },
                {
                    "type": "multiple-choice",
                    "text": "How long does the caterpillar stay in its shell?",
                    "options": [
                        "One day",
                        "Three months",
                        "About two weeks"
                    ],
                    "answer": 2
                },
                {
                    "type": "multiple-choice",
                    "text": "What must the butterfly do before it flies away?",
                    "options": [
                        "Build a nest",
                        "Let the sun dry its wings",
                        "Eat more leaves"
                    ],
                    "answer": 1
                },
                {
                    "type": "multiple-choice",
                    "text": "What does the butterfly look for when it finally flies?",
                    "options": [
                        "Sweet nectar",
                        "Another caterpillar",
                        "A big, shady tree"
                    ],
                    "answer": 0
                }
            ],
            "imageUrl": "/images/spring-info-texts-images/caterpillar.png"
        },
        {
            "id": 2,
            "title": "How a Seed Grows",
            "text": "When spring warm weather arrives, seeds buried in the dirt wake up from their winter sleep. To start growing, a seed needs three things: water from spring rain, warm soil, and air. First, the seed drinks up the water, which makes its outer coat crack open. A tiny root pushes down into the soil to hold the plant steady and find more water. Next, a small green shoot pushes up toward the sky. Once it breaks through the dirt, it grows its first leaves to catch the sunlight and make food for the plant.",
            "questions": [
                {
                    "type": "multiple-choice",
                    "text": "What makes the seed's coat crack open?",
                    "options": [
                        "Bright sunlight",
                        "Drinking up water",
                        "Strong spring wind"
                    ],
                    "answer": 1
                },
                {
                    "type": "multiple-choice",
                    "text": "What does the root do?",
                    "options": [
                        "Holds the plant steady and finds water",
                        "Catches sunlight to make food",
                        "Turns into a flower"
                    ],
                    "answer": 0
                },
                {
                    "type": "multiple-choice",
                    "text": "What pushes up toward the sky?",
                    "options": [
                        "A tiny root",
                        "A small green shoot",
                        "A cracked seed coat"
                    ],
                    "answer": 1
                },
                {
                    "type": "multiple-choice",
                    "text": "Why does the plant need leaves?",
                    "options": [
                        "To hide from bugs",
                        "To keep the roots warm",
                        "To catch sunlight and make food"
                    ],
                    "answer": 2
                },
                {
                    "type": "multiple-choice",
                    "text": "What three things does a seed need to grow?",
                    "options": [
                        "Water, warm soil, and air",
                        "Bugs, leaves, and rocks",
                        "Snow, ice, and dark clouds"
                    ],
                    "answer": 0
                }
            ],
            "imageUrl": "/images/spring-info-texts-images/plant_grow.png"
        },
        {
            "id": 3,
            "title": "Building a Nest",
            "text": "In the spring, birds use their amazing skills to build nests for their eggs. Mother birds look everywhere for good materials. They gather twigs, soft grass, animal fur, and even sticky spider webs! To keep the nest strong against the wind, some birds use mud to stick everything together like glue. They always put the softest materials, like feathers or fur, on the inside. This makes a cozy, warm bed to keep their fragile eggs safe until the baby birds are ready to hatch.",
            "questions": [
                {
                    "type": "multiple-choice",
                    "text": "What is the main reason birds build nests?",
                    "options": [
                        "To have a place to eat bugs",
                        "To keep their fragile eggs safe",
                        "To hide from the rain"
                    ],
                    "answer": 1
                },
                {
                    "type": "multiple-choice",
                    "text": "What do some birds use to stick the nest together like glue?",
                    "options": [
                        "Mud",
                        "Tree leaves",
                        "Pebbles"
                    ],
                    "answer": 0
                },
                {
                    "type": "multiple-choice",
                    "text": "Where do birds put the softest materials?",
                    "options": [
                        "On the outside to look pretty",
                        "On the bottom to make it heavy",
                        "On the inside to make a warm bed"
                    ],
                    "answer": 2
                },
                {
                    "type": "multiple-choice",
                    "text": "Which of these is NOT used to make the nest soft?",
                    "options": [
                        "Animal fur",
                        "Twigs",
                        "Feathers"
                    ],
                    "answer": 1
                },
                {
                    "type": "multiple-choice",
                    "text": "When do birds usually build their nests?",
                    "options": [
                        "In the cold winter",
                        "In the spring",
                        "At the end of summer"
                    ],
                    "answer": 1
                }
            ],
            "imageUrl": "/images/spring-info-texts-images/bird-nest.png"
        },
        {
            "id": 4,
            "title": "From Tadpole to Frog",
            "text": "When the winter snow melts, puddles and ponds fill with water. Female frogs lay thousands of jelly-like eggs in these pools. In about a week, the eggs hatch into tiny tadpoles. At first, tadpoles swim like fish using their long tails, and they breathe perfectly underwater. Over the next few weeks, something wonderful happens. The tadpole grows strong back legs, and then small front legs. Its tail gets shorter and shorter until it disappears! Finally, it grows lungs so it can breathe air, and it jumps out of the water as a frog.",
            "questions": [
                {
                    "type": "multiple-choice",
                    "text": "Where do female frogs lay their eggs?",
                    "options": [
                        "Under dry rocks",
                        "In puddles and ponds",
                        "In tall grass"
                    ],
                    "answer": 1
                },
                {
                    "type": "multiple-choice",
                    "text": "How does a tadpole swim at first?",
                    "options": [
                        "By pushing with its strong back legs",
                        "By using a long tail like a fish",
                        "By floating on a lily pad"
                    ],
                    "answer": 1
                },
                {
                    "type": "multiple-choice",
                    "text": "Which legs does the tadpole grow first?",
                    "options": [
                        "Back legs",
                        "Front legs",
                        "Both at the same time"
                    ],
                    "answer": 0
                },
                {
                    "type": "multiple-choice",
                    "text": "What happens to the tadpole's tail as it grows?",
                    "options": [
                        "It turns into a third leg",
                        "It gets very long and colorful",
                        "It gets shorter until it disappears"
                    ],
                    "answer": 2
                },
                {
                    "type": "multiple-choice",
                    "text": "How does the adult frog breathe on land?",
                    "options": [
                        "It uses gills",
                        "It breathes perfectly underwater",
                        "It uses lungs to breathe air"
                    ],
                    "answer": 2
                }
            ],
            "imageUrl": "/images/spring-info-texts-images/frog-life-cycle.png"
        },
        {
            "id": 5,
            "title": "The Blooming Flower",
            "text": "As the spring days get longer and warmer, plants get ready to bloom. First, a small, tight bud grows on the end of a plant's stem. Small green leaves wrap around the outside of the bud to protect it like a snug jacket. Inside the bud, colorful petals are slowly growing bigger. When the weather is just right, the green leaves peel back, and the beautiful flower opens up! The bright colors aren't just for looking pretty. They are meant to act like bright signs, telling bees and butterflies to come visit for sweet nectar.",
            "questions": [
                {
                    "type": "multiple-choice",
                    "text": "What grows on the end of the stem first?",
                    "options": [
                        "A full flower",
                        "A small, tight bud",
                        "A long root"
                    ],
                    "answer": 1
                },
                {
                    "type": "multiple-choice",
                    "text": "What protects the bud like a snug jacket?",
                    "options": [
                        "Small green leaves",
                        "Bright colorful petals",
                        "Sticky mud"
                    ],
                    "answer": 0
                },
                {
                    "type": "multiple-choice",
                    "text": "What is slowly growing inside the bud?",
                    "options": [
                        "Tiny bugs",
                        "More seeds",
                        "Colorful petals"
                    ],
                    "answer": 2
                },
                {
                    "type": "multiple-choice",
                    "text": "Why do flowers have bright colors?",
                    "options": [
                        "To hide in the grass",
                        "To act like bright signs for bees and butterflies",
                        "To stay warm in the wind"
                    ],
                    "answer": 1
                },
                {
                    "type": "multiple-choice",
                    "text": "What do the bees and butterflies want from the flower?",
                    "options": [
                        "Sweet nectar",
                        "Green leaves",
                        "A place to sleep"
                    ],
                    "answer": 0
                }
            ],
            "imageUrl": "/images/spring-info-texts-images/flower_bloom.png"
        },
        {
            "id": 6,
            "title": "Busy Spring Bees",
            "text": "Honeybees have a very important job in the spring! Every day, worker bees fly out of their hive to look for blooming flowers. They visit the flowers to drink sweet, sugary nectar for energy. While a bee is drinking, fine yellow dust called pollen sticks to its fuzzy body. When the bee flies to the next flower, some of that pollen rubs off. This accidental drop of pollen helps the flower make seeds and grow new fruit. Without busy bees carrying pollen from plant to plant, we wouldn't have many of the fruits we love to eat!",
            "questions": [
                {
                    "type": "multiple-choice",
                    "text": "What are the bees looking for when they leave the hive?",
                    "options": [
                        "Blooming flowers",
                        "A new tree",
                        "Other bugs to eat"
                    ],
                    "answer": 0
                },
                {
                    "type": "multiple-choice",
                    "text": "Why do the bees visit the flowers?",
                    "options": [
                        "To drink sweet, sugary nectar",
                        "To hide from birds",
                        "To build a new home"
                    ],
                    "answer": 0
                },
                {
                    "type": "multiple-choice",
                    "text": "What is the fine yellow dust called?",
                    "options": [
                        "Nectar",
                        "Pollen",
                        "Honey"
                    ],
                    "answer": 1
                },
                {
                    "type": "multiple-choice",
                    "text": "How does the pollen get from one flower to another?",
                    "options": [
                        "The wind blows it perfectly",
                        "It sticks to the bee's fuzzy body and rubs off",
                        "The flower throws it"
                    ],
                    "answer": 1
                },
                {
                    "type": "multiple-choice",
                    "text": "What happens because the bee drops the pollen?",
                    "options": [
                        "The flower dies instantly",
                        "The bee gets sick",
                        "The flower can make seeds and grow fruit"
                    ],
                    "answer": 2
                }
            ],
            "imageUrl": "/images/spring-info-texts-images/bee-flowers.png"
        },
        {
            "id": 7,
            "title": "Spring Showers and the Water Cycle",
            "text": "Spring is famous for its rainy days, but all that water is very helpful! When the sun heats up lakes and rivers, the water turns into invisible vapor and floats up into the sky. High up where the air is cool, the water vapor clumps together to form fluffy clouds. When a cloud gets too heavy with water droplets, gravity pulls the water down as rain. These spring showers soak deep into the dirt, giving thirsty tree roots a big drink. The rain also fills up ponds where animals live. Soon, the sun will come out and the cycle will start all over again!",
            "questions": [
                {
                    "type": "multiple-choice",
                    "text": "What happens when the sun heats up lakes and rivers?",
                    "options": [
                        "The water freezes into ice",
                        "The water disappears forever",
                        "The water turns into invisible vapor"
                    ],
                    "answer": 2
                },
                {
                    "type": "multiple-choice",
                    "text": "Why do clouds form?",
                    "options": [
                        "Water vapor clumps together in cool air",
                        "Birds carry water into the sky",
                        "Smoke rises from the ground"
                    ],
                    "answer": 0
                },
                {
                    "type": "multiple-choice",
                    "text": "What causes the rain to fall from a cloud?",
                    "options": [
                        "Wind blows it out",
                        "The cloud gets too heavy with water droplets",
                        "The sun pushes the water down"
                    ],
                    "answer": 1
                },
                {
                    "type": "multiple-choice",
                    "text": "How does the spring rain help trees?",
                    "options": [
                        "It washes dust off the bark",
                        "It forces bugs to move away",
                        "It soaks the dirt to give thirsty roots a drink"
                    ],
                    "answer": 2
                },
                {
                    "type": "multiple-choice",
                    "text": "What happens after the rain stops and the sun comes out?",
                    "options": [
                        "The cycle starts all over again",
                        "The clouds never return",
                        "All the ponds dry up quickly"
                    ],
                    "answer": 0
                }
            ],
            "imageUrl": "/images/spring-info-texts-images/rainy-day.png"
        },
        {
            "id": 8,
            "title": "Trees Wake Up in Spring",
            "text": "All winter long, certain trees stand bare, without a single leaf on their branches. We call them deciduous trees, and they take a long nap during the cold months. When the spring sun warms the air and the days get longer, the trees finally wake up! The tree's roots pull water up from the ground and push it into the empty branches. Tiny, tightly packed buds that were hiding on the branches suddenly swell and burst open. Fresh green leaves unroll and reach out for the sunlight. The leaves use the sunlight to make food for the whole tree so it can keep growing.",
            "questions": [
                {
                    "type": "multiple-choice",
                    "text": "What do we call trees that lose their leaves in winter?",
                    "options": [
                        "Evergreen trees",
                        "Deciduous trees",
                        "Spring trees"
                    ],
                    "answer": 1
                },
                {
                    "type": "multiple-choice",
                    "text": "What tells the tree it is time to wake up?",
                    "options": [
                        "Heavy winter snow",
                        "Loud birds in the branches",
                        "Warm air and longer days"
                    ],
                    "answer": 2
                },
                {
                    "type": "multiple-choice",
                    "text": "What do the tree's roots do in the spring?",
                    "options": [
                        "Pull water up from the ground",
                        "Change color to green",
                        "Grow leaves underground"
                    ],
                    "answer": 0
                },
                {
                    "type": "multiple-choice",
                    "text": "Where do the fresh green leaves come from?",
                    "options": [
                        "They fall from the sky",
                        "Tiny buds that burst open",
                        "The roots carry them up"
                    ],
                    "answer": 1
                },
                {
                    "type": "multiple-choice",
                    "text": "Why does the tree need leaves?",
                    "options": [
                        "To use sunlight to make food",
                        "To look pretty for birds",
                        "To keep the branches warm"
                    ],
                    "answer": 0
                }
            ],
            "imageUrl": "/images/spring-info-texts-images/tree-leaves.png"
        },
        {
            "id": 9,
            "title": "The Helpful Ladybug",
            "text": "When spring plants grow soft new leaves, tiny green bugs called aphids love to eat them. Aphids can ruin a whole garden quickly! Luckily, the ladybug is here to save the day. A ladybug is a small beetle with a bright red shell and black spots. To humans, ladybugs look cute, but to an aphid, they are a scary monster! Even ladybug babies, which look like tiny spikes, have huge appetites. A single ladybug can munch on hundreds of aphids every single day. Because they eat so many pests, gardeners are always thrilled to see ladybugs in the spring.",
            "questions": [
                {
                    "type": "multiple-choice",
                    "text": "Why are aphids bad for gardens?",
                    "options": [
                        "They sting gardeners",
                        "They eat soft new leaves",
                        "They dig holes in the dirt"
                    ],
                    "answer": 1
                },
                {
                    "type": "multiple-choice",
                    "text": "What is a ladybug?",
                    "options": [
                        "A small beetle with spots",
                        "A type of harmful aphid",
                        "A tiny green frog"
                    ],
                    "answer": 0
                },
                {
                    "type": "multiple-choice",
                    "text": "How do ladybugs help gardeners?",
                    "options": [
                        "They carry water to the roots",
                        "They plant new seeds",
                        "They eat hundreds of aphids"
                    ],
                    "answer": 2
                },
                {
                    "type": "multiple-choice",
                    "text": "What does a ladybug look like to an aphid?",
                    "options": [
                        "A scary monster",
                        "A tasty leaf",
                        "A cute friend"
                    ],
                    "answer": 0
                },
                {
                    "type": "multiple-choice",
                    "text": "What do ladybug babies look like?",
                    "options": [
                        "Little red beetles",
                        "Tiny spikes",
                        "Small white flowers"
                    ],
                    "answer": 1
                }
            ],
            "imageUrl": "/images/spring-info-texts-images/ladybug.png"
        }
    ]
}

stories_data['spring-informational-texts-advanced'] = new_activity

with open(stories_file, 'w', encoding='utf-8') as f:
    json.dump(stories_data, f, indent=2, ensure_ascii=False)

print("Successfully updated stories.json")
