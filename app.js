const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

const getDragAfterElement = (container, y) => {
    const draggableElements = [
      ...container.querySelectorAll('.draggable:not(.dragging)'),
    ];
  
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
      }
    );
  };

draggables.forEach((draggable) => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
  });
  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  });
});

containers.forEach((container) => {
  container.addEventListener('dragover', (dragoverEvent) => {
    dragoverEvent.preventDefault();
    const afterElement = getDragAfterElement(container, dragoverEvent.clientY);
    const draggable = document.querySelector('.dragging');

    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement.element);
    }
  });
});
