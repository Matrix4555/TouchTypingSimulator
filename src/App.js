import React from 'react';
import './style.css';

import { Modal } from './components/Modal';
import { InputModal } from './components/InputModal';
import { DangerModal } from './components/DangerModal';
import { ControlPanel } from './components/ControlPanel';
import { Alert } from './components/Alert';

import Text from './components/Text';
import AccuracyIndicator from './components/AccuracyIndicator';
import SpeedIndicator from './components/SpeedIndicator';

function App() {
  return (
    <div>
      <div className="container pt-3" style={{width: '800px'}}>
        <Modal />
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
    </div>
  );
}

export default App;
