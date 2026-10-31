import React, { useState } from 'react';

import HomeScreen from './components/HomeScreen';
import WelcomeScreen from './components/WelcomeScreen';
import LogInScreen1 from './components/LogInScreen1';
import SignUpScreen from './components/SignUpScreen';
import SetPasswordScreen from './components/SetPasswordScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);

  // 1. Home Screen
  if (currentScreen === 1) {
    return (
      <HomeScreen
        onContinue={() => setCurrentScreen(2)}
      />
    );
  }

  // 2. Welcome Screen
  if (currentScreen === 2) {
    return (
      <WelcomeScreen
        onLogin={() => setCurrentScreen(3)}
        onSignUp={() => setCurrentScreen(4)}
        onBack={() => setCurrentScreen(1)}
      />
    );
  }

  // 3. Log In Screen
  if (currentScreen === 3) {
    return (
      <LogInScreen1
        onBack={() => setCurrentScreen(1)}
        onContinue={() => setCurrentScreen(2)}
        onSignUp={() => setCurrentScreen(4)}
      />
    );
  }

  // 4. Sign Up Screen
  if (currentScreen === 4) {
    return (
      <SignUpScreen
        onBack={() => setCurrentScreen(3)}
        onLogin={() => setCurrentScreen(3)}
        onContinue={() => setCurrentScreen(5)}
      />
    );
  }

  // 5. Set Password Screen
  if (currentScreen === 5) {
    return (
      <SetPasswordScreen
        onBack={() => setCurrentScreen(4)}
        onCreateAccount={() => {
          alert('Account created successfully!');
          setCurrentScreen(3);
        }}
      />
    );
  }

  return null;
}