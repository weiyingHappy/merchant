<!-- 增值服务订单项 -->
<template>
    <div class="order_item">
    <div class="line top">
      <div class="state">{{order.extra.state | orderExtraState}}</div>
    </div>
    <div class="line room_name">
      {{order.user_name}}_无忧行李
    </div>
    <div class="line">联系方式：{{order.phone}}</div>
    <div class="line">件数：{{order.desc.num}}</div>
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
      .seemore,.confirm {
        display: inline-block;
        font-size: 14px;
        vertical-align: middle;
        text-align: right;
      }
      .seemore {
        width: 100%;
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
        width: 100%;
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
