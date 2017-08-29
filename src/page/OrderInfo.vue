<template>
  <div class="order_info">
    <div class="order_panel">
      <div class="header">
        <div class="name">{{order.user_name}}_{{order.room_name}}</div>
        <div class="type">{{order.type | ordertype}}</div>
        <div class="state">{{order.state | orderstate}}</div>
      </div>
      <div class="line" v-if="order.package_id > 0">套餐：{{order.package_snapshot.name}}</div>
      <div class="line" v-if="order.package_id > 0">包含：<span v-for="(itm, index) in order.package_snapshot.products" :key="index">{{itm.name}}*{{itm.num}}&nbsp;&nbsp;</span>
      </div>
      <div class="line">房型：{{order.room_name}}</div>
      <div class="line">间数：{{order.num}}间</div>
      <div class="line">入离时间：{{order.start}}至{{order.end}}</div>
      <div class="line">订单类型：{{order.type | ordertype}}</div>
    </div>
    <div class="custom_panel">
      <div class="title">客户信息</div>
      <div class="line">入住人：{{order.user_name}}</div>
      <div class="line">联系方式：{{order.phone}}</div>
    </div>
    <div class="custom_panel">
      <div class="title">订单信息</div>
      <div class="line">订单编号：{{order.order_no}}</div>
      <div class="line">下单时间：{{order.create_time}}</div>
      <div class="line">订单金额：{{order.price}}</div>
      <div class="line">优惠金额：{{order.price - order.pay_price}}</div>
      <div class="line">支付类型：{{order.pay_type | paytype}}</div>
      <div class="line">支付金额：{{order.pay_price}}</div>
    </div>

    <div class="operation_btns" v-if="order.state == 1||(order.state == 0&&order.type == 3)">
      <button class="refuse" @click="refuse(order.order_no)">拒绝</button>
      <button class="confirm" @click="confirm(order.order_no)">确认</button>
    </div>
    <div class="operation_btns" v-else-if="order.state == 2&&(order.type == 3||order.type == 1)&&order.checkin == 0">
      <button class="refuse" @click="refuseCheck(order.order_no)">未入住</button>
      <button class="confirm" @click="confirmCheck(order.order_no)">确认入住</button>
    </div>
    <div class="operation_btns" v-else-if="(order.state == 1 && order.apply_refund==1) || (order.state == 2 && order.apply_refund==2)">
      <button class="refuse" @click="refuseRefund(order.order_no)">拒绝退款</button>
      <button class="confirm" @click="confirmRefund(order.order_no)">确认退款</button>
    </div>

    <transition name="fade">
      <div class="loading" v-if="fetch">
        <div class="panel">
          加载中
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import api from '@/common/api'

export default {
  name: 'OrderInfo',
  methods: {
    back () {
      // this.$router.push({
      //   name: 'OrderManage'
      // })
      window.history.back()
    },
    refuse (number) {
      axios.post(api.denyOrder, {
        order_no: this.order.order_no,
        result: 0,
        reason: 'default'
      }).then((data) => {
        if (data.code === 200) {
          this.back()
        }
      })
    },
    confirm (number) {
      axios.post(api.denyOrder, {
        order_no: this.order.order_no,
        result: 1,
        reason: 'default'
      }).then((data) => {
        if (data.code === 200) {
          this.back()
        }
      })
    },
    confirmRefund () {
      axios.post(api.dealApplyRefund, {
        order_no: this.order.order_no,
        result: 1,
        reason: 'default'
      }).then((data) => {
        if (data.code === 200) {
          this.back()
        }
      })
    },
    refuseRefund () {
      axios.post(api.dealApplyRefund, {
        order_no: this.order.order_no,
        result: 0,
        reason: 'default'
      }).then((data) => {
        if (data.code === 200) {
          this.back()
        }
      })
    },
    refuseCheck () { // 未入住
      axios.post(api.orderCheck, {
        order_no: this.order.order_no,
        result: 0
      })
        .then((data) => {
          if (data.code === 200) {
            this.$emit('refuse')
          }
        })
    },
    confirmCheck () { // 已入住
      axios.post(api.orderCheck, {
        order_no: this.order.order_no,
        result: 1
      })
        .then((data) => {
          if (data.code === 200) {
            this.$emit('confirm')
          }
        })
    }
  },
  data () {
    return {
      order: {
        state: 0,
        order_no: '',
        user_name: '',
        type: '',
        start: '',
        end: '',
        price: '',
        phone: '',
        pay_type: '',
        create_time: '',
        room_name: '',
        num: ''
      },
      fetch: false
    }
  },
  created () {
    this.fetch = true
    axios.get(`${api.order}/${this.$route.params.id}`).then((data) => {
      this.fetch = false
      this.order = data.results
      console.log(this.order)
    })
  }
}
</script>

<style lang="scss" scoped>
.order_info {
  min-height: 100%;
  background-color: #F1F2F6;
  padding-bottom: 80px;
  box-sizing: border-box;
  overflow: hidden;
  .order_panel {
    background-color: #fff;
    width: 100%;
    border-bottom: 1px solid #ddd;
    color: #444;
    margin-top: 10px;
    .header {
      font-size: 0;
      border-bottom: solid 1px #eee;
      padding-bottom: 10px;
      padding: 10px;
      box-sizing: border-box;
      .name,.type {
        display: inline-block;
        width: 50%;
        font-size: 14px;
      }
      .name {
        font-size: 16px;
      }
      .type {
        text-align: right;
        color: #fe0000;
      }
      .state {
        font-size: 14px;
        margin-top: 10px;
      }
    }
    .line {
      margin: 10px 0;
      padding-left: 20px;
      box-sizing: border-box;
      color: #777;
      font-size: 13px;
    }
  }
  .backbtn {
    position: fixed;
    right: 20px;
    bottom: 40px;
    button{
      width: 40px;
      height: 40px;
      border: none;
      color: #fff;
      background: #4969F1;
      border-radius: 50%;
      box-shadow: 1px 1px 7px 0px #3f4e8c;
      outline: none;
    }
  }
  .custom_panel {
    background-color: #fff;
    width: 100%;
    border-bottom: 1px solid #ddd;
    color: #444;
    margin-top: 10px;
    font-size: 14px;
    .title {
      border-bottom: solid 1px #ddd;
      padding: 10px;
      box-sizing: border-box;
    }
    .line {
      padding-left: 20px;
      box-sizing: border-box;
      color: #777;
      font-size: 13px;
      margin: 10px 0;
    }
  }

  .operation_btns {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    text-align: center;
    padding: 20px 0;
    border-top: solid 1px #eee;
    box-shadow: 0 -2px 20px 1px #dcdcdc;
    button {
      background: #aaa;
      border: none;
      outline: none;
      color: #fff;
      font-size: 14px;
      padding:10px 30px;
      margin: 0 5px;
      border-radius: 4px;
      &.confirm {
        background: #54bec3;
      }
      &.refuse {
        background: #f99191;
      }
    }
  }

  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.37);
    display: flex;
    justify-content: center;
    align-items: center;
    .panel {
      width: 50%;
      height: 20%;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border: solid 1px #eee;
      border-radius: 4px;
      box-shadow: 0px 1px 20px 0px #e4e4e4;
      color: #777;
      font-size: 14px;
    }
  }
}
span {
  &.type {
    color: rgb(117, 163, 163);
  }
  &.money {
    color: #ff0000;
  }
}
</style>
