import React from 'react';

function BaseModal(props){
    return (
        <div class="modal">
            {props.message}
            <p>
                <button onClick={props.onClick}>{props.buttonText}</button>
            </p>
        </div>
    )
}

export default BaseModal