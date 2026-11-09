import { ComponentType, useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import ProfileMain from './ProfileMain';
import EditProfile from './EditProfile';
import ProfileSettings from './ProfileSettings';
import Notifications from './Notifications';
import PasswordManager from './PasswordManager';
import Privacy from './Privacy';
import Help from './Help';
import type { Route, ScreenProps } from './types';

const screens: Record<Route, ComponentType<ScreenProps>> = {
  profile: ProfileMain,
  editProfile: EditProfile,
  profileSettings: ProfileSettings,
  notifications: Notifications,
  passwordManager: PasswordManager,
  privacy: Privacy,
  help: Help,
};

type Props = {
  /** Профиль экранында "артқа" басқанда шақырылады (мыс. негізгі экранға қайту) */
  onClose?: () => void;
  /** "Выйти" растағанда шақырылады */
  onLogout?: () => void;
};

/**
 * 7 беттің барлығын бір компонентке жинайды.
 * Қолдану: <ProfileFlow onClose={() => ...} onLogout={() => ...} />
 */
export default function ProfileFlow({ onClose, onLogout }: Props) {
  const [stack, setStack] = useState<Route[]>(['profile']);

  const go = (route: Route) => setStack((s) => [...s, route]);
  const reset = (route: Route) => setStack([route]);
  const back = () => {
    if (stack.length > 1) setStack((s) => s.slice(0, -1));
    else onClose?.();
  };

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (stack.length > 1) {
        setStack((s) => s.slice(0, -1));
        return true;
      }
      if (onClose) {
        onClose();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [stack, onClose]);

  const Current = screens[stack[stack.length - 1]];
  return <Current go={go} back={back} reset={reset} onLogout={onLogout} />;
}
