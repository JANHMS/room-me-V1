import {
  IonRouterOutlet,
  IonTabBar,
  IonTabs,
} from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './auth';
import AddEntryPage from './pages/AddEntryPage';
import EntryPage from './pages/EntryPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import ToggleBar from './components/ToggleBar';
import ProfilePage from './pages/ProfilePage';

import ServicesPage from './pages/services/ServicesPage';
import ServiceDetailPage from './pages/services/ServiceDetailPage';
import ServiceCreatePage from './pages/services/ServiceCreatePage';
import UserServicesPage from './pages/services/UserServicesPage';
import ServiceHome from './pages/ServiceHome';
import RegisterPage from './pages/RegisterPage';
import Homescreen from './components/Homescreen';
import LoginPage from './pages/LoginPage';


const AppTabs: React.FC = (): JSX.Element => {
  const { loggedIn } = useAuth();
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }
  return (    
    <IonTabs>  
      <IonRouterOutlet>
        <Route path="/login" component={LoginPage} exact />
        <Route path="/" component={Homescreen} exact/>
        <Route exact path="/register">
          <RegisterPage />
        </Route>
        
        <Route path="/my/entries" component={DashboardPage} exact />
        <Route path="/my/entries/add" component={AddEntryPage} exact />
        <Route path="/my/entries/view/:id" component={EntryPage} exact />

        <Route path="/my/services/home" component={ServiceHome} exact />
        
        <Route path="/my/services/new" component={ServiceCreatePage} exact />
        <Route path="/my/services/me" component={UserServicesPage} exact />
        
        <Route path="/my/services/view/:id" component={ServiceDetailPage} exact />

        <Route path="/my/services" component={ServicesPage} exact />
        
        <Route path="/my/profile" component={ProfilePage} exact />
        <Route path="/my/settings" component={SettingsPage} exact />
      </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <ToggleBar />
        </IonTabBar>
      </IonTabs>
  );
};

export default AppTabs;
