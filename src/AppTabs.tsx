import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { home as homeIcon, settings as settingsIcon } from 'ionicons/icons';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './auth';
import AddEntryPage from './pages/AddEntryPage';
import EntryPage from './pages/EntryPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import ChatRoom from './components/ChatRoomComponent';
import Homescreen from './components/Homescreen';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ToggleBar from './components/ToggleBar';

const AppTabs: React.FC = (): JSX.Element => {
  const { loggedIn } = useAuth();
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }
  return (    
    <IonTabs>  
      <IonRouterOutlet>
        <Route path="/chat" component={ChatRoom} exact />
        <Route path="/my/entries" component={DashboardPage} exact />
        <Route path="/my/entries/add" component={AddEntryPage} exact />
        <Route path="/my/entries/view/:id" component={EntryPage} exact />

        <Route exact path="/my/settings">
          <SettingsPage />
        </Route>  
      </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <ToggleBar />
        </IonTabBar>
      </IonTabs>
  );
};

export default AppTabs;
