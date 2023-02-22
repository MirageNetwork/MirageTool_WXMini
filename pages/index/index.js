// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: '转到扫码确认页查看',
    userInfo: {},
    hasUserInfo: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../register/register'
    })
  },
  goToAuthPage() {
    wx.navigateTo({
      url: '../scanAuth/scanAuth?scene=blabla'
    })
  },
  onLoad() {
  },
})
