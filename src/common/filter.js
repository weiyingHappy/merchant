import moment from 'moment'

export const addFilter = (Vue) => {
  // 订单类型
  Vue.filter('ordertype', (value) => {
    switch (Number(value)) {
      case 0:
        return '平台订单'
      case 1:
        return '抢房订单'
      case 2:
        return '门店订单'
      default:
        return '到付订单'
    }
  })

  // 增值订单状态
  Vue.filter('orderExtraState', (value) => {
    switch (Number(value)) {
      case 0:
        return '待支付'
      case 1:
        return '确认中'
      case 2:
        return '派单中'
      case 3:
        return '已接单'
      case 4:
        return '运送中'
      case 5:
        return '已到达'
      case 6:
        return '已完成'
      default:
        return '未知'
    }
  })

  // 支付类型
  Vue.filter('paytype', (value) => {
    switch (Number(value)) {
      case 0:
        return '微信支付'
      case 1:
        return '支付宝支付'
      case 2:
        return '住金支付'
      default:
        return '未知支付'
    }
  })

  // 订单状态
  Vue.filter('orderstate', (value) => {
    switch (Number(value)) {
      case 0:
        return '待支付'
      case 1:
        return '已支付'
      case 2:
        return '已确认'
      case 5:
        return '申请退款'
      case 10:
        return '已完成'
      case 11:
        return '用户取消'
      case 12:
        return '商户取消'
      case 13:
        return '平台强行取消'
      default:
        return '异常'
    }
  })

  // 通过字符串格式化时间
  Vue.filter('formatDateByString', (value, rule) => {
    return moment(value).format(rule)
  })

  // 商品订单状态
  Vue.filter('shopOrderState', (value) => {
    switch (Number(value)) {
      case 0:
        return '待支付'
      case 1:
        return '已支付'
      case 2:
        return '已确认'
      case 10:
        return '已完成'
      case 11:
        return '用户取消'
      default:
        return '异常'
    }
  })
}
