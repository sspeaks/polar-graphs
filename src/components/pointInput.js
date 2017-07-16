import React from 'react';
import {
    Button
}
from 'react-bootstrap';

export default class PointsInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            csv: "",
            name: ""
        }
    }
    submit() {
        if (this.state.csv === "") {
            alert("Please fill in altitude and angle values");
            return;
        }
        if (this.state.name === "") {
            alert("Please fill in a name for the group of points")
            return;
        }
        this.setState({
            csv: '',
            name: ''
        });
        this.props.onClick(this.state.csv, this.state.name)
    }
    onChange(event) {
        var type = event.target.name;
        if (type === "csv") {
            if (event.target.value.match(/^[,\s\d]*$/)) {
                this.setState({
                    csv: event.target.value
                });
            }
        } else {
            this.setState({
                name: event.target.value
            });
        }
    }
    render() {
        return (
            <div className="points-input-div">
                <label style={{display:"block",fontSize:"20px"}}>Comma seperated points (radius, angle)</label>
                <textArea cols="50" name="csv" value={this.state.csv} onChange={this.onChange.bind(this)} className="pointsInput"></textArea>
                <div>
                    <label>Group Name:</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.onChange.bind(this)} style={{width:"100%"}} ></input>
                </div>
                <Button bsStyle="primary" className="input-button" style={{display:"block", float:"right", marginTop:"10px"}} onClick={this.submit.bind(this)}>Submit</Button>
            </div>
        );
    }
}
