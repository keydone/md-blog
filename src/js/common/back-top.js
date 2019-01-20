window.addEventListener('DOMContentLoaded', function() {
    // 回到顶部
    (function() {
        var backTopEle = $('#back-top');

        if (backTopEle) {

            function toggleBackTop() {
                var scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
                    isHidden = backTopEle[0].classList.contains('js-hidden');

                if (scrollTop > 350 && isHidden) {
                    backTopEle[0].classList.remove('js-hidden');
                } else if(scrollTop < 350 && !isHidden) {
                    backTopEle[0].classList.add('js-hidden');
                }
            }

            toggleBackTop();
            document.addEventListener('scroll', toggleBackTop);

            backTopEle[0].addEventListener('click', function() {
                var backTopAmt = new Amt();

                backTopAmt
                    .from({
                        top: window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
                    })
                    .to({
                        top: 0
                    })
                    .transition(1000)
                    .on('frame', function(data) {
                        window.scrollTo(0, data.top);
                    })
                    .start();
            });
        }
    })();
});
