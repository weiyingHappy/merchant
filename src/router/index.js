import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import Home from '@/page/Home'
import Manage from '@/page/Manage'
import HouseStyle from '@/page/HouseStyle'
import HouseStyleEdit from '@/page/HouseStyleEdit'
import OrderInfo from '@/page/OrderInfo'
import OrderExtraPage from '@/page/OrderExtraPage'
import OrderManage from '@/page/OrderManage'
import Auth from '@/page/Auth'
const HouseState = resolve => require(['@/page/HouseState.vue'], resolve)
const HouseStateEdit = resolve => require(['@/page/HouseStateEdit.vue'], resolve)
const OrderShopInfo = resolve => require(['@/page/OrderShopInfo.vue'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Auth'
      }
    },
    {
      path: '/Auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/house_style_edit/:id',
      name: 'HouseStyleEdit',
      component: HouseStyleEdit
    },
    {
      path: '/order_info/:id',
      name: 'OrderInfo',
      component: OrderInfo
    },
    {
      path: '/order_extra_info/:id',
      name: 'OrderExtraInfo',
      component: OrderExtraPage
    },
    {
      path: '/order_shop_info/:no',
      name: 'OrderShopInfo',
      component: OrderShopInfo
    },
    {
      path: '/house_state_edit/:id',
      name: 'HouseStateEdit',
      component: HouseStateEdit
    },
    {
      path: '/manage',
      component: Manage,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'house_style',
          name: 'HouseStyle',
          component: HouseStyle
        },
        {
          path: 'order_manage',
          name: 'OrderManage',
          component: OrderManage
        },
        {
          path: 'house_state',
          name: 'HouseState',
          component: HouseState
        }
      ]
    },
    {
      path: '*',
      redirect: {
        path: '/'
      }
    }
  ]
})
