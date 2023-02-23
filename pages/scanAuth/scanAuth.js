// pages/scanAuth/scanAuth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shortStateCode: "",
    stateCode:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(query) {
    if (query != undefined) {
      // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
      const stateCode = decodeURIComponent(query.scene)
      const shortStateCode = stateCode.substring(3,9)
      this.setData({
        stateCode,
        shortStateCode
      })
    }
  },
  cancelAuth() {
    wx.exitMiniProgram()
  },
  sendAuth() {
    if (this.data.stateCode == "") {
      wx.showToast({
        title: '校验码出问题了',
        icon: 'error',
        duration: 2000
      })
      return
    }
    let stateCode = this.data.stateCode
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            method: "POST",
            url: 'https://mirage.nopkt.com/authQR',
            data: {
              logincode: res.code,
              state: stateCode,
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              switch (res.data.Status) {
                case "OK":
                  wx.showModal({
                    title: '登录成功',
                    content: '您已完成扫码，请等待页面跳转',
                    showCancel: false,
                    success(res) {
                        wx.exitMiniProgram()
                    }
                  })
                  break;
                case "StateExpire":
                  wx.showModal({
                    title: '二维码过期',
                    content: '该二维码已过期，请刷新二维码重试',
                    showCancel: false,
                    success(res) {
                        wx.exitMiniProgram()
                    }
                  })
                  break;
                case "NoUser":
                  wx.showModal({
                    title: '请登记信息',
                    content: '您尚未在蜃境绑定微信信息，现在要去绑定吗？',
                    success(res) {
                      if (res.confirm) {
                        wx.navigateTo({
                          url: '../register/register'
                        })
                      } else if (res.cancel) {
                        wx.exitMiniProgram()
                      }
                    }
                  })
                  break;
              }
            }
          })
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'error',
            duration: 2000
          })
        }
      }
    })
  }

})