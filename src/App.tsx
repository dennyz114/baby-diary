import React from 'react';
import './App.scss';
import AppRoutes from './AppRoutes'
import NavigationBar from './components/navigationBar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Diario de Alice</h1>
        <AppRoutes/>
        <NavigationBar/>
      </header>
    </div>
  );
}

export default App;
