var doc = $(document);

doc.on('click', '.drop-toggle', function () {
    var parent = $(this).closest('.drop-panel');
    parent.toggleClass('showDrop');
});

doc.on('click', '.drop-panel', function (ev) {
    ev.stopPropagation();
});

doc.on('click', function() {
    $('.drop-panel').removeClass('showDrop');
});

doc.on('click', '.vshow', function () {
    var $this = $(this);
    $this.toggleClass('on');
}, false);
