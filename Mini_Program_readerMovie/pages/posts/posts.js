var postsData = require('../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that=this;
    // that.data.post_key = postsData.postList
    this.setData({
      post_key: postsData.postList
    })
  },

  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    // console.log("on post ID is" + postId)
    wx.navigateTo({
      url: "./post-detail/post-detail?id=" + postId
    })
  },
  
  // onSwiperItemTap: function (event) {
  //   var postId = event.currentTarget.dataset.postid;
  //   // bindtap事件冒泡
  //   // catchtap时间非冒泡
  //   // console.log("on post ID is" + postId)
  //   // wx.navigateTo({
  //   //   url: "./post-detail/post-detail?id=" + postId
  //   // })
  // },



  onSwiperTap: function (event) {
    // target和currentTarget区别
    // target指的是当前点击的组件，而currentTarget指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是swiper
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: "./post-detail/post-detail?id=" + postId
    })
  }

})