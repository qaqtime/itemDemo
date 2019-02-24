var app = getApp()
var util = require('../../../utils/util.js')

// pages/movies/more-movie/more-movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle: "",
    movies: {},
    navigateTitle: "",
    requestUrl: "",
    totalCount: 0,
    isEmpty: true
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category;
    // console.log(category);
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData)
  },

  processDoubanData: function (moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 8) {
        title = title.substring(0, 8) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]

      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var totalMovies = {};
    // 如果想要绑定新加载的数据，就要与旧的数据合并在一起
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });
    // 类型转换避免20,2020,202020这样的情况
    
    
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();

  },

  onReady: function (event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
      // success: function (res) {
      // }
    })
  },
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: "../movies-detail/movies-detail?id=" + movieId
    })
  },
  // scroll-view标签的专属属性bindscrolltolower上发生改变
  // onScrollLower: function (event) {
  //   var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
  //   util.http(nextUrl, this.processDoubanData);
  //   wx.showNavigationBarLoading();
  // },
  onReachBottom: function (event) {
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },


  onPullDownRefresh:function(){
  var refreshUrl=this.data.requestUrl+"?start=0&count=20";
  this.data.movies={};
  this.data.isEmpty=true;
  this.data.totalCount=0;
  util.http(refreshUrl, this.processDoubanData);
  wx.showNavigationBarLoading();
  }

})
