<template>
  <div class="house_state">
    <div class="date_select">
      <div class="left" @click="operadate(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <datetime year-row="{value}年" month-row="{value}月" day-row="{value}日" v-model="showdate" class="datepicker" confirm-text="确认" title="" cancel-text="取消">
        <div class="date">{{ showdate | formatDateByString('MM月DD日') }}</div>
      </datetime>
      <div class="right" @click="operadate(1)">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="house_states">
      <ul class="statelist">
        <li v-for="i in statelist" >
          <router-link v-if="Role <= 10" :to="{
              name: 'HouseStateEdit',
              params: {
                id: i.id
              },
              query: {
                date: i.dynamic.date,
                booked: i.dynamic.booked
              }
            }" tag="div">
            <house-state-item :value="i" @update="updateStateList"></house-state-item>
          </router-link>
          <house-state-item :value="i" v-else></house-state-item>
        </li>
      </ul>
      <p v-if="fetch" class="tips">房态列表加载中...</p>
      <p v-else-if="statelist.length === 0" class="tips">该天无数据</p>
    </div>
  </div>
</template>

<script>
import { Datetime } from 'vux'
import HouseStateItem from '@/components/HouseStateItem'
import api from '@/common/api'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  components: {
    Datetime,
    HouseStateItem
  },
  data () {
    return {
      showdate: moment().format('YYYY-MM-DD'),
      statelist: [],
      fetch: false
    }
  },
  computed: {
    ...mapGetters(['Role'])
  },
  watch: {
    showdate () {
      this.updateStateList()
    }
  },
  created () {
    this.updateStateList()
  },
  methods: {
    updateStateList () {
      this.statelist = [] // 清空现有列表
      this.fetch = true
      axios.post(api.roomDynamics.get, {
        date: this.showdate
      }).then((data) => {
        this.fetch = false
        if (data.code === 200) {
          this.statelist = data.results
        }
      })
    },
    operadate (value) {
      this.showdate = moment(this.showdate).add(value, 'day').format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="scss" scoped>
.house_state {
  min-height: 100%;
  padding-top: 30px;
  padding-bottom: 65px;
  background: #F1F2F6;
  .tips {
    text-align: center;
    color: #888;
    font-size: 14px;
  }
  .date_select {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 3;
    .left,.right {
      position: absolute;
      top: 10px;
      z-index: 2;
      width: 20%;
      color: #8B8B8B;
    }
    .left {
      left: 0;
      text-align: left;
      padding-left: 20px;
    }
    .right {
      right: 0;
      text-align: right;
      padding-right: 20px;
    }
  }
  .datepicker {
    padding: 0;
    text-decoration: none;
  }
  .date {
    width: 100%;
    text-align: center;
    background-color: #fff;
    padding: 10px 0;
    font-size: 14px;
    color: #555;
    border-bottom: solid 1px #eee;
  }
}

.statelist {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    margin-top: 20px;
  }
}
</style>
