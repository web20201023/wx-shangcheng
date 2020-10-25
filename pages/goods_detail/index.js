import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    // 商品是否被收藏
    isCollect:false
  },
  // 商品对象
  GoodsInfo:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages=getCurrentPages()
    let currentPage=pages[pages.length-1]
    let options=currentPage.options
    const {goods_id}=options
    this.getGoodsTail(goods_id)
   

  },
  //获取商品的详情数据
  async getGoodsTail(goods_id){
    const goodsObj=await request({url:"/goods/detail",data:{goods_id}})
    // console.log(goodsObj)
    this.GoodsInfo=goodsObj
     // 获取缓存中的商品数组
     let collect =wx.getStorageSync('collect')||[];
     // 判断商品是否被收藏
     let isCollect=collect.some(v=>v.goods_id===this.GoodsInfo.goods_id)
    this.setData({
      goodsObj:{
        //优化  只获取所需要的数据
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        //临时修改webp==>jpg iphone不识别webp
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics
      },
      isCollect
    })
  },
  //点击轮播图，放大预览
  handlePrevewImage(e){
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid)
    const current=e.currentTarget.dataset.url
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls// 需要预览的图片http链接列表
    })
  },
  //点击加入购物车
  handleCartAdd(){
    // 获取缓存中的购物车
    let cart=wx.getStorageSync('cart')||[];
    // 判断商品是否存在购物车数组中
    let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
      // 不存在第一次添加
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true
      cart.push(this.GoodsInfo)
    }else{
      // 已存在,数量加++
      cart[index].num++;
    }
    // 把购物车重新添加回缓存中
    wx.setStorageSync('cart', cart)
    // 弹窗
    wx.showToast({
      title: '加入成功',
      icon:'',
      mask:true
    })
  },
  // 点击收藏图标
  bindleCollect(){
    let isCollect=false
    //获取缓存中的商品数组
    let collect=wx.getStorageSync('collect')||[]
    // 判断商品是否被收藏过
    let index=collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    // index!=-1 取消收藏
    if(index!==-1){
      collect.splice(index,1)
      isCollect=false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true,
      });
    }else{
      collect.push(this.GoodsInfo)
      isCollect=true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true,
      });
    }
    wx.setStorageSync('collect', collect)
    this.setData({isCollect})
  }
})