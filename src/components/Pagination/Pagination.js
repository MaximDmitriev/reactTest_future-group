import React from 'react';

import './pagination.css';

const Pagination = ({page, total, onPrev, onNext, onSelectPage}) => {

  return (
    <div className="wrap">
      <button 
            className="btn btn-primary btn-sm"
            onClick={() => {
                            onPrev();
                            document.querySelector('#numberOfPage').value = '';}}>prev</button>

      <p>
        Страница {page} из {total}. Перейти на 
        <input 
            id="numberOfPage"
            onChange={() => onSelectPage(parseInt(document.querySelector('#numberOfPage').value))}
            /> 
        страницу</p> 

      <button 
            className="btn btn-primary btn-sm"
            onClick={() => {
                            onNext();
                            document.querySelector('#numberOfPage').value = '';}}>next</button>
    </div>
  )
}

export default Pagination;