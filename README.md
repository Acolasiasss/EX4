# 2022年夏季《移动软件开发》实验报告



<center></center>

| 姓名和学号？         |                   |
| -------------------- | -------------------------------- |
| 本实验属于哪门课程？ | 中国海洋大学22夏《移动软件开发》 |
| 实验名称？           | 实验4：高校新闻网           |
| 博客地址？           | https://www.cnblogs.com/amonologue/p/16616468.html                          |
| Github仓库地址？     | https://github.com/Acolasiasss/EX4                          |

（备注：将实验报告发布在博客、代码公开至 github 是 **加分项**，不是必须做的）



## **一、实验目标**

1、综合所学知识创建完整的前端新闻小程序项目；能够在开发过程中熟练掌握真机预览、调试等操作。



## 二、实验步骤

列出实验的关键步骤、代码解析、截图。
1.页面配置：
1）在app. json文件 pages属性中继续追加 pages/detail/detail 和 pages/ my/ my;
2）再创建以下两个文件夹：
	images:用于存放图片素材;
	utils:用于存放公共JS文件。
创建完成如下:

![1](https://user-images.githubusercontent.com/111416724/186104242-4a6f53f1-46ba-4c1c-ab5b-c64a9a990914.png)

2.视图设计
1）自定义导航栏效果
2）tabBar设计，在app.json中追加tarBar 的相关属性代码，代码如下：
```
{
  "pages": [
    "pages/index/index",
    "pages/logs/logs",
    "pages/my/my",
    "pages/detail/detail"
  ],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#228866",
    "navigationBarTitleText": "我的新闻网",
    "navigationBarTextStyle": "white"
  },
  "style": "v2",
  "sitemapLocation": "sitemap.json",
  "lazyCodeLoading": "requiredComponents",

  "tabBar": {
    "color": "#000",
    "selectedColor": "#228866",
    "list": [
      {
        "pagePath": "pages/index/index",
        "iconPath": "images/index.png",
        "selectedIconPath": "images/index_blue.png",
        "text": "首页"
      },
      {
        "pagePath": "pages/my/my",
        "iconPath": "images/my.png",
        "selectedIconPath": "images/my_blue.png",
        "text": "我的"
      }
    ]
  }
}
```
3.页面设计
1）为组件添加wx:for属性循环显示幻灯片内容和新闻列表数据，为了进行布局和样式效果的预览,还需要在JS文件的data中临时录入几个测试数据,更新完成后部分代码如下：
index.wxml
```
<!--pages/index/index.wxml-->
<!--幻灯片滚动-->
<swiper indicator-dots="true" autoplay="true" interval="5000" duration="500">
  <block wx:for="{{swiperImg}}" wx:key='swiper{{index}}'>
    <swiper-item>
      <image src="{{item.src}}"></image>
    </swiper-item>
  </block>
</swiper>
<!--新闻列表-->
<view id='news-list'>
  <view class='list-item' wx:for="{{newsList}}" wx:for-item="news" wx:key="{{news.id}}">
    <image src='{{news.poster}}'></image>
    <text bindtap='goToDetail' data-id='{{news.id}}'>◇{{news.title}}——{{news.add_date}}</text>
  </view>
</view>
```
index.wxss
```
/*swiper区域样式*/
/*1-1 swiper组件*/
swiper {
  height: 400rpx;
}
/*1-2 swiper中的图片*/
swiper image {
  width: 100%;
  height: 100%;
}

/*新闻列表区域样式*/
/*2-1新闻列表容器*/
#news-list {
  min-height: 600rpx;
  padding: 15rpx;
}
/*2-2列表项目*/
.list-item{
  display: flex;
  flex-direction: row;
  border-bottom: 1rpx solid gray;
}
/*2-3新闻图片*/
.list-item image{
  width:230rpx;
  height: 150rpx;
  margin: 10rpx;
}
/*2-4新闻标题*/
.list-item text{
  width: 100%;
  line-height: 60rpx;
  font-size: 10pt;
}
```
index,js
```
// pages/index/index.js
var common = require('../../utils/common.js') //引用公共JS文件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //幻灯片素材
    swiperImg: [
      {src: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage1.jpg'},
      {src: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage2.jpg'},
      {src: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage3.jpg'}
    ],
  },
})
```
效果如图所示：

![3](https://user-images.githubusercontent.com/111416724/186104302-fdbc861c-7a84-451a-a635-4028c3d543b7.png)

2）然后个人中心页主要包含两个版块,即登录面板和“我的收藏”。登录面板用于显示用户的微信头像和昵称,“我的收藏”用于显示收藏在本地的新闻列表。
更新完成后部分代码如下：
my.js
```
// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //临时微信用户昵称和头像
    nickName: '未登录',
    src: '/images/index.png ',
    //临时收藏夹新闻数据
    newsList: [{
      id: '305670',
      title: '我校在第八届安徽省“互联网+”大学生创新创业大赛再创佳绩',
      poster: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage3.jpg',
      add_date: '2022-08-11'
    }]
  },
})
```
my.wxml
```
<!--登录面板-->
<view id = 'myLogin'>
  <block>
    <image id = 'myIcon' src = '{{src}}'></image>
    <text id = 'nickName'>{{nickName}}</text>
  </block>
</view>
<!--我的收藏-->
<view id = 'myFavorites'>
  <text>我的收藏(1)</text>
  <!--收藏的新闻列表-->
  <view id = 'news-list'>
    <view class = 'list-item' wx:for = "{{newsList}}" wx:for-item = "news" wx:key = "{{news.id}}">
      <image src = '{{news.poster}}'></image>
      <text>◇{{news.title}}--{{news.add_date}}</text>
    </view >
  </view>
</view>
```
my.wxss
```
/*登录面板*/
#myLogin {
  background-color: #33b7ce;
  height: 400rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
/*1-1头像图片*/
#myIcon{
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
}
/*1一2微信昵称*/
#nickName{
  color: white;}
/*我的收藏*/
#myFavorites{
  padding: 20rpx;
}
```
个人页面效果如下：

![4](https://user-images.githubusercontent.com/111416724/186104345-4c7ca0e1-ec3b-4a4f-898c-18e73062dfbd.png)

3)设计新闻页面，使用`<view>`进行整体布局。新闻页是用于给用户浏览新闻全文的,需要用户点击首页的新闻列表﹐然后在新窗口中打开该页面。新闻页包括新闻标题﹑新闻图片、新闻正文和新闻日期，相关代码和设计如下：
detail.js
```
// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {
      id: '305670',
      title: '我校在第八届安徽省“互联网+”大学生创新创业大赛再创佳绩',
      poster: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage3.jpg',
      content: '7月4日—8月10日，由安徽省教育厅、合肥市人民政府、淮北市人民政府联合主办的第八届安徽省“互联网+”大学生创新创业大赛暨中国国际“互联网+”大学生创新创业大赛选拔赛在线上举办。我校参赛项目团队历经省级复赛网评、决赛路演答辩、金奖排位赛等多轮次比拼，斩获金奖3项、银奖10项、铜奖23项，其中3个项目由省赛组委会推荐入围国赛。',
      add_date: '2022-08-11'
    }
  },
})
```
detail.wxml
```
<view class = 'container'>
  <view class = 'title'>{{article.title}}</view >
  <view class = 'poster'>
    <image src = '{{article.poster}}' mode = 'widthFix'></image>
  </view>
  <view class = 'content'>{{article.content}}</view>
  <view class = 'add_date'>时间: {{article.add_date}}</view>
</view>
```
detail.wxss
```
/*整体容器*/
.container{
  padding: 15rpx;
  text-align: center;
}
/*新闻标题*/
.title{
  font-size: 14pt;
  line-height: 80rpx;
}
/*新闻图片*/
.poster image{
  width: 700rpx;
}
/*新闻正文*/
.content{
  text-align: left;
  font-size: 12pt;
  line-height: 60rpx;
}
/*新闻日期*/
.add_date{
  font-size: 12pt;
  text-align: right;
  line-height: 30rpx;
  margin-right: 25rpx;
  margin-top: 20rpx;
}
```  
此时可以显示完整的样式效果。由于尚未获得新闻数据﹐所以暂时无法根据用户点击的新闻标题入口显示对应的新闻内容,新闻页效果如下

![5(1)](https://user-images.githubusercontent.com/111416724/186104381-e957fea4-0b41-447f-a12c-97b17f784899.png)

![5(2)](https://user-images.githubusercontent.com/111416724/186104404-eab75666-4caf-4c94-b811-efb9f5d67c00.png)

3.逻辑实现
1）公共逻辑
		使用老师提供的common.js文件，内含3条新闻记录作为示范,可以自行添加或修改新闻内容。
		接下来在common. js 中添加自定义函数 getNewsList 和l getNewsDetail,分别用于获取新闻列表信息和指定ID的新闻正文内容。
		然后需要在各页面的JS文件顶端引用公共JS文件,
更新完成后代码如下:
common.js
```
//模拟新闻数据
const news = [
  {id: '264698',
  title: '省退役军人事务厅来校交流对接工作',
  poster: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage1.jpg',
  content: ' 8月19日，省退役军人事务厅二级巡视员蔡元和、办公室主任刘恒贵、就业创业处副处长钟俊武一行来校就联合共建安徽退役军人学院事宜进行交流对接。校党委常委、副校长陆林，芜湖市退役军人事务局党组成员、副局长张桂芬，学校办公室、人事处、教务处、招就处、学生处、研究生院、体育学院负责同志参加会议。',
  add_date: '2022-08-19'},
  {id: '304083',
  title: '《光明日报》刊发我校研究员王顺理论文章《不断提高理论素养》',
  poster: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage2.jpg',
  content: ' 8月9日，《光明日报》第06版“学习贯彻习近平新时代中国特色社会主义思想专刊”版面长篇幅刊发了我校中国特色社会主义理论体系研究中心特约研究员、马克思主义学院博士生王顺题为《不断提高理论素养》的理论文章。文章从“理论素养坚实，才能理想信念坚定”“克服前进道路上的各种困难，需要具备扎实的理论素养”“提升理论素养，必须学懂弄通做实党的创新理论”3个方面全面阐述了不断提高理论素养、坚持用党的创新理论武装头脑的重要性。文章指出，新征程上，面对具有新的历史特点的伟大斗争，迫切需要我们学懂弄通做实党的创新理论，以扎实的理论素养提升战略定力、斗争能力，从而不断取得新的伟大胜利。',
  add_date: '2022-08-09'},
  {id: '305670',
  title: '我校在第八届安徽省“互联网+”大学生创新创业大赛再创佳绩',
  poster: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage3.jpg',
  content: '7月4日—8月10日，由安徽省教育厅、合肥市人民政府、淮北市人民政府联合主办的第八届安徽省“互联网+”大学生创新创业大赛暨中国国际“互联网+”大学生创新创业大赛选拔赛在线上举办。我校参赛项目团队历经省级复赛网评、决赛路演答辩、金奖排位赛等多轮次比拼，斩获金奖3项、银奖10项、铜奖23项，其中3个项目由省赛组委会推荐入围国赛。',
  add_date: '2022-08-11'}
];

//获取新闻列表
function getNewsList() {
  let list = [];
  for (var i = 0; i < news.length; i++) {
    let obj = {};
    obj.id = news[i].id;
    obj.poster = news[i].poster;
    obj.add_date = news[i].add_date;
    obj.title = news[i].title;
    list.push(obj);
  }
  return list; //返回新闻列表
}

//获取新闻内容
function getNewsDetail(newsID) {
  let msg = {
    code: '404', //没有对应的新闻
    news: {}
  };
  for (var i = 0; i < news.length; i++) {
    if (newsID == news[i].id) { //匹配新闻id编号
      msg.code = '200'; //成功
      msg.news = news[i]; //更新当前新闻内容
      break;
    }
  }
  return msg; //返回查找结果
}

// 对外暴露接口
module.exports = {
  getNewsList: getNewsList,
  getNewsDetail: getNewsDetail
}
```
2)首页以及新闻页面逻辑
		新闻列表展示使用了{{newsList }},因此需要在页面JS文件的 onLoad函数中获取新闻列表,并更新到data属性的newsList参数中。
		若希望用户点击新闻标题即可实现跳转,需要首先为新闻列表项目添加点击事件，为`<text >`组件添加了自定义触摸事件函数goToDetail,并且使用data-id 属性携带了新闻ID编号。
		
![8](https://user-images.githubusercontent.com/111416724/186104510-e606e38d-7c92-4843-a38f-e369ba09d237.png)

		其次是新闻页，在首页逻辑中已经实现了页面跳转并携带了新闻ID编号,现在需要在新闻页接收ID编号,并查询对应的新闻内容。此时重新从首页点击新闻跳转就可以发现已经能够正确显示标题对应的新闻内容了。
		
![9](https://user-images.githubusercontent.com/111416724/186105052-8ac72df1-e82b-48f0-a4a0-a28e41f5a758.png)

修改detail. wxml代码,追加两个`<button>`组件作为添加/取消收藏新闻的按钮,并使用wx:if 和 wx;else属性使其每次只存在一个。
效果如下

![6(1)](https://user-images.githubusercontent.com/111416724/186104542-3432476a-7fb3-45c7-a2c6-0445b367b82e.png)

![6(2)](https://user-images.githubusercontent.com/111416724/186104594-8d1b2b75-5e46-4d3d-91a1-1069fa38e140.png)

![7](https://user-images.githubusercontent.com/111416724/186104623-c91be862-3a01-49e0-a9f6-54b11a0c155d.png)

修改后部分代码如下：
detail.js
```
var common = require('../../utils/common.js') //引用公共JS文件

// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {
      id: '305670',
      title: '我校在第八届安徽省“互联网+”大学生创新创业大赛再创佳绩',
      poster: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage3.jpg',
      content: '7月4日—8月10日，由安徽省教育厅、合肥市人民政府、淮北市人民政府联合主办的第八届安徽省“互联网+”大学生创新创业大赛暨中国国际“互联网+”大学生创新创业大赛选拔赛在线上举办。我校参赛项目团队历经省级复赛网评、决赛路演答辩、金奖排位赛等多轮次比拼，斩获金奖3项、银奖10项、铜奖23项，其中3个项目由省赛组委会推荐入围国赛。',
      add_date: '2022-08-11'
    }
  },

  /**
  *自定义函数――跳转新页面浏览新闻内容
  */  
  goToDetail: function(e) {
  //获取携带的data-id数据
    let id = e.currentTarget.dataset.id;
    //携带新闻ID进行页面跳转
    wx.navigateTo({
      url: '../detail/detail?id = '+ id
    })
  },
    
  onLoad: function(options) {
    //获取页面跳转来时携带的数据
    let id = options.id

    //检查当前新闻是否在收藏夹中
    var article = wx.getStorageSync(id)
    //已存在
    if (article != '') {
      this.setData({
        article:article,
        isAdd: true
      })
    }
    //不存在
    else {
      let result = common.getNewsDetail(id)
      //获取到新闻内容
      if(result.code == '200') {
        this.setData({
          article: result.news,
          isAdd: false
        })
      }
    }
  },

  //添加到收藏夹
  addFavorites: function(options) {
    let article = this.data.article;        //获取当前新闻
    wx.setStorageSync(article.id, article); //添加到本地缓存
    this.setData({isAdd: true});            //更新按钮显示
  },
  //取消收藏
  cancalFavorites: function() {
    let article = this.data.article;        //获取当前新闻
    wx.removeStorageSync(article.id) ;      //从本地缓存删除
    this.setData({isAdd: false});           //更新按钮显示
  },
})
```
detail.wxml
```
<view class = 'container'>
  <view class = 'title'>{{article.title}}</view >
  <view class = 'poster'>
    <image src = '{{article.poster}}' mode = 'widthFix'></image>
  </view>
  <view class = 'content'>{{article.content}}</view>
  <view class = 'add_date'>时间: {{article.add_date}}</view>
  <button wx:if = '{{isAdd}}' plain bindtap = 'cancelFavorites'>♥已收藏</button>
  <button wx:else plain bindtap = 'addFavorites'>♥点击收藏</button>
</view>
```
detail.wxss
```
/*整体容器*/
.container{
  padding: 15rpx;
  text-align: center;
}
/*新闻标题*/
.title{
  font-size: 14pt;
  line-height: 80rpx;
}
/*新闻图片*/
.poster image{
  width: 700rpx;
}
/*新闻正文*/
.content{
  text-align: left;
  font-size: 12pt;
  line-height: 60rpx;
}
/*新闻日期*/
.add_date{
  font-size: 12pt;
  text-align: right;
  line-height: 30rpx;
  margin-right: 25rpx;
  margin-top: 20rpx;
}  

/*“点击收藏”按钮*/
button{
  width: 250rpx;
  height: 100rpx;
  margin: 20rpx auto;
}
```
3）个人中心逻辑
修改my. wxml 代码,追加`<button >`组件作为登录按钮﹐并且使用wx: if 和wx : clse属性让未登录时只显示按钮,登录后只显示头像和昵称，效果如下：

![10](https://user-images.githubusercontent.com/111416724/186104669-f1d468fc-8651-4b11-bf99-f3c62cac7623.png)

保存后预览项目,单击按钮后如果Console控制台能够成功输出用户信息数据,则说明获取成功。继续修改my.js文件中getMyInfo函数的代码,将信息更新到动态数据上,完成登录功能后效果如下：

![11](https://user-images.githubusercontent.com/111416724/186104720-05f4f794-6190-444f-a4a3-225047fe8699.png)

![12](https://user-images.githubusercontent.com/111416724/186104736-517a8166-de46-40a6-951c-08f5b64076ed.png)


再修改my. wxml代码,将“我的收藏”后面的数字更改为动态数据效果。继续在detail.js文件中追加getMyFavorites 函数﹐用于展示真正的新闻收藏列表。
现在从首页开始预览,选择其中任意两篇新闻进入detail页面,并尝试点击收藏。然后退出切换到个人中心页,登录后查看收藏效果。
此时页面效果如图所示。

![12](https://user-images.githubusercontent.com/111416724/186104749-672282fa-b2a1-4b37-8acd-0ddcee31bb95.png)

考虑到登录成功后用户还可以手动更改新闻的收藏状态,因此修改my.js 中的 onShow函数﹐判断如果是登录状态就刷新一下收藏列表。
点击浏览已经收藏的新闻和首页的点击跳转新闻内容功能类似
，最后部分代码段如下：
my.js
```
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
```
my.wxml
```
<!--pages/my/my.wxml-->
<!--登录面板-->
<view id ='myLogin'>
  <block wx:if='{{isLogin}}'>
    <image id = 'myIcon'src='{{src}}'></image>
    <text id ='nickName'>{{nickName}}</text>
  </block>
  <button wx:else open-type = 'getUserInfo'bindtap = 'getUserProfile'>未登录，点此登录</button>
</view>
<!--我的收藏-->
<view id = 'myFavorties'>
  <text>我的收藏({{number}})</text>
  <!--收藏的新闻列表-->
  <view id = 'news-list'>
    <view class = 'list-item'wx:for="{{newsList}}" wx:for-item="news" wx:key = "{{item.id}}">
      <image src = '{{news.poster}}'></image>
      <text bindtap = 'goToDetail'data-id='{{news.id}}'>◇{{news.title}}——{{news.add_date}}</text>
    </view>
  </view>
</view>
```
my.wxss
```
/* pages/my/my.wxss */

#myLogin{
  background-color: #33b7ce;
  height:400rpx;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

}
#myIcon{
  width:200rpx;
  height:200rpx;
  border-radius: 50%;
}
#nickName{
  color:white;
}
#myFavorties{
  padding: 20rpx;
}
```

## 三、程序运行结果

列出程序的最终运行结果及截图。
进入小程序，主页：

![y1](https://user-images.githubusercontent.com/111416724/186104807-651cd140-44e6-4cc3-a734-82bdd89ab665.png)

进入一个新闻页面

![y4](https://user-images.githubusercontent.com/111416724/186104828-53b17ddf-5e54-44f3-99ca-c39d975f7e8c.png)

“我的”页面

![y2](https://user-images.githubusercontent.com/111416724/186104850-1a183f51-58e1-49a0-979e-b4fe944231ec.png)

登录功能

![y3](https://user-images.githubusercontent.com/111416724/186104865-43b58015-e261-4147-9c21-bdb800fd2f61.png)

收藏功能

![y5](https://user-images.githubusercontent.com/111416724/186104892-d5ec0b2f-bc8b-40ff-ac50-231b8549da0d.png)

![y6](https://user-images.githubusercontent.com/111416724/186104911-5e2df316-5f1a-417f-9c4d-10f2fde72c80.png)

## 四、问题总结与体会

描述实验过程中所遇到的问题，以及是如何解决的。有哪些收获和体会，对于课程的安排有哪些建议。

这次实验实际上不是很难，但过程的确十分繁琐，稍微某一步代码敲错就会铸成大错，而且非常难以被检查到，所以导致这个实验十分困难。我也重复做了第三次才成功。
还有就是最后生成预览的时候遇到了点小文题，在预览界面“我的收藏”数总要多1，而且下面还有一框不知道什么东西，但是在代码界面里看就是正常的，我也搞不明白究竟是怎么回事。
