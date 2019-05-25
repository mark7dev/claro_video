import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Components/Header';
import Content from './Components/Content';
import Item from './Components/Item';


export default class App extends Component {
  render() {
    return (
      <>
        <Header/>
        <Switch>
          <Route exact path='/' component={ Content }/>
          <Route path='/:id' component={ Item }/>
        </Switch>
      </>
    )
  }
}
