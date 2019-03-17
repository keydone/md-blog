function ajax(argv) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: argv.data,
        url: argv.url,
        success: (res) => {
            argv.callback && argv.callback(res);
            /* setTimeout(() => {
                if (res.redirect) {
                    window.location.href = `${res.redirect}?ref=${encodeURIComponent(window.location.href.split('?')[0])}`;
                }
            }, 500); */
        },
    });
}

// 发布/更新
function apiPublish({
    data,
    block= 'articles',
    url= `/admin/${block}-publish`,
    callback,
}) {
    ajax({
        url,
        data,
        block,
        callback,
    });
}

// 删除
function apiDelete({
    data,
    block= 'articles',
    url= `/admin/${block}-delete`,
    callback,
}) {
    ajax({
        url,
        data,
        block,
        callback,
    });
}
