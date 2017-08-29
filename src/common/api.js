const host = {
  production: 'http://www.hotelets.com/api/api',
  test: 'http://www.lianwuyun.cn/api/api',
  development: 'http://54.223.21.52/api/api',
  qiniu: 'http://7xo285.com1.z0.glb.clouddn.com/'
}

let realhost

let path = window.location.hostname
if (path.indexOf('hotelets.com') >= 0) {
  realhost = host.production
} else {
  realhost = host.test
}

if (process.env.NODE_ENV === 'development') {
  realhost = host.development
}

export default {
  login: realhost + '/BE/MerchantBasic/login',
  userInfo: realhost + '/BE/Merchant/userInfo',
  hotelInfo: realhost + '/BE/HotelManage/hotel',
  statis: realhost + '/BE/Merchant/statisH5',
  rooms: realhost + '/BE/RoomManage/rooms',
  orders: realhost + '/BE/OrderManage/orders',
  getTodayInventory: realhost + '/BE/RoomManage/getTodayInventory',
  room: realhost + '/BE/RoomManage/room',
  updateRoom: realhost + '/BE/RoomManage/update',
  order: realhost + '/BE/OrderManage/order',
  orderExtras: realhost + '/BE/OrderExtraManage/orderExtras',
  orderExtrasInfo: realhost + '/BE/OrderExtraManage/orderExtrasInfo',
  denyOrder: realhost + '/BE/OrderManage/denyOrder',
  confirmOrder: realhost + '/BE/OrderManage/confirm',
  dealApplyRefund: realhost + '/BE/OrderManage/dealApplyRefund',
  loginByWechat: realhost + '/BE/MerchantBasic/loginByWechat',
  bindWechat: realhost + '/BE/MerchantBasic/bindWechat',
  roomDynamics: {
    get: realhost + '/BE/RoomManage/oneDayRoomDynamics',
    update: realhost + '/BE/RoomManage/roomDynamicEdit'
  },
  onSale: realhost + '/BE/RoomManage/onSale',
  outSale: realhost + '/BE/RoomManage/outSale',
  orderCheck: realhost + '/BE/OrderManage/checkInOrder',
  shopOrders: {
    get: realhost + '/BE/StoreManager/storeCmsOrders',
    update: realhost + '/BE/StoreManager/editStoreCmsOrder',
    detail: realhost + '/BE/StoreManager/storeCmsOrderInfo'
  }
}
