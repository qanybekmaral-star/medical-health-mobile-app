import React, { useState } from "react";

import HomeScreen from "./components/HomeScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import LogInScreen1 from "./components/LogInScreen1";
import SignUpScreen from "./components/SignUpScreen";
import DashboardScreen, { FALLBACK_DOCTORS } from "./components/DashboardScreen";
import ChatScreen from "./components/ChatScreen";
import ProfileScreen from "./components/ProfileScreen";
import EditProfileScreen from "./components/EditProfileScreen";
import FavoriteScreen from "./components/FavoriteScreen";
import PaymentMethodScreen from "./components/PaymentMethodScreen";
import AddCardScreen, { SavedCardData } from "./components/AddCardScreen";
import PrivacyPolicyScreen from "./components/PrivacyPolicyScreen";
import SettingsScreen from "./components/SettingsScreen";
import HelpScreen from "./components/HelpScreen";
import LogoutScreen from "./components/LogoutScreen";

type Screen =
  | "home"
  | "welcome"
  | "login"
  | "signup"
  | "dashboard"
  | "chat"
  | "profile"
  | "editProfile"
  | "favorite"
  | "payment"
  | "addCard"
  | "privacy"
  | "settings"
  | "help"
  | "logout";

const DEFAULT_USER_AVATAR =
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [activeUserName, setActiveUserName] = useState<string>("John Doe");
  const [activeUserEmail, setActiveUserEmail] = useState<string>("johndoe@example.com");
  const [activeUserPhone, setActiveUserPhone] = useState<string>("+123 567 89000");
  const [activeUserDob, setActiveUserDob] = useState<string>("");
  const [savedCard, setSavedCard] = useState<SavedCardData | null>(null);
  const [userAvatarUri, setUserAvatarUri] = useState<string>(DEFAULT_USER_AVATAR);

  if (currentScreen === "home") {
    return <HomeScreen onContinue={() => setCurrentScreen("welcome")} />;
  }

  if (currentScreen === "welcome") {
    return (
      <WelcomeScreen
        onBack={() => setCurrentScreen("home")}
        onLogin={() => setCurrentScreen("login")}
        onSignUp={() => setCurrentScreen("signup")}
      />
    );
  }

  if (currentScreen === "login") {
    return (
      <LogInScreen1
        onBack={() => setCurrentScreen("welcome")}
        onSignUp={() => setCurrentScreen("signup")}
        onLogin={(email, password) => {
          console.log("Email:", email);
          console.log("Password:", password);

          setActiveUserEmail(email);
          setActiveUserName(email?.split("@")[0] || "John Doe");
          setCurrentScreen("dashboard");
        }}
      />
    );
  }

  if (currentScreen === "signup") {
    return (
      <SignUpScreen
        onBack={() => setCurrentScreen("welcome")}
        onLogin={() => setCurrentScreen("login")}
        onCreateAccount={(name, email, password) => {
          console.log("Name:", name);
          console.log("Email:", email);
          console.log("Password:", password);

          if (name) setActiveUserName(name);
          if (email) setActiveUserEmail(email);
          setCurrentScreen("dashboard");
        }}
      />
    );
  }

  if (currentScreen === "dashboard") {
    return (
      <DashboardScreen
        userName={activeUserName}
        onLogout={() => setCurrentScreen("welcome")}
        onOpenChat={() => setCurrentScreen("chat")}
        onOpenProfile={() => setCurrentScreen("profile")}
      />
    );
  }

  if (currentScreen === "chat") {
    return (
      <ChatScreen
        doctors={FALLBACK_DOCTORS}
        userName={activeUserName}
        onBackToHome={() => setCurrentScreen("dashboard")}
      />
    );
  }

  if (currentScreen === "profile") {
    return (
      <ProfileScreen
        userName={activeUserName}
        avatarUri={userAvatarUri}
        onChangeAvatar={(newUri) => setUserAvatarUri(newUri)}
        onChangeUserName={(newName) => setActiveUserName(newName)}
        onSelectSection={(sec) => {
          if (sec === "editProfile") setCurrentScreen("editProfile");
          else if (sec === "favorite") setCurrentScreen("favorite");
          else if (sec === "payment") setCurrentScreen("payment");
          else if (sec === "privacy") setCurrentScreen("privacy");
          else if (sec === "settings") setCurrentScreen("settings");
          else if (sec === "help") setCurrentScreen("help");
        }}
        onOpenLogout={() => setCurrentScreen("logout")}
        onBackToHome={() => setCurrentScreen("dashboard")}
        onOpenChat={() => setCurrentScreen("chat")}
        onLogout={() => setCurrentScreen("welcome")}
      />
    );
  }

  if (currentScreen === "editProfile") {
    return (
      <EditProfileScreen
        userName={activeUserName}
        userEmail={activeUserEmail}
        userPhone={activeUserPhone}
        userDob={activeUserDob}
        avatarUri={userAvatarUri}
        onUpdateProfileData={(data) => {
          setActiveUserName(data.name);
          setActiveUserEmail(data.email);
          setActiveUserPhone(data.phone);
          setActiveUserDob(data.dob);
        }}
        onChangeAvatar={(newUri) => setUserAvatarUri(newUri)}
        onBackToProfile={() => setCurrentScreen("profile")}
        onBackToHome={() => setCurrentScreen("dashboard")}
        onOpenChat={() => setCurrentScreen("chat")}
      />
    );
  }

  if (currentScreen === "favorite") {
    return (
      <FavoriteScreen
        onBackToProfile={() => setCurrentScreen("profile")}
        onBackToHome={() => setCurrentScreen("dashboard")}
        onOpenChat={() => setCurrentScreen("chat")}
      />
    );
  }

  if (currentScreen === "payment") {
    return (
      <PaymentMethodScreen
        savedCard={savedCard}
        onOpenAddCard={() => setCurrentScreen("addCard")}
        onBackToProfile={() => setCurrentScreen("profile")}
        onBackToHome={() => setCurrentScreen("dashboard")}
        onOpenChat={() => setCurrentScreen("chat")}
      />
    );
  }

  if (currentScreen === "addCard") {
    return (
      <AddCardScreen
        defaultHolderName={activeUserName}
        initialCard={savedCard}
        onSaveCard={(card) => setSavedCard(card)}
        onBackToPayment={() => setCurrentScreen("payment")}
        onBackToHome={() => setCurrentScreen("dashboard")}
        onOpenChat={() => setCurrentScreen("chat")}
        onOpenProfile={() => setCurrentScreen("profile")}
      />
    );
  }

  if (currentScreen === "privacy") {
    return (
      <PrivacyPolicyScreen
        onBackToProfile={() => setCurrentScreen("profile")}
        onBackToHome={() => setCurrentScreen("dashboard")}
        onOpenChat={() => setCurrentScreen("chat")}
      />
    );
  }

  if (currentScreen === "settings") {
    return (
      <SettingsScreen
        onBackToProfile={() => setCurrentScreen("profile")}
        onBackToHome={() => setCurrentScreen("dashboard")}
        onOpenChat={() => setCurrentScreen("chat")}
      />
    );
  }

  if (currentScreen === "help") {
    return (
      <HelpScreen
        onBackToProfile={() => setCurrentScreen("profile")}
        onBackToHome={() => setCurrentScreen("dashboard")}
        onOpenChat={() => setCurrentScreen("chat")}
      />
    );
  }

  if (currentScreen === "logout") {
    return (
      <LogoutScreen
        userName={activeUserName}
        avatarUri={userAvatarUri}
        onConfirmLogout={() => setCurrentScreen("welcome")}
        onBackToProfile={() => setCurrentScreen("profile")}
        onBackToHome={() => setCurrentScreen("dashboard")}
        onOpenChat={() => setCurrentScreen("chat")}
      />
    );
  }

  return null;
}