<!--
 订单商品列表项
-->
<template>
  <div class="order_shop_item">
    <div class="header">
      <div class="name">
        <i class="iconfont icon-gouwukuang"></i>
        <span class="hotel_name">{{order.room_no}}</span>
      </div>
      <div class="state">
        {{order.state | shopOrderState}}
      </div>
    </div>
    <div class="info">
      <div class="shop_name">
        <span class="product_name">{{order.title}}</span>
      </div>
      <div class="line">
        <span class="label">金额:</span>
        <span class="value">￥{{order.order_price}}</span>
      </div>
      <div class="line">
        <span class="label">下单时间:</span>
        <span class="value">{{order.create_time}}</span>
      </div>
    </div>
    <div class="operation_btn">
      <template v-if="order.state == 1">
        <button @click.stop="updateState(2)">确认</button>
        <button @click.stop="updateState(11)">取消订单</button>
      </template>
      <template v-else-if="order.state == 2">
        <button @click.stop="updateState(10)">送达</button>
        <button @click.stop="updateState(11)">取消订单</button>
      </template>
      <template v-else>
        <button>查看详情</button>
      </template>
    </div>
  </div>
</template>

<script>
import api from '@/common/api'
import { Message } from 'element-ui'

export default {
  props: {
    order: {
      type: Object
    },
    hotelinfo: {
      type: Object
    }
  },
  methods: {
    updateState (state) {
      axios.post(api.shopOrders.update, {
        order_no: this.order.order_no,
        state
      }).then((result) => {
        if (result.code === 200) {
          Message('操作成功')
          this.$emit('update')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.order_shop_item {
  background-color: #fff;
  margin: 0 10px 10px 10px;
  border: solid 1px #ddd;
  border-radius: 4px;
  padding: 10px;
  .header {
    border-bottom: solid 1px #ddd;
    font-size: 0;
    padding-bottom: 8px;
    .name, .state {
      font-size: 15px;
      display: inline-block;
    }
    .name {
      width: 60%;
      color: #333;
      .iconfont {
        font-size: 20px;
        color: #23beae;
      }
    }
    .state {
      width: 40%;
      text-align: right;
      color: #616161;
    }
  }

  .info {
    font-size: 14px;
    .shop_name {
      padding: 5px 0;
      color: #666;
      .product_name {
        margin-right: 10px;
      }
    }

    .line {
      padding: 5px 0;
      color: #666;
      .label, .value {
        display: inline-block;
      }
      .label {
        width: 30%;
      }
      .value {

      }
    }
  }

  .operation_btn {
    margin-top: 10px;
    text-align: right;
    button {
      border: solid 1px #23beae;
      border-radius: 4px;
      padding: 5px;
      background-color: #fff;
      color: #616161;
      font-size: 14px;
    }
  }
}
</style>
