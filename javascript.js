const track = document.getElementById('imageTrack');

// The below checks the position of the mouse being put down
window.onmousedown = e => {
    track.dataset.mouseDownAt=e.clientX;
}

// The below resets the mouse position when the mouse is released
window.onmouseup = e => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

// Tracks mouse movement in comparison with the mouse down position
window.onmousemove = e => {
    // if mouse is not put down do not run the rest of the code
    if (track.dataset.mouseDownAt === "0") return;

    // run this code when mouse moves, after mouse is down (checked by the if statement above)
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    // calculate percentage of movement of the mouse
    const percentage = (mouseDelta / maxDelta) * -100, 
        nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
        // the code find the new percentage to add and adds it to the prev-percentage dataset that is put into the html this way the data of amount moved is stored and can be used to calculate how much further to move the track when the mouse is down again

        // we add the percentage to this dataset to help transfer the data from this function to the onmouseup event handler which will sotre the value on the html side for referral
        track.dataset.percentage = nextPercentage;
        

    // adjust style of the track based on the percentage moved
    track.style.transform = `translate(${nextPercentage}%, -50%)`;
}