import {
  IonApp, IonLoading,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppTabs from './AppTabs';
import { AuthContext, useAuthInit } from './auth';
import { Provider } from 'react-redux'
import initStore from './store'
import Homescreen from './components/Homescreen';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';


const App: React.FC = () => {
  const store = initStore()

  const { loading, auth } =  useAuthInit();
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
            <Route path="/my">
              <AppTabs />
            </Route>
            <Redirect exact path="/" to="/my/entries" />
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
