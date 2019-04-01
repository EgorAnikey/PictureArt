function modalConsultation() {
    let btnConsultation = document.querySelectorAll('.button-consultation'),
        modalConsultation = document.querySelector('.popup-consultation'),
        allModalWindow = document.querySelectorAll('.modal-window'),
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
            modalConsultation.querySelector('form').firstElementChild.style.display = 'block';
            modalConsultation.querySelectorAll('form input').forEach((item) => {
                item.value = '';
            });
            if (modalConsultation.querySelector('form').lastElementChild.classList.contains('status')) {
                modalConsultation.querySelector('form').lastElementChild.style.display = 'none';
            }
        }
    });
}
module.exports = modalConsultation;