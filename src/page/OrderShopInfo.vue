<template>
  <div class="order_shop_info">
    <div class="panel" v-if="detail">
      <div class="title">订单状态</div>
      <div class="body">
        <div class="order_state">
          {{detail.state | shopOrderState}}
        </div>
      </div>
    </div>

    <div class="panel" v-if="detail">
      <div class="title">商品信息</div>
      <div class="body">
        <ul class="product_list">
          <li class="product" :key="product.id" v-for="product in detail.product_snapshot">
            {{product.product_name}}*{{product.num}}
          </li>
        </ul>
        <div class="count">共{{detail.product_snapshot.length}}件商品</div>
      </div>
      <div class="price">
        <div class="product_price line">
          <div class="label">商品金额</div>
          <div class="value">￥{{detail.product_price}}</div>
        </div>
        <div class="order_price line">
          <div class="label">订单金额</div>
          <div class="value">￥{{detail.order_price}}</div>
        </div>
      </div>
    </div>

    <div class="panel" v-if="detail">
      <div class="title">配送信息</div>
      <div class="body">
        <div class="info">
          房间号：{{detail.room_no}}
        </div>
        <div class="info">
          入住人：{{detail.user_name}}
        </div>
        <div class="info">
          联系电话：{{detail.phone}}
        </div>
        <div class="info">
          备注：{{detail.note}}
        </div>
      </div>
    </div>

    <div class="panel" v-if="detail">
      <div class="title">订单信息</div>
      <div class="body">
        <div class="info">
          订单编号：{{detail.order_no}}
        </div>
        <div class="info">
          下单时间：{{detail.create_time}}
        </div>
        <div class="info">
          订单金额：{{detail.order_price}}
        </div>
      </div>
    </div>

    <div class="operation_btn" v-if="detail">
      <template v-if="detail.state == 1">
        <button class="confirm" @click.stop="updateState(2)">确认</button>
        <button @click.stop="updateState(11)">取消订单</button>
      </template>
      <template v-else-if="detail.state == 2">
        <button class="confirm" @click.stop="updateState(10)">送达</button>
        <button @click.stop="updateState(11)">取消订单</button>
      </template>
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
import { Message } from 'element-ui'

export default {
  data () {
    return {
      detail: undefined,
      fetch: true
    }
  },
  created () {
    this.loadDetail()
  },
  methods: {
    loadDetail () {
      axios.get(`${api.shopOrders.detail}/${this.$route.params.no}`)
        .then(data => {
          this.fetch = false
          this.detail = data.results
        })
    },
    updateState (state) {
      axios.post(api.shopOrders.update, {
        order_no: this.detail.order_no,
        state
      }).then((result) => {
        if (result.code === 200) {
          Message('操作成功')
          this.loadDetail()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.order_shop_info {
  background-color: #f2f2f2;
  height: 100%;
  .panel {
    background-color: #fff;
    margin-bottom: 10px;
    .title {
      padding: 12px;
      color: #333;
      font-size: 14px;
      border-bottom: solid 1px #dcdcdc;
    }
    .body {
      padding: 12px;
    }
  }
  .price {
    border-top: solid 1px #dcdcdc;
    padding: 10px;
    .product_price {
      margin-bottom: 10px;
      color: #919191;
    }
    .order_price {
      color: #333;
      >div {
        font-size: 15px;
      }
    }
  }
  .line {
    font-size: 0;
    .label, .value {
      font-size: 14px;
      display: inline-block;
      width: 50%;
    }
    .value {
      text-align: right;
    }
  }
  .order_state {
    font-size: 12px;
    color: #666;
  }

  .info {
    color: #666;
    font-size: 14px;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .product_list {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      font-size: 14px;
      color: #444;
    }
  }

  .count {
    font-size: 15px;
    color: #333;
    margin-top: 10px;
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

  .operation_btn {
    text-align: right;
    button {
      border: solid 1px #23beae;
      background-color: #fff;
      border-radius: 4px;
      padding: 5px 10px;
      margin-right: 10px;
      &.confirm {
        background-color: #23beae;
        color: #fff;
      }
    }
  }
}
</style>
