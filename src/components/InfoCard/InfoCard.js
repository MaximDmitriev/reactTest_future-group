import React, { Component } from 'react';

export default class InfoCard extends Component {

  componentDidMount() {

    const card = document.querySelector('#check');
    card.scrollIntoView({behavior: 'smooth'});
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.data !== this.props.data) {
      const card = document.querySelector('#check');
      card.scrollIntoView({behavior: 'smooth'});
    }
  }

  render() {

    const {firstName, lastName, description, address} = this.props.data;
  
    return (
  
      <div id="check" className="jumbotron jumbotron-fluid">
        <div className="container">
          <h4 className="text-left mb-4">Выбран пользователь: <small><strong>{firstName} {lastName}</strong></small></h4>
          <p className="text-left">Описание: </p>
          <textarea
            className="text-left rounded"
            defaultValue={description} />
          <p className="text-left">Адрес проживания: <strong>{address.streetAddress}</strong></p>
          <p className="text-left">Город: <strong>{address.city}</strong></p>
          <p className="text-left">Провинция/штат: <strong>{address.state}</strong></p>
          <p className="text-left">Индекс: <strong>{address.zip}</strong></p>
        </div>
      </div>
    )
  }
}