<template>
  <div class="order_item">
    <div class="line top">
      <div class="state">{{order.state | orderstate}}</div>
      <div class="ordertype">
        <span v-if="order.type == 3" class="type">
          到店支付
        </span>
        <span v-if="order.state == 5" class="refundstate">
          [申请退款]
        </span>
      </div>
    </div>
    <div class="line room_name">
      {{order.user_name}}_{{order.room_name}}
    </div>
    <div class="line">联系方式：{{order.phone}}</div>
    <div class="line">支付金额：<span class="money">￥{{order.pay_price}}</span></div>
    <div class="line">入离时间：{{order.start}}至{{order.end}}</div>
    <div class="line" v-if="order.state != 0">
      <div class="pay" v-if="order.type != 3">
        支付类型：{{order.pay_type | paytype}}
      </div>
      <div class="pay" v-else>
        支付类型：到店支付
      </div>
    </div>
    <div class="line bottom">
      <div class="tips">
        <span v-if="order.type == 3">
          到店支付，请注意收款
        </span>
        <span v-else-if="order.pay_type == 2">
          住金支付，无需开发票
        </span>
      </div>
      <div class="confirm" v-if="order.state == 1||(order.state == 0&&order.type == 3)">
        <button class="confirmBtn" @click.stop="confirm(order.order_no)">确认</button>
        <button class="refuseBtn" @click.stop="refuse(order.order_no)">拒绝</button>
      </div>
      <div class="confirm" v-else-if="order.state == 2&&(order.type == 3||order.type == 1)&&order.checkin == 0">
        <button class="confirmBtn" @click.stop="confirmCheck(order.order_no)">确认入住</button>
        <button class="refuseBtn" @click.stop="refuseCheck(order.order_no)">未入住</button>
      </div>
      <div class="confirm" v-else-if="(order.state == 1 && order.apply_refund==1) || (order.state == 2 && order.apply_refund==2)">
        <button class="refuseRefundBtn" @click.stop="refuseRefund(order.order_no)">拒绝退款</button>
        <button class="confirmRefundBtn" @click.stop="confirmRefund(order.order_no)">确认退款</button>
      </div>
      <div class="seemore" v-else>
        <router-link :to="{name: 'OrderInfo', params: {id:order.order_no}}">查看详情</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/common/api'

export default {
  name: 'OrderItem',
  props: ['order'],
  methods: {
    refuse (number) {
      axios.post(api.denyOrder, {
        order_no: this.order.order_no,
        reason: 'default'
      }).then((data) => {
        if (data.code === 200) {
          this.$emit('refuse')
        }
      })
    },
    confirm (number) {
      axios.post(api.confirmOrder, {
        order_no: this.order.order_no,
        reason: 'default'
      }).then((data) => {
        if (data.code === 200) {
          this.$emit('confirm')
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
          this.$emit('confirm')
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
          this.$emit('refuse')
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
  }
}
</script>

<style lang="scss" scoped>
.order_item {
  background-color: #fff;
  margin: 0 10px 10px 10px;
  box-shadow: 0 4px 14px 0px #e4e4e4;
  border-radius: 4px;
  .line {
    padding: 10px 5px;
    font-size: 12px;
    &.room_name {
      font-size: 16px;
    }
    &.top {
      font-size: 0;
      border-bottom:solid 1px #E0E0E0;
      .ordertype, .state {
        display: inline-block;
        font-size: 14px;
        vertical-align: middle;
      }
      .ordertype {
        width: 50%;
        text-align: right;
        color: #fe0000;
      }
      .state {
        width: 50%;
        color: #75A3A3;
      }
    }
    &.bottom {
      font-size: 0;
      border-top:solid 1px #E0E0E0;
      .tips,.confirm,.seemore {
        display: inline-block;
        font-size: 14px;
        vertical-align: middle;
        text-align: right;
        width: 50%;
      }
      .tips {
        text-align: left;
      }
      .seemore {
        a {
          display: inline-block;
          background: #58B0B0;
          color: #fff;
          border-radius: 4px;
          padding: 5px 10px;
          outline: none;
          text-decoration: none;
        }
      }
      .confirm {
        width: 50%;
        text-align: right;
        .refuseBtn,.confirmBtn {
          display: inline-block;
          background: #58B0B0;
          color: #fff;
          border-radius: 4px;
          padding: 5px 10px;
          text-decoration: none;
          border: none;
          margin-left: 10px;
        }
        .refuseRefundBtn,.confirmRefundBtn {
          display: block;
          background: #58B0B0;
          color: #fff;
          border-radius: 4px;
          padding: 5px 10px;
          text-decoration: none;
          border: none;
          margin: 5px auto;
        }
        .refuseBtn {
          background: #FD3C3B;
        }
        .refuseRefundBtn {
          background: #FD3C3B;
        }
      }
    }
  }
  .content {
    font-size: 0;
  }
  .left, .right {
    display: inline-block;
    font-size: 12px;
    vertical-align: middle;
  }
  .left {
    width: 30%;
    .imgs {
      width: 80px;
      height: 80px;
      background: #000;
      border-radius: 4px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .right {
    width: 70%;
    .infotext {
      margin: 5px 0;
      .money {
        color: #ff0000;
      }
    }
  }
}
</style>
