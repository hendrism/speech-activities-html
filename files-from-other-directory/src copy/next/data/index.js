import sampleActivities from './sampleActivities';
import readingStoriesBlueprint from './readingStories';
import contextCluesBlueprint from './contextClues';
import aacRequestCommentActivity from './aacRequestComment';
import { registerActivities } from '../lib/registry';

registerActivities(sampleActivities);
registerActivities([readingStoriesBlueprint, contextCluesBlueprint, aacRequestCommentActivity]);

export { sampleActivities, aacRequestCommentActivity };
