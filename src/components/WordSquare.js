import React from 'react';

function WordSquare(props){
    const {letterIndex, letter, onClick, isClicked } = props
    
    return (
        <div key={ letterIndex } onClick={ onClick } className={ isClicked ? 'grid-item clicked-square' : 'grid-item' }>
            { letter }
        </div>
    )
}

export default WordSquare