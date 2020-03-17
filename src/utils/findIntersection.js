const getVectorComposition = (ax, ay, bx, by) => {
    return (ax * by - bx * ay);
};

const areVectorsCrossed = (point1, point2, point3, point4) => {
    const v1 = getVectorComposition(point4.left - point3.left, point4.top - point3.top,
        point1.left - point3.left, point1.top - point3.top);
    const v2 = getVectorComposition(point4.left - point3.left, point4.top - point3.top,
        point2.left - point3.left, point2.top - point3.top);
    const v3 = getVectorComposition(point2.left - point1.left, point2.top - point1.top,
        point3.left - point1.left, point3.top - point1.top);
    const v4 = getVectorComposition(point2.left - point1.left, point2.top - point1.top,
        point4.left - point1.left, point4.top - point1.top);

    return v1 * v2 < 0 && v3 * v4 < 0;
};

export default areVectorsCrossed;