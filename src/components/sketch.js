export default function sketch(p) {
    class Point {
        constructor(radius, degree, color, size) {
            this.radius = radius;
            this.degree = degree;
            this.color = color;
            this.size = size;

        }
        show = function() {
            p.stroke(p.color(this.color));
            p.stroke(100);
            p.strokeWeight(1);
            p.fill(p.color(this.color));
            var drawRadius = p.map(this.radius, 0, (radiusMax / scale * (scale + 1)), 0, p.sqrt(2) * p.width);
            p.ellipse(drawRadius * p.cos(p.radians(this.degree)), -drawRadius * p.sin(p.radians(this.degree)), this.size);
        }
        setColor(hex) {
            this.color = hex;
        }
        setSize(size) {
            this.size = size;
        }
    }
    var scale = 10;
    var angleMax = 90;
    var radiusMax = 100;
    var showText = true;
    var degreePosition = 3;
    var points = [];
    p.setup = function() {
        p.windowResized();
    };
    p.windowResized = function() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        if (600 <= width && 600 <= height) {
            p.createCanvas(600, 600);
        } else {
            var min = (width > height) ? height : width;
            p.createCanvas(min, min);
        }
        p.textSize(p.height / 40);
    }
    p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
        scale = props.scale;
        angleMax = props.degreeScale;
        radiusMax = props.radiusScale;
        degreePosition = props.degreePosition
        points = props.pointHistory.map((tPoints) => {
            var currPoint = [];
            for (var i = 0; i < tPoints.points.length; i++) {
                currPoint.push(new Point(tPoints.points[i].r, tPoints.points[i].d, tPoints.color, tPoints.size));
            }
            return currPoint;
        });

    };
    p.draw = function() {
        p.translate(0, p.height);
        p.background(255);

        p.stroke(0);
        p.strokeWeight(1);
        degreeLines(10 - 1, angleMax);
        radiusLines(parseFloat(scale), parseFloat(radiusMax));
        points.map((indexPoints) => indexPoints.map((point) => point.show()));
        p.fill(0);
        if (showText) {
            degreeLinesText(10 - 1, angleMax);
            radiusLinesText(parseFloat(scale), parseFloat(radiusMax));
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
            p.textAlign(p.CENTER);
            p.text(scale / num * i + "km", 0, 0);
            p.textAlign(p.LEFT);
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
            p.translate(p.width / degreePosition + p.width / (num + 1), 0);
            p.strokeWeight(2);
            p.text(scale / (num) * i + "°", 0, 0);
            p.strokeWeight(1);
            p.pop();
        }
    }
};
