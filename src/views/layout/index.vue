<template>
  <el-container>
    <el-header>
      <div class="sys-title">简书后台管理系统</div>
      <div class="header-right">
        <span>网站首页</span>
        <span>头像</span>
        <!-- <span>{{ $store.state.loginModule.userInfo.username }}</span> -->
        <span>{{ userInfo.username }}</span>
        <span @click="logout">退出</span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409EFF"
          style="border: 0"
          router
          unique-opened
          :default-active="$route.path.replace(/\/$/, '')"
        >
          <!-- 个人中心【目录】 -->
          <el-submenu index="/user">
            <template #title>
              <i class="el-icon-s-custom"></i>
              <span>个人中心</span>
            </template>
            <el-menu-item index="/user/personal">个人资料</el-menu-item>
            <el-menu-item index="/user/password">修改密码</el-menu-item>
          </el-submenu>
          <!-- 文章管理【目录】 -->
          <el-submenu index="/article">
            <template #title>
              <i class="el-icon-reading"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="/article/add">发布文章</el-menu-item>
            <el-menu-item index="/article">文章列表</el-menu-item>
          </el-submenu>
          <!-- 评论管理【菜单】 -->
          <el-menu-item index="/comment">
            <template #title>
              <i class="el-icon-chat-line-square"></i>
              <span>评论管理</span>
            </template>
          </el-menu-item>
          <!-- 粉丝管理【菜单】 -->
          <el-menu-item index="/fans">
            <template #title>
              <i class="el-icon-magic-stick"></i>
              <span>粉丝管理</span>
            </template>
          </el-menu-item>
          <!-- 点赞管理【菜单】 -->
          <el-menu-item index="/star">
            <template #title>
              <i class="el-icon-thumb"></i>
              <span>点赞管理</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { RouterView } from "vue-router";
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("loginModule", ["userInfo"]),
  },
  mounted() {},
  methods: {
    ...mapActions("loginModule", ["logout"]),
  },
};
</script>
<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #545c64;
  color: #fff;
  align-items: center;
}
.el-aside {
  background-color: #545c64;
}
.el-main {
  background-color: #e9ecf0;
}
.header-right span {
  margin: 8px;
}
.header-right span:hover {
  color: skyblue;
}
.header-right span:nth-child(3) {
  font-weight: bold;
}
.header-right span:last-of-type {
  cursor: pointer;
}
</style>
