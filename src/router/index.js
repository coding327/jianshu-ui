import Vue from 'vue'
import VueRouter from 'vue-router'

import { HOME_URL, LOGIN_URL, PROJECT_NAME } from '@/project-config'
import localCache from '@/utils/cache'
import { TOKEN_KEY } from '@/constants/cache'
import NProgress from '@/project-config/nprogress'

Vue.use(VueRouter)

const routes = [
  {
    path: '/web',
    name: 'Web',
    component: () => import('@/views/web'),
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/layout'),
    redirect: HOME_URL, // 重定向到首页【布局路由必须加上】
    children: [
      {
        path: '/user/personal',
        name: 'UserPersonal',
        component: () => import('@/views/user/personal.vue'),
        meta: {
          title: '个人资料',
        }
      },
      {
        path: '/user/password',
        name: 'UserPassword',
        component: () => import('@/views/user/password.vue'),
        meta: {
          title: '修改密码',
        }
      },
      {
        path: '/article',
        name: 'Article',
        component: () => import('@/views/article'),
        meta: {
          title: '文章列表',
        }
      },
      {
        path: '/article/add',
        name: 'ArticleAdd',
        component: () => import('@/views/article/add.vue'),
        meta: {
          title: '发布文章',
        }
      },
      {
        path: '/article/update',
        name: 'ArticleUpdate',
        component: () => import('@/views/article/update.vue'),
        meta: {
          title: '修改文章',
        }
      },
      {
        path: '/comment',
        name: 'Comment',
        component: () => import('@/views/comment'),
        meta: {
          title: '评论列表',
        }
      },
      {
        path: '/fans',
        name: 'Fans',
        component: () => import('@/views/fans'),
        meta: {
          title: '粉丝列表',
        }
      },
      {
        path: '/star',
        name: 'Star',
        component: () => import('@/views/star'),
        meta: {
          title: '点赞列表',
        }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
  },
]

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash', // 使用hash模式【github pages不支持history模式，刷新会404】
  base: process.env.BASE_URL,
  routes
})

// 导航守卫【进入到首页之前可以做动态路由】
router.beforeEach((to, from, next) => {

  // 1. 进度条
  NProgress.start()

  // 2.动态设置标题
  const title = PROJECT_NAME
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title

  // 4. 判断是否有token
  if (to.path !== LOGIN_URL) {
    const token = localCache.getCache(TOKEN_KEY)
    if (!token) {
      return next({
        path: LOGIN_URL,
        replace: true
      })
    }
  }
  // 后续的代码执行是一定有token的

  next()
})

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
  NProgress.done()
  console.warn("路由错误", error.message)
})

/**
 * @description 路由跳转结束
 * */
router.afterEach((to, from) => {
  // 5. 关闭进度条
  NProgress.done()
})

export default router
