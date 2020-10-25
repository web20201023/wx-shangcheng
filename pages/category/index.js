//引入发送请求的方法 路径要全
import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],
    rightMenuList:[],
    currentIndex:0,
    scrollTop:0
  },


  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates=wx.getStorageSync('cates');
    if(!Cates){
      this.getCates()
    }else{
      if(this.time-Cates.time>1000*300){
        this.getCates()
      }else{
        this.Cates=Cates.data;
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        let rightContent=this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
    // 
  },
  async getCates(){
    // request({
    //   url:"/categories"
    // })
    // .then(res=>{
    //   this.Cates=res.data.message
    //   wx.setStorageSync('cates', {time:Date.now,data:this.Cates})
    //   let leftMenuList=this.Cates.map(v=>v.cat_name);
    //   let rightContent=this.Cates[0].children
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })
    const res=await request({url:"/categories"})
    this.Cates=res
      wx.setStorageSync('cates', {time:Date.now,data:this.Cates})
      let leftMenuList=this.Cates.map(v=>v.cat_name);
      let rightContent=this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
  },
  handleItemTap(e){
    const index=e.currentTarget.dataset.index;
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })
  }
})