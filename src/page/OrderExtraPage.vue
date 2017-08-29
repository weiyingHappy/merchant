<template>
  <div class="order_info">
    <div class="order_panel">
      <div class="header">
        <div class="state">{{order.extra.state | orderExtraState}}</div>
        <div class="type">增值服务</div>
      </div>
    </div>
    <div class="custom_panel">
      <div class="title">无忧行李</div>
      <div class="line">起点：{{order.desc.start_address}}</div>
      <div class="line">终点：{{order.desc.end_address}}</div>
      <div class="line">行李数：{{order.desc.num}}</div>
      <div class="line">费用：{{order.pay_price}}  {{order.pay_type | paytype}}</div>
    </div>
    <div class="custom_panel">
      <div class="title">客户信息</div>
      <div class="line">入住人：{{order.user_name}}</div>
      <div class="line">联系方式：{{order.phone}}</div>
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
        num: '',
        extra: {
          state: 0
        },
        desc: {
          start_address: '',
          end_address: ''
        }
      },
      fetch: false
    }
  },
  created () {
    this.fetch = true
    axios.get(`${api.orderExtrasInfo}/${this.$route.params.id}`).then((data) => {
      this.fetch = false
      this.order = data.results
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
    width: 100%;
    color: #444;
    margin-top: 10px;
    .header {
      font-size: 0;
      padding-bottom: 10px;
      padding: 10px;
      box-sizing: border-box;
      .state,.type {
        display: inline-block;
        width: 50%;
        font-size: 14px;
      }
      .state {
        font-size: 16px;
      }
      .type {
        text-align: right;
        color: #888;
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
