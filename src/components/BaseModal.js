import React from 'react';

function BaseModal(props){
    return (
        <div className="overlay">
            <div className="modal">
                {props.children}
            </div>
        </div>
    ) 
}

export default BaseModal