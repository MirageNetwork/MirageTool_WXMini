// pages/register/register.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    avatarUrl: defaultAvatarUrl,
    niceName: "",
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.setData({
      avatarUrl,
    })
  },
  addUserToServer(e) {
    console.log(e.detail.value)
    var that = this;
    if (this.data.avatarUrl.substring(0,1)=="h"){
      wx.showToast({
        title: '你还没选头像呢',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if  (e.detail.value.nickname==""){
      wx.showToast({
        title: '你还没填昵称呢',
        icon: 'error',
        duration: 2000
      })
      return
    }
    let avatarBase64  = wx.getFileSystemManager().readFileSync(this.data.avatarUrl,"base64")
    wx.login({
      success (res) {
        if (res.code) {
          wx.request({
            method: "POST",
            url: 'https://mirage.nopkt.com/addUser',
            data: {
              logincode: res.code,
              nickname: e.detail.value.nickname,
              avatarbase64: avatarBase64,
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
              wx.showToast({
                title: '添加成功',
                icon: 'success',
                duration: 2000
              })
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

  },
})