import React, { useState } from 'react';
import WordSquare from './WordSquare';
import PointRecord from './PointRecord';


function WordGrid(props) {

    // Handling state
    const [lettersClicked, updateLettersClicked] = useState([])
    const [keysClicked, updateKeysClicked] = useState([])
    const [listOfSuccessfulWords, addWordToList] = useState([])
    const [totalPoints, updatePoints] = useState(0)

    function handleLetterClick(letterToAdd, letterKey){
        if(keysClicked.includes(letterKey)){
            let index = keysClicked.indexOf(letterKey)
            updateKeysClicked(keysClicked.splice(index, 1))
            updateLettersClicked(lettersClicked.splice(index, 1))
        }
        else {
            updateLettersClicked(lettersClicked.concat([letterToAdd]))
            updateKeysClicked(keysClicked.concat([letterKey]))
        }
    }

    function addPoints(word){
        addWordToList(listOfSuccessfulWords.concat([word]))
        updatePoints(totalPoints + word.length)
    }

    async function submitWord(word){
        if(listOfSuccessfulWords.includes(word)){
            alert("Bzzzt! " + word + " was already used. No cheating!" )
        }
        else {
            let response = await fetch("https://api.datamuse.com/words?sp="+word+"&md=d")
            let wordData = await response.json()
            if (wordData.length > 0 && wordData[0].defs !== undefined) {
                console.log("Results: ", wordData)
                addPoints(word)
            }
            else {
                console.log("Not a word!")
                alert("Bzzzt! " + word + " is not a word. Try again!" )
            }
        }
        updateKeysClicked([])
        updateLettersClicked([])
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
        rowGap: '.5em',
        columnGap: '.5em',
        gridTemplateRows: 'repeat(' + props.rows + ', 1fr)',
        gridTemplateColumns: 'repeat(' + props.columns + ', 1fr)'
    }

    // Render function for WordGrid
    return (
        <section className="board">
            <div className="play-area">
                <div className="grid" style={gridStyle}>
                    {gridItems}
                </div>
                <div className="word-and-button-group">
                    <p className="word">{lettersClicked.join("")}</p>
                    <button onClick={() => submitWord(lettersClicked.join(""))}>Send Word</button>
                </div>
            </div>
            { listOfSuccessfulWords.length > 0 &&
                <aside className="score-table">
                    <p><strong>Points</strong></p>
                    {pointList}
                    <p>Total Points: <strong>{totalPoints}</strong></p>
                </aside>   
            }         
        </section>
    )
}

export default WordGrid