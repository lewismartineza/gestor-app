import React from 'react';
import ReactDOM from 'react-dom';
import { AuthenticationProvider } from './context/Context';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <AuthenticationProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthenticationProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
