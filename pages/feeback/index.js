// pages/feeback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"体验问题",
        isActive:true
      },
      {
        id:1,
        value:"商品、商家投诉",
        isActive:false
      }
    ],
    //被选中的图片数组
    chooseImgs:[],
    valueText:""

  },
  handleTabsItemChange(e){
    console.log(e)
    const index=e.detail
    let tabs=this.data.tabs;
    tabs.forEach((v,i) =>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    }) 
  },
  // 选择+添加图片事件
  handleChooseImage(){
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: (res)=>{
        // console.log(res.tempFilePaths);
        // 拼接数组
        this.setData({chooseImgs:[...this.data.chooseImgs,...res.tempFilePaths]})
      }
    })
  },
  // 删除图片事件
  chooseRemoveImgs(e){
    // 获取自定义的index
    let {index}=e.currentTarget.dataset
    // 获取图片数组
    let {chooseImgs}=this.data
    // 删除index数组
    chooseImgs.splice(index,1)
    // 把修改后的数组重新放入变量中
    this.setData({chooseImgs})
  },
  // 文本域输入事件
  handleTextInput(e){
    this.setData({valueText:e.detail.value})
  }
})