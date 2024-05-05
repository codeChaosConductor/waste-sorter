// DOM Elements
const boxes = document.querySelectorAll(".box");
const items = document.querySelectorAll(".item");
const trashcans = document.querySelectorAll(".box");
const trueElement = document.querySelector('.true');
const falseElement = document.querySelector('.false');
const guessCountContainer = document.querySelector('.guessCountContainer');

/*
trashcans:
0=black
1=blue
2=yellow
3=brown
*/
const correctSorts = [3, 2, 2, 0, 1, 2, 1, 1, 3, 0, 2, 3, 1, 2, 0, 3, 2];
let correctGuessCount = 0;
let currentIndex = 0; // Index of the currently displayed item

// Show the initial item
showItem(currentIndex);

async function evaluateItem(index, trashIndex) {
    if (correctSorts[index] == trashIndex) {
        falseElement.style.display = "none";
        trueElement.style.display = "block";
        correctGuessCount++;
    } else {
        falseElement.style.display = "block";
        trueElement.style.display = "none";
    }
    setTimeout(function () {
        falseElement.style.display = "none";
        trueElement.style.display = "none";
    }, 1500);
}

// Function to show the item at the given index
function showItem(index) {
    // Hide all items
    items.forEach(item => {
        item.style.display = "none";
    });

    // Show the item at the given index
    items[index].style.display = "block";
}

// Event listeners for each item
items.forEach(item => {
    // Dragstart event
    item.addEventListener("dragstart", () => {
        item.classList.add("dragging");
    });

    // Dragend event
    item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
    });
});

// Event listeners for each item
items.forEach(item => {
    // Dragstart event
    item.addEventListener("dragstart", () => {
        item.classList.add("dragging");
    });

    // Dragend event
    item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
    });
});

// Event listeners for each box
boxes.forEach(box => {
    // Dragover event
    box.addEventListener("dragover", (e) => {
        e.preventDefault();
        box.classList.add("hovered");
    });

    // Dragleave event
    box.addEventListener("dragleave", () => {
        box.classList.remove("hovered");
    });

    // Drop event
    box.addEventListener("drop", (e) => {
        e.preventDefault();
        const draggedItem = document.querySelector(".dragging");
        box.appendChild(draggedItem);
        // Set the index of the trashcan where the item was sorted
        let sortedTrashcanIndex = Array.from(trashcans).indexOf(box);
        console.log(sortedTrashcanIndex);
        evaluateItem(currentIndex, sortedTrashcanIndex);
        // Remove the item from DOM after dropping into the box
        draggedItem.remove();

        // Show the next item if available
        if (currentIndex < items.length - 1) {
            currentIndex++;
            showItem(currentIndex);
        } else {
            setTimeout(function () {
                falseElement.style.display = "none";
                trueElement.style.display = "none";
                guessCountContainer.innerHTML = "<p>" + correctGuessCount + "/" + correctSorts.length + " Items richtig einsortiert</p>";
            }, 2000);
        }
    });
});