<template>
  <div class="login">
    <el-card>
      <div class="login-title">简书后台管理系统</div>
      <el-form>
        <el-form-item>
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="login-btn">
            还没有账号?点击注册
            <el-switch v-model="isRegister"></el-switch>
            <el-button type="primary">登录</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRegister: true,
    };
  },
  components: {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
/* 登录页面背景图片样式 */
.login {
  width: 100%;
  height: 100%;
  background: url("../../assets/login-bg.png") no-repeat center center / 100%
    100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* el-card卡片组件样式 */
.el-card {
  width: 420px;
  height: 300px;
}
/* 登录标题样式 */
.login-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 50px;
  color: #333;
}
/* 登录按钮 */
.login-btn {
  text-align: right;
}
.el-switch {
  margin: 0 20px 0 8px;
}
</style>
