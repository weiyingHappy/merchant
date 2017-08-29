<template>
  <div class="homepage">
    <div class="header">
      <div class="userinfo">
        <div class="header_img">
          <img src="../assets/person.png" alt="">
        </div>
        <div class="text_info">
          <div class="hotelname">{{hotelinfo.name}}</div>
          <div class="username">姓名：{{userinfo.merchant_name}}</div>
        </div>
      </div>
    </div>
    <div class="switch_time">
      <div class="control">
        <span>统计时间:</span>
        <el-select v-model="selectdate" @change="getStatis">
          <el-option v-for="option in dateoptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
        </el-select>
      </div>
    </div>
    <div class="order_list">
      <template v-if="statis.type === 0">
        <div class="title">总订单数: {{statis.total_order_num}}</div>
        <div class="title">已支付订单: {{statis.today_order_pay_num}}</div>
      </template>
      <template v-if="statis.type === 1">
        <div class="title">本周订单数: {{statis.total_order_num}}</div>
      </template>
      <template v-if="statis.type === 2">
        <div class="title">本月订单数: {{statis.total_order_num}}</div>
      </template>
      <div class="chart_content">
        <div class="echart" ref="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Select, Option } from 'element-ui'
import api from '@/common/api'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import { mapGetters } from 'vuex'

let echart

export default {
  name: 'Home',
  components: {
    'el-select': Select,
    'el-option': Option
  },
  computed: {
    ...mapGetters(['Role'])
  },
  data () {
    return {
      selectdate: 0,
      statis: '',
      dateoptions: [
        {
          value: 0,
          label: '今天'
        },
        {
          value: 1,
          label: '本周'
        },
        {
          value: 2,
          label: '本月'
        }
      ],
      userinfo: {
        merchant_name: ''
      },
      hotelinfo: {
        name: ''
      }
    }
  },
  created () {
    // 获取用户信息
    axios.post(api.userInfo).then((data) => {
      this.userinfo = data.results
    })
    // 获取酒店信息
    axios.get(api.hotelInfo).then((data) => {
      this.hotelinfo = data.results
    })

    // 权限设定
    switch (this.Role) {
      case 20:
        this.dateoptions = [
          {
            value: 0,
            label: '今天'
          }
        ]
        break
      case 30:
        this.dateoptions = [
          {
            value: 0,
            label: '今天'
          }
        ]
        break
    }

    this.getStatis()
  },
  methods: {
    getStatis () {
      // 获取订单信息
      axios.get(`${api.statis}/${this.selectdate}`).then((data) => {
        this.statis = data.results
        this.updateChart()
      })
    },
    updateChart () {
      if (!echart) {
        echart = echarts.init(this.$refs.chart)
      }
      if (this.statis.type === 0) {
        echart.setOption({
          xAxis: {
            data: ['订单总量', '支付订单量'],
            axisLabel: {
              interval: 0,
              rotate: 45
            }
          },
          yAxis: {
            minInterval: 1
          },
          series: [
            {
              name: '订单量',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              itemStyle: {
                normal: {
                  color: '#3398db'
                }
              },
              data: [this.statis.total_order_num, this.statis.today_order_pay_num]
            }
          ]
        })
      } else {
        echart.setOption({
          xAxis: {
            data: Object.keys(this.statis.statics),
            axisLabel: {
              interval: 0,
              rotate: 45
            }
          },
          yAxis: {},
          series: [
            {
              name: '订单量',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              itemStyle: {
                normal: {
                  color: '#3398db'
                }
              },
              data: Object.values(this.statis.statics)
            }
          ]
        })
      }
    }
  },
  destroyed () {
    echart.dispose()
    echart = undefined
  }
}
</script>

<style lang="scss" scoped>
.homepage {
  background-color: #F1F2F6;
  min-height: 100%;
  box-sizing: border-box;
  padding-bottom: 60px;
}
.header {
  height: 200px;
  background-color: #75A3A3;
  display: flex;
  align-items: center;
  justify-content: center;
  .userinfo {
    width: 80%;
    color: #fff;
    .header_img, .text_info {
      display: inline-block;
      vertical-align: middle;
    }
    .text_info {
      padding-left: 20px;
      font-size: 14px;
      .hotelname {
        margin-bottom: 10px;
      }
    }
    .header_img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.switch_time {
  background: #fff;
  border-bottom: solid 1px #ddd;
  padding: 10px 0;
  .control {
    text-align: center;
    font-size: 14px;
  }
}
.order_list {
  background-color: #fff;
  padding: 30px;
  border-bottom: solid 1px #ddd;
  margin-top: 20px;
  font-size: 14px;
  color: #444;
  .title {
    margin-bottom: 20px;
  }
  .chart_content {
    width: 100%;
    overflow-x: scroll;
    .echart {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
