import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

export type IconName = ComponentProps<typeof Ionicons>['name'];

export type Route =
  | 'profile'
  | 'editProfile'
  | 'profileSettings'
  | 'notifications'
  | 'passwordManager'
  | 'privacy'
  | 'help';

export type ScreenProps = {
  go: (route: Route) => void;
  back: () => void;
  reset: (route: Route) => void;
  onLogout?: () => void;
};
