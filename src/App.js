import React from 'react';
import './styles/style.css';

import { ResultsModal } from './components/modals/ResultsModal';
import { InputModal } from './components/modals/InputModal';
import { DangerModal } from './components/modals/DangerModal';
import { ControlPanel } from './components/major/ControlPanel';
import { TextContainer } from './components/major/TextContainer';
import { IndicatorsContainer } from './components/indicators/IndicatorsContainer';
import { Alert } from './components/minor/Alert';

import { setClickAndKeydownHandlersForText } from './functions';
setClickAndKeydownHandlersForText();

export function App() {
    return (
        <>
            <div className="app-upper container pt-3">
                <ResultsModal />
                <InputModal />
                <DangerModal />
                <ControlPanel />
                <TextContainer />
                <IndicatorsContainer />
            </div>
            <Alert />
        </>
    );
}
