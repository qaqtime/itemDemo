// 调用全局app.js必须要这样写
import {Movie} from 'class/Movie.js'
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.id;
    console.log(movieId)
    var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
   var movie =new Movie(url);
// 同步的方法调用数据
//    var movieData=movie.getMovieData();

  // 异步的方法调用数据
  // // 初步版本：
  // var that=this;
  // movie.getMovieData(function(movie){
  //   this.setData({
  //     movie: movie
  //   })
  // })

  // 二级版本
   movie.getMovieData(this.getData);
  },

getData:function(data){
  this.setData({
    movie:data
  })
},

  /*查看图片*/
  viewMoviePostImg: function (e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  }
})