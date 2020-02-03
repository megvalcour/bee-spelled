import React, { useState } from 'react';
import WordGrid from './components/WordGrid.js';
import BaseModal from './components/BaseModal.js';
import './App.css';

function App() {

    // App state
    const [size, updateSize] = useState(0)

    // Produces an array (of n length) of random letters
    function generateRandomLetters(numberOfLetters) {
        // Creates an array of the desired length and populates it with random characters using ASCII codes for a (97) to z (122)
       return [...new Array(numberOfLetters)].map(() => String.fromCharCode(Math.random() * (122 - 97) + 97)) 
    } 
    return (
        <div className="App">
        <header className="App-header">
            <h1>BeeSpelled</h1>

            { size === 0 ? (
                <BaseModal>
                    <p>
                        Choose your board!
                    </p>
                    <p>
                        <button className="standard-button" onClick={() => {updateSize(4)}}>Small</button>
                        <button className="standard-button" onClick={() => {updateSize(6)}}>Medium</button>
                        <button className="standard-button" onClick={() => {updateSize(8)}}>Large</button>
                    </p>
                </BaseModal>
            ) : (
                <WordGrid 
                    rows={size}
                    columns={size}
                    letterArray={generateRandomLetters(size*size)}
                    endGame={()=>{updateSize(0)}}
                />
            )}
        </header>
        </div>
    );
}



export default App;
