// 新增
var lock = false;
var submit = $('.submit');
var formInput = $('.menu-must');
var pickBtn = $('.pickBtn');
var pickUp = $('.pickup');
var menus = $('#menu').length ? JSON.parse($('#menu').val()) : '';

function action(data, msg, callback) {
    $.ajax({
        type: 'POST',
        url: '/admin/menus-action',
        dataType: 'json',
        data: data,
        success: function(res) {
            if(res.status === 0) {
                $.growl.notice({
                    message: msg,
                });

                callback && callback();
            } else {
                $.growl.error({
                    message: res.msg,
                });
            }
        },
    })
}

function precheck(options = {
    context: '.card-form',
    msg: '新增成功!',
    type: 'add',
    _id: '',
    callback: () => {},
}) {
    if(lock) return;
    lock = true;
    setTimeout(function() {
        lock = false;
    }, 300);

    var vals = [];
    $(options.context).find('.menu-must').each(function(index, item) {
        var val = $(item).val();
        if(val) {
            vals.push(val);
        };
    });

    var settings = {};
    $(options.context).find('.json-key').each(function(index, item) {
        var key = $(item).val();
        var val = $(item).siblings('.json-value').val();
        if(key && val) {
            settings[key] = val;
        }
    });

    if(vals.length) {
        var data = {
            type: options.type,
            name: vals[0],
            link: vals[1],
            show: true,
        };

        if(JSON.stringify(settings) != '{}') {
            data.settings = settings;
        }
        if (options.type !== 'add') {
            data._id = options._id;
        }

        action(data, options.msg, function() {
            $(options.context).find('.menu-must').val('');
            options.callback && options.callback();
        });
    }
}

formInput.on('input', function(){
    var vals = [];
    formInput.each(function(index, item) {
        var val = $(item).val();
        if(val) {
            vals.push(1);
        };
    });

    if(vals.length === formInput.length) {
        submit.removeClass('btn-disabled');
    } else {
        submit.addClass('btn-disabled');
    }
});

$(document).on('click', 'a.submit', function() {
    precheck();
});

$(document).on('keydown', '.submit', function(e) {
    if(e.keyCode === 13){
        precheck();
    };
});

// 添加行
$(document).on('click', '.add-row', function() {
    var $this = $(this);
    var row = $this.closest('.form-label-input').clone();
    var block = $this.closest('.label-inline');
    block.find('.form-label-input').eq(0).find('.remove-row').removeClass('hide');
    row.find('.remove-row').removeClass('hide');
    block.append(row);
});
// 删除行
$(document).on('click', '.remove-row', function() {
    var $this = $(this);
    var row = $this.closest('.form-label-input');
    var block = $this.closest('.label-inline');
    row.remove();
    block.find('.form-label-input').eq(0).find('.remove-row').addClass('hide');
});

pickBtn.on('click', () => {
    pickBtn.toggleClass('rotated');
    pickUp.toggleClass('expend');
});

var growl = null;
// 编辑菜单
$(document).on('click', '.btn-edit', function() {
    var $this = $(this);
    var index = $this.attr('data-index');
    var menu = menus[index];
    var temp = '';
    var length = menu.settings ? Object.keys(menu.settings).length : 2;

    for (let i = 0; i < length; i++) {
        temp += `
        <div class="form-label-input">
            <input class="json-key form-input" type="text" placeholder="key" value="title">-<input class="json-value form-input" type="text" placeholder="value">
            <span class="btn add-row">+</span>
            <span class="btn remove-row">-</span>
        </div>`;
    }

    growl = $.growl({
        duration: false,
        clickToClose: false,
        layout: 'menu-edit',
        location: 'dialog',
        title: '编辑菜单',
        message:
        `<div class="label-block">
            <label class="form-label">菜单名称:</label>
            <div class="form-label-input label-inline">
                <input class="form-input menu-must" type="text" placeholder="填写菜单名称", value="${menu.name}">
            </div>
        </div>
        <div class="label-block">
            <label class="form-label">菜单链接:</label>
            <div class="form-label-input label-inline">
                <input class="form-input menu-must" type="text" placeholder="填写菜单链接", value="${menu.link}">
            </div>
        </div>
        <div class="label-block">
            <label class="form-label">菜单附属数据(用于扩展菜单字段):</label>
            <div class="label-inline">${temp}</div>
        </div>
        <div class="tac">
            <a class="btn js-update" href="javascript:;" title="填写后可提交" data-id=${menu._id}>提交</a>
            <a class="btn btn-cancel js-cancel" href="javascript:;" title="取消" style="margin-left:20px;">取消</a>
        </div>`,
    });
});

// 更新菜单
$(document).on('click', '.js-update', function (e) {
    const _id = $(this).attr('data-id');
    precheck({
        _id,
        context: '#growls-dialog',
        msg: '更新成功!',
        type: 'update',
        callback: () => {
            growl.close(e);
        },
    });
});

// 关闭弹窗
$(document).on('click', '.js-cancel', (e) => {
    growl.close(e);
});

// 删除菜单
$(document).on('click', '.btn-delete', function() {
    if(lock) return;
    lock = true;
    setTimeout(function() {
        lock = false;
    }, 300);

    var $this = $(this);
    var _id = $this.attr('data-id');
    var data = {
        type: 'remove',
        _id: _id,
    };

    action(data, '删除成功!', function() {
        $this.closest('tr').remove();
    });
});

// 隐藏菜单
$(document).on('click', '.btn-action', function() {
    if(lock) return;
    lock = true;
    setTimeout(function() {
        lock = false;
    }, 300);

    var $this = $(this);
    var display = $this.attr('data-type') == 'show';
    var _id = $this.attr('data-id');
    var data = {
        type: 'update',
        _id: _id,
        show: display,
    };

    action(data, display ? '菜单已显示!' : '菜单已隐藏!', function() {
        $this.addClass('hide').siblings('.btn-action').removeClass('hide');
    });
});
