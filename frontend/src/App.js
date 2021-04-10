import React from 'react';
import './App.css';
import {Router} from "react-router-dom"
import {Routing} from "./routing/Routing";
import {history} from './history'

function App() {
  return (
      <div className="App">
        <Router history={history}>
          <Routing/>
        </Router>
      </div>
  );
}

export default App;
