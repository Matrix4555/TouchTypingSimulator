import React from 'react';
import { ControlPanel } from './components/ControlPanel';
import Text from './components/Text';
import AccuracyIndicator from './components/AccuracyIndicator';
import SpeedIndicator from './components/SpeedIndicator';

function App() {
  return (
    <div className="container pt-5">
      <ControlPanel />
      <Text />
      <AccuracyIndicator />
      <SpeedIndicator />
    </div>
  );
}

export default App;
