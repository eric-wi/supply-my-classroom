import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Teachers from './pages/Teachers';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/teachers" component={Teachers} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;