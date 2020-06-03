import React from 'react';
import './App.css';
// import Login from './component/login/login';
import Index from './home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Tabs from './components/tabs/tabs';



function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Index} />
          {/* <Route exact path="/LoginPage" component={Login} /> */}
          <Route exact path="/loginDone" component={Tabs} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;
