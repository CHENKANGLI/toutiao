import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login.vue'
import User from '@/views/user.vue'
import EditUser from '@/views/edit.vue'
import Index from '@/views/index.vue'
import Register from '../views/register.vue'
import ArticleDetail from '../views/articleDetail.vue'
import MyFollows from '../views/myFollows.vue'
import MyStars from '../views/myStars.vue'
import Comment from '../views/comment.vue'
import CateManager from '../views/cateManager.vue'
import Search from '../views/search.vue'
Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {
      name: 'default',
      path: '/',
      redirect: '/index'
    },
    {
      name: 'Index',
      path: '/index',
      component: Index
    },
    {
      name: 'Register',
      path: '/register',
      component: Register
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'User',
      path: '/user/:id',
      component: User
    },
    {
      name: 'EditUser',
      path: '/editUser/:id',
      component: EditUser
    },
    {
      name: 'ArticleDetail',
      path: '/articleDetail/:id',
      component: ArticleDetail
    },
    {
      name: 'MyFollows',
      path: '/myFollows',
      component: MyFollows
    },
    {
      name: 'MyStars',
      path: '/myStars',
      component: MyStars
    },
    {
      name: 'Comment',
      path: '/comment/:id',
      component: Comment
    },
    {
      name: 'CateManager',
      path: '/cateManager',
      component: CateManager
    },
    {
      name: 'Search',
      path: '/search',
      component: Search
    }
  ]
})
// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.path.indexOf('/user') === 0) {
    let token = localStorage.getItem('haima_token')
    if (token) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})
export default router
