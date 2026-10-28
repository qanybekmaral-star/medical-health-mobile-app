
import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import WelcomeScreen from './components/WelcomeScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);

  if (currentScreen === 1) {
    return (
      <HomeScreen
        onContinue={() => setCurrentScreen(2)}
      />
    );
  }

  return (
    <WelcomeScreen
      onLogin={() => alert('Log In screen')}
      onSignUp={() => alert('Sign Up screen')}
    />
  );
}
