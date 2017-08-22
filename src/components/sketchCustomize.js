import React from 'react'
import {
    Grid, Row, Col, Button, FormControl, ControlLabel
}
from 'react-bootstrap'

export default class SketchCustomize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radiusRange: 2000,
            radiusLineCount: 10,
            degreePosition: 6.5,
            secondaryDotStyle: 'Solid'
        };

    }
    onChange(event) {
        var type = event.target.name;
        if (event.target.value.match(/^[\d]*$/)) {
            if (type === "radiusRange") {
                this.setState({
                    radiusRange: event.target.value
                });
            } else if (type === 'radiusLineCount') {
                this.setState({
                    radiusLineCount: event.target.value
                });
            }
        }
        if (event.target.value.match(/^[\d.]*$/)) {
            if (type === 'degreePosition') {
                this.setState({
                    degreePosition: event.target.value
                });
            }
        }
        if (type === 'secondaryDotStyle') {
            this.setState({
                secondaryDotStyle: event.target.value
            })
        }
    }
    onClick() {
        if (this.state.radiusRange === "") {
            alert("Please enter a number for maximum radius range");
            return;
        }
        if (this.state.radiusLineCount === "") {
            alert("Please enter a number of lines for radius")
            return;
        }
        if (this.state.degreePosition === "") {
            alert("Please enter a value to evaluate the position of the degree symbols")
            return;
        }
        this.props.onClick(this.state.radiusRange, this.state.radiusLineCount, this.state.degreePosition, this.state.secondaryDotStyle)
    }
    render() {
        return (
            <Grid style={{width:'25%', position:'absolute', left:'0px', marginTop: '20px', marginLeft:'auto', marginRight:'auto', marginBottom:'20px'}}>
                <Row>
                    <Col sm={3} style={{display:'inline-block'}}>
                        <ControlLabel>Degree Label Position</ControlLabel>
                    </Col>
                    <Col sm={9} style={{display:'inline-block'}}>
                        <FormControl type="text" name="degreePosition" value={this.state.degreePosition} onChange={this.onChange.bind(this)}></FormControl>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3} style={{display:'inline-block'}}>
                        <ControlLabel>Radius Range</ControlLabel>
                    </Col>
                    <Col sm={9} style={{display:'inline-block'}}>
                        <FormControl type="text" name="radiusRange" value={this.state.radiusRange} onChange={this.onChange.bind(this)}></FormControl>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3} style={{display:'inline-block'}}>
                        <ControlLabel>Radius Line Count</ControlLabel>
                    </Col>
                    <Col sm={9} style={{display:'inline-block'}}>
                        <FormControl type="text" name="radiusLineCount" value={this.state.radiusLineCount} onChange={this.onChange.bind(this)}></FormControl>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3} style={{display:'inline-block'}}>
                        <ControlLabel>Secondary Dot Style</ControlLabel>
                    </Col>
                    <Col sm={9} style={{display:'inline-block'}}>
                        <FormControl name='secondaryDotStyle' componentClass="select" placeholder="select" onChange={this.onChange.bind(this)}>
                            <option value="Solid">Solid</option>
                            <option value="Hollow">Hollow</option>
                            <option value="X">X</option>
                        </FormControl>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3} style={{float:'right'}}>
                        <Button bsStyle="primary" className="input-button" onClick={this.onClick.bind(this)}>Save Changes</Button>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
