import { Redirect, Router } from '@reach/router';
import { useAuthentication } from '../context/Context';
import { BaseLayout } from '../layout/BaseLayout';
// import { firebase } from '../utils/firebase';
import { Dashboard } from './Dashboard';
import { Login } from './Login';
import { NotFound } from './NotFound';
import { Products } from './Products';
import { Profile } from './Profile';
import { SingUp } from './SingUp';

function App() {
  const { isAuthenticated } = useAuthentication();
  /* const messaging = firebase.messaging();

  messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // ...
  }); */

  return (
    <Router>
      {isAuthenticated && (
        <Redirect noThrow from='/registrarse' to='/dashboard' />
      )}
      {isAuthenticated && <Redirect noThrow from='/' to='/dashboard' />}

      <Login path='/' />
      <SingUp path='registrarse' />

      {!isAuthenticated && <Redirect noThrow from='/dashboard' to='/' />}
      {!isAuthenticated && <Redirect noThrow from='/perfil' to='/' />}
      {!isAuthenticated && <Redirect noThrow from='/productos' to='/' />}

      <BaseLayout path='dashboard' component={Dashboard} />
      <BaseLayout path='perfil' component={Profile} />
      <BaseLayout path='productos' component={Products} />

      <BaseLayout default component={NotFound} />
    </Router>
  );
}

export default App;
