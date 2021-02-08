import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

export default class App extends Component {
  state = {
    date: null,
    nasaData: {},
    isLoading: false
  };

  componentDidMount() {
    this.fetchNasa();
  }

  async fetchNasa(){
    await this.setState({ isLoading: true });
    fetch('/api/nasa?date='+this.formatDate(this.state.date))
    .then(res => res.json())
    .then(res => this.setState({ 
      nasaData: res.data,
      isLoading: false
    }));
  }

  formatDate(date = null){
    const dateObj = date ? new Date(date) : new Date();
    return dateObj.getFullYear()+'-'+dateObj.getMonth()+'-'+dateObj.getDate();
  }

  handleOnChange = async (e) => {
    const { name, value } = e.target;
    
    await this.setState({
      date: value
    });
    this.fetchNasa();
  }

  render() {
    const { nasaData,isLoading } = this.state;
    return (
      <div className="wrapper">
        <h1>ACME</h1><hr />
        <span>
          <input type="date" onChange={this.handleOnChange} className="right"/>
        </span>
        {isLoading ?
        'Loading...'
        :
        <>
        <img src={nasaData.url} height="100%" width="100%" className="banner-image"/>
        <p>{nasaData.explanation}</p>
        </>
        }
        
      </div>
    )
  }
}
