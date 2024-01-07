import {weapons, spells, items} from './gamedata';

function ActionPanel(props) {

    let actionList = [];

    //alert(weapons.Close[3]);
    //alert(weapons['Close'][3]);


    switch(props.name){
        case "Attack": 
            let a = props.actionList.weapons;
            a.forEach((data, index) => {
                //alert(data.Type + ' '+ data.Level + ' ' + weapons[data.Type][data.Level]);
                actionList[index] = {
                    name: weapons[data.Type][data.Level]
                };
            });
            break;
        case "Spell":
            actionList = props.actionList.spells;
            break;
        case "Item":
            actionList = props.actionList.items;
            break;
        case "Search":
        default:
            actionList = [];
            break;

    }


    const options = actionList.map((data, index) => {
        alert(actionList[index].name);
       
       
        return(
            <button

            >
                {data.name}
            </button>
        );
    });

    return( 
        <div
            className="actionFrame highlight"
        >
            <label>{props.name}</label>
            {options}
        </div>
    );
}

export {ActionPanel};