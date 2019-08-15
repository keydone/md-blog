<template>
    <div class="tinymce-container posr">
        <textarea
            id="tinymceId"
            class="tinymce-textarea hidden"
        />
        <div class="editor-custom-btns">
            <uploader @insertAsset="insertAsset" />
        </div>
    </div>
</template>

<script>
    import tinymce from 'tinymce';
    import 'tinymce/plugins/imagetools';
    import 'tinymce/plugins/advlist';
    import 'tinymce/plugins/image';
    import 'tinymce/plugins/media';
    import 'tinymce/plugins/link';
    import 'tinymce/plugins/table';
    import 'tinymce/plugins/paste';
    import 'tinymce/plugins/autoresize';
    import uploader from '@comp/Uploader';

    export default {
        components: {
            uploader,
        },
        data() {
            return {
                content: '',
                text:    '',
            };
        },
        mounted() {
            this.$nextTick(() => {
                this.createEditor();
            });
        },
        activated() {
            this.createEditor();
        },
        deactivated() {
            this.destoryEditor();
        },
        methods: {
            createEditor() {
                const vm = this;

                vm.$nextTick(() => {
                    tinymce.init({
                        selector:            '#tinymceId',
                        language:            'zh_CN',
                        default_link_target: '_blank',
                        content_css:
                            '/tinymce/skins/content/default/content.min.css',
                        skin:         'oxide',
                        skin_url:     '/tinymce/skins/ui/oxide',
                        theme:        'silver',
                        theme_url:    '/tinymce/themes/silver/index.js',
                        language_url: '/tinymce/zh_CN.js',
                        plugins:
                            'autoresize image paste imagetools link table media advlist',
                        autoresize_bottom_margin: 100,
                        max_height:               900,
                        min_height:               550,
                        setup(editor) {
                            editor
                                .on('init', () => {
                                    if (editor.getContent() === '') {
                                        editor.setContent(
                                            '<p style="color: #999;">请输入内容（限20000个字符）！</p>'
                                        );
                                    }
                                })
                                .on('focus', () => {
                                    if (
                                        vm.getContent({ format: 'text' }) ===
                                        '请输入内容（限20000个字符）！'
                                    ) {
                                        vm.clearContent();
                                    }
                                })
                                .on('blur', () => {
                                    if (
                                        vm.getContent({ format: 'text' }).trim() ===
                                        ''
                                    ) {
                                        vm.setContent(
                                            '<p style="color: #999;">请输入内容（限20000个字符）！</p>'
                                        );
                                    }
                                });
                        },
                    });
                });
            },
            destoryEditor() {
                tinymce.remove();
            },
            getContent(options = {}) {
                return tinymce.get('tinymceId').getContent(options);
            },
            setContent(content) {
                tinymce.get('tinymceId').setContent(content);
            },
            clearContent() {
                this.setContent('');
            },
            insertAsset(files) {
                if (Array.isArray(files)) {
                    files.forEach(v => {
                        window.tinymce
                            .get('tinymceId')
                            .insertContent(
                                `<img class="assetsFile" src="${v.response.url}" >`
                            );
                    });
                } else {
                    window.tinymce
                        .get('tinymceId')
                        .insertContent(
                            `<img class="assetsFile" src="${files.response.url}" >`
                        );
                }
            },
        },
    };
</script>

<style lang="scss">
    .tox-statusbar__branding {
        display: none;
    }
</style>
