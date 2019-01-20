window.addEventListener('DOMContentLoaded', function() {

    var dropToggle = $('.drop-toggle');
    dropToggle.on('click', function () {
        var parent = $(this).closest('.drop-panel');
        parent.toggleClass('showDrop');
    });
    $('.drop-panel').on('click', function (e) {
        var ev = e || window.event;
        ev.stopPropagation();
    })
});

window.addEventListener('click', function() {
    $('.drop-panel').removeClass('showDrop');
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
