// pages/orders/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"全部",
        isActive:true
      },
      {
        id:1,
        value:"待付款",
        isActive:false
      },
      {
        id:2,
        value:"待收货",
        isActive:false
      },
      {
        id:3,
        value:"退货/退款",
        isActive:false
      }
    ],

  },
  handleTabsItemChange(e){
    //console.log(e)
    const index=e.detail
    let tabs=this.data.tabs;
    tabs.forEach((v,i) =>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    }) 
  },
})