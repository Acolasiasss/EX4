// pages/my/my.js
var common = require('../../utils/common.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    number:0,
    nickName:'未登录',
    src:'/images/index.png',
    newsList:[],
  },
  getUserProfile:function(e){
    wx.getUserProfile({
      desc:'用于完善用户资料',
      success:(res)=>{
    let info = res.userInfo;
    this.setData({
      isLogin:true,
      src:info.avatarUrl,
      nickName:info.nickName
    })
    this.getMyFavorties();
  }
  })
  },
  getMyFavorties:function(){
    let info = wx.getStorageInfoSync();
    let keys = info.keys;
    let num = keys.length;

    let myList = [];
    for(var i =0;i<num;i++){
      let obj = wx.getStorageSync(keys[i]);
      myList.push(obj);
    }
    this.setData({
      newsList:myList,
      number:num
    })
  },
  goToDetail:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:'../detail/detail?id='+id
    })
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function() {
      if(this.data.isLogin){
        this.getMyFavorties()
      }
    },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})