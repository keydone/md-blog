
function today() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    if (month < 10) {
        month = month.toString().padStart(2, '0');
    }
    var date = now.getDate();
    if (date < 10) {
        date = date.toString().padStart(2, '0');
    }

    return year + '-' + month + '-' + date;
}

function eachObj(obj, fn) {
    for(var key in obj) {
        fn(obj[key], key, obj);
    }
}

function getKeys(obj, sort) {
    var keys = [];

    eachObj(obj, function(value, key) {
        keys.push(key);
    });

    return keys.sort(sort);
}

function extend(obj, target) {
    eachObj(target, function(value, key) {
        obj[key] = value;
    });

    return obj;
}

function addClass(obj, cls) {
    if (hasClass(obj, cls)) {
        return;
    }
    var elClassName = obj.className; // 获取 class 内容.
    var blank = (elClassName !== '') ? ' ' : ''; // 判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
    var added = elClassName + blank + cls; // 组合原来的 class 和需要添加的 class.
    obj.className = added; // 替换原来的 class.
}

// 移除class
function removeClass(obj, cls) {
    var elClassName = ' ' + obj.className + ' '; // 获取 class 内容, 并在首尾各加个空格. ex) 'abc  bcd' -> ' abc  bcd '
    elClassName = elClassName.replace(/(\s+)/gi, ' ');// 将多余的空字符替换成空格. ex) ' abc  bcd ' -> ' abc bcd '
    var removed = elClassName.replace(' ' + cls + ' ', ' ');// 在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
    removed = removed.replace(/(^\s+)|(\s+$)/g, '');// 去掉首尾空格. ex) 'bcd ' -> 'bcd'
    obj.className = removed;// 替换原来的 class.
}

function hasClass(obj, cls) {
    var elClassName = obj.className; // 获取 class 内容.
    var elClassNameList = elClassName.split(/\s+/); // 通过split空字符将cls转换成数组.
    var i = 0;
    for (i in elClassNameList) {
        if (elClassNameList[i] === cls) { // 循环数组, 判断是否包含cls
            return true;
        }
    }
    return false;
}

function getUrlParams(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = win.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + (Days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
}

function getCookie(name) {
    var arr;
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    }
    return null;
}

function apiPublish(data, callback) {
    $.ajax({
        type: 'POST',
        url: '/admin/article-publish',
        dataType: 'json',
        data: data,
        success: callback,
    });
}

function apiDelete(data, callback) {
    $.ajax({
        type: 'POST',
        url: '/admin/article-delete',
        dataType: 'json',
        data: data,
        success: callback,
    });
}

window.addEventListener('DOMContentLoaded', function () {
    var doc = document;
    var search = doc.getElementById('page-search-from');
    var searchBtn = doc.getElementById('page-search-btn');
    if(searchBtn) {
        searchBtn.onclick = function () {
            search.submit();
        }
    }
}, false);
