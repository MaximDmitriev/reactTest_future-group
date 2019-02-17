import React from 'react';

import './header.css';

const Header = ({onToggle, onChahgeFilter}) => {

  return (
    <>
      <h2 className="mt-3">frontend-javascript-test</h2>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="btn-group mb-4 mt-5" role="group" aria-label="Get data">
              <button type="button"
                      className="btn btn-primary"
                      onClick={() => onToggle('full')} >Полный</button>
              <button type="button" 
                      className="btn btn-secondary"
                      onClick={() => onToggle('part')} >Частичный</button>
            </div>
          </div>
          <div className="col-lg-7 offset-lg-1">
            <div className="input-group mb-4 mt-5">
              <input type="text"
                     id="searchInput"
                     className="form-control" 
                     placeholder="Поиск по таблице..." 
                     aria-label="Search panel" 
                     aria-describedby="button-addon2" />
              <div className="input-group-append">
                <button 
                      className="btn btn-outline-primary" 
                      type="button" 
                      id="button-addon2"
                      onClick={() => onChahgeFilter((document.querySelector('#searchInput').value.toLowerCase()))}
                        >Найти</button>
              </div>
              <div className="input-group-append">
                <button 
                      className="btn btn-outline-secondary" 
                      onClick={() => {
                                      onChahgeFilter('');
                                      document.querySelector('#searchInput').value = '';
                                      }}
                        >Сброс</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
   )
}

export default Header;