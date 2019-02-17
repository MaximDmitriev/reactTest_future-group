import React, { Component } from 'react';

import StringLine from '../String/String';
import Pagination from '../Pagination/Pagination';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import getData from '../../services/getData';
import arrowImg from './long-arrow-pointing-up.svg';

import './table.css';

const Spinner = () => {
  
  return (
    <div className="spinner-border mt-5" style={{width: "3rem", height: "3rem"}} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default class Table extends Component {
  
  data = new getData();

  state = {
    items: null,
    viewItems: null,
    loading: false,
    sortDirection: 'desc', // asc
    sortName: null,
    currentPage: 0,
    error: false
  }

  onShowInfo = (id, phone) => {
    
    // id иногда совпадают у нескольких строк
    const index = this.state.items.findIndex(item => item.id === id && item.phone === phone);

    return this.state.items[index];
  }

  onSort = (name) => {

    const direct = this.state.sortDirection === 'asc' ? -1 : 1;

    const sorted = this.state.items.sort((a, b) => {

      if (a[name] > b[name]) {
        return 1 * direct;
      }
      if (a[name] < b[name]) {
        return -1 * direct;
      }
      if(a[name] === b[name]) {
        return 0;
      }
    });

    this.splitOnPages(sorted);

    this.setState({
      items: sorted,
      sortName: name,
      sortDirection: this.state.sortDirection === 'asc' ? 'desc' : 'asc'
    });
  }

  onFilter = (filter) => {

    if (filter) {
      const filtered = this.state.items.filter((item) => {
        for (let i in item) {
          if (item[i].toString().toLowerCase().includes(filter)) {
            return item;
          }
        }
      });
      return (filtered);
    } else {
      return this.state.items;
    }
  }

  splitOnPages = (array) => {

    if (array.length === 0) {
      this.setState({
        viewItems: false
      })
    } else {
      const numbersOfPages = Math.ceil(array.length / 50);
      let pages = [];
  
      for (let i = 0; i < numbersOfPages; i++) {
        let start = i * 50;
        let stop = i * 50 + 50 < array.length ? i * 50 + 50 : array.length;
        pages.push(array.slice(start, stop));
      }
  
      this.setState({
        currentPage: 0,
        viewItems: pages,
        loading: false
      });
    }
  }

  onNext = () => {

    const current = this.state.currentPage;
    if (current + 1 < this.state.viewItems.length) {
      this.setState({
        currentPage: current + 1
      });
    }
  }

  onPrev = () => {

    const current = this.state.currentPage;
    if (current > 0) {
      this.setState({
        currentPage: current - 1
      });
    }
  }

  onSelectPage = (page) => {

    if (page > 0 && page <= this.state.viewItems.length && page !== this.state.currentPage) {
      this.setState({
        currentPage: page - 1
      });
    }
  }

  dataLoad = (type) => {

    this.setState({
      loading: true
    });

    switch (type) {
      case 'part':

        this.data.smallData()
        .then((res) => {
          this.splitOnPages(res);
          this.setState({
            items: res,
            error: false
          });
        })
        .catch((res) => {
          this.setState({
            loading: false,
            error: res
          });
        });
        break;

      case 'full':

        this.data.bigData()
        .then((res) => {
          this.splitOnPages(res);
          this.setState({
            items: res,
            error: false
          });

        })
        .catch((res) => {
          this.setState({
            loading: false,
            error: res
          });
        });
        break;

      default:
        this.setState({
          loading: false
        });
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.dataType !== this.props.dataType) {
      this.dataLoad(nextProps.dataType);
    }

    if (nextProps.filter !== this.props.filter) {
      console.log('nextprops', nextProps);
      this.splitOnPages(this.onFilter(nextProps.filter));
    }
  }

  render() {

    const {sortName, sortDirection, loading, currentPage, viewItems, error} = this.state;
    
    if (loading) {
      return (
        <Spinner />
      )
    }
    else {
      return (
        <>
          {viewItems ? <Pagination 
                                page={currentPage + 1} 
                                total={viewItems.length}
                                onNext={this.onNext}
                                onPrev={this.onPrev}
                                onSelectPage={this.onSelectPage}
                                /> : null}
          <table className="table table-hover">
            <thead>
              <tr className="thead-dark">
                <th onClick={() => this.onSort('id')}>
                  id {sortName === 'id' ? <img className={sortDirection === 'desc' ? "desc" : ""} src={arrowImg} alt='arrow'/> : null}
                </th>
                <th onClick={() => this.onSort('firstName')}>
                  firstName {sortName === 'firstName' ? <img className={sortDirection === 'desc' ? "desc" : ""} src={arrowImg} alt='arrow'/> : null}
                </th>
                <th onClick={() => this.onSort('lastName')}>
                  lastName {sortName === 'lastName' ? <img className={sortDirection === 'desc' ? "desc" : ""} src={arrowImg} alt='arrow'/> : null}
                </th>
                <th onClick={() => this.onSort('email')}>
                  email {sortName === 'email' ? <img className={sortDirection === 'desc' ? "desc" : ""} src={arrowImg} alt='arrow'/> : null}
                </th>
                <th onClick={() => this.onSort('phone')}>
                  phone {sortName === 'phone' ? <img className={sortDirection === 'desc' ? "desc" : ""} src={arrowImg} alt='arrow'/> : null}
                </th>
              </tr>
            </thead>
            <tbody>
              {viewItems ? viewItems[currentPage].map((item) => {

                    return (
                      <StringLine 
                                key={item.id + item.phone.slice(-4)}
                                id={item.id}
                                firstName={item.firstName}
                                lastName={item.lastName}
                                email={item.email}
                                phone={item.phone}
                                onShowItems={() => this.props.onShowCard(this.onShowInfo(item.id, item.phone))}
                      />
                    )
              }
                ) : null}
            </tbody>
          </table>
          {error ? <ErrorComponent /> : null}
        </>
      )
    }
  }
}
