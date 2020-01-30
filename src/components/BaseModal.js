import React from 'react';

function BaseModal(props){
    return (
        <div className="overlay">
            {props.isIntroModal ? (
                <div className="modal">
                    <p>
                        Choose your board!
                    </p>
                    <p>
                        <button className="standard-button" onClick={props.onSmall}>Small</button>
                        <button className="standard-button" onClick={props.onMedium}>Medium</button>
                        <button className="standard-button" onClick={props.onLarge}>Large</button>
                    </p>
                </div>
            ) : (
                <div className="modal">
                    <p>
                        Sorry, {props.word} is not a word!
                    </p>
                    <p>
                        <button className="standard-button" onClick={props.onClose}>Small</button>
                    </p>
                </div>
            )}
        </div>
    ) 
}

export default BaseModal