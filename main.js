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

function drop(event) {
    event.preventDefault();

    // Verifica que el target sea un ContentItem
    if (!event.target.classList.contains('ContentItem')) {
        console.log("No puedes soltar aquí.");
        return;
    }

    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);

    // Evita colocar múltiples items en el mismo ContentItem
    const existingItem = event.target.querySelector('.item');
    if (!existingItem) {
        event.target.appendChild(draggedElement);

        const draggedCard = draggedElement.getAttribute('data-card');
        const targetCard = event.target.getAttribute('data-card');

        if (draggedCard === targetCard) {
            event.target.classList.add('true');
            event.target.classList.remove('false');
        } else {
            event.target.classList.add('false');
            event.target.classList.remove('true');
        }
    } else {
        console.log("Este espacio ya tiene un ítem.");
    }

    // Actualiza el estado de los botones
    const allContentItems = document.querySelectorAll('.ContentItem');
    const allTrue = document.querySelectorAll('.ContentItem.true').length === allContentItems.length;

    if (allTrue) {
        btncontinuar.classList.add('active');
        btnvolver.classList.remove('active');
    } else {
        btncontinuar.classList.remove('active');
        btnvolver.classList.add('active');
    }
}

document.getElementById('volver').addEventListener('click', function () {
    const items = document.querySelectorAll('.item');
    const originalContainer = document.querySelector('.items');

    // Devuelve todos los items al contenedor original
    const allContentItems = document.querySelectorAll('.ContentItem');
    allContentItems.forEach(item => {
        const draggedItem = item.querySelector('.item');
        if (draggedItem) {
            originalContainer.appendChild(draggedItem);
        }
        item.classList.remove('active', 'true', 'false');
    });

    btncontinuar.classList.remove('active');
    btnvolver.classList.add('active');
});
