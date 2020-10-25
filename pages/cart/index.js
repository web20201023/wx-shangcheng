import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/asyncWx.js";
import regeneratorRuntime, { values } from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    // 获取缓存中的地址信息
    const address = wx.getStorageSync("address");
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart") || [];
    this.setData({ address })
    this.setCart(cart)
  },
  //点击收货地址
  async handleChooseAddress() {
    try {
      // 获取权限状态
      const result = await getSetting();
      const scopeAddress = result.authSetting["scope.address"];
      // 判断权限状态
      if (scopeAddress === false) {
        await openSetting()
      }
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      //缓存数据
      wx.setStorageSync("address", address);

    } catch (error) {
      console.log(error);
    }
  },
  handleItemChange(e) {
    // 获取被修改的商品id
    let goods_id = e.currentTarget.dataset.id
    // 获取购物车数组
    let { cart } = this.data
    // 获取被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id)
    // 选中状态取反
    cart[index].checked = !cart[index].checked
    // 把数据重新保存到data中

    this.setCart(cart)

  },
  // 封装函数 设置购物车状态时，重新计算数据
  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.goods_price * v.num;
        totalNum += v.num
      } else {
        allChecked = false
      }
    });
    allChecked = cart.length ? allChecked : false
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart)
  },
  handleItemAllChecked() {
    let { cart, allChecked } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked)
    this.setCart(cart)
  },
  // 商品数量编辑
  // async handleItemNumEdit(e) {
  async handleItemNumEdit(e) {
    // 获取传递的参数
    const { operation, id } = e.currentTarget.dataset;
    // 获取cart数组
    let { cart } = this.data;
    // 获取需要修改的商品索引
    let index = cart.findIndex(v => v.goods_id === id)
    // 判断是否删除
    if (cart[index].num === 1 && operation === -1) {
      const result = await showModal({ content: "您是否要删除？" })
      if (result.confirm) {
        cart.splice(index, 1)
        this.setCart(cart)
      } 
    } else {
      // 修改数量
      cart[index].num += operation;
      // 修改缓存和data
      this.setCart(cart)
    }
  },
  async handlePay(){
    const {address,totalNum} = this.data
    // 判断有无收获地址
    if(!address.userName){
      await showToast({title:"您还没有收货地址"})
      return;
    }
    // 判断是否有商品
    if(totalNum==0){
      await showToast({title:"您还没有选购商品"})
      return;
    }
    // 跳转支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})


