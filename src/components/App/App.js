import React, { Component } from 'react';

import Header from '../Header/Header';
import Table from '../Table/Table';
import InfoCard from '../InfoCard/InfoCard';

import './App.css';

class App extends Component {

  state = {
    infoCard: null,
    dataType: null,   //full part
    searchFilter: null
  }

  showCard = (item) => {
    this.setState({
      infoCard: item
    });
  }

  onToggleData = (dataType) => {
    this.setState({dataType});
  }

  onChahgeFilter = (filter) => {
    this.setState({
      searchFilter: filter
    });
  }

  render() {

    return (

      <div className="App">
        <Header 
              onToggle={this.onToggleData}
              onChahgeFilter={this.onChahgeFilter}
              />

        <Table 
              onShowCard={this.showCard}
              dataType={this.state.dataType}
              filter={this.state.searchFilter}
              />

        {this.state.infoCard ? <InfoCard data={this.state.infoCard}/> : null}
      </div>
    );
  }
}

export default App;
