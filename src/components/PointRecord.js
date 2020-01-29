import React from 'react';

function PointRecord(props){
    return (
        <p>{ props.word } <span className="points">({ props.points })</span></p>
    )
}

export default PointRecord