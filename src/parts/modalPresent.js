function modalPresent() {
    let modal = document.querySelector('.popup-gift'),
        img = document.querySelector('img'),
        allButton = document.querySelectorAll('button'),
        temp = 0;
    // show modal if not click and end of scroll
    allButton.forEach((item) => {
        item.addEventListener('click', () => {
            temp++;
        });
    });
    window.addEventListener('scroll', () => {
        if (temp == 0 && (this.scrollY == document.body.scrollHeight - window.innerHeight)) {
            modal.style.display = 'block';
            img.style.display = 'none';
            document.body.style.overflow = 'hidden';
        }
    });


    img.addEventListener('click', () => {
        modal.style.display = 'block';
        img.style.display = 'none';
        document.body.style.overflow = 'hidden';
    });

    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup-gift') || e.target.classList.contains('popup-close')) {
            document.body.style.overflow = '';
            modal.style.display = 'none';
        }
    });
}
module.exports = modalPresent;