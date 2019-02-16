// loading
$(function(){
    var page = document.getElementById('page'),
        loading = $('#page-loading');
    if (!page.classList.contains('showPage')) {
        setTimeout(function() {
            loading[0].classList.add('hidden');
            setTimeout(function() {
                page.classList.add('showPage');
                loading.hide();
            });
        });
    }
});
