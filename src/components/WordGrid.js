import React, { useState } from 'react';
import BaseModal from './BaseModal.js';
import WordSquare from './WordSquare';
import PointRecord from './PointRecord';


function WordGrid(props) {

    // Handling state
    const [lettersClicked, updateLettersClicked] = useState([])
    const [keysClicked, updateKeysClicked] = useState([])
    const [listOfSuccessfulWords, addWordToList] = useState([])
    const [totalPoints, updatePoints] = useState(0)
    const [showWrongWordModal, updateModal] = useState(false)

    function handleLetterClick(letterToAdd, letterKey){
        if(keysClicked.includes(letterKey)){
            var keyIndex = keysClicked.indexOf(letterKey)
            updateKeysClicked(keysClicked.filter((element)=>{return element !== letterKey}))
            updateLettersClicked(lettersClicked.filter((element, index, array)=>{return index !== keyIndex}))
        }
        else {
            updateLettersClicked([...lettersClicked,letterToAdd])
            updateKeysClicked([...keysClicked,letterKey])
        }
    }

    function addPoints(word){
        addWordToList([...listOfSuccessfulWords,word])
        updatePoints(totalPoints + word.length)
    }

    async function submitWord(word){
        if(listOfSuccessfulWords.includes(word)){
            alert("Bzzzt! " + word + " was already used. No cheating!" )
        }
        else {
            let response = await fetch("https://api.datamuse.com/words?ml="+word)
            let wordData = await response.json()
            if (wordData.length > 0) {
                console.log("Results: ", wordData)
                addPoints(word)
                updateKeysClicked([])
                updateLettersClicked([])
            }
            else {
                updateModal(true)            
            }
        }
    }

    function updateAfterFailure(){
        updateKeysClicked([])
        updateLettersClicked([])
        updateModal(false)
    }
    
    // Renders the list of grid items
    const gridItems = props.letterArray.map((letter, index) =>
        <WordSquare 
            letter={letter} 
            letterIndex={index} 
            key={index} 
            isClicked={keysClicked.includes(index)} 
            onClick={() => handleLetterClick(letter, index)} 
        />
    )

    const pointList = listOfSuccessfulWords.map((word, index) => 
        <PointRecord
            key={index}
            word={word}
            points={word.length}
        />
    )

    // Inline style object to allow for custom row/column length
    const gridStyle = {
        display: 'grid',
        rowGap: '.25em',
        columnGap: '.25em',
        gridTemplateRows: 'repeat(' + props.rows + ', 1fr)',
        gridTemplateColumns: 'repeat(' + props.columns + ', 1fr)',
    }

    // Render function for WordGrid
    return (
        <section className="board">
            {showWrongWordModal === true && 
                <BaseModal>
                    <p>
                        Sorry, {lettersClicked} is not a word!
                    </p>
                    <p>
                        <button className="standard-button" onClick={updateAfterFailure}>Try Again</button>
                    </p>
                </BaseModal>
            }
            <div className="play-area">
                <div className="grid" style={gridStyle}>
                    {gridItems}
                </div>
                <div className="word-and-button-group">
                    <p className="word">{lettersClicked.join("")}</p>
                    <button className="standard-button" onClick={() => submitWord(lettersClicked.join(""))}>Try Word</button><br/>
                </div>
            </div>
            { listOfSuccessfulWords.length > 0 &&
                <aside className="score-table">
                    <button className="link-button" onClick={props.endGame}>Reset Game</button>
                    <p><strong>Points</strong></p>
                    {pointList}
                    <p>Total Points: <strong>{totalPoints}</strong></p>
                </aside>   
            }         
        </section>
    )
}

export default WordGrid