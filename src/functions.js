export function toggleModal(idOfModal, show) {
    const modal = document.querySelector(idOfModal);
    if(show) {
        modal.style.display = 'block';
        setTimeout(() => modal.style.opacity = 1, 0);
        modal.classList.add('show');
    } else {
        modal.style.display = 'none';
        modal.style.opacity = 0;
        modal.classList.remove('show');
    }
}
