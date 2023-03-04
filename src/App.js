
import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component  {

  state={
    progress:10,
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render (){
    return(
    <Router>
     <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
    <Switch>
      <Route exact path="/"><News setProgress={this.setProgress}  key="general" country='in' category='general'/></Route>
      <Route exact path="/business"><News setProgress={this.setProgress}  key='business' country='in' category='business'/></Route>
      <Route exact path="/entertainment"><News setProgress={this.setProgress}  key='entertainment' country='in' category='entertainment'/></Route>
      <Route exact path="/science"><News setProgress={this.setProgress}  key='science' country='in' category='science'/></Route>
      <Route exact path="/sports"><News setProgress={this.setProgress}  key='sports' country='in' category='sports'/></Route>
      <Route exact path="/technology"><News setProgress={this.setProgress}   key='technology' country='in' category='technology'/></Route>
      <Route exact path="/health"><News setProgress={this.setProgress}  key='health' country='in' category='health'/></Route>
    </Switch>
    </Router>
    )
  }
  ;
}

