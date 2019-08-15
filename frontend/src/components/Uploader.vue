<template>
    <div class="editor-upload-btn">
        <el-button
            type="primary"
            icon="el-icon-upload"
            size="small"
            @click="showUploadDialog = true"
        >
            上传
        </el-button>

        <el-dialog
            center
            title="上传文件"
            width="410px"
            :visible.sync="showUploadDialog"
        >
            <el-upload
                list-type="picture"
                class="file-upload"
                action="/api/file-upload"
                :headers="{ token: 'token' }"
                :before-upload="beforeUpload"
                :on-success="uploadSuccess"
                :on-remove="uploadRemove"
                :on-error="uploadError"
                :file-list="fileList"
                :multiple="true"
                :drag="true"
                :limit="20"
            >
                <i class="el-icon-upload" />
                <div class="el-upload__text">
                    将文件拖到此处，或<em>点击上传</em>
                    <div class="el-upload__tip">(文件大小不能超过10M, 超过 10M 请先压缩分多次上传)</div>
                </div>
                <div
                    slot="file"
                    slot-scope="{file}"
                    class="upload-list"
                >
                    <div
                        class="el-upload__item-thumbnail"
                        :style="`background: url(${file.url}) no-repeat 50% 50%;`"
                    />
                    <!-- 文件上传状态 -->
                    <label class="el-upload-list__item-status-label">
                        <i class="el-icon-upload-success el-icon-check" />
                    </label>
                    <!-- 上传进度 -->
                    <el-progress
                        v-if="file.status === 'uploading'"
                        :percentage="parseInt(file.percentage, 10)"
                        :stroke-width="2"
                        type="line"
                    />
                    <!-- 文件名 -->
                    <div
                        class="el-upload-list__item-name"
                        @click="uploadPreview(file)"
                    >
                        <i class="el-icon-document" />{{ file.name }}
                    </div>
                    <!-- 操作按钮 -->
                    <div class="el-upload__item-actions">
                        <i
                            title="查看大图"
                            class="el-icon el-icon-zoom-in"
                            @click="uploadPreview(file)"
                        >
                            <em class="btn-tip">查看大图</em>
                        </i>
                        <i
                            v-if="!disabled"
                            title="下载到本地"
                            class="el-icon el-icon-download"
                            @click="uploadDownload(file)"
                        >
                            <em class="btn-tip">下载到本地</em>
                        </i>
                        <i
                            v-if="!disabled"
                            title="移除该条目"
                            class="el-icon el-icon-delete"
                            @click="uploadRemove(file)"
                        >
                            <em class="btn-tip">移除该条目</em>
                        </i>
                        <i
                            title="插入到文档中"
                            class="el-icon el-icon-document-checked"
                            @click="insertAsset(file)"
                        >
                            <em class="btn-tip">插入到文档</em>
                        </i>
                    </div>
                </div>
            </el-upload>
            <template slot="footer">
                <el-button @click="showUploadDialog=false">取消</el-button>
                <el-button
                    type="primary"
                    :disabled="insertBtnDisabled"
                    @click="insertAsset"
                >
                    插入到文档
                </el-button>
            </template>
        </el-dialog>

        <!-- 查看大图 -->
        <el-dialog :visible.sync="showBigImgDialog">
            <img
                width="100%"
                :src="dialogImageUrl"
            >
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                disabled:          false,
                showUploadDialog:  false,
                showBigImgDialog:  false,
                insertBtnDisabled: true,
                dialogImageUrl:    '',
                fileList:          [],
            };
        },
        methods: {
            uploadPreview(file) {
                this.dialogImageUrl = file.url;
                this.showBigImgDialog = true;
            },
            beforeUpload() {
                this.insertBtnDisabled = true;
            },
            uploadSuccess({ code }, file, fileList) {
                this.fileList = fileList;
                this.insertBtnDisabled = false;
            },
            uploadRemove(file) {
                this.fileList.forEach((v, index) => {
                    if (v.uid === file.uid) {
                        this.fileList.splice(index, 1);
                    }
                });

                this.insertBtnDisabled = this.fileList.length === 0;
            },
            uploadError(error, file, fileList) {
                this.$message.error(`${file.name} 上传失败! ${error.message}`);
            },
            insertAsset(file) {
                if (file.status === 'success') {
                    this.$emit('insertAsset', file);
                } else {
                    this.showUploadDialog = false;
                    this.$emit('insertAsset', this.fileList);
                }
            },
        },
    };
</script>

<style lang="scss">
    .editor-upload-btn {
        position: absolute;
        top: 4px;
        right: 4px;
    }
    .file-upload {
        margin-top: -20px;
        .el-upload-dragger {
            height: 100px;
        }
        .el-icon-upload {
            font-size: 50px;
            margin: 0;
        }
        .el-upload__item-thumbnail {
            position: absolute;
            top: 10px;
            left: 10px;
            width: 70px;
            height: 70px;
            z-index: 1;
            background-size: cover !important;
        }
        .el-upload-list__item-name {
            line-height: 50px;
            margin: 0;
        }
        .el-icon-document {
            display: block !important;
        }
        .el-progress {
            position: absolute;
            top: 52px;
            width: 260px;
        }
        .is-success {
            .el-upload__item-actions {
                z-index: 2;
                &:hover {
                    opacity: 1;
                }
            }
        }
        .el-upload__item-actions {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background: rgba(0, 0, 0, 0.6);
            text-align: center;
            line-height: 92px;
            font-size: 24px;
            color: #fff;
            opacity: 0;
            transition: opacity 0.2s;
            .el-icon {
                width: 24px;
                margin: 0 10px;
                cursor: pointer;
                position: relative;
                &:hover {
                    .btn-tip {
                        opacity: 1;
                    }
                }
            }
            .btn-tip {
                opacity: 0;
                font-size: 12px;
                font-style: normal;
                white-space: nowrap;
                position: absolute;
                top: 120%;
                left: 50%;
                transform: translate(-50%, 0);
                transition: opacity 0.2s 0.7s;
            }
        }
    }
</style>
