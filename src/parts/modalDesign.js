function modalDesign() {
    let btnDesign = document.querySelectorAll('.button-design'),
        modalDesign = document.querySelector('.popup-design'),
        clone = modalDesign.querySelector('form').firstElementChild.cloneNode(true);

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
            modalDesign.querySelector('form').innerHTML = '';
            modalDesign.querySelector('form').appendChild(clone);
        }
    });
}
module.exports = modalDesign;