<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="action"
          name="myfile"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名">
        <el-col :span="6">
          <el-input placeholder="请输入用户名"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio label="男">男</el-radio>
        <el-radio label="女">女</el-radio>
        <el-radio label="保密">保密</el-radio>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-col :span="6">
          <el-input type="textarea" rows="3" placeholder="请填写您的个人简介"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号">
        <el-col :span="6">
          <el-input placeholder="请输入手机号"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-col :span="6">
          <el-input placeholder="请输入电子邮箱"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="success" round>更 新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isDevMode, getToken } from "@/utils/config";

export default {
  data() {
    return {
      imageUrl: "",
    };
  },
  computed: {
    action() {
      return isDevMode() ? "/api/upload" : "/upload";
    },
    headers() {
      return {
        Authorization: `Bearer ${getToken()}`,
      };
    },
  },
  methods: {
    beforeAvatarUpload(file) {
      // 限制上传头像图片可以是 JPG | png 格式，且大小不能超过 2MB
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res, file) {
      // file.raw文件对象，这里生成临时图片地址进行预览
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    releaseImage() {
      // 释放之前创建的URL
      URL.revokeObjectURL(this.imageUrl);
    },
  },
  beforeDestroy() {
    this.releaseImage();
  },
};
</script>
<style scoped>
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
:deep(.avatar-uploader .el-upload:hover) {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
