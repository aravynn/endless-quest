import React from 'react';


function TurnControl(props){
    // returns the controller for running who's turn it is.
    
    return(
        <div
            className = "turncontrolwrapper"
        >
            <div
                classNme = "turndescription"
            >
                Player: {props.playerID}
            </div>
            <button
                onClick = {(rem) => props.callback(-1)}
            >
                Next Turn
            </button>
        </div>

    );
}

export {TurnControl};