function modalPresent() {
    let modal = document.querySelector('.popup-gift'),
        img = document.querySelector('img');

    img.addEventListener('click', () => {
        modal.style.display = 'block';
        img.style.display = 'none';
        document.body.style.overflow = 'hidden';
    });

    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup-gift') || e.target.classList.contains('popup-close')) {
            modal.style.display = 'none';
        }
    });
}
module.exports = modalPresent;