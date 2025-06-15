const TABS = {
    UPLOAD: 'upload',
    REALTIME: 'realtime',
}


const renderBox = (predictions: any, context: any) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.textBaseline = 'top';

    predictions.forEach((prediction: any) => {
        const [x, y, width, height] = prediction.bbox;
        const label = prediction?.class;
        const score = prediction?.score * 100;

        context.strokeStyle = '#00FF00';
        context.fillStyle = 'pink';
        context.lineWidth = 3;
        context.strokeRect(x, y, width, height);

        context.width = Math.max(context.measureText(label).width, 100);
        context.fillStyle = '#fff';
        context.fillText(`${label} (${score.toFixed(2)}%)`, x + 5, y + 5);
    })
       //sample
//   [
//     {
//         "bbox": [
//             11.728343963623047,
//             180.00357627868652,
//             632.4903297424316,
//             297.60995864868164
//         ],
//         "class": "person",
//         "score": 0.7072389721870422
//     }
// ]

}

export { TABS, renderBox };