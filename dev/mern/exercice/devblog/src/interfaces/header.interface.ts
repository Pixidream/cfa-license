// ------ imports ------
// interfaces
import { RouteComponentProps } from 'react-router-dom'

// ------ interfaces ------
export interface IHeader {
  location: RouteComponentProps['location'];
  history: RouteComponentProps['history'];
  store: any;
}

export interface INavItem {
  current: boolean;
  href: string;
  login: boolean;
  name: string;
  display: boolean;
}

export interface IHeaderState {
  navigation: INavItem[];
  isAuthenticated: boolean;
}
