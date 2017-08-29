<template>
  <div class="state-item">
    <div class="cover">
      <div class="coverimg">
        <img :src="value.imgs[0]+'?imageView2/5/w/65/h/78'" alt="">
      </div>
    </div>
    <div class="info">
      <div class="name">{{value.name}}</div>
      <div class="price">执行价格：{{value.dynamic.sprice}}</div>
      <div class="price">门市价：{{value.dynamic.oprice}}</div>
    </div>
    <div class="operation">
      <div class="stockstr">
        <span v-if="value.dynamic.booked/value.dynamic.num >= 0.8" >库存不足</span>
        <span v-else>库存</span>
      </div>
      <div class="stocknum">
        <span class="surplus">{{value.dynamic.num-value.dynamic.booked}}</span>/{{value.dynamic.num}}
      </div>
      <template v-if="Role <= 10">
        <template v-if="value.sale === '1'">
          <div class="state up">已上架</div>
          <div class="operabtn">
            <button class="down" @click.stop="outSale(value.id)">下&nbsp;&nbsp;架</button>
          </div>
        </template>
        <template v-if="value.sale === '0'">
          <div class="state down">已下架</div>
          <div class="operabtn">
            <button class="up" @click.stop="onSale(value.id)">上&nbsp;&nbsp;架</button>
          </div>
        </template>
      </template>
    </div>
    <div class="navicon">
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
import api from '@/common/api'
import { mapGetters } from 'vuex'

export default {
  name: 'HouseStateItem',
  props: ['value'],
  computed: {
    ...mapGetters(['Role'])
  },
  methods: {
    outSale (id) {
      this.requestApi(api.outSale, {room_id: id})
    },
    onSale (id) {
      this.requestApi(api.onSale, {room_id: id})
    },
    requestApi (url, data) {
      axios.post(url, data)
        .then((data) => {
          if (data.code === 200) {
            this.$emit('update')
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.state-item {
  background-color: #fff;
  border: solid 1px #eee;
  border-left: 0;
  border-right: 0;
  font-size: 0;
  padding: 10px 0;
  .cover,.info,.operation,.navicon {
    display: inline-block;
    font-size: 14px;
    vertical-align: middle;
  }
  .cover {
    width: 20%;
    box-sizing: border-box;
    padding: 5px;
    .coverimg {
      width: 100%;
      margin: auto;
      padding-top: 120%;
      background: #ddd;
      position: relative;
      overflow: hidden;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
  .info {
    width: 50%;
    box-sizing: border-box;
    padding-left: 10px;
    .name {
      font-size: 15px;
      color: #333333;
      margin-bottom: 10px;
    }
    .price {
      font-size: 13px;
      color: #666666;
      margin-top: 5px;
    }
  }
  .operation {
    width: 25%;
    text-align: center;
    .stockstr,.stocknum {
      font-size: 13px;
      color: #333333;
    }
    .stocknum {
      margin-top: 5px;
      .surplus {
        font-size: 16px;
      }
    }
    .state {
      font-size: 12px;
      margin-top: 10px;
      &.up {
        color: #05C600;
      }
      &.down {
        color: #FFC600;
      }
    }
    .operabtn {
      button {
        border: none;
        padding: 5px 15px;
        border-radius: 4px;
        outline: none;
        font-size: 14px;
        color: #fff;
        margin-top: 5px;
        &.down {
          background-color: #75A3A3;
        }
        &.up {
          background-color: #FF5000;
        }
      }
    }
  }
  .navicon {
    width: 5%;
    i{
      color: #8B8B8B;
    }
  }
}
</style>
