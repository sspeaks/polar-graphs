import React from 'react';

import P5Wrapper from 'react-p5-wrapper'
import PointGroup from './pointGroup'
import PointsInput from './pointInput'
import sketch from './sketch'
export default class GraphApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [],
            pointGroups: [],
            addition: 0
        };
    }
    handleSubmit(val, name) {
        var data = val;
        var points = data.split("\n").map((str) => {
            var [radius, degrees] = str.split(/[,\s]+/).map((item) => {
                console.log(item.trim().replace(/[a-zA-Z]/, ""));
                return parseFloat(item.trim().replace(/[a-zA-Z]/, ""))
            });
            return {
                r: radius,
                d: degrees
            };
        });
        var history = this.state.history.slice();
        history.push({
            points: points,
            addition: this.state.addition + 1,
            color: '#FF0000'
        });
        var pointGroups = this.state.pointGroups.slice();
        pointGroups.push( < PointGroup key = {
                this.state.addition + 1
            }
            name = {
                name
            }
            addition = {
                this.state.addition + 1
            }
            color = "#FF0000"
            handleColorChange = {
                this.handleColorChange.bind(this)
            }
            dismissColorGroup = {
                this.dismissColorGroup.bind(this)
            }
            />)
            this.setState({
                history: history,
                addition: this.state.addition + 1,
                pointGroups: pointGroups
            });
        }
        dismissColorGroup(num) {
            var history = this.state.history.slice();
            var indices = [];
            history = history.filter((item, index) => {
                if (item.addition !== num) {
                    return true;
                } else {
                    indices.push(index);
                    return false;
                }
            });
            var pointGroups = this.state.pointGroups.slice();
            for (var i = indices.length - 1; i >= 0; i--) {
                pointGroups.splice(indices[i], 1);
            }
            this.setState({
                history: history,
                pointGroups: pointGroups
            });
        }
        handleColorChange(event) {
            var name = event.target.name;
            var color = event.target.value;
            var history = this.state.history.slice();
            history.map((item) => {
                if ("" + item.addition === name) {
                    item.color = color;
                }
                return item
            });
            this.setState({
                history: history
            });
        }
        render() {
            return ( < div >
                < h1 className = "title-header" > Polar Graph < /h1> < PointsInput onClick = {
                this.handleSubmit.bind(this)
            }
            /> < P5Wrapper sketch = {
            sketch
        }
        pointHistory = {
            this.state.history
        }
        scale = {
            13
        }
        radiusScale = {
            2600
        }
        degreeScale = {
            90
        }
        /> < ul className = "point-groups" > < p style = {
            {
                fontSize: "20px"
            }
        } > {
            (this.state.pointGroups.length > 0) ? "Point Groups" : ""
        } < /p> < div style = { {
            width: "400px",
            height: "300px"
        }
    } > {
        this.state.pointGroups
    } < /div> < /ul > < /div>
)
}
}
