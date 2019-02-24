var util = require('../../utils/util.js')
var app = getApp();

// pages/movies/movies.js
Page({
  //RESTFul API
  // SOAP
  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    containerShow: true,
    searchPanelShow: false,
    searchResult: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
  },

  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category
    })
  },
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: "movies-detail/movies-detail?id=" + movieId
    })
  },

  getMovieListData: function (url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res)
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function (error) {
        console.log("failed")
        console.log(error)
      },

    })
  },
  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      // searchResult:{}
    })
  },
  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })

  },
  bindConfirm: function (event) {
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, "searchResult", "");
  },
  processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
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
    // 考js动态原理
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    };
    this.setData(readyData);
  }
})