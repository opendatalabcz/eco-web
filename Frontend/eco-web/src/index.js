import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { SideBarVisibilityProvider } from './Components/SideBar/SideBarVisibilityContext';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './Components/i18n';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={ <div>Loading...</div> }>
      <SideBarVisibilityProvider>
        <App />
      </SideBarVisibilityProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
