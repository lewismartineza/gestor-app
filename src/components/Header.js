import { Link } from '@reach/router';

const styles = { marginRight: '1.5em' };
export function Header() {
  return (
    <div style={{ marginBottom: '3em' }}>
      <Link style={styles} to='/'>
        Login
      </Link>
      <Link style={styles} to='/registrarse'>
        Registrarse
      </Link>
      <Link style={styles} to='/dashboard'>
        Dashboard
      </Link>
      <Link style={styles} to='/perfil'>
        Perfil
      </Link>
      <Link style={styles} to='/productos'>
        Productos
      </Link>
    </div>
  );
}
