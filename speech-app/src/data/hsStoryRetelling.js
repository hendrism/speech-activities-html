export const hsStoryRetellingData = [
    {
        title: "Lunchroom Tournament",
        text: [
            "Jayden asked the assistant principal if he could run a quick chess tournament in the cafeteria at lunch. He only had fifteen minutes, so he put students into pairs and gave them five minutes per game. When he saw Miguel standing alone by the windows, Jayden stopped the tournament to ask if Miguel wanted to be his partner. They lost in the first round, but everyone in that corner of the cafeteria cheered because Miguel finally joined in instead of just watching."
        ],
        snapshot: {
            characters: "Jayden, Miguel, and the students at the lunch tournament.",
            setting: "School cafeteria during lunch break.",
            kickoff: "Jayden set up a quick chess tournament at lunch.",
            challenge: "Miguel stayed by himself even though Jayden wanted him to join.",
            solution: "Jayden stopped the tournament to ask Miguel to be his partner.",
            result: "They didn't win, but Miguel felt included and everyone cheered for him."
        },
        retellSteps: [
            {
                label: "First",
                prompt: "Explain how Jayden turned lunch into a chess tournament.",
                help: {
                    clue: "Think about what he organized and the time limits he set.",
                    words: ["tournament", "pairs", "five-minute", "timed"],
                    model: "Jayden organized students into pairs for a quick five-minute chess tournament."
                }
            },
            {
                label: "Next",
                prompt: "What problem did Jayden notice while students signed up?",
                help: {
                    clue: "Focus on where Miguel was standing and what he was doing.",
                    words: ["Miguel", "sidelines", "windows", "hanging back"],
                    model: "He saw Miguel hanging back near the windows, just watching the signup."
                }
            },
            {
                label: "Then",
                prompt: "Describe how Jayden responded to that problem.",
                help: {
                    clue: "What did Jayden stop doing, and who did he speak to?",
                    words: ["paused", "invited", "doubles partner", "asked"],
                    model: "Jayden paused the bracket and invited Miguel to be his doubles partner."
                }
            },
            {
                label: "Finally",
                prompt: "What was the result for Jayden and Miguel?",
                help: {
                    clue: "Did they win, and how did everyone react?",
                    words: ["lost first round", "cheered", "included", "group"],
                    model: "They lost in the first round, but everyone cheered because Miguel finally joined in."
                }
            }
        ],
        questions: [
            {
                q: "Why did Jayden set a five-minute time limit for each game?",
                correct: "He only had fifteen minutes at lunch, so quick games made sure everyone could participate.",
                wrong: []
            },
            {
                q: "How did Miguel feel at the end of lunch?",
                correct: "He felt included because the crowd cheered when he played with Jayden.",
                wrong: []
            }
        ]
    },
    {
        title: "Slideshow Save",
        text: [
            "Lila said she would test the photography club's slideshow before their parent showcase. Ten minutes before it started, the newest file crashed when she clicked play and everyone groaned. Instead of freaking out, Lila opened the backup folder, found yesterday's file, and used that one instead. The slideshow worked, and the club decided to start by having Lila explain how she fixed the problem."
        ],
        snapshot: {
            characters: "Lila and the photography club members.",
            setting: "School media center before the parent showcase.",
            kickoff: "Lila tested the slideshow to make sure it worked.",
            challenge: "The newest file crashed when she clicked play.",
            solution: "She found yesterday's backup file and used that one.",
            result: "The slideshow worked, and Lila explained how she fixed it."
        },
        retellSteps: [
            {
                label: "First",
                prompt: "What job did Lila take on before the showcase?",
                help: {
                    clue: "Think about what she promised the photography club.",
                    words: ["volunteered", "test", "slideshow", "presentation"],
                    model: "She volunteered to test the slideshow presentation before the showcase."
                }
            },
            {
                label: "Next",
                prompt: "What went wrong right before the event?",
                help: {
                    clue: "Focus on the file and what happened when she clicked play.",
                    words: ["file version", "crashed", "clicked play", "groaned"],
                    model: "The newest file version crashed when she clicked play and everyone groaned."
                }
            },
            {
                label: "Then",
                prompt: "Explain how Lila fixed the problem.",
                help: {
                    clue: "She looked in a different folder for an older file.",
                    words: ["backup folder", "yesterday's version", "loaded", "found"],
                    model: "Lila opened the backup folder and loaded yesterday's version instead."
                }
            },
            {
                label: "Finally",
                prompt: "What happened once the slideshow worked?",
                help: {
                    clue: "How did the showcase begin?",
                    words: ["worked", "started", "explaining", "solved"],
                    model: "The slideshow worked and the club started with Lila explaining her fix."
                }
            }
        ],
        questions: [
            {
                q: "Why did Lila use yesterday's version of the file?",
                correct: "The newest version was broken, so she used an older backup that still worked.",
                wrong: []
            },
            {
                q: "How did the club use Lila's solution during the showcase?",
                correct: "They opened the event with Lila explaining how she solved the problem under pressure.",
                wrong: []
            }
        ]
    },
    {
        title: "Playlist Power Strategy",
        text: [
            "Coach Ramirez told Malik to run practice laps without slowing down, but Malik kept losing focus halfway through. He remembered his workout playlist had three parts, each with a different speed. On the next lap, Malik hummed the songs in order to keep his pace, and his teammates noticed and asked how he did it. Coach timed them and smiled because they beat their usual time by thirty seconds."
        ],
        snapshot: {
            characters: "Malik, Coach Ramirez, and the track team.",
            setting: "School track during practice.",
            kickoff: "Coach asked Malik to run steady laps.",
            challenge: "Malik lost focus halfway through each lap.",
            solution: "He hummed his workout playlist to keep his pace.",
            result: "The team finished faster and the coach was happy."
        },
        retellSteps: [
            {
                label: "First",
                prompt: "What did Coach Ramirez want Malik to do?",
                help: {
                    clue: "It involved practice laps and steady speed.",
                    words: ["practice laps", "no slowing", "challenge"],
                    model: "Coach Ramirez challenged Malik to run practice laps without slowing down."
                }
            },
            {
                label: "Next",
                prompt: "How did Malik use his playlist to solve his focus problem?",
                help: {
                    clue: "Think about the playlist sections and how he remembered them.",
                    words: ["playlist", "three sections", "different tempo", "hummed"],
                    model: "He remembered his workout playlist had three sections and used the songs to pace himself."
                }
            },
            {
                label: "Then",
                prompt: "Describe what Malik did on the next lap.",
                help: {
                    clue: "What did he hum and who noticed?",
                    words: ["hummed songs", "in order", "teammates", "noticed"],
                    model: "On the next lap Malik hummed the songs and his teammates noticed his method."
                }
            },
            {
                label: "Finally",
                prompt: "What was the result after Malik used his plan?",
                help: {
                    clue: "Focus on the coach's reaction and the new lap time.",
                    words: ["beat their time", "thirty seconds", "coach smiled"],
                    model: "They beat their usual warm-up by thirty seconds and the coach smiled."
                }
            }
        ],
        questions: [
            {
                q: "Why did Malik use his playlist as a mental strategy?",
                correct: "The three sections with different tempos helped him pace himself and stay focused.",
                wrong: []
            },
            {
                q: "How did Malik's teammates react to his strategy?",
                correct: "They noticed his method and asked about it, then finished faster than usual.",
                wrong: []
            }
        ]
    },
    {
        title: "Recipe Break Strategy",
        text: [
            "Ava wanted to bake cookies as soon as she got home, but her media arts teacher gave her thirty vocabulary cards to finish. She set a fifteen-minute timer on her phone and told herself she could prep one ingredient after every five words. The quick tasks kept her awake, and by the third timer she had finished all the cards. Ava started measuring flour and sent her teacher a message that the plan worked."
        ],
        snapshot: {
            characters: "Ava and her media arts teacher.",
            setting: "Ava's desk at home after school.",
            kickoff: "Ava had thirty vocabulary cards but wanted to bake cookies.",
            challenge: "She needed to stay focused to finish the work.",
            solution: "She used timers with small baking tasks as rewards.",
            result: "She finished all the cards and started baking."
        },
        retellSteps: [
            {
                label: "First",
                prompt: "What did Ava want to do and what homework blocked her?",
                help: {
                    clue: "Think about baking and the thirty definitions.",
                    words: ["bake cookies", "thirty cards", "media arts", "homework"],
                    model: "Ava wanted to bake cookies, but she had thirty vocab cards to finish."
                }
            },
            {
                label: "Next",
                prompt: "Describe the plan Ava made with her timer.",
                help: {
                    clue: "She set time limits and rewarded herself with ingredient prep.",
                    words: ["fifteen-minute timer", "prep ingredient", "five cards"],
                    model: "She set fifteen-minute timers and prepped one ingredient after every five cards."
                }
            },
            {
                label: "Then",
                prompt: "How did the short tasks help her stay focused?",
                help: {
                    clue: "Did she fall asleep or stay awake?",
                    words: ["quick tasks", "awake", "third timer", "finished"],
                    model: "The quick tasks kept her awake, and by the third timer she had finished the cards."
                }
            },
            {
                label: "Finally",
                prompt: "What happened once Ava completed her work?",
                help: {
                    clue: "Did she start baking?",
                    words: ["measuring flour", "guilt-free", "messaged", "plan worked"],
                    model: "She started measuring flour guilt-free and told her teacher the plan worked."
                }
            }
        ],
        questions: [
            {
                q: "Why did Ava use ingredient prep as her reward?",
                correct: "Small baking tasks were quick rewards that kept her motivated without losing focus.",
                wrong: []
            },
            {
                q: "How did Ava feel after finishing the cards?",
                correct: "She felt proud and relaxed because she earned her baking time.",
                wrong: []
            }
        ]
    },
    {
        title: "Stream Tone Reset",
        text: [
            "Nico's after-school art stream always brought in his friends, but this week the chat filled with jokes about another artist's messy sketch. He stopped drawing, reminded everyone that the channel was for support and helpful feedback, and asked viewers to post one positive comment instead. The tone changed right away, the other artist stayed, and the best part of the stream became a group drawing they made from everyone's ideas."
        ],
        snapshot: {
            characters: "Nico, his friends, and the artist being teased.",
            setting: "Nico's art stream after school.",
            kickoff: "Nico started his stream like usual.",
            challenge: "The chat turned mean and made fun of another artist's sketch.",
            solution: "He stopped drawing and asked for positive comments only.",
            result: "The chat became nice, the artist stayed, and they made group art."
        },
        retellSteps: [
            {
                label: "First",
                prompt: "What did Nico notice during his art stream?",
                help: {
                    clue: "Focus on the chat messages.",
                    words: ["chat", "jokes", "messy sketch", "negative"],
                    model: "He noticed the chat joking about another artist's messy sketch."
                }
            },
            {
                label: "Next",
                prompt: "How did Nico respond to the negative chat?",
                help: {
                    clue: "He stopped drawing and gave directions.",
                    words: ["stopped", "reminded", "new rule", "positive comment"],
                    model: "He stopped drawing, reminded everyone of the channel rules, and asked for positive comments."
                }
            },
            {
                label: "Then",
                prompt: "What change did Nico request from the viewers?",
                help: {
                    clue: "Think about the kind of messages he wanted.",
                    words: ["post", "positive comment", "supportive", "feedback"],
                    model: "He asked everyone to post one positive comment instead of jokes."
                }
            },
            {
                label: "Finally",
                prompt: "What happened after the chat followed Nico's plan?",
                help: {
                    clue: "Look at the artist and the highlight of the stream.",
                    words: ["stayed", "collaborative piece", "helpful", "highlight"],
                    model: "The artist stayed, and the highlight became a collaborative piece built from suggestions."
                }
            }
        ],
        questions: [
            {
                q: "Why did Nico stop drawing?",
                correct: "He wanted to stop the negative chat and reset the tone of the stream.",
                wrong: []
            },
            {
                q: "What new highlight came from the positive chat?",
                correct: "They created a collaborative art piece using the helpful suggestions people posted.",
                wrong: []
            }
        ]
    },
    {
        title: "Reading Sprint Challenge",
        text: [
            "Tori had to read three pages of a history article before advisory ended, but her eyes kept looking at the social media notifications on her phone. She turned it into a game by giving herself five minutes per page and drawing tiny checkboxes in the margin. The mini-sprint idea kept her going, and she finished the article with five minutes left, ready to share a cool fact with her partner."
        ],
        snapshot: {
            characters: "Tori and her advisory partner.",
            setting: "School library during advisory.",
            kickoff: "Tori needed to read three pages before advisory ended.",
            challenge: "She kept looking at her phone notifications.",
            solution: "She made a five-minute challenge with checkboxes for each page.",
            result: "She finished early and was ready to share a fact."
        },
        retellSteps: [
            {
                label: "First",
                prompt: "What did Tori want to do and what distracted her?",
                help: {
                    clue: "Think about the history article and her phone.",
                    words: ["read three pages", "distracted", "phone", "notifications"],
                    model: "Tori needed to read a history article but kept getting distracted by her phone."
                }
            },
            {
                label: "Next",
                prompt: "What game did she invent to stay focused?",
                help: {
                    clue: "She used time limits and checkboxes.",
                    words: ["five minutes", "per page", "checkboxes", "game"],
                    model: "She turned it into a game with five-minute sprints per page and checkboxes."
                }
            },
            {
                label: "Then",
                prompt: "How did the game help her progress?",
                help: {
                    clue: "Did she stop or keep going?",
                    words: ["mini-sprint", "kept going", "finished", "margin"],
                    model: "The mini-sprint idea kept her working steadily through the article."
                }
            },
            {
                label: "Finally",
                prompt: "What was the result when advisory ended?",
                help: {
                    clue: "Did she finish on time?",
                    words: ["finished early", "five minutes left", "share fact"],
                    model: "She finished with five minutes to spare and was ready to share a fact."
                }
            }
        ],
        questions: [
            {
                q: "Why did Tori draw checkboxes in the margin?",
                correct: "They were part of her game to track progress for each page she finished.",
                wrong: []
            },
            {
                q: "How did the time limit help Tori?",
                correct: "It turned the reading into a race against the clock, which made it more exciting than just reading.",
                wrong: []
            }
        ]
    }
];
