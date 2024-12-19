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

    // Verifica que el target sea un ContentItem
    if (!event.target.classList.contains("ContentItem")) {
        console.log("No puedes soltar aquí.");
        return;
    }

    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);

    // Evita colocar múltiples items en el mismo ContentItem
    const existingItem = event.target.querySelector(".item");
    if (!existingItem) {
        const contentImage = event.target.querySelector("img");

        if (contentImage) {
            // Inserta el item como hermano del img
            contentImage.insertAdjacentElement("afterend", draggedElement);
            event.target.classList.add("active");

            // Si el item tiene la clase true, también asignarla al ContentItem
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

    // Actualiza el estado de los botones y cardContentImagen
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

document.getElementById("volver").addEventListener("click", function () {
    const items = document.querySelectorAll(".item");
    const originalContainer = document.querySelector(".items");

    // Devuelve todos los items al contenedor original
    const allContentItems = document.querySelectorAll(".ContentItem");
    allContentItems.forEach(item => {
        const draggedItem = item.querySelector(".item");
        if (draggedItem) {
            originalContainer.appendChild(draggedItem);
        }
        item.classList.remove("active", "true", "false");
    });

    btncontinuar.classList.remove("active");
    btnvolver.classList.add("active");
    cardContentImagen.classList.remove("active");
});
