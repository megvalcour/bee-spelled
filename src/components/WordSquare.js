import React from 'react';

function WordSquare(props){
    return (
        <div key={props.letterIndex} onClick={props.onClick} className={props.isClicked ? 'grid-item clicked-square' : 'grid-item'}>
            {props.letter}
        </div>
    )
}

export default WordSquare