export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export const generateRandomPoint = (limX, limY) => {
    return new Point(Math.random() * limX, Math.random() * limY);
}

export const distance = (p1, p2 = new Point(0, 0)) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

export const getSlope = (p1, p2 = new Point(0, 0)) => {
    return (p1.y - p2.y) / (p1.x - p2.x)
}

export const getAngle = (point, reference = new Point(0, 0)) => {
    const xEdge = point.x - reference.x
    const yEdge = point.y - reference.y
    return Math.atan2(yEdge, xEdge);
}

export const getCentroid = (points) => {
    let xSum = 0
    let ySum = 0
    for (let i = 0; i < points.length; i++) {
        const point = points[i]
        xSum += point.x
        ySum += point.y
    }
    return new Point(xSum / points.length, ySum / points.length);
}

export const generateRandomPoints = (limX, limY, count) => {
    const diagonal = distance(new Point(limX, limY));
    const minMutualLengthAllowed = diagonal / 16;
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
            let distanceFromAllPastPointsMoreThanThreshold = true;
            for (let j = 0; j < randomPoints.length; j++) {
                if (distance(randomPoint, randomPoints[j]) < minMutualLengthAllowed) {
                    distanceFromAllPastPointsMoreThanThreshold = false;
                    break;
                }
            }
            const distanceFromPoint = distance(randomPoint, randomPoints[i - 1])
            if (distanceFromPoint < maxLineLengthAllowed && distanceFromPoint > minLineLengthAllowed && distanceFromAllPastPointsMoreThanThreshold) {
                break;
            }
        }
        randomPoints.push(randomPoint);
    }
    return randomPoints;
}

export const sortPointsSimplePolygon = (points) => {
    const centroid = getCentroid(points);
    const pointsWithAngles = points.map(point => {
        return {point: point, angle: getAngle(point, centroid)}
    });
    pointsWithAngles.sort(
        (pointWithAngle1, pointWithAngle2) =>
            (pointWithAngle1.angle - pointWithAngle2.angle));
    return pointsWithAngles.map(pointWithAngle => pointWithAngle.point)
}