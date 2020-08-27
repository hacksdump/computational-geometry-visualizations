import React, {useEffect, useRef} from 'react';

const BLACK = '#000';
const WHITE = '#FFF';

class Point
{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const generateRandomPoint = (limX, limY) => {
    return new Point(Math.random() * limX, Math.random() * limY);
}

const generateRandomPoints = (limX, limY, count) => {
    const randomPoints = []
    for (let i = 0; i < count; i++) {
        randomPoints.push(generateRandomPoint(limX, limY))
    }
    return randomPoints;
}

const Canvas = props => {
    const canvasRef = useRef(null);
    let randomPoints;

    const setRandomPoints = () => {
        if (!randomPoints) {
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
        canvas.style.width ='100%';
        canvas.style.height='100%';
        // ...then set the internal size to match
        canvas.width  = canvas.offsetWidth;
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

    const drawLines = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')
        context.strokeStyle = WHITE;
        context.lineWidth = 1;
        context.lineCap = 'round';
        context.beginPath();
        if (props.numberOfPoints > 0) {
            const firstPoint = randomPoints[0];
            context.moveTo(firstPoint.x, firstPoint.y);
            for (let i = 1; i < props.numberOfPoints; i++) {
                const targetPoint = randomPoints[i];
                context.lineTo(targetPoint.x, targetPoint.y);
                context.stroke();
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
        if (props.numberOfPoints > 0) {
            for (let i = 0; i < props.numberOfPoints; i++) {
                context.beginPath();
                const pointToDraw = randomPoints[i];
                context.arc(pointToDraw.x, pointToDraw.y, 5, 0, 2 * Math.PI);
                context.stroke();
                context.fill();
            }
        }
    }

    if (canvasRef && canvasRef.current) {
        setRandomPoints()
        clearCanvas();
        drawLines();
        drawPoints();
    }
    return <canvas ref={canvasRef}/>
}

export default Canvas;