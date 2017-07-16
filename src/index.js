import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import P5Wrapper from 'react-p5-wrapper'

export default function sketch(p) {
    class Point {
        constructor(radius, degree, color) {
            this.radius = radius;
            this.degree = degree;
            this.color = color

        }
        show = function() {
            p.stroke(p.color(this.color));
            p.strokeWeight(15);
            var drawRadius = p.map(this.radius, 0, (radiusMax / scale * (scale + 1)), 0, p.sqrt(2) * p.width);
            p.point(drawRadius * p.cos(p.radians(this.degree)), -drawRadius * p.sin(p.radians(this.degree)));
        }
        setColor(hex) {
            this.color = hex;
        }
    }
    var scale = 10;
    var angleMax = 90;
    var radiusMax = 100;
    var showText = true;
    var points = [];
    p.setup = function() {
        p.createCanvas(600, 600);
        p.textSize(p.height / 40);
    };
    p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
        scale = props.scale;
        angleMax = props.degreeScale;
        radiusMax = props.radiusScale;
        points = props.pointHistory.map((tPoints) => {
            var currPoint = [];
            for (var i = 0; i < tPoints.points.length; i++) {
                currPoint.push(new Point(tPoints.points[i].r, tPoints.points[i].d, tPoints.color));
            }
            return currPoint;
        });

    };
    p.draw = function() {
        p.translate(0, p.height);
        p.background(255);

        p.stroke(0);
        p.strokeWeight(1);
        degreeLines(scale, angleMax);
        radiusLines(scale, radiusMax);
        points.map((indexPoints) => indexPoints.map((point) => point.show()));
        if(showText)
        {
            degreeLinesText(scale, angleMax);
            radiusLinesText(scale, radiusMax);
        }

    };
    var toScale = function(frac) {
        return 2 * frac * p.height
    };
    var radiusLines = function(num, scale) {
        for (var i = 0; i < num + 1; i++) {
            var dist = toScale(i * Math.sqrt(2) / (num + 1));
            p.stroke(150);
            p.noFill();
            p.ellipse(0, 0, dist);
            p.fill(0);
        }
    };
    var radiusLinesText = function(num, scale) {
        for (var i = 0; i < num + 1; i++) {
            var dist = toScale(i * Math.sqrt(2) / (num + 1));
            p.stroke(150);
            p.fill(0);
            p.strokeWeight(2);
            p.push();
            p.translate(p.sqrt(2) * dist / 4, -p.sqrt(2) * dist / 4)
            p.rotate(p.radians(45));
            p.text(scale / num * i + "km", -15, 0);
            p.pop();
            p.strokeWeight(1);
        }
    }
    var degreeLines = function(num, scale) {
        var angle = 0;
        var d_angle = (p.PI / 2) / num;
        var width = (p.sqrt(2) * p.width);
        var height = (p.sqrt(2) * p.width);
        var x = (angle, radius) => radius * p.cos(angle);
        var y = (angle, radius) => radius * p.sin(angle);
        for (var i = 0; i < num; i++) {
            var curAngle = angle + (d_angle * i);
            p.stroke(150);
            p.line(0, 0, x(curAngle, width), -y(curAngle, height));
        }
    };
    var degreeLinesText = function(num, scale) {
        var angle = 0;
        var d_angle = (p.PI / 2) / num;
        for (var i = 0; i < num; i++) {
            var curAngle = angle + (d_angle * i);
            p.stroke(150);
            p.push();
            p.rotate(-curAngle);
            p.translate(p.width / 3 + p.width / (num + 1), 0);
            p.strokeWeight(2);
            p.text(scale / (num) * i + "°", 0, 0);
            p.strokeWeight(1);
            p.pop();
        }
    }
};

class PointsInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            csv: "",
            name: ""
        }
    }
    submit() {
        this.setState({
            csv: '',
            name: ''
        });
        this.props.onClick(this.state.csv, this.state.name)
    }
    onChange(event) {
        var type = event.target.name;
        if (type === "csv") {
            this.setState({
                csv: event.target.value
            });
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
                    <button className="input-button" style={{display:"block", float:"right", marginTop:"10px"}} onClick={this.submit.bind(this)}>Submit</button>
                </div>
        );
    }
}

var PointGroup = function(props) {
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

class GraphApp extends React.Component {
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
            var [radius, degrees] = str.split(/[,\s]/).map((item) => parseInt(item.trim(), 10));
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
        pointGroups.push(<PointGroup key={this.state.addition + 1} name={name} addition={this.state.addition + 1} color="#FF0000" handleColorChange={this.handleColorChange.bind(this)}
        dismissColorGroup={this.dismissColorGroup.bind(this)}/>)
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
        return (
            <div>
                <h1 className="title-header">Polar Graph</h1>
                <PointsInput onClick={this.handleSubmit.bind(this)}/>
                <P5Wrapper   sketch = {sketch}
                             pointHistory = {this.state.history}
                             scale = {10}
                             radiusScale = {1000}
                             degreeScale = {90}
                />
                <ul className="point-groups">
                    <p style={{fontSize:"20px"}}>{(this.state.pointGroups.length > 0) ? "Point Groups" : ""}</p>
                    <div style={{width:"400px", height:"300px"}}>
                        {this.state.pointGroups}
                    </div>
                </ul>
            </div>
        )
    }
}



// ========================================

ReactDOM.render(
    <GraphApp />,
    document.getElementById('root')
);
