import React from 'react';
import './App.css';
import Field from "./Components/Field/Field";
import Header from "./Components/Header/Header";
import CellSelector from "./Components/CellSelector/CellSelector";

function App() {
    return (
        <div className="App">
            <Header/>
            <CellSelector/>
            <Field/>
        </div>
    );
}

export default App;
