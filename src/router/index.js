import Vue from 'vue'
import VueRouter from 'vue-router'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
