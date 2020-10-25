import { getSetting, chooseAddress, openSetting, showToast } from "../../utils/asyncWx.js";
import regeneratorRuntime, { values } from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    // 获取缓存中的地址信息
    const address = wx.getStorageSync("address");
    // 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    // 过滤掉未选中的商品
    cart= cart.filter(v=>v.checked)
    this.setData({ address })

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
        totalPrice += v.goods_price * v.num;
        totalNum += v.num
    });
    
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },
  handleOrderPay(){
    const token=wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
        success: (result)=>{
          console.log(result);
        }
      });
      return;
    }
    console.log('已经存在token');
  }
})


