function modalDesign() {
    let btnDesign = document.querySelectorAll('.button-design'),
        modalDesign = document.querySelector('.popup-design');

    btnDesign.forEach((item) => {
        item.addEventListener('click', () => {
            modalDesign.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    modalDesign.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup-design') || e.target.classList.contains('popup-close')) {
            document.body.style.overflow = '';
            modalDesign.style.display = 'none';
            modalDesign.querySelector('form').firstElementChild.style.display = 'block';
            modalDesign.querySelectorAll('form input').forEach((item) => {
                item.value = '';
            });
            if (modalDesign.querySelector('form').lastElementChild.classList.contains('status')) {
                modalDesign.querySelector('form').lastElementChild.style.display = 'none';
            }
        }
    });
}
module.exports = modalDesign;