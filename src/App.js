import React from 'react';
import './style.css';

import { ResultsModal } from './components/ResultsModal';
import { InputModal } from './components/InputModal';
import { DangerModal } from './components/DangerModal';
import { ControlPanel } from './components/ControlPanel';
import { Alert } from './components/Alert';

import Text from './components/Text';
import AccuracyIndicator from './components/AccuracyIndicator';
import SpeedIndicator from './components/SpeedIndicator';

function App() {
    return (
        <>
            <div className="container pt-3" style={{width: '800px'}}>
                <ResultsModal />
                <InputModal />
                <DangerModal />
                <ControlPanel />
                <Text />
                <div className="d-flex justify-content-end">
                    <AccuracyIndicator />
                    <SpeedIndicator />
                </div>
            </div>
            <Alert />
        </>
    );
}

export default App;
