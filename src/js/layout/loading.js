// loading
$(function(){
    var page = document.getElementById('page'),
        loading = document.getElementById('page-loading');
    if (page.classList.contains('js-hidden')) {
        setTimeout(function() {
            page.classList.add('showPage');
            page.classList.remove('js-hidden');
            loading.classList.add('js-hidden');
        });
    }
});
