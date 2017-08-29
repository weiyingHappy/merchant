<template>
  <div class="house_style_edit">
    <div class="inputcontainer">
      <el-form label-width="100px">
        <el-form-item label="房型标签：">
          {{room.name}}
        </el-form-item>
        <el-form-item label="门市价：">
          <el-input v-model="room.oprice" type="number"></el-input>
        </el-form-item>
        <el-form-item label="执行价：">
          <el-input v-model="room.sprice" type="number"></el-input>
        </el-form-item>
        <el-form-item label="房型库存：">
          <el-input v-model="room.num" type="number"></el-input>
        </el-form-item>
        <el-form-item label="已定库存：">
          {{inventory}}
        </el-form-item>
        <el-form-item label="剩余库存：">
          {{room.num - inventory}}
        </el-form-item>
      </el-form>
    </div>

    <div class="savebutton">
      <button @click="save">保存</button>
    </div>
  </div>
</template>

<script>
import { Form, FormItem, Input } from 'element-ui'
import api from '@/common/api'

export default {
  name: 'HouseStyleEdit',
  components: {
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input
  },
  data () {
    return {
      room: {
        name: '',
        oprice: '',
        sprice: '',
        num: ''
      },
      inventory: 0
    }
  },
  created () {
    axios.get(`${api.room}/${this.$route.params.id}`).then((data) => {
      this.room = data.results
    })
    axios.get(`${api.getTodayInventory}/${this.$route.params.id}`).then((data) => {
      this.inventory = data.results
    })
  },
  methods: {
    save () {
      axios.post(api.updateRoom, {
        id: this.$route.params.id,
        num: this.room.num,
        oprice: this.room.oprice,
        sprice: this.room.sprice,
        room_id: this.$route.params.id
      }).then((data) => {
        if (data.code === 200) {
          this.$router.push({
            name: 'HouseStyle'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.house_style_edit {
  height: 100%;
  background-color: #F1F2F6;
}
.inputcontainer {
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 2px 10px #d6d6d6;
  padding: 15px 10px 1px 10px;
  box-sizing: border-box;
}
.savebutton {
  position: fixed;
  bottom: 0;
  width: 100%;
  button {
    width: 100%;
    display: block;
    border: none;
    background: #4969F1;
    color: #fff;
    padding: 15px 0;
    outline: none;
  }
}
</style>
