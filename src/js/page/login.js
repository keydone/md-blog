const btnLogin = $('.btn-login');
const btnRegister = $('.btn-reg');
const username = $('#form-username');
const password = $('#form-passwd');
const passwdAgain = $('#form-passwd_again');
const loading = $('#page-loading');
const input = $('.input');
let lock = false;

const checkForm = (reg) => {
    if (!username.val()) {
        username.addClass('error').siblings('.tips').addClass('error');
        return false;
    }
    if (!password.val()) {
        password.addClass('error').siblings('.tips').addClass('error');
        return false;
    }
    if (reg && !passwdAgain.val()) {
        passwdAgain.addClass('error').siblings('.tips').addClass('error');
        return false;
    }
    return true;
}

const login = () => {
    $.ajax({
        type: 'POST',
        url: '/api/user/login',
        data: {
            name: username.val(),
            password: password.val(),
        },
        success: function(res) {
            const { status, msg, data } = res;
            if (status === 0) {
                $.growl.notice({
                    message: msg,
                    destory: () => {
                        window.location.href = '/admin';
                    }
                });
            } else {
                $.growl.error({
                    message: msg,
                });
                btnLogin.removeClass('loading');
            }
        }
    });
}

const register = () => {

    $.ajax({
        type: 'POST',
        url: '/api/user/register',
        data: {
            name: username.val(),
            password: password.val(),
        },
        success: function(res) {
            const { status, msg } = res;
            if (status === 0) {
                $.growl.notice({
                    message: msg,
                    destory: () => {
                        window.location.href = '/login';
                    }
                });
            } else {
                $.growl.error({
                    message: msg,
                });
                btnRegister.removeClass('loading');
            }
        }
    });
}

input.on('blur', function() {
    const $this = $(this);
    const val = $this.val();
    const tips = $this.siblings('.tips');
    if (val) {
        $this.removeClass('error');
        tips.removeClass('error');
    } else {
        $this.addClass('error');
        tips.addClass('error');
    }
});

btnLogin.on('click', () => {
    if (checkForm()) {
        setTimeout(() => {
            lock = false;
        }, 3000);
        if (!lock) {
            lock = true;
            btnLogin.addClass('loading');
            login();
        }
    }
});

btnRegister.on('click', () => {
    if (checkForm(true)) {
        setTimeout(() => {
            lock = false;
        }, 3000);
        if (!lock) {
            lock = true;
            /* btnRegister.addClass('loading');
            register(); */
            $.growl.error({
                message: '抱歉, 暂不开放注册!',
            });
        }
    }
});
