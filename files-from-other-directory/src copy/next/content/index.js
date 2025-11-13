import seedTags from './tags';
import applePickingStory from './stories/fall/applePickingStory';
import crispVocabularyEntry from './vocabulary/fallWords/crispVocabulary';
import regularPastTensePattern from './grammar/verbTense/regularPastTense';
import sInitialDeck from './articulation/sInitialDeck';
import {
  registerStory,
  registerVocabularyEntry,
  registerGrammarPattern,
  registerArticulationDeck,
} from '../lib/resourceRegistry';

const tags = seedTags;

export const contentSeed = {
  tags,
  stories: [applePickingStory],
  vocabulary: [crispVocabularyEntry],
  grammar: [regularPastTensePattern],
  articulation: [sInitialDeck],
};

export const registerSeedContent = () => {
  contentSeed.stories.forEach(registerStory);
  contentSeed.vocabulary.forEach(registerVocabularyEntry);
  contentSeed.grammar.forEach(registerGrammarPattern);
  contentSeed.articulation.forEach(registerArticulationDeck);
};

registerSeedContent();

export default contentSeed;
