import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import NewHomePage from './pages/NewHomePage';
import ReadingStories from './activities/ReadingStories';
import MultipleMeaningWords from './activities/MultipleMeaningWords';
import MultipleMeaningSentences from './activities/MultipleMeaningSentences';
import ReadingComprehension from './activities/ReadingComprehension';
import MultiLevelReading from './activities/MultiLevelReading';
import ContextCluesDetective from './activities/ContextCluesDetective';
import FallContextClues from './activities/FallContextClues';
import CompareContrast from './activities/CompareContrast';
import PrefixDetective from './activities/PrefixDetective';
import NegationNavigator from './activities/NegationNavigator';
import ProblemSolutionStories from './activities/ProblemSolutionStories';
import ArticulationPractice from './activities/ArticulationPractice';
import ArticulationPracticeSequential from './activities/ArticulationPracticeSequential';
import VocalicRWordPractice from './activities/VocalicRWordPractice';
import SynonymPractice from './activities/SynonymPractice';
import KeyEventDetailPractice from './activities/KeyEventDetailPractice';
import AACRequestComment from './activities/AACRequestComment';
import StoryElementsWorksheet from './activities/StoryElementsWorksheet';
import StoryRetellingWorksheet from './activities/StoryRetellingWorksheet';
import SameDifferentWorksheet from './activities/SameDifferentWorksheet';
import CompareContrastTemplate from './activities/CompareContrastTemplate';
import FallCompareContrast from './activities/FallCompareContrast';
import PastTensePractice from './activities/PastTensePractice';
import PluralNounsPractice from './activities/PluralNounsPractice';
import ShortStoriesPredictions from './activities/ShortStoriesPredictions';
import RelevantResponsePractice from './activities/RelevantResponsePractice';
import QuestionResponsePractice from './activities/QuestionResponsePractice';
import StoryInferenceCompare from './activities/StoryInferenceCompare';
import ClassroomInstructions from './activities/ClassroomInstructions';
import CategoriesFunctions from './activities/CategoriesFunctions';
import PronounPractice from './activities/PronounPractice';
import FigurativeLanguage from './activities/FigurativeLanguage';
import SocialCuesFeelings from './activities/SocialCuesFeelings';
import FallSynonymPractice from './activities/FallSynonymPractice';
import StoryGrammarOrganizer from './activities/StoryGrammarOrganizer';
import ActivityBuilderPage from './pages/ActivityBuilderPage';
import CustomActivityPlayer from './pages/CustomActivityPlayer';
import NextApp from './next/NextApp';
import './App.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<NewHomePage />} />
        <Route path="/activities/reading-stories" element={<ReadingStories />} />
        <Route path="/activities/multiple-meanings" element={<MultipleMeaningWords />} />
        <Route path="/activities/multiple-meaning-sentences" element={<MultipleMeaningSentences />} />
        <Route path="/activities/reading-comprehension" element={<ReadingComprehension />} />
        <Route path="/activities/multi-level-reading" element={<MultiLevelReading />} />
        <Route path="/activities/context-clues" element={<ContextCluesDetective />} />
        <Route path="/activities/fall-context-clues" element={<FallContextClues />} />
        <Route path="/activities/compare-contrast" element={<CompareContrast />} />
        <Route path="/activities/prefix-detective" element={<PrefixDetective />} />
        <Route path="/activities/negation-navigator" element={<NegationNavigator />} />
        <Route path="/activities/problem-solution-stories" element={<ProblemSolutionStories />} />
        <Route path="/activities/articulation-practice" element={<ArticulationPractice />} />
        <Route path="/activities/articulation-practice-sequential" element={<ArticulationPracticeSequential />} />
        <Route path="/activities/vocalic-r-word-practice" element={<VocalicRWordPractice />} />
        <Route path="/activities/key-events-details" element={<KeyEventDetailPractice />} />
        <Route path="/activities/synonym-practice" element={<SynonymPractice />} />
        <Route path="/activities/fall-synonym-practice" element={<FallSynonymPractice />} />
        <Route path="/activities/aac-request-comment" element={<AACRequestComment />} />
        <Route path="/activities/story-elements-worksheet" element={<StoryElementsWorksheet />} />
        <Route path="/activities/story-retelling-worksheet" element={<StoryRetellingWorksheet />} />
        <Route path="/activities/same-different-worksheet" element={<SameDifferentWorksheet />} />
        <Route path="/activities/compare-contrast-template" element={<CompareContrastTemplate />} />
        <Route path="/activities/story-grammar-organizer" element={<StoryGrammarOrganizer />} />
        <Route path="/activities/fall-compare-contrast" element={<FallCompareContrast />} />
        <Route path="/activities/past-tense-practice" element={<PastTensePractice />} />
        <Route path="/activities/plural-nouns-practice" element={<PluralNounsPractice />} />
        <Route path="/activities/short-stories-predictions" element={<ShortStoriesPredictions />} />
        <Route path="/activities/relevant-response-practice" element={<RelevantResponsePractice />} />
        <Route path="/activities/question-response-practice" element={<QuestionResponsePractice />} />
        <Route path="/activities/story-inference-compare" element={<StoryInferenceCompare />} />
        <Route path="/activities/classroom-instructions" element={<ClassroomInstructions />} />
        <Route path="/activities/categories-functions" element={<CategoriesFunctions />} />
        <Route path="/activities/pronoun-practice" element={<PronounPractice />} />
        <Route path="/activities/figurative-language" element={<FigurativeLanguage />} />
        <Route path="/activities/social-cues-feelings" element={<SocialCuesFeelings />} />
        <Route path="/activity-builder" element={<ActivityBuilderPage />} />
        <Route path="/play-custom-activity" element={<CustomActivityPlayer />} />
        <Route path="/next/*" element={<NextApp />} />
        <Route path="*" element={<NewHomePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
