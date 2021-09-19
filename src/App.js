import React from 'react';
import './styles/style.css';

import { ResultsModal } from './components/modals/ResultsModal';
import { InputModal } from './components/modals/InputModal';
import { DangerModal } from './components/modals/DangerModal';
import { ControlPanel } from './components/major/ControlPanel';
import { Alert } from './components/minor/Alert';

import { Text } from './components/major/Text';
import { AccuracyIndicator } from './components/indicators/AccuracyIndicator';
import { SpeedIndicator } from './components/indicators/SpeedIndicator';

// for future comparison of body background-color in script with dark mode
const body = document.querySelector('body');
body.style.backgroundColor = 'white';
body.addEventListener('click', e => {
    if(e.target !== document.querySelector('#number-value'))
        document.querySelector('.text').focus();
});

export function App() {
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
