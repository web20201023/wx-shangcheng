import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isFocus:false,
    valueInput:""
  },
  timer:1,
  handleInput(e){
    const {value}=e.detail;
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false
      })
      return;
    }
    clearTimeout(this.timer)
    this.timer=setTimeout(() => {
      this.qsearch(value)
      this.setData({isFocus:true})
    }, 1000);
    
  },
 
  async qsearch(query){
    const res=await request({url:'/goods/search',data:{query}})
    console.log(res.goods);
    this.setData({goods:res.goods})
  },
  
  handleCancel(){
    this.setData({
      valueInput:"",
      goods:[],
      isFocus:false
    })
  }
})