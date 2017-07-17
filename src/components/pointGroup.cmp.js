import React from 'react';

export default function PointGroup(props) {
    return (
        <li>
            <label style={{marginRight:"30px"}}>{props.name}</label>
            <span>
                <input type="color" name={props.addition} defaultValue={props.color} onChange={props.handleColorChange}></input>
                <a href="#" className="fa fa-times fa-lg" onClick={() => props.dismissColorGroup(props.addition)}></a>
            </span>
        </li>
    );
}
