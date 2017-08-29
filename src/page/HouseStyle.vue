<template>
  <div class="housestyle_page">
    <template v-for="(house, $index) in houses">
      <router-link :to="{name: 'HouseStyleEdit', params: {id:house.id}}">
        <house-item :value="house" :key="$index"></house-item>
      </router-link>
    </template>
    <div class="loadmore" v-if="netpage.nowPage != netpage.totalPage">
      <span v-inview:enter="loadmore">
        加载更多
      </span>
    </div>
  </div>
</template>

<script>
import HouseItem from '@/components/HouseItem'
import api from '@/common/api'

export default {
  name: 'HouseStyle',
  components: {
    HouseItem
  },
  data () {
    return {
      page: 1,
      netpage: {
        nowPage: 0,
        totalPage: 1
      },
      houses: []
    }
  },
  created () {
  },
  methods: {
    loadmore () {
      this.loadinfo()
    },
    loadinfo () {
      axios.post(api.rooms, {
        page: this.page++
      }).then((data) => {
        this.houses = this.houses.concat(data.results.lists)
        this.netpage.nowPage = data.results.nowPage
        this.netpage.totalPage = data.results.totalPage
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.housestyle_page {
  padding-bottom: 50px;
  .loadmore {
    width: 100%;
    text-align: center;
    padding: 10px 0;
    span {
      font-size: 14px;
      color: #555;
    }
  }
}
</style>
