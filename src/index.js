import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { AuthorizedService } from './-services/-base-services/authorized.service';
import LoginForm from './components/LoginForm/LoginForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
if(AuthorizedService.isAuthorized()){
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
else{
  root.render(
    <React.StrictMode>
      <LoginForm />
    </React.StrictMode>
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
