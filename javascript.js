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
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
        // the code find the new percentage to add and adds it to the prev-percentage dataset that is put into the html this way the data of amount moved is stored and can be used to calculate how much further to move the track when the mouse is down again

        // one issue at this point is that the track can be moved indefinitely in either direction to fix this we will use max and min functions to prevent the number from going under or above a certain threshold that is why we use the min and max functions

        // we add the percentage to this dataset to help transfer the data from this function to the onmouseup event handler which will store the value on the html side for referral
        track.dataset.percentage = nextPercentage;
        
        

    // adjust style of the track based on the percentage moved
    track.animate({
        transform : `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards"});

    // what we are doing here is to adjust the css of the image to be offset by the amount of movement there is in the mousemove
    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition : `${nextPercentage + 100}% 50%`
        }, { duration: 1200, fill: "forwards"});
    }
}