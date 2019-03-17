//- markdown editor
var articleTitle = $('#article-title');
var post__title = $('.post__title');
var block = $('#block').val();
var growl = null;

// 文章标题
articleTitle.on('input', function() {
    post__title.html($(this).val() || '文章预览');
});

// 发布文章
function publish(type) {
    var fields = $('[data-post]'),
        postdate = $('#postdate');

    for(var i=0, length = fields.length; i<length; i++) {
        const item = $(fields[i]);
        var key = item.attr('data-post');
        var val = item.val();
        data.article[key] = val;
    }

    const _id = $('#_id').val();
    if (_id) data._id = _id;
    data.postType = type;
    Object.assign(data.article, {
        content: $('.markdown-body').html(),
        path: $.trim(postid.val()),
        date: postdate.val() || today(),
        author: data.author || 'keydone',
        isDraft: type === 1 ? 1 : 0,
    });

    apiPublish({
        data,
        block,
        callback: ({ status, msg, article }) => {
            setTimeout(() => {
                $('.icon-publish').removeClass('loading');
            }, 300);

            if(status === 0) {
                $.growl.notice({ title: type === 0 ? '发布成功!' : (type === 1 ? '已存为草稿' : '更新成功!') });
                if (article) {
                    $('#markdown').val(article.markdown);
                    $('#postid').val(article.path).hide();
                    $('#_id').val(article._id);
                }
            } else {
                $.growl.error({ message: msg });
            }
        }
    });
}

var categoryId = $('#categoryId');
var categories = $('#categories').val() ? JSON.parse($('#categories').val()) : '';
var cateSelect = '';
if (categories.length) {
    cateSelect = '<select id="cateSelect" class="form-label-select">';
    for(var i = 0; i < categories.length; i++){
        cateSelect += '<option data-id="' + categories[i]._id + '" '+ (categories[i]._id === categoryId.val() ? 'selected' : '') +'>' + categories[i].name +'</option>';
    }
    cateSelect += '</select>';
}

var editor = editormd("scrollWrap-textarea", {
    path: '/static/js/lib/',
    searchReplace: true,
    tocm : true,
    emoji : true,
    codeFold : true,
    htmlDecode : true,
    flowChart : true, // 流程图
    markdown: $('#markdown').val(),
    toolbarIcons : function() {
        return ["undo", "redo", "|",
            "bold", "del", "italic", "quote", "ucwords", "lowercase", "|",
            "h1", "h2", "h3", "h4", "|",
            "list-ul", "list-ol", "hr", "|", "imglibs",
            "link", "reference-link", "image", "code", "code-block", "table", "datetime", "emoji", "html-entities", "pagebreak", "|",
            "watch", "preview", "clear", "||",
            "more", "draft", "publish"]
    },
    lang: {
        toolbar: {
            'imglibs': '文章图库',
            'draft': '存为草稿',
            'publish': '发布更新',
        }
    },
    toolbarIconsClass : {
        imglibs: "icon icon-imgs",
        draft: "icon icon-draft",
        publish: "icon icon-publish",
    },
    toolbarCustomIcons: {
        more: '<div class="drop-panel postset">'
            +'<a class="drop-toggle" href="javascript:;" title="更多选项">...</a>'
            +'<div class="drop-content js-hidden" id="postform-list">'
                +'<p class="tip">自定义文章内容</p>'
                +'<div class="form-label">'
                    +'<input class="label-input" type="text" placeholder="副标题" data-post="subtitle" value="' + $('#subtitle').val() + '">'
                +'</div>'
                + cateSelect ? '<div class="form-label">'
                    // +'<input id="categoryName" class="label-input" type="text" placeholder="文章分类" value="' + $('#cateName').val() + '">'
                    + cateSelect
                +'</div>' : ''
                +'<div class="form-label">'
                    +'<input class="label-input" type="text" placeholder="文章标签(多个标签之间用,分开)" data-post="tags" value="' + $('#tags').val() + '">'
                +'</div>'
                +'<div class="form-label">'
                    +'<input class="label-input" type="text" placeholder="作者(默认 keydone)" value="' + $('#author').val() + '" data-post="author">'
                +'</div>'
                +'<div class="form-label">'
                    +'<input class="label-input" id="postdate" type="text" value="' + $('#date').val() + '" placeholder="发布时间(YYYY-MM-DD)">'
                +'</div>'
                +'<div class="form-label">'
                    +'<input class="label-input" id="postcover" type="text" placeholder="封面图片地址" value="' + $('#cover').val() + '" data-post="cover">'
                +'</div></div></div>',
    },
    onload: function() {

        $('.icon-draft').on('click', function() {
            if(!$(this).hasClass('loading')) {
                $(this).addClass('loading');
                publish(1);
            }
        });

        $('.icon-publish').on('click', function() {
            if(!$(this).hasClass('loading')) {
                $(this).addClass('loading');
                publish($('#markdown').val() ? 2 : 0);
            }
        });

        $('.icon-imgs').on('click', function() {
            growl = $.growl({
                duration: false,
                clickToClose: false,
                location: 'library',
                title: '图库',
                message: html,
                mounted: filePondCreate,
                destory: filePondDestory,
            });
        });

        // 选择分类
        var categoryName = $('#categoryName');
        var categorySelect = $('#cateSelect');
        categorySelect.change(function() {
            var option = $(this).find("option:selected");
            var _id = option.attr('data-id');
            var name = option.text();
            categoryName.val(name);
            categoryId.val(_id);
        });
    },
});

var doc = $(document),
    postid = $('#postid'),
    closeForm = $('#closeForm'),
    formlist = $('#form-list'),
    data = {
        article: {},
        type: 0,
    };

closeForm.on('click', function() {
    $(this).toggleClass('open');
    formlist.toggleClass('closed');
});

// 上传图片
var html = template('library')();

function filePondCreate() {
    var imglibrary = $('#img-library');

    FilePond.create($('#filePondCover')[0], {
        labelIdle: '上传图片<p>(支持拖拽或 <span class="filepond--label-action"> 浏览文件 </span>)</p>',
        labelFileWaitingForSize: '正在加载文件信息',
        labelFileSizeNotAvailable: '大小不可用',
        labelFileLoading: '正在加载',
        labelFileLoadError: '加载文件失败',
        labelFileProcessing: '正在上传',
        labelFileProcessingComplete: '已完成',
        labelFileProcessingAborted: '已取消',
        labelFileProcessingError: '上传失败',
        labelTapToCancel: '取消',
        labelTapToRetry: '重试',
        labelTapToUndo: '撤销',
        labelButtonRemoveItem: '移除',
        labelButtonAbortItemLoad: '中断',
        labelButtonRetryItemLoad: '重试',
        labelButtonAbortItemProcessing: '中断',
        labelButtonUndoItemProcessing: '撤销',
        labelButtonRetryItemProcessing: '重试',
        labelButtonProcessItem: '上传',
        name: 'filepond',
        allowRevert: true,
        allowMultiple:true,
        dropOnPage: true,
        dropValidation: true,
        onerror: function(error, file, status) {
            console.log(error, file, status);
        },
        oninit: function() {
            setOptions();
        },
    });

    function setOptions() {
        var imgwrap = '" /><div class="actions">'
            + '<span class="action ic-cover"><i class="icon icon-img"></i>设为封面</span>'
            + '<span class="action ic-view"><i class="icon icon-img"></i>查看大图</span>'
            + '<span class="action ic-del"><i class="icon icon-delete"></i>删除图片</span>'
            + '<span class="action ic-copy"><i class="icon icon-copy"></i>复制路径</span>'
            + '</div></li>';

        FilePond.setOptions({
            server: {
                url: '/api/stuff-upload?store=images&id=' + $.trim(postid.val()),
                process: {
                    onload: function(res) {
                        var res = JSON.parse(res);
                        if(+res.status === 0) {
                            var data = res.data;
                            var articleId = data.articleId;
                            var filepath = data.filepath;
                            var stuffId = data.stuffId;

                            setTimeout(function() {
                                imglibrary.children().eq(0).after('<li class="imgwrap" data-src="' + filepath + '" data-articleid="' + articleId + '" data-stuffid="' + stuffId + '"><i class="icon icon-cover js-hidden"></i><img class="img" src="' + filepath + imgwrap);

                                var li = imglibrary.children().eq(1);
                                var img = li.find('img');
                                img.on('load error', function() {
                                    var width = $(this)[0].naturalWidth;
                                    li.attr('data-naturalwidth', width);
                                });
                            }, 500);
                        } else {
                            $.growl.error({ message: res.msg });
                        }
                    },
                },
            },
        });

    }
}

function filePondDestory() {
    FilePond.destroy($('#filePondCover')[0]);
}

// 设为封面
doc.on('click', '#img-library .ic-cover', function() {
    var imgwrap = $(this).closest('.imgwrap');
    var cover = imgwrap.find('.icon-cover');
    var src = imgwrap.attr('data-src');
    imgwrap.siblings().find('.icon-cover').addClass('js-hidden');
    cover.removeClass('js-hidden');
    $('#postcover').val(src);
    publish(2);
});

// 查看大图
doc.on('click', '#img-library .ic-view', function() {
    var imgwrap = $(this).closest('.imgwrap');
    var naturalWidth = imgwrap.attr('data-naturalWidth');
    var src = imgwrap.attr('data-src');
    $.growl({
        duration: false,
        location: 'library',
        layout: 'fullImg',
        title: '查看大图',
        message: '<div class="imgContain" style="width:' + (naturalWidth || '') + 'px"><img class="img" src="' + src + '" /></div>',
    });
});

// 删除图片
doc.on('click', '#img-library .ic-del', function() {
    var imgwrap = $(this).closest('.imgwrap');
    $.growl({
        duration: false,
        clickToClose: false,
        layout: 'confirm',
        location: 'dialog',
        title: ' 确认删除',
        message: '你确定要删除吗?',
        yes: function() {
            $('#postcover').val('');
            // publish(1);
            imgwrap.remove();
        }
    });
});

// 复制图片地址
doc.on('click', '#img-library .ic-copy', function(e) {
    var imgwrap = $(this).closest('.imgwrap');
    var copyElement = $('#copyElement');
    var src = imgwrap.attr('data-src');
    copyElement.val('<div style="max-width: 100%;">\n\n![](' + src + ')</div>').select();
    $.growl.notice({ message: '复制成功! 去粘贴吧' });
    document.execCommand('copy');
    growl.close(e);
});

// ctrl+s 自动发布文章
doc.on('keydown', (e) => {
    if (e.keyCode === 83 && e.metaKey) {
        e.preventDefault();
        if(!$('.icon-publish').hasClass('loading')) {
            $('.icon-publish').addClass('loading');
            publish($('#markdown').val() ? 2 : 0);
        };
    };
});
