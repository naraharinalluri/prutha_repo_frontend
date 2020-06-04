import React from 'react';
import styles from './App.modules.css';
// import Login from './component/login/login';
import Index from './home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Tabs from './components/tabs/tabs';
import Login from './components/login/login';
import Home from './components/home/Home'
// import Navbar from './components/navbar/navbar'  


function App() {
  return (
    <div id={styles.bg}>
      {/* <Navbar /> */}

      <Router>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logindone" component={Tabs} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;
