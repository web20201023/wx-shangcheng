//发送异步请求次数
let ajaxTimes=0

export const request=(params)=>{
  ajaxTimes++
  //加载中
  wx.showLoading({
    title: "加载中",
    mask: true,
  });
  return new Promise((resolve,rejcect)=>{
    const baseURL='https://api-hmugo-web.itheima.net/api/public/v1'
    wx.request({
      ...params,
      url:baseURL+params.url,
      success:(result)=>{
        resolve(result.data.message);
      },
      fail:(err)=>{
        rejcect(err);
      },
      //关闭加载
      complete: ()=>{
        ajaxTimes--
        if(ajaxTimes===0){
          wx.hideLoading();
        }
      }
    })
  })
}