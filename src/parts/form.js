function form() {
    function prettyMask(prettyInput) {
        let maska = "+375 (__)  ___ __ __";
        prettyInput.addEventListener('input', function () {
            if (!/\d$/.test(this.value)) {
                this.value = this.value.slice(0, -1);
            }
            let i = 0;
            let val = this.value.replace(/\D/g, '');
            if (this.value.length < 7) {
                this.value = '+375 (';
            } else {
                this.value = maska.replace(/./g, function (a) {
                    return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) :
                        i >= val.length ? "" : a;
                });
            }
        });
        prettyInput.addEventListener('mouseup', (e) => {
            prettyInput.value = '+375 (';
            e.preventDefault();
            prettyInput.setSelectionRange(6, 6);
        });
    }

    function correctInput(input) {
        input.addEventListener('input', function () {
            if (!/[а-яА-Я]$/.test(input.value)) {
                this.value = this.value.slice(0, -1);
            }
        });
    }

    function append(parent, child) {
        parent.appendChild(child);
        child.style.display = 'block';
        setTimeout(() => {
            child.style.display = 'none';
            parent.firstElementChild.style.display = 'block';
        }, 2000);
    }

    let mainForm = document.querySelectorAll('form'),
        inputPhone = document.querySelectorAll('form input'),
        textarea = document.querySelectorAll('form textarea'),
        statusMessage = document.createElement('div');
    statusMessage.classList.add('status');

    inputPhone.forEach((item) => {
        if (item.name == 'phone') {
            prettyMask(item);
        } else if (item.name == 'name') {
            correctInput(item);
        } else if (item.name == 'message') {
            correctInput(item);
        }
    });
    textarea.forEach((item) => {
        if (item.name == 'message') {
            correctInput(item);
        }
    });

    function sendForm(elem) {
        elem.addEventListener('submit', function (e) {
            e.preventDefault();
            if (elem.classList.contains('consultation')) {
                elem.appendChild(statusMessage);
            }
            let formData = new FormData(elem);

            function postForm(data) {
                return new Promise(function (resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                    request.onreadystatechange = function () {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4) {
                            if (request.status == 200 && request.status < 300) {
                                resolve();
                            } else {
                                reject();
                            }
                        }
                    };
                    let obj = {};
                    data.forEach(function (value, key) {
                        obj[key] = value;
                    });
                    let json = JSON.stringify(obj);
                    request.send(json);
                });
            } //postForm
            function clearInput() {
                for (let i = 0; i < elem.querySelectorAll('input').length; i++) {
                    elem.querySelectorAll('input')[i].value = '';
                }
            }

            postForm(formData)
                .then(() => {
                    statusMessage.removeAttribute('class');
                    statusMessage.classList.add('status', 'loadstatus');
                    append(elem, statusMessage);
                })
                .then(() => {
                    statusMessage.removeAttribute('class');
                    statusMessage.classList.add('status', 'goodstatus');
                    if (!elem.classList.contains('consultation-form') && !elem.classList.contains('form')) {
                        elem.firstElementChild.style.display = 'none';
                    }
                    append(elem, statusMessage);
                })
                .catch(() => {
                    statusMessage.removeAttribute('class');
                    statusMessage.classList.add('status', 'failstatus');
                    if (!elem.classList.contains('consultation-form' && !elem.classList.contains('form'))) {
                        elem.firstElementChild.style.display = 'none';
                    }
                    append(elem, statusMessage);
                })
                .then(clearInput);
        });
    } //sendForm

    mainForm.forEach((item) => sendForm(item));
}
module.exports = form;