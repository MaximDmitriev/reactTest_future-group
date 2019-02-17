import React from 'react';

import errorImg from './file.svg';
import './error.css';

const ErrorComponent = () => {

  return(
    <div className="mt-5">
      <h3>Сервис временно недоступен</h3>
      <img className="error" src={errorImg} alt="error"/>
    </div>
  )
}

export default ErrorComponent;