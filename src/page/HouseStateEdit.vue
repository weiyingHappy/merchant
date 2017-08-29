<template>
  <div class="house_state">
    <div class="top">
      <div class="title">
        {{info.date | formatDateByString('MM月DD日')}}-{{info.name}}
      </div>
      <div class="house_state_info">
        <transition name="fade">
          <div class="bgimg" v-if="info.imgs"><img :src="info.imgs+'?imageMogr2/blur/40x50'" alt=""></div>
        </transition>
        <div class="cover">
          <div class="coverimg">
            <img :src="info.imgs+'?imageView2/5/w/65/h/78'" alt="">
          </div>
        </div>
        <div class="info">
          <div class="name">{{info.name}}</div>
          <div class="state down" v-if="info.sale == 0">已下架</div>
          <div class="state up" v-if="info.sale == 1">已上架</div>
          <div class="normal">执行价格：<span class="value">￥{{info.sprice}}</span></div>
          <div class="normal">门市价：<span class="value">￥{{info.oprice}}</span></div>
          <div class="normal">剩余库存：<span class="value">{{info.num-info.booked}}</span></div>
          <div class="normal">总库存：<span class="value">{{info.num}}</span></div>
        </div>
      </div>
    </div>
    <div class="graybar"></div>
    <div class="bottom">
      <div class="change_panel">
        <div class="p_title">修改房态</div>
        <div class="p_body noborderInput houseStateEdit">
          <el-form label-width="100px">
            <el-form-item label="执行价格：">
              <el-input-number :controls="false" v-model="value.sprice" type="number" placeholder="输入修改后的执行价"></el-input-number>
            </el-form-item>
            <el-form-item label="门市价格：">
              <el-input-number :controls="false" v-model="value.oprice" type="number" placeholder="输入修改后的门市价"></el-input-number>
            </el-form-item>
            <el-form-item label="库存：" class="count">
            <!--
              <button class="countbtn"><i class="el-icon-plus"></i></button>
              <span class="countnum">1</span>
              <button class="countbtn"><i class="el-icon-minus"></i></button> -->
              <el-input-number v-model="value.num"></el-input-number>
            </el-form-item>
          </el-form>


        </div>
      </div>
    </div>
    <div class="opbtns">
      <button class="cancel" @click="back">取消</button>
      <button class="save" @click="save">保存</button>
    </div>
  </div>
</template>

<script>
import { Form, FormItem, Input, InputNumber } from 'element-ui'
import api from '@/common/api'

export default {
  components: {
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
    'el-input-number': InputNumber
  },
  data () {
    return {
      info: {
        name: '',
        sale: '0',
        sprice: '',
        oprice: '',
        have: 0,
        num: '',
        imgs: '',
        date: '',
        booked: 0,
        id: ''
      },
      value: {
        sprice: '',
        oprice: '',
        num: 0
      }
    }
  },
  created () {
    this.getRoomInfo()
    this.info.date = this.$route.query.date
    this.info.booked = this.$route.query.booked
  },
  methods: {
    getRoomInfo () {
      axios.get(`${api.room}/${this.$route.params.id}`)
        .then((data) => {
          const result = data.results
          if (data.code === 200) {
            this.info.name = result.name
            this.info.sprice = result.sprice
            this.info.oprice = result.oprice
            this.info.num = result.num
            this.info.imgs = result.imgs[0]
            this.info.sale = result.sale
            this.info.id = result.id
            this.value.num = result.num
          }
        })
    },
    back () {
      // this.$router.push({
      //   name: 'OrderManage'
      // })
      window.history.back()
    },
    save () {
      axios.post(api.roomDynamics.update, {
        time: this.info.date,
        room_id: this.info.id,
        num: this.value.num,
        sprice: this.value.sprice,
        oprice: this.value.oprice
      })
        .then((data) => {
          if (data.code === 200) {
            this.back()
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.house_state {
  min-height: 100%;
  background-color: #fff;
  .top {
    background: #F1F2F6;
    overflow: hidden;
    .house_state_info {
      border: solid 1px #E0E0E0;
      border-left: none;
      border-right: none;
      font-size: 0;
      padding: 10px 0;
      background-color: #fff;
      position: relative;
      .bgimg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
        }
      }
      .cover,.info {
        display: inline-block;
        font-size: 14px;
        vertical-align: middle;
        z-index: 1;
        position: relative;
      }
      .cover {
        width: 30%;
        box-sizing: border-box;
        padding: 5px;
        .coverimg {
          width: 100%;
          padding-top: 120%;
          background: #989898;
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
        width: 70%;
        box-sizing: border-box;
        padding-left: 15px;
        .name {
          color: #fff;
          text-shadow: 1px 1px 2px #3e3e3e;
          font-size: 16px;
        }
        .state {
          font-size: 12px;
          margin-top: 10px;
          border: solid 1px #ddd;
          border-radius: 8px;
          display: inline-block;
          padding: 2px 10px;
          text-shadow: 1px 1px 2px #3e3e3e;
          box-shadow: 1px 1px 2px #3e3e3e;
          &.down {
            color: #FFC600;
            border-color: #FFC600;
          }
          &.up {
            color: #05C600;
            border-color: #05C600;
          }
        }
        .normal {
          color: #fff;
          margin-top: 5px;
          text-shadow: 1px 1px 2px #3e3e3e;
          .value {
            color: #fff;
            text-shadow: 1px 1px 2px #3e3e3e;
          }
        }
      }
    }
  }
  .title {
    border: solid 1px #E0E0E0;
    border-left: none;
    border-right: none;
    background: #fff;
    padding: 10px 0;
    text-align: center;
    margin: 10px 0;
    font-size: 14px;
  }
  .graybar {
    height: 10px;
    background: #F1F2F6;
  }
  .bottom {
    background: #fff;
    .change_panel {
      .p_title {
        border-bottom: solid 1px #eee;
        box-sizing: border-box;
        font-size: 14px;
        color: #333333;
        padding: 15px 15px;
      }
      .p_body {
        box-sizing: border-box;
        padding: 10px 10px;
        .countbtn {
          border: solid 1px #ddd;
          background-color: #fff;
          color: #989898;
          font-size: 14px;
          width: 30px;
          height: 30px;
          border-radius: 4px;
          outline: none;
        }
        .countnum {
          margin: 0 10px;
        }

      }
    }
  }
  .opbtns {
    position: fixed;
    bottom: 0;
    width: 100%;
    font-size: 0;
    button {
      border: none;
      outline: none;
      color: #fff;
      height: 50px;
      padding: 0 30px;
      font-size: 14px;
    }
    .cancel {
      background-color: #CFCFCF;
      width: 30%;
    }
    .save {
      background-color: #FF5000;
      width: 70%;
    }
  }
}
</style>
