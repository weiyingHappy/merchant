<template>
  <div class="manage_page">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <div class="toolbar">
      <ul>
        <li class="item">
          <router-link :to="
            {
              name: 'Home'
            }
          ">
          商户主页
          </router-link>
        </li>
        <li class="item">
          <router-link :to="
          {
            name: 'OrderManage'
          }">
          订单管理
          </router-link>
        </li>
        <li class="item">
          <router-link :to="
          {
            name: 'HouseState'
          }">
          房态管理
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.manage_page {
  background-color: #F1F2F6;
  height: 100%;
}
.toolbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  border-top: solid 1px #ddd;
  animation: slideTop cubic-bezier(0, -0.04, 0.57, 1.21) .5s;
  ul {
    list-style: none;
    padding: 0;
    font-size: 0;
    li {
      font-size: 14px;
      display: inline-block;
      width: 33.333%;
      a {
        text-align: center;
        display: block;
        padding: 15px 0;
        border-right: 1px solid #eee;
        box-sizing: border-box;
        text-decoration: none;
        color: #333;
        &.router-link-active {
          color: #75A3A3;
        }
      }
    }
  }
}
</style>
