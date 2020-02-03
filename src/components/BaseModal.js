import React from 'react';

function BaseModal(props){
    const { children } = props
    return (
        <div className="overlay">
            <div className="modal">
                {children}
            </div>
        </div>
    ) 
}

export default BaseModal