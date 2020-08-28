import React, {useEffect, useRef} from 'react';
import {MODE__SIMPLE_POLYGON} from "../mode";

const BLACK = '#000';
const WHITE = '#FFF';

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const generateRandomPoint = (limX, limY) => {
    return new Point(Math.random() * limX, Math.random() * limY);
}

const distance = (p1, p2 = new Point(0, 0)) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

const getSlope = (p1, p2 = new Point(0, 0)) => {
    return (p1.y - p2.y) / (p1.x - p2.x)
}

const getAngle = (point, reference = new Point(0, 0)) => {
    const xEdge = point.x - reference.x
    const yEdge = point.y - reference.y
    return Math.atan2(yEdge, xEdge);
}

const getCentroid = (points) => {
    let xSum = 0
    let ySum = 0
    for (let i = 0; i < points.length; i++) {
        const point = points[i]
        xSum += point.x
        ySum += point.y
    }
    return new Point(xSum / points.length, ySum / points.length);
}

const generateRandomPoints = (limX, limY, count) => {
    const diagonal = distance(new Point(limX, limY));
    const minLineLengthAllowed = diagonal / 4;
    const maxLineLengthAllowed = diagonal / 2;
    const randomPoints = []
    for (let i = 0; i < count; i++) {
        let randomPoint;
        while (true) {
            randomPoint = generateRandomPoint(limX, limY);
            if (i === 0) {
                break;
            }
            const distanceFromPoint = distance(randomPoint, randomPoints[i - 1])
            if (distanceFromPoint < maxLineLengthAllowed && distanceFromPoint > minLineLengthAllowed) {
                break;
            }
        }
        randomPoints.push(randomPoint);
    }
    return randomPoints;
}

const Canvas = props => {
    const canvasRef = useRef(null);
    let randomPoints = [];

    const setRandomPoints = () => {
        if (randomPoints.length === 0) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d')
            const canvasWidth = context.canvas.width
            const canvasHeight = context.canvas.height
            randomPoints = generateRandomPoints(canvasWidth, canvasHeight, props.numberOfPoints)
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        // Make it visually fill the positioned parent
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        // ...then set the internal size to match
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const context = canvas.getContext('2d')
        context.fillStyle = BLACK;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    }, [])

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')
        context.fillStyle = BLACK;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    }

    const drawLine = (p1, p2) => {
        if (!p1 || !p2) {
            return
        }
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')
        context.strokeStyle = WHITE;
        context.lineWidth = 1;
        context.lineCap = 'round';
        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.stroke();
    }


    const drawLines = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')
        context.strokeStyle = WHITE;
        context.lineWidth = 1;
        context.lineCap = 'round';
        if (randomPoints.length > 0) {
            const firstPoint = randomPoints[0];
            context.moveTo(firstPoint.x, firstPoint.y);
            for (let i = 0; i < props.numberOfPoints - 1; i++) {
                drawLine(randomPoints[i], randomPoints[i+1])
            }
        }
    }

    const drawPoints = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')
        context.strokeStyle = WHITE;
        context.fillStyle = BLACK;
        context.lineWidth = 2;
        context.lineCap = 'round';
        if (randomPoints.length > 0) {
            for (let i = 0; i < props.numberOfPoints; i++) {
                context.beginPath();
                const pointToDraw = randomPoints[i];
                context.arc(pointToDraw.x, pointToDraw.y, 5, 0, 2 * Math.PI);
                context.stroke();
                context.fill();
            }
        }
    }

    const sortPointsSimplePolygon = () => {
        const centroid = getCentroid(randomPoints);
        const pointsWithAngles = randomPoints.map(point => {
            return {point: point, angle: getAngle(point, centroid)}
        });
        pointsWithAngles.sort(
            (pointWithAngle1, pointWithAngle2) =>
                (pointWithAngle1.angle - pointWithAngle2.angle));
        randomPoints = pointsWithAngles.map(pointWithAngle => pointWithAngle.point)
    }

    if (canvasRef && canvasRef.current) {
        setRandomPoints()
        if (props.mode === MODE__SIMPLE_POLYGON) {
            sortPointsSimplePolygon()
        }
        clearCanvas();
        drawLines();
        if (props.mode === MODE__SIMPLE_POLYGON) {
            drawLine(randomPoints[0], randomPoints[randomPoints.length - 1]);
        }
        drawPoints();
    }
    return <canvas ref={canvasRef}/>
}

export default Canvas;