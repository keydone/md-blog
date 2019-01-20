// loading
$(function(){
    var page = document.getElementById('page'),
        loading = $('#page-loading');
    if (page.classList.contains('js-hidden')) {
        setTimeout(function() {
            loading[0].classList.add('hidden');
            setTimeout(function() {
                page.classList.add('showPage');
                page.classList.remove('js-hidden');
                window._skappPostAnimation();
                loading.hide();
            });
        });
    }
});
