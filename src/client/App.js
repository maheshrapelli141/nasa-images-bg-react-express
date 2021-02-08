import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

export default class App extends Component {
  state = {
    date: null,
    nasaData: {},
    readFull: false,
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

  toggleReadFull = () => this.setState({ readFull: !this.state.readFull });

  render() {
    const { nasaData,isLoading,readFull } = this.state;
    return (
      <div style={{position: 'relative',width:'100vw',height: '100vh',color:'#fff',backgroundColor: '#000',backgroundImage: `url(${nasaData.url})`,backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>
        <div className="bottom-section" style={{textAlign:'center',position: 'absolute',bottom:'10px',left:'50%',transform:'translate(-50%,-50%)'}}>
          {isLoading ? 
          'Loading...'
        :
        <>
          <h2>{nasaData?.title}</h2>
          <small>
            <b>Date: {nasaData?.date}</b> |{' '}
          <span>Change Date: <input type="date" onChange={this.handleOnChange}/></span></small>
          <p>
            {nasaData?.explanation?.substr(0,readFull ? nasaData?.explanation.length-1 : nasaData?.explanation.indexOf('.') )}
            {' '}<a href="#" onClick={this.toggleReadFull}>show {readFull ? 'less' : 'more'}</a>
          </p>
        </>
        }
        </div>
      </div>
    );
    // return (
    //   <div className="wrapper container">
    //     <h1>ACME</h1>
    //     <div className="row">
    //       <div className="col-sm-4">
    //         <label>Select date to change details: </label>
    //         <input type="date" onChange={this.handleOnChange} className="form-control" value={this.formatDate(this.state.date)}/>
    //       </div>
          
    //     </div>
    //     <hr />
    //       <br />
    //     {isLoading ?
    //   'Loading...'  
    //   :
    //   <div className="row">
    //     <div className="col-sm-6">
    //       <img src={nasaData?.url} className="banner-image rounded img-thumbnail"/>
    //     </div>
    //     <div className="col-sm-6">
        
        
    //       <h4>{nasaData?.title}</h4>
    //       <small>{nasaData?.date}</small>
    //       <p>{nasaData?.explanation}</p>  
    //     </div>
        
    //   </div>
    //   }
    //   </div>
    // );
  }
}
