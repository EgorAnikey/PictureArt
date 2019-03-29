function burgerMenu() {
    let burgerButton = document.querySelector('.burger'),
        burgerMenu = document.querySelector('.burger-menu'),
        temp = 0;

    window.addEventListener('resize', () => {
        let headerMenuIsHidden = document.querySelector('.header-menu').offsetWidth;
        if (headerMenuIsHidden) {
            burgerMenu.style.display = 'none';
        }
    });

    burgerButton.addEventListener('click', () => {
        let headerMenuIsHidden = document.querySelector('.header-menu').offsetWidth;
        if (!headerMenuIsHidden) {
            if (temp == 0) {
                burgerMenu.style.display = 'block';
                temp++;
            } else {
                burgerMenu.style.display = 'none';
                temp--;
            }
        }
    });
}
module.exports = burgerMenu;