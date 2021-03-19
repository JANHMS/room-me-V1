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
import ChatRoom from './components/ChatRoomComponent';
import ToggleBar from './components/ToggleBar';
import ServicesPage from './pages/services/ServicesPage';
import ProfilePage from './pages/ProfilePage';
import ServiceDetailPage from './pages/services/ServiceDetailPage';
import ServiceCreatePage from './pages/services/ServiceCreatePage';
import CreateServiceComponent from './components/service/CreateServiceComponent';

const AppTabs: React.FC = (): JSX.Element => {
  const { loggedIn } = useAuth();
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }
  return (    
    <IonTabs>  
      <IonRouterOutlet>
        <Route path="/my/entries" component={DashboardPage} exact />
        <Route path="/my/entries/add" component={AddEntryPage} exact />
        <Route path="/my/entries/view/:id" component={EntryPage} exact />
        {/* <Route path="/collaborations/me" component={ReceivedCollaborationsPage} exact />
        <Route path="/collaborations/:id" component={CollaborationDetailPage} exact />
        <Route path="/offers/recieved" component={ReceivedOffersPage} exact />
        <Route path="/services/sent" component={SentOffersPage} exact />
        <Route path="/services/me" component={UserServicesPage} exact />*/}
        <Route path="/my/entries/services/new" component={CreateServiceComponent} exact />
        <Route path="/my/entries/services/:serviceId" component={ServiceDetailPage} exact /> 
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
