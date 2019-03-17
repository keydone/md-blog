var list = $('#list').val();
var actions = $('.actions');
var preview = $('#preview');
var article = $('.articles-list').find('.dl');
var postTitle = $('#post__title');
var block = $('#block').val();

if(list) {
    list = JSON.parse(list);
}

actions.on('click', function(e) {
    e.stopPropagation();
});

// 更新预览
article.on('click', function() {
    var $this = $(this);
    var index = $this.data('index');
    $this.addClass('on').siblings().removeClass('on');

    postTitle.html(list[index].title);
    preview.html('');

    editormd.markdownToHTML("preview", {
        markdown        : list[index].markdown,
        htmlDecode      : true,
        tocm            : true,    // Using [TOCM]
        // tocContainer    : "#custom-toc-container",
        tocDropdown     : true,
        markdownSourceCode : false,
        emoji           : true,
        taskList        : true,
        // tex             : true,
        flowChart       : true,
        sequenceDiagram : true,
    });

});

var update = $('.update');
update.on('click', function() {
    var $this = $(this);
    var sibling = $this.siblings('.update').eq(0);
    var id = $this.data('id');
    var data = {
        _id: id,
        postType: 1,
        article: {
            isDraft: $this.data('isdraft'),
        }
    };

    if (!$this.hasClass('loading')) {
        $this.addClass('loading');

        apiPublish({
            data,
            block,
            callback: ({status, msg}) => {
                setTimeout(function () {
                    $this.removeClass('loading');
                }, 500);
                if (status === 0) {
                    $.growl.notice({ title: '更新成功!' });
                    $this.toggleClass('hide');
                    sibling.toggleClass('hide');
                } else {
                    $.growl.error({ message: msg });
                }
            }
        });
    }
});

$('.icon-delete').on('click', function() {
    var $this = $(this);
    var id = $this.data('id');
    var dl = $this.closest('.dl');
    var data = {
        _id: id,
    };

    $.growl({
        duration: false,
        clickToClose: false,
        layout: 'confirm',
        location: 'dialog',
        title: ' 确认删除',
        message: '你确定要删除吗?',
        yes: () => {
            apiDelete({
                data,
                block,
                callback: ({ status, msg }) => {
                    if (status === 0) {
                        $.growl.notice({ title: ' 文章已删除!' });
                        dl.remove();
                    } else {
                        $.growl.error({ message: msg });
                    }
                }
            });
        }
    });
});
