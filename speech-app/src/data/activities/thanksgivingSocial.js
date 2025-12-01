import SocialEngine from '../../components/activities/SocialEngine';

export const thanksgivingSocialData = [
    {
        id: "late-ride",
        title: "Late Ride to Family Dinner",
        text: "You and your older sibling are late picking up a cousin for family dinner. When you arrive, the cousin says, “Everyone is waiting for us.” You notice texts from relatives asking where you are.",
        clues: ["running late", "people waiting", "missed communication"]
    },
    {
        id: "inside-chat",
        title: "Inside Chat at School",
        text: "At school before break, two classmates talk about their plans and hardly look at you. You try to add a comment, but they keep talking to each other and you go quiet.",
        clues: ["exclusion", "no eye contact", "tries to join but ignored"]
    },
    {
        id: "group-text",
        title: "Group Text About Plans",
        text: "A group text about weekend plans blows up. You reply late with “I don’t know,” and someone posts, “If you can’t decide, we’ll plan without you.”",
        clues: ["slow response", "group impatience", "possible exclusion"]
    },
    {
        id: "loud-comment",
        title: "Loud Comment on Food",
        text: "At the family table, you say loudly, “The turkey tastes dry this year.” The relative who cooked it looks down and stops talking.",
        clues: ["public criticism", "cook’s reaction", "tone"]
    },
    {
        id: "phone-at-table",
        title: "Phone at the Table",
        text: "During family dinner talk, you scroll on your phone. Your aunt asks a question and waits, but you answer with “What?” without looking up.",
        clues: ["device use", "missing cues", "others waiting"]
    },
    {
        id: "seat-change",
        title: "Changing Seats",
        text: "Place cards are set for family dinner. You move your card to sit by a friend, leaving your grandparent in a loud spot near the kitchen.",
        clues: ["ignoring seating plan", "comfort of others", "noise"]
    },
    {
        id: "game-invite",
        title: "Game Invite Missed",
        text: "After dinner, older cousins start a video game. You hover nearby, but they hand controllers to each other and say, “We only have two.”",
        clues: ["exclusion", "limited resources", "nonverbal signals"]
    },
    {
        id: "leftovers-share",
        title: "Taking Leftovers",
        text: "When dinner ends, you fill several containers of leftovers without asking. Other relatives glance at each other because they planned to take some too.",
        clues: ["no permission", "quantity taken", "others’ expectations"]
    },
    {
        id: "allergy-label",
        title: "Allergy Label Missing",
        text: "You put a dessert with nuts on the table without a label. A relative with a nut allergy asks, “Is this safe?” and looks worried.",
        clues: ["missing label", "safety risk", "guest concern"]
    },
    {
        id: "photo-share",
        title: "Posting a Group Photo",
        text: "You take a group photo and post it online without asking. Later, a cousin texts you that they didn’t want their picture shared.",
        clues: ["no consent", "public sharing", "privacy"]
    }
];

export default {
    id: 'thanksgiving-social',
    title: 'Thanksgiving Social Scenarios',
    subtitle: 'Identify and solve social problems',
    component: SocialEngine,
    data: thanksgivingSocialData,
    icon: 'Users',
    color: 'bg-indigo-600',
    config: {}
};
