import React from 'react';
import './App.css';
import {Router} from "react-router-dom"
import {Routing} from "./routing/Routing";
import {history} from './history'
import {View} from "./view";

function App() {
  return (
      <div className="App">
              <Router history={history}>
                  <View children={<Routing/>}/>
              </Router>
      </div>
  );
}

export default App;
