import {
  IonRouterOutlet,
  IonTabBar,
  IonTabs,
} from '@ionic/react';
import { connect } from 'react-redux'
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useAuth } from './auth';
import AddEntryPage from './pages/services/AddEntryPage';
import EntryPage from './pages/EntryPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import ToggleBar from './components/ToggleBar';
import ProfilePage from './pages/ProfilePage';

import ServicesPage from './pages/services/ServicesPage';
import ServiceDetailPage from './pages/services/ServiceDetailPage';
// import ServiceCreatePage from './pages/services/ServiceCreatePage';
import UserServicesPage from './pages/services/UserServicesPage';
import ServiceHome from './pages/ServiceHome';
import RegisterPage from './pages/RegisterPage';
import Homescreen from './components/Homescreen';
import LoginPage from './pages/LoginPage';
import ReceivedCollaborationsPage from "./pages/collaborations/ReceivedCollaborations";
import CollaborationDetailPage from "./pages/collaborations/CollaborationDetail";

import SentOffersPage from "./pages/offers/SentOffers";
import ReceivedOffersPage from "./pages/offers/ReceivedOffers";

import ReceivedMessagesPage from './pages/messages/ReceivedMessagesPage';

import ReceivedMessages from './components/messages/ReceivedMessages';
import { IonReactRouter } from '@ionic/react-router';


const AppTabs: React.FC = (): JSX.Element => {
  const { loggedIn } = useAuth();
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }
  return (                 
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" component={LoginPage} exact />
        <Route path="/" component={Homescreen} exact/>
        <Route exact path="/register">
          <RegisterPage />
        </Route>
        
        <Route path="/my/collaborations/me" component={ReceivedCollaborationsPage} exact />
        <Route path="/my/collaborations/individual/:id" component={CollaborationDetailPage} exact />
        <Route path="/my/offers/sent" component={SentOffersPage} exact />
        <Route path="/my/offers/received" component={ReceivedOffersPage} exact />
        <Route path="/my/messages/received" component={ReceivedMessagesPage} exact />

        <Route path="/my" component={DashboardPage} exact />
        <Route path="/my/entries/add" component={AddEntryPage} exact />
        <Route path="/my/entries/view/:id" component={EntryPage} exact />

        <Route path="/my/services/me" component={UserServicesPage} exact />
        
        <Route path="/my/services/:serviceId" component={ServiceDetailPage} exact />

        <Route path="/my/services" component={ServicesPage} exact />
        
        <Route path="/my/profile" component={ProfilePage} exact />
        <Route path="/my/settings" component={SettingsPage} exact />
      </IonRouterOutlet>
      </IonReactRouter>

  );
};

const mapStateToProps = state => ({auth: state.auth})
  
export default connect(mapStateToProps)(AppTabs);
