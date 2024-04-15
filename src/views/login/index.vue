<template>
  <div class="login">
    <el-card>
      <div class="login-title">{{ PROJECT_NAME }}</div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
        <el-form-item prop="username">
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
          >
            <template #prefix>
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            ref="password"
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
            autocomplete="new-password"
            @keyup.native.enter="handleLogin($refs.loginFormRef)"
          >
            <template #prefix>
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="login-btn">
            <el-button
              :loading="loading"
              @click.native.prevent="handleLogin($refs.loginFormRef)"
              type="primary"
              >登录</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { PROJECT_NAME } from "@/projectConfig";

export default {
  data() {
    return {
      PROJECT_NAME,
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      loading: false,
    };
  },
  components: {},
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  methods: {
    ...mapActions("loginModule", ["accountLoginAction"]),
    handleLogin(formEl) {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        try {
          await this.accountLoginAction({
            username: this.loginForm.username,
            password: this.loginForm.password,
          });
        } finally {
          this.loading = false;
        }
      });
    },
  },
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
