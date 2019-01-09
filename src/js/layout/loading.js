// loading
document.onreadystatechange = function(){
    var page = document.getElementById('page');
    if (document.readyState == 'interactive') {
        window.setTimeout(function () {
            disableLoad();
        }, 1000);
    }

    if (document.readyState == 'complete') {
        if (page.classList.contains('js-hidden')) {
            disableLoad();
        }
    }
}

function disableLoad(){
    var page = document.getElementById('page'),
    loading = document.getElementById('page-loading');

    loading.classList.add('js-hidden');
    page.classList.add('showPage');
}
