import React, { useState } from 'react';
import StoryGrammarOrganizer from './tabs/StoryGrammarOrganizer';
import SequenceOrderingBuilder from './tabs/SequenceOrderingBuilder';
import StoryInferenceCompare from './tabs/StoryInferenceCompare';
import StoryRetellingWorksheet from './tabs/StoryRetellingWorksheet';
import './ScaffoldingHub.css';

const ScaffoldingHub = () => {
    const [activeTab, setActiveTab] = useState('story-grammar');

    const renderActiveComponent = () => {
        switch (activeTab) {
            case 'story-grammar':
                return <StoryGrammarOrganizer />;
            case 'sequencing':
                return <SequenceOrderingBuilder />;
            case 'inference':
                return <StoryInferenceCompare />;
            case 'retelling':
                return <StoryRetellingWorksheet />;
            default:
                return <StoryGrammarOrganizer />;
        }
    };

    return (
        <div className="scaffolding-hub">
            <header className="hub-header no-print">
                <h1>🛠️ Scaffolding & Support Tools</h1>
                <p>A collection of tools to support narrative structure, sequencing, and comprehension.</p>

                <nav className="hub-nav">
                    <button
                        className={`nav-tab ${activeTab === 'story-grammar' ? 'active' : ''}`}
                        onClick={() => setActiveTab('story-grammar')}
                    >
                        🧩 Story Grammar
                    </button>
                    <button
                        className={`nav-tab ${activeTab === 'sequencing' ? 'active' : ''}`}
                        onClick={() => setActiveTab('sequencing')}
                    >
                        📋 Sequencing
                    </button>
                    <button
                        className={`nav-tab ${activeTab === 'inference' ? 'active' : ''}`}
                        onClick={() => setActiveTab('inference')}
                    >
                        🔍 Inference
                    </button>
                    <button
                        className={`nav-tab ${activeTab === 'retelling' ? 'active' : ''}`}
                        onClick={() => setActiveTab('retelling')}
                    >
                        📖 Retelling
                    </button>
                </nav>
            </header>

            <main className="hub-content">
                {renderActiveComponent()}
            </main>
        </div>
    );
};

export default ScaffoldingHub;
