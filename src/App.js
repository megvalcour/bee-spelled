import React from 'react';
import WordGrid from './components/WordGrid.js';
import './App.css';

function App() {
    // Produces an array (of n length) of random letters
    function generateRandomLetters(numberOfLetters) {
        // Creates an array of the desired length and populates it with random characters using ASCII codes for a (97) to z (122)
       return [...new Array(numberOfLetters)].map(() => String.fromCharCode(Math.random() * (122 - 97) + 97)) 
    } 
    return (
        <div className="App">
        <header className="App-header">
            <h1>BeeSpelled</h1>
            <WordGrid 
                rows={4}
                columns={4}
                letterArray={generateRandomLetters(4*4)}
            />
        </header>
        </div>
    );
}



export default App;
