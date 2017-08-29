<template>
  <div class="order_page">
    <div class="switchbar" ref="menu">
      <ul>
        <router-link :to="{name: 'OrderManage'}" class="item" tag="li">全部</router-link>
        <router-link :to="{name: 'OrderManage', query: {state: 1}}" class="item" tag="li">待确认</router-link>
        <router-link :to="{name: 'OrderManage', query: {state: 5}}" class="item" tag="li">确认入住</router-link>
        <!-- router-link :to="{name: 'OrderManage', query: {state: 3}}" class="item" tag="li">已完成</router-link -->
        <router-link :to="{name: 'OrderManage', query: {state: 4}}" class="item" tag="li">退款申请</router-link>
        <router-link :to="{name: 'OrderManage', query: {state: 7}}" class="item" tag="li">商品订单</router-link>
        <router-link :to="{name: 'OrderManage', query: {state: 6}}" class="item" tag="li">增值服务</router-link>
      </ul>
    </div>
    <transition-group
      tag="div"
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      mode="out-in"
    >
    <template v-for="(order, index) in orders">
      <router-link v-if="order.id" v-bind:data-index="index" :key="index" :to="{name: 'OrderExtraInfo', params: {id:order.id}}" tag="div">
        <order-extra-item :order="order" :key="index" @refuse="reload" @confirm="reload"></order-extra-item>
      </router-link>
      <router-link v-else-if="isShopOrder(order.order_no)" v-bind:data-index="index" :key="index" :to="{name: 'OrderShopInfo', params: {no:order.order_no}}" tag="div">
        <OrderShopItem :order="order" :hotelinfo="hotelinfo" @update="reload"></OrderShopItem>
      </router-link>
      <router-link v-else v-bind:data-index="index" :key="index" :to="{name: 'OrderInfo', params: {id:order.order_no}}" tag="div">
        <order-item :order="order" :key="index" @refuse="reload" @confirm="reload"></order-item>
      </router-link>
    </template>
    </transition-group>
    <div class="loadmore" v-show="netpage.nowPage != netpage.totalPage">
      <span v-inview:enter="loadmore" v-if="netpage.nowPage < netpage.totalPage">
        加载更多
      </span>
      <span v-else>
        没有数据了
      </span>
    </div>
  </div>
</template>

<script>
import OrderItem from '@/components/OrderItem'
import OrderExtraItem from '@/components/OrderExtraItem'
import OrderShopItem from '@/components/OrderShopItem'
import api from '@/common/api'
import Velocity from 'velocity-animate'

let fetchFlag = false // 防止重复请求的情况

export default {
  components: {
    OrderItem,
    OrderExtraItem,
    OrderShopItem
  },
  data () {
    return {
      page: 1,
      state: undefined,
      netpage: {
        nowPage: 0,
        totalPage: 1
      },
      orders: [],
      count: 1,
      hotelinfo: {
        name: ''
      }
    }
  },
  created () {
    this.state = this.$route.query.state

    // 获取酒店信息
    axios.get(api.hotelInfo).then((data) => {
      this.hotelinfo = data.results
    })
  },
  mounted () {
    if (this.state >= 6) {
      this.$refs.menu.scrollLeft = 225
    }
  },
  methods: {
    loadmore () {
      this.loadOrderList()
    },
    loadOrderList () {
      // fetchFlag 为防止重复请求
      if (fetchFlag) {
        return
      }
      fetchFlag = true
      /** 对增值服务订单和商品订单进行单独处理
       * state === 6 为增值服务订单
       * state === 7 为商品订单
       */

      switch (Number(this.state)) {
        case 6:
          axios.post(`${api.orderExtras}/${this.page++}`)
            .then((data) => {
              fetchFlag = false
              this.orders = this.orders.concat(data.results.lists)
              this.netpage.nowPage = data.results.nowPage
              this.netpage.totalPage = data.results.totalPage
              this.count = data.results.other.count
            })
          break
        case 7:
          axios.post(api.shopOrders.get, {
            page: this.page++
          })
            .then((data) => {
              fetchFlag = false
              this.orders = this.orders.concat(data.results.lists)
              this.netpage.nowPage = data.results.nowPage
              this.netpage.totalPage = data.results.totalPage
              this.count = data.results.other.count
            })
          break
        default:
          axios.post(api.orders, {
            page: this.page++,
            state: this.state
          }).then((data) => {
            fetchFlag = false

            this.orders = this.orders.concat(data.results.lists)
            this.netpage.nowPage = data.results.nowPage
            this.netpage.totalPage = data.results.totalPage
            this.count = data.results.other.count
          })
      }
    },
    reload () {
      this.reset()
      this.loadOrderList()
    },
    reset () {
      this.orders = []
      this.count = 1
      this.page = 1
    },
    isShopOrder (orderNo) {
      return /cms/.test(orderNo)
    },

    // animation
    beforeEnter: function (el) {
      el.style.opacity = 0
      Velocity.hook(el, 'translateY', '100px')
    },
    enter: function (el, done) {
      var delay = (el.dataset.index % 10) * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1, translateY: 0 },
          {
            complete: done,
            duration: 600
          }
        )
      }, delay)
    }
  },
  watch: {
    '$route.query.state': function (state) {
      this.state = state
      this.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.order_page {
  padding-top: 60px;
  padding-bottom: 50px;
  background: #F1F2F6;
}
.switchbar {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 3;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 0;
    border-bottom: solid 1px #ddd;
    background-color: #fff;
    width: 600px;
    .item {
      display: inline-block;
      width: 100px;
      font-size: 14px;
      text-align: center;
      padding: 15px 0;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        width: 0%;
        height: 1px;
        background: #108ee9;
        left: 0;
        bottom: -1px;
        transition: all .3s ease;
        left: 50%;
        transform: translateX(-50%);
      }
      &.router-link-exact-active {
        &:after {
          width: 100%;
        }
      }
    }
  }
}
.loadmore {
  width: 100%;
  text-align: center;
  padding: 10px 0;
  span {
    font-size: 14px;
    color: #555;
  }
}
</style>
