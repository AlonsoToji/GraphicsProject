// Plotly3D.js

export function plotlyCube() {
    showPlotly();
    const size = 1.5;
    const v = [
        [-size,-size,-size],[size,-size,-size],[size,size,-size],[-size,size,-size],
        [-size,-size,size],[size,-size,size],[size,size,size],[-size,size,size]
    ];
    const f = [[0,1,2,3],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]];
    plotMesh(v, f, 'lightblue');
}

export function plotlyPyramid() {
    showPlotly();
    const size = 1.5;
    const v = [
        [-size, -size, 0],
        [size, -size, 0],
        [size, size, 0],
        [-size, size, 0],
        [0, 0, size * 1.5]
    ];
    const f = [[0,1,4],[1,2,4],[2,3,4],[3,0,4],[0,1,2,3]];
    plotMesh(v, f, 'lightcoral');
}

export function plotlySphere() {
    showPlotly();
    const radius = 1.5;
    let u = [], v = [];
    for (let i = 0; i < 30; i++) {
        u.push(i * Math.PI / 30);
        v.push(i * 2 * Math.PI / 30);
    }
    let x = [], y = [], z = [];
    for (let i = 0; i < u.length; i++) {
        let rowX = [], rowY = [], rowZ = [];
        for (let j = 0; j < v.length; j++) {
            rowX.push(radius * Math.sin(u[i]) * Math.cos(v[j]));
            rowY.push(radius * Math.sin(u[i]) * Math.sin(v[j]));
            rowZ.push(radius * Math.cos(u[i]));
        }
        x.push(rowX);
        y.push(rowY);
        z.push(rowZ);
    }
    Plotly.newPlot('plot3d', [{
        type: 'surface',
        x, y, z,
        opacity: 0.8
    }]);
}

export function plotlyRectangularPrism() {
    showPlotly();
    const w = 1, h = 2, d = 0.5;
    const v = [
        [-w,-h,-d],[w,-h,-d],[w,h,-d],[-w,h,-d],
        [-w,-h,d],[w,-h,d],[w,h,d],[-w,h,d]
    ];
    const f = [[0,1,2,3],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]];
    plotMesh(v, f, 'orange');
}

function plotMesh(vertices, faces, color) {
    const x=[], y=[], z=[], i=[], j=[], k=[];

    faces.forEach(face => {
        if (face.length === 3) {
            i.push(face[0]); j.push(face[1]); k.push(face[2]);
        } else if (face.length === 4) {
            i.push(face[0]); j.push(face[1]); k.push(face[2]);
            i.push(face[0]); j.push(face[2]); k.push(face[3]);
        }
    });

    vertices.forEach(vtx => {
        x.push(vtx[0]);
        y.push(vtx[1]);
        z.push(vtx[2]);
    });

    Plotly.newPlot('plot3d', [{
        type: 'mesh3d',
        x, y, z,
        i, j, k,
        opacity: 0.7,
        color: color
    }]);
}

function showPlotly() {
    document.getElementById('canvas').classList.add('hidden');
    document.getElementById('plot3d').classList.remove('hidden');
}
