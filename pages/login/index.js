// pages/login/index.js
Page({
  data: {

  },
  handleGetUserInfo(e){
    console.log(e);
    const {userInfo}=e.detail
    wx.setStorageSync('userinfo', userInfo);
    wx.navigateBack({
      delta: 1
    });
  },
  
})