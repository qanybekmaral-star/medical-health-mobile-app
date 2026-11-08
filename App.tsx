import React, { useState } from 'react';

import HomeScreen2 from './components/HomeScreen2';
import WelcomeScreen from './components/WelcomeScreen';
import LogInScreen1 from './components/LogInScreen1';
import SignUpScreen from './components/SignUpScreen';
import SetPasswordScreen from './components/SetPasswordScreen';
import ProfileScreen from './components/ProfileScreen';
import ChatListScreen from './components/ChatListScreen';
import ChatScreen from './components/ChatScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    'welcome' | 'login' | 'signup' | 'setPassword' | 'home2' | 'profile' | 'chatList' | 'chatRoom'
  >('welcome');

  const [selectedChatDoctor, setSelectedChatDoctor] = useState<any>(null);

  // 8 дәрігердің тізімі (чат үшін)
  const doctorsList = [
    { id: '1', name: 'Dr. Olivia Turner, M.D.', specialty: 'Dermato-Endocrinology', image: 'https://img.magnific.com/premium-photo/female-doctor-holding-tablet-studio_1326139-1901.jpg?semt=ais_hybrid&w=740&q=80' },
    { id: '2', name: 'Dr. Alexander Bennett', specialty: 'Dermato-Genetics', image: 'https://thumbs.dreamstime.com/b/%D0%BC%D0%BE%D0%BB%D0%BE%D0%B4%D0%BE%D0%B9-%D0%B4%D0%BE%D0%BA%D1%82%D0%BE%D1%80-16088825.jpg' },
    { id: '3', name: 'Dr. Sophia Martinez, Ph.D.', specialty: 'Cosmetic Bioengineering', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsYkuPw84PNCNtbzpWIZG75RPEO33NrJxygiQ2wnyrnUCPVCsGdbNUAU0&s=10' },
    { id: '4', name: 'Dr. Michael Davidson, M.D.', specialty: 'Nano-Dermatology', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500' },
    { id: '5', name: 'Dr. Emily Watson, M.D.', specialty: 'Cardiologist', image: 'https://img.magnific.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?semt=ais_hybrid&w=740&q=80' },
    { id: '6', name: 'Dr. William Clark, Ph.D.', specialty: 'Neurologist', image: 'https://img.magnific.com/free-photo/doctor-holding-clipboard-looking-camera_23-2148285743.jpg?semt=ais_hybrid&w=740&q=80' },
    { id: '7', name: 'Dr. Jessica Taylor, M.D.', specialty: 'Pediatrician', image: 'https://img.magnific.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?semt=ais_hybrid&w=740&q=80' },
    { id: '8', name: 'Dr. Robert Johnson, M.D.', specialty: 'Orthopedic Surgeon', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSTW_fM8ndU2ikM_dgwMZs_M4_IjWFVOnR-Yk3zyRLZF3BbTG6WdGa__oe&s=10' },
  ];

  if (currentScreen === 'welcome') {
    return (
      <WelcomeScreen
        onLogin={() => setCurrentScreen('login')}
        onSignUp={() => setCurrentScreen('signup')}
        onBack={() => setCurrentScreen('welcome')}
      />
    );
  }

  if (currentScreen === 'login') {
    return (
      <LogInScreen1
        onBack={() => setCurrentScreen('welcome')}
        onContinue={() => setCurrentScreen('home2')}
        onSignUp={() => setCurrentScreen('signup')}
      />
    );
  }

  if (currentScreen === 'signup') {
    return (
      <SignUpScreen
        onBack={() => setCurrentScreen('welcome')}
        onLogin={() => setCurrentScreen('login')}
        onContinue={() => setCurrentScreen('setPassword')}
      />
    );
  }

  if (currentScreen === 'setPassword') {
    return (
      <SetPasswordScreen
        onBack={() => setCurrentScreen('signup')}
        onCreateAccount={() => {
          alert('Account created successfully!');
          setCurrentScreen('home2');
        }}
      />
    );
  }

  // HomeScreen2 (Мұнда onNavigateToChat пен onNavigateToProfile міндетті түрде тұруы керек)
  if (currentScreen === 'home2') {
    return (
      <HomeScreen2
        onNavigateToProfile={() => setCurrentScreen('profile')}
        onNavigateToChat={() => setCurrentScreen('chatList')}
      />
    );
  }

  if (currentScreen === 'profile') {
    return (
      <ProfileScreen
        onLogout={() => setCurrentScreen('welcome')}
      />
    );
  }

  // Дәрігерлердің чаттар тізімі
  if (currentScreen === 'chatList') {
    return (
      <ChatListScreen
        doctors={doctorsList}
        onSelectChat={(doc) => {
          setSelectedChatDoctor(doc);
          setCurrentScreen('chatRoom');
        }}
        onNavigateHome={() => setCurrentScreen('home2')}
        onNavigateProfile={() => setCurrentScreen('profile')}
      />
    );
  }

  // Таңдалған дәрігермен жеке чат бөлмесі
  if (currentScreen === 'chatRoom' && selectedChatDoctor) {
    return (
      <ChatScreen
        doctor={selectedChatDoctor}
        onBack={() => setCurrentScreen('chatList')}
      />
    );
  }

  return null;
}