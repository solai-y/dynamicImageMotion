const track = document.getElementById('imageTrack');

// The below checks the position of the mouse being put down
window.onmousedown = e => {
    track.dataset.mouseDownAt=e.clientX;
}

// The below resets the mouse position when the mouse is released
window.onmouseup = e => {
    track.dataset.mouseDownAt = "0";
}

// Tracks mouse movement in comparison with the mouse down position
window.onmousemove = e => {
    // if mouse is not put down do not run the rest of the code
    if (track.dataset.mouseDownAt === "0") return;

    // run this code when mouse moves, after mouse is down (checked by the if statement above)
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    // calculate percentage of movement of the mouse
    const percentage = (mouseDelta / maxDelta) * -100;

    // adjust style of the track based on the percentage moved
    track.style.transform = `translate(${percentage}%, -50%)`;
}