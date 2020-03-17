import React from 'react';
import './App.css';
import Field from "./components/Field";
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

function App() {
  return (
    <div className="App">
        <DndProvider backend={Backend}>
            <h1>Игра "Непересекающиеся прямые"</h1>
            <Field/>
        </DndProvider>
    </div>
  );
}

export default App;
