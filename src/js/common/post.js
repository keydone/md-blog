window.addEventListener('DOMContentLoaded', function() {
    function addListener(callback) {
        var timer = null,
            requestAnimationFrame = window.requestAnimationFrame
                || window.mozRequestAnimationFrame
                || window.webkitRequestAnimationFrame
                || window.msRequestAnimationFrame,
            cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

        function listentener() {
            cancelAnimationFrame(timer);

            timer = requestAnimationFrame(callback.bind(null, function() {
                document.removeEventListener('scroll', listentener);
            }));
        }

        document.addEventListener('scroll', listentener);

        listentener();
    }

    window._skappPostAnimation = function() {
        var posts = document.querySelectorAll('article.page__mini-article');

        posts.forEach(function(post) {
            if (post.parentElement.parentElement.classList.contains('js-hidden')) return;

            var position = getPosition(post);

            var pack = new Pack(post);

            pack
                .base('js-ease-out-leave-active')
                .base('js-ease-out-leave')
                .transfrom('js-ease-out-enter-active')
                .end(function() {
                    var arr = ['js-ease-out-enter', 'js-ease-out-enter-active', 'js-ease-out-leave', 'js-ease-out-leave-active'];

                    post.classList.add('transformed');

                    arr.forEach(function(item) {
                        post.classList.remove(item);
                    });
                })

            addListener(function(remove) {
                var diff = position.y - window.scrollY - document.documentElement.clientHeight;

                if (diff < 50) {

                    remove();

                    pack.toggle();
                }
            });
        });
    }

});
