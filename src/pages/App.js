import { Router } from '@reach/router';
import { BaseLayout } from '../layout/BaseLayout';
import { Dashboard } from './Dashboard';
import { Login } from './Login';
import { NotFound } from './NotFound';
import { Products } from './Products';
import { Profile } from './Profile';
import { SingUp } from './SingUp';
function App() {
  return (
    <>
      <Router>
        <Login path='/' />
        <SingUp path='registrarse' />

        <BaseLayout path='dashboard' component={Dashboard} />
        <BaseLayout path='perfil' component={Profile} />
        <BaseLayout path='productos' component={Products} />

        <NotFound default />
      </Router>
    </>
  );
}

export default App;
