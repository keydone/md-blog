window.addEventListener('load', function() {
    var postContent = document.querySelector('article.page__post');

    new Pack(postContent)
        .base('js-ease-out-leave-active')
        .base('js-ease-out-leave')
        .transfrom('js-ease-out-enter-active')
        .end(function() {
            var arr = ['js-ease-out-enter', 'js-ease-out-enter-active', 'js-ease-out-leave', 'js-ease-out-leave-active'];

            arr.forEach(function(item) {
                postContent.classList.remove(item);
            });
        })
        .toggle();
});

if (window.Element) {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }

    if (!Element.prototype.closest) {
        Element.prototype.closest = function(s) {
            var el = this;
            if (!document.documentElement.contains(el)) return null;
            do {
                if (el.matches(s)) return el;
                el = el.parentElement;
            } while (el !== null);
            return null;
        };
    }
}

document.addEventListener('click', function (e) {
    var vshow = e.target;
    var closest = vshow.closest('.vshow');
    if (!vshow.classList.contains('vshow')) {
        vshow = closest;
    }

    vshow && vshow.classList.toggle('on');
}, false);
