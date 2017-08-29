<template>
  <div class="house_item">
    <div class="content">
      <div class="left">
        <div class="name">{{value.name}}</div>
        <div class="price">执行价格 {{value.sprice}}/{{value.oprice}}</div>
      </div>
      <div class="right">
        <div class="text">
          <div class="type">{{value.state | state}}</div>
        </div>
        <div class="navfont"><i class="el-icon-arrow-right"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HouseItem',
  props: ['value'],
  filters: {
    state (value) {
      if (value === 0) {
        return '已上架'
      } else {
        return '已下架'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.house_item {
  padding-top: 10px;
  .content {
    width: 100%;
    background-color: #fff;
    border-top: solid 1px #ddd;
    border-bottom: solid 1px #ddd;
    font-size: 0;
    padding: 10px;
    box-sizing: border-box;
    .left, .right {
      display: inline-block;
      width: 50%;
      font-size: 14px;
      vertical-align: middle;
    }
    .right {
      font-size: 0;
      .text,.navfont {
        font-size: 14px;
        display: inline-block;
        vertical-align: middle;
      }
      .text {
        width: 60%;
      }
      .navfont {
        width: 40%;
        text-align: right;
        i {
          font-size: 20px;
          color: #b2b2b2;
        }
      }
    }
    .name {
      font-size: 18px;
      margin-bottom: 10px;
      color: #333;
    }
    .price,.store {
      color: #999;
    }
    .type {
      color: #4969f1;
      font-size: 15px;
      text-align: right;
    }
  }
}
</style>
