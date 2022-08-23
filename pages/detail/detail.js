// pages/detail/detail.js
var common = require('../../utils/common.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    article:{
      id:'304083',
      title:'《光明日报》刊发我校研究员王顺理论文章《不断提高理论素养》',
      poster: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage2.jpg',
      content: '7月4日—8月10日，由安徽省教育厅、合肥市人民政府、淮北市人民政府联合主办的第八届安徽省“互联网+”大学生创新创业大赛暨中国国际“互联网+”大学生创新创业大赛选拔赛在线上举办。我校参赛项目团队历经省级复赛网评、决赛路演答辩、金奖排位赛等多轮次比拼，斩获金奖3项、银奖10项、铜奖23项，其中3个项目由省赛组委会推荐入围国赛。',
      add_date: '2022-08-09',
    },
    isAdd:false,
    number:0
  },
  addFavorties:function(options){
    let article = this.data.article;
    wx.setStorageSync(article.id, article);
    this.setData({
      isAdd:true
    })
  },
  cancelFavorites:function(){
    let article = this.data.article;
    wx.removeStorageSync(article.id);
    this.setData({
      isAdd:false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    let id = options.id
    var newarticle = wx.getStorageSync(id)
    if(newarticle!=''){
      this.setData({
        article:newarticle,
        isAdd:true
      })
    }
    else{
      let result = common.getNewsDetail(id)
      if(result.code =='200'){
        this.setData({
          article:result.news,
          isAdd:false
        })
      }
    }
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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