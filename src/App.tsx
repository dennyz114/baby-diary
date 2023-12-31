import React from 'react';
import './App.scss';
import AppRoutes from './AppRoutes'
import NavigationBar from './components/navigationBar'
import Header from './components/header'

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <Header/>
        <div className={'app-body'}>
          <AppRoutes/>
        </div>
        <NavigationBar/>
      </div>
    </div>
  );
}

export default App;
