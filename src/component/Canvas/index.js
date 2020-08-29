import React, {useEffect, useRef} from 'react';
import {MODE__SIMPLE_POLYGON} from "../../mode";
import {Point, sortPointsSimplePolygon} from "../../geometry";

const BLACK = '#000';
const WHITE = '#FFF';
const OFF_WHITE = '#F5F2E0'
const LIGHT_CORAL = 'lightcoral'

const Index = props => {
    const canvasRef = useRef(null);

    const getScaledPoints = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')
        const canvasWidth = context.canvas.width
        const canvasHeight = context.canvas.height
        return props.points.map(point =>
            new Point(point.x * canvasWidth, point.y * canvasHeight)
        )
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        // Make it visually fill the positioned parent
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        // ...then set the internal size to match
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        clearCanvas();
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


    const drawPolygon = (points, closed = true) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')
        context.strokeStyle = WHITE;
        context.lineWidth = 1;
        context.lineCap = 'round';
        if (points.length > 0) {
            const firstPoint = points[0];
            context.beginPath();
            context.moveTo(firstPoint.x, firstPoint.y);
            for (let i = 1; i < points.length; i++) {
                const targetPoint = points[i]
                context.lineTo(targetPoint.x, targetPoint.y)
            }
            if (closed) {
                context.closePath();
            }
            context.stroke();
            if (closed) {
                context.fillStyle = OFF_WHITE;
                context.fill();
            }
        }
    }

    const drawPoints = (points) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')
        context.strokeStyle = WHITE;
        context.fillStyle = BLACK;
        context.lineWidth = 2;
        context.lineCap = 'round';
        if (points.length > 0) {
            for (let i = 0; i < points.length; i++) {
                context.beginPath();
                const pointToDraw = points[i];
                context.arc(pointToDraw.x, pointToDraw.y, 5, 0, 2 * Math.PI);
                context.stroke();
                context.fillStyle = LIGHT_CORAL
                context.fill();
            }
        }
    }

    if (canvasRef && canvasRef.current) {
        clearCanvas();
        if (props.points && props.points.length > 0) {
            let points = getScaledPoints()
            let closed = false;
            if (props.mode === MODE__SIMPLE_POLYGON) {
                points = sortPointsSimplePolygon(points);
                closed = true
            }
            drawPolygon(points, closed);
            drawPoints(points);
        }
    }

    return <canvas ref={canvasRef}/>
}

export default Index;