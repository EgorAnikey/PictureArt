function modalConsultation() {
    let btnConsultation = document.querySelectorAll('.button-consultation'),
        modalConsultation = document.querySelector('.popup-consultation'),
        allModalWindow = document.querySelectorAll('.modal-window'),
        clone = modalConsultation.querySelector('form').firstElementChild.cloneNode(true),
        temp = 0;

    //60 sec modalConsultation
    setTimeout(() => {
        allModalWindow.forEach((item) => {
            if (item.style.display == 'block') {
                temp++;
            }
        });
        if (temp == 0) {
            modalConsultation.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }, 60000);

    btnConsultation.forEach((item) => {
        item.addEventListener('click', () => {
            modalConsultation.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    modalConsultation.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup-consultation') || e.target.classList.contains('popup-close')) {
            document.body.style.overflow = '';
            modalConsultation.style.display = 'none';
            modalConsultation.querySelector('form').innerHTML = '';
            modalConsultation.querySelector('form').appendChild(clone);
        }
    });
}
module.exports = modalConsultation;