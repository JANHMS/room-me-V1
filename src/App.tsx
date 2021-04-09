import {
  IonApp, IonLoading,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext, useAuth, useAuthInit } from './auth';
import { Provider } from 'react-redux'
import initStore from './store'
import Homescreen from './components/Homescreen';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import ServiceApp from './ServiceApp'

import { 
  onAuthStateChanged, 
  storeAuthUser, 
  subscribeToMessages,
  checkUserConnection } from '../src/actions'
import AppTabs from './AppTabs';

const store = initStore()

const App: React.FC = () => {
  const { userId } = useAuth()
  const { loading, auth } =  useAuthInit();

  useEffect(() => {
    onAuthStateChanged(authUser => {
      store.dispatch(storeAuthUser(authUser))
      
      if(authUser) {
        checkUserConnection(userId)
        store.dispatch(subscribeToMessages(userId))
      }
      if(!authUser) {
        unsubscribeMessages()
      }
    })
  },[])

  if (loading) {
    return <IonLoading isOpen />;
  }
  console.log(`rendering App with auth:`, auth);
  return (
    <IonApp>
      <Provider store={store}>
      <AuthContext.Provider value={auth}>
        <IonReactRouter>
          <Switch>
            <Route path="/login" component={LoginPage} exact />
            <Route path="/" component={Homescreen} exact/>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route path="/my/dashboard">
              <AppTabs />
            </Route>
            <Redirect exact path="/" to="/my/dashboard" />
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </Provider>
    </IonApp>
  );
};

export default App;
