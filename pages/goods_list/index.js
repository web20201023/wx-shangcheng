import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      },
    ],
    goodsList:[]

  },
  //接口参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid||"";
    this.QueryParams.query=options.query||"";
    this.getGoodsList()
    
  },
  //获取商品列表数据
  async getGoodsList(){
    const res=await request({url:"/goods/search",data:this.QueryParams})
    //数据总数
    const total=res.total
    //总页数
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize)
    //console.log(this.totalPages)
    this.setData({
      goodsList:this.data.goodsList.concat(res.goods)
      // [...this.data.goodsList,...res.goods]
    })
    //关闭下拉刷新
    wx.stopPullDownRefresh()
  },
  //标题点击事件 ，从子组件传过来
  handleTabsItemChange(e){
    //console.log(e)
    const index=e.detail
    let tabs=this.data.tabs;
    tabs.forEach((v,i) =>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    }) 
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
    //重置数组
    this.setData({
      goodsList:[]
    })
    //重置页码
    this.QueryParams.pagenum=1
    //重新发请求
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({ title: '没有下一页数据' });
      //console.log("没有下一页")
    }else{
      this.QueryParams.pagenum++
      this.getGoodsList()
      //console.log("还有下一页")
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})