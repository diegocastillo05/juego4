function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
    event.target.classList.add("dragging");
}

function dragend(event) {
    event.target.classList.remove("dragging");
}

const btncontinuar = document.querySelector("#continuar");
const btnvolver = document.querySelector("#volver");
const cardContentImagen = document.querySelector(".cardContentImagen");

function drop(event) {
    event.preventDefault();

    if (!event.target.classList.contains("ContentItem")) {
        console.log("No puedes soltar aquí.");
        return;
    }

    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);

    const existingItem = event.target.querySelector(".item");
    if (!existingItem) {
        const contentImage = event.target.querySelector("img");

        if (contentImage) {
            contentImage.insertAdjacentElement("afterend", draggedElement);
            event.target.classList.add("active");

            if (draggedElement.classList.contains("true")) {
                event.target.classList.add("true");
                event.target.classList.remove("false");
            } else {
                event.target.classList.add("false");
                event.target.classList.remove("true");
            }
        }
    } else {
        console.log("Este espacio ya tiene un ítem.");
    }

    updateButtonsState();
    updateCardContentImagen();
}

function updateButtonsState() {
    const allContentItems = document.querySelectorAll(".ContentItem");
    const allTrueItems = document.querySelectorAll(".ContentItem .item.true");

    const allItemsTrue = allTrueItems.length === allContentItems.length;

    if (allItemsTrue) {
        btncontinuar.classList.add("active");
        btnvolver.classList.remove("active");
    } else {
        btncontinuar.classList.remove("active");
        btnvolver.classList.add("active");
    }
}

function updateCardContentImagen() {
    const allContentItems = document.querySelectorAll(".ContentItem");
    const allTrueItems = document.querySelectorAll(".ContentItem.true");

    if (allContentItems.length === allTrueItems.length) {
        cardContentImagen.classList.add("active");
    } else {
        cardContentImagen.classList.remove("active");
    }
}

const items = document.querySelectorAll(".item");
items.forEach(item => {
    const parentContenttem = item.closest(".contenttem");
    item.dataset.originalParent = parentContenttem.id || parentContenttem.getAttribute("data-id");
});

document.getElementById("volver").addEventListener("click", function () {
    const originalContainer = document.querySelector(".items");

    const allContentItems = document.querySelectorAll(".ContentItem");
    allContentItems.forEach(item => {
        const draggedItem = item.querySelector(".item");
        if (draggedItem) {
            const originalParentId = draggedItem.dataset.originalParent;
            const originalParent = document.getElementById(originalParentId) || document.querySelector(`.contenttem[data-id="${originalParentId}"]`);

            if (originalParent) {
                originalParent.appendChild(draggedItem);
            } else {
                console.error("No se encontró el contenedor original para", draggedItem);
                originalContainer.appendChild(draggedItem);
            }
        }
        item.classList.remove("active", "true", "false");
    });

    btncontinuar.classList.remove("active");
    btnvolver.classList.add("active");
    cardContentImagen.classList.remove("active");
});
