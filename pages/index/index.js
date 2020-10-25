//index.js
//获取应用实例
const app = getApp()
//引入发送请求的方法 路径要全
import {request} from "../../request/index.js"


Page({
  data: {
    swiperList: [],
    caseList:[],
    floorList:[]
  },
  onLoad: function (options) {
    // wx.request({//解决回调地狱，通过es6的 promise
    //   //请求轮播图数据
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success:(res)=>{
    //     //console.log(res.data)
    //     this.setData({
    //       swiperList:res
    //     })
    //   }
    //})
    this.getSwiperList()
    this.getCaseList()
    this.getFloorList()
  },

    //轮播图数据
  getSwiperList(){
    request({url:"/home/swiperdata"}).then(res=>{
      this.setData({
        swiperList:res,
      })
    })
  },
  //导航栏数据
  getCaseList(){
    request({url:"/home/catitems"}).then(res=>{
      this.setData({
        caseList:res
      })
    })
  },
  //楼层
  getFloorList(){
    request({url:"/home/floordata"}).then(res=>{
      this.setData({
        floorList:res
      })
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
