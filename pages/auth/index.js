import { request } from "../../request/index.js"
import regeneratorRuntime, { values } from '../../lib/runtime/runtime';
import { login } from "../../utils/asyncWx.js";
Page({
  async handleGetUserInfo(e) {
    // console.log(e);
    try {
      // 获取用户信息
    const { rawData, signature, encryptedData, iv } = e.detail
    // 获取小程序登陆后的code
    const { code } = await login()
    // console.log(code);
    const loginParams={ rawData, signature, encryptedData, iv, code }
    // 发请求，获取用户的token
    const {token}=await request({url:"/users/wxlogin",data:loginParams,method:"post"});
    // 4 把token存入缓存中 同时跳转回上一个页面
    wx.setStorageSync("token", token);
    wx.navigateBack({
      delta: 1
    });
    } catch (error) {
      console.log(error);
    }
  },
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})