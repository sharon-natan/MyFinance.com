import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavigationBar from './Components/NavigationBar'
import CripplesPage from './Components/CripplesPage'
import Home from './Components/Home';
import StockList from './Components/StockList'
import IndexList from './Components/IndexList'

class App extends Component{
  render(){
    return (
      <div>
        <NavigationBar/>
        <Router>
          <Switch>
            <Route path="/Stocks">
              <StockList />
            </Route>
            <Route path="/Indices">
              <IndexList />
            </Route>
            <Route path="/The_cripples_page">
              <CripplesPage />
            </Route>
            <Route path="/">
              <div className="container">
                <Home />
              </div>  
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
