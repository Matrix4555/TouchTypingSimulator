import React from 'react';
import { ControlPanel } from './components/ControlPanel';
import Text from './components/Text';
import AccuracyIndicator from './components/AccuracyIndicator';
import SpeedIndicator from './components/SpeedIndicator';

function App() {
  return (
    <div className="container pt-3" style={{width: '800px'}}>
      <ControlPanel />
      <Text />
      <div className="d-flex justify-content-end">
        <AccuracyIndicator />
        <SpeedIndicator />
      </div>
    </div>
  );
}

export default App;
