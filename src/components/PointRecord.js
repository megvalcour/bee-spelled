import React from 'react';

function PointRecord(props){
    const { word, points } = props

    return (
        <p>{ word } <span className="points">({ points })</span></p>
    )
}

export default PointRecord