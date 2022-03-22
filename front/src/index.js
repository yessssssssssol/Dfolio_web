import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
    <script>Kakao.init("6a2c80c696d557bd6b234fa9982426b0");</script>
  </React.StrictMode>,
  document.getElementById('root'),
);


