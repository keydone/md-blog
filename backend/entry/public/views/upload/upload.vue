<template>
    <div class="wrapper">
        <h3 class="el-card__header">上传文件 (支持批量上传/拖拽上传)</h3>

        <div class="el-card__body">
            <!-- :on-progress="uploadProgress" :on-error="uploadError" -->
            <el-upload
                class="el-upload"
                list-type="picture"
                action="/api/file-upload"
                :headers="{ token: 'token' }"
                :on-success="uploadSuccess"
                :on-error="uploadError"
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
                        />
                        <i
                            v-if="!disabled"
                            title="下载到本地"
                            class="el-icon el-icon-download"
                            @click="uploadDownload(file)"
                        />
                        <i
                            v-if="!disabled"
                            title="移除该条目"
                            class="el-icon el-icon-delete"
                            @click="uploadRemove(file)"
                        />
                    </div>
                </div>
            </el-upload>

            <el-dialog :visible.sync="dialogVisible">
                <img
                    width="100%"
                    :src="dialogImageUrl"
                >
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible:  false,
                disabled:       false,
            };
        },
        methods: {
            beforeUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            uploadPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            // uploadProgress(event, file, fileList) {},
            uploadError(error, file, fileList) {
                this.$message.error(`${file.name} 上传失败! ${error.message}`);
            },
            uploadSuccess({ code }, file) {
                if (code === 0) {
                    this.$message.success(`${file.name} 上传成功!`);
                }
            },
            uploadRemove(file) {
                console.log(file);
            },
            uploadDownload(file) {
                console.log(file);
            },
        },
    };
</script>

<style lang="scss">
    .el-upload--picture {
        width: 500px;
        height: 182px;
        line-height: 1;
    }
    .el-upload-dragger {
        width: 100%;
        height: 180px;
    }
    .el-upload-list {
        .is-success {
            .el-upload__item-thumbnail {
                opacity: 1;
            }
        }
        .el-upload-list__item {
            @include inline-block;
            margin-right: 40px;
            max-width: 502px;
            height: 152px;
            padding: 0;
        }
        .upload-list {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            padding: 20px 0 0 230px;
            text-align: left;
        }
        .el-upload__item-thumbnail {
            position: absolute;
            top: 10px;
            left: 10px;
            width: 200px;
            height: 130px;
            background-size: contain !important;
            transition: opacity 0.5s 0.2s ease-out;
            border: 1px solid #ccc;
            border-radius: 3px;
            opacity: 0;
        }
        .el-upload-list__item-name {
            line-height: 70px;
            margin-top: 0;
            width: 210px;
            .el-icon-document {
                left: 75px;
                top: 35px;
            }
        }
        .el-progress {
            position: absolute;
            width: 250px;
            top: 65px;
        }
        .el-upload-list__item-status-label {
            box-shadow: 0 1px 1px #ccc !important;
            background: #13ce66 !important;
            display: block !important;
            right: -17px !important;
            top: -7px !important;
        }
        .el-upload__item-actions {
            font-size: 16px;
            .el-icon {
                padding: 5px;
                cursor: pointer;
                margin-right: 5px;
                &:hover {
                    color: #409eff;
                }
            }
        }
    }
</style>
