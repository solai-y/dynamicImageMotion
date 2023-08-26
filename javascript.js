const track = document.getElementById('imageTrack');

// The below checks the position of the mouse being put down
window.onmousedown = e => {
    track.dataset.mouseDownAt=e.clientX;
}

// Tracks mouse movement in comparison with the mouse down position
window.onmousemove = e => {
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * 100;
}