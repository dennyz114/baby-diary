import React from 'react';
import logo from './logo.svg';
import './App.css';
import DiaryItems from './components/DiaryItems'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Alice Diary.
        </p>
        <DiaryItems/>
      </header>
    </div>
  );
}

export default App;
