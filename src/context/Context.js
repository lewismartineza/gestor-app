import { createContext, useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { firebase } from '../utils/firebase';

export const AuthenticationContext = createContext();

const removeUserLocalStorage = () => {
  window.localStorage.removeItem('gestor:user');
  window.localStorage.removeItem('gestor:_tk_');
  window.localStorage.removeItem('gestor:_rf_');
};

const setUserLocalStorage = ({ accessToken, refreshToken, user }) => {
  window.localStorage.setItem('gestor:_tk_', accessToken);
  window.localStorage.setItem('gestor:_rf_', refreshToken);
  window.localStorage.setItem('gestor:user', JSON.stringify(user));
};

export function useAuthentication() {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error('This component should be in AuthenticationContext!');
  }
  return context;
}

export function AuthenticationProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(() =>
    window.localStorage.getItem('gestor:_tk_'),
  );

  const logout = () => {
    setAuthenticated(false);
    removeUserLocalStorage();
  };

  const login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((credential) => {
        const {
          uid,
          refreshToken,
          photoURL,
          email,
          displayName,
          stsTokenManager: { accessToken },
        } = credential.user.toJSON();

        setUserLocalStorage({
          accessToken,
          refreshToken,
          user: {
            uid,
            photoURL,
            email,
            displayName,
          },
        });

        setAuthenticated(true);
      })
      .catch((error) => {
        const errorMessage = error.message;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
        });
      });
  };

  const createUser = ({ email, password, first_name, last_name }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        const {
          uid,
          refreshToken,
          photoURL,
          email,
          stsTokenManager: { accessToken },
        } = credentials.user.toJSON();

        const userRegister = {
          uid,
          refreshToken,
          photoURL,
          email,
          accessToken,
          displayName: `${first_name}|${last_name}|${first_name} ${last_name}`,
        };

        setAuthenticated(true);

        Swal.fire({
          icon: 'success',
          title: `El usuario ${first_name} ${last_name}  ha sido creado con exito!`,
        });

        setUserLocalStorage({
          accessToken,
          refreshToken,
          user: userRegister,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
        });
      });
  };

  const values = {
    isAuthenticated,
    logout,
    login,
    handleRegisterUser: createUser,
  };

  return (
    <AuthenticationContext.Provider value={values}>
      {children}
    </AuthenticationContext.Provider>
  );
}
