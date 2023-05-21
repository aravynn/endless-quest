import React from 'react';


function TurnControl(props){
    // returns the controller for running who's turn it is.
    let haveActions = props.actionsRemain > 0 ? true : false;
    let haveMovement = props.stepsRemain > 1 ? true : false;

    return(
        <div
            className = "turncontrolwrapper"
        >
            <div
                classNme = "turndescription"
            >
                Player: {props.playerID} <br />
                Actions Left: {props.actionsRemain} <br />
                Movement Left: {props.stepsRemain - 1}
            </div>

            <div className='actionFrame'>
                <label>Movement</label>
                <button
                    onClick = {() => props.MoveCallback(-1)}
                    disabled = {!haveMovement}
                >
                    Move
                </button>
            </div>

            <div className='actionFrame'>
                <label>Actions</label>
                <button
                    onClick = {() => props.AttackCallback()}
                    disabled = {!haveActions}
                >
                    Attack
                </button>
                <button
                    disabled = {!haveActions}
                    onClick = {() => props.SpellCallback()}
                >
                    Cast Spell
                </button>
                <button
                    disabled = {!haveActions}
                    onClick = {() => props.UseItemCallback()}
                >
                    Use Item
                </button>
                <button
                    disabled = {!haveActions}
                    onClick = {() => props.SearchCallback()}
                >
                    Search Room
                </button>
            </div>

            <button
                onClick = {(rem) => props.EndTurnCallback(-1)}
                className="endTurn"
            >
                Next Turn
            </button>
        </div>

    );
}

export {TurnControl};