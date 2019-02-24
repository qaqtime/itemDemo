var postsData = require('../../../data/posts-data.js')
var app = getApp();
Page({
  data: {
    isPlayingMusic: false
  },
  onLoad: function (option) {
    // 测试globalData是否有用
    // var globalData=app.globalData;
    var postId = option.id;
    this.data.currentPostId = postId;
    this.setData({
      currentPostId: postId
    })
    var postData = postsData.postList[postId];
    // 如果是下面这样wxml里面就不用在前面加上postData了
    // this.data.postData=postData;
    // this.data.avatar= postData.avatar;
    // this.data.author = postData.author;

    //如果在onload方法中，不是异步的去执行一个数据绑定
    // 则不需要使用this.setData方法
    // 只需要对this.data赋值即可实现数据绑定
    // this.data.postData=postData;
    // 异步方法是没有办法保证this.data.postData=postData;函数的执行一定是在onload方法执行结束之前执行
    this.setData({
      postData: postData
    })

    // var postsCollected = {
    //     1:"true",
    //     2:"false",
    //     3:"true"
    //     ...
    // }
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);

    }

    // wx.setStorageSync('key',"进口美酒")
    //     wx.setStorageSync('key', {
    //       game: "进口美酒",
    //       developer: "茂腾"
    //     }),
    //   wx.setStorageSync('key_1', {
    //     game: "新西兰",
    //     developer: "飞马湾"
    //   })
    // },

    // onCollectionTap: function (event) {
    //   var wine = wx.getStorageSync('key')
    //   console.log(wine)
    // },
    // onShareTap: function (event) {
    //   // wx.removeStorageSync('key')
    //   // 小程序缓存最大的上限不能超过10MB
    //   wx.clearStorageSync()
    // }






    // if (app.globalData.g_isPlayingMusic) {
    //   // 第二种更好些
    //   // this.data.isPlayingMusic = true;
    //   this.setData({
    //     isPlayingMusic: true
    //   })
    // }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === this.data.currentPostId) {
      this.setData({
        isPlayingMusic: true
      })
    }

    this.setMusicMonitor();

  },

  setMusicMonitor: function () {
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
  },

  onColletionTap: function (event) {
    // 同步调用
    // this.getPostsCollectedSyc();
    this.getPostsCollectedAsy();

  },

  getPostsCollectedAsy: function () {
    var that = this;
    wx.getStorage({
      key: "posts_collected",
      success: function (res) {
        var postsCollected = res.data;
        //拿到这个值
        var postCollected = postsCollected[that.data.currentPostId];
        //取反操作 收藏的变成未收藏
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        that.showToast(postsCollected, postCollected);
      },
    })
  },

  //以下为同步方法调用
  getPostsCollectedSyc: function () {
    //拿到这个缓存的值
    var postsCollected = wx.getStorageSync('posts_collected');
    //拿到这个值
    var postCollected = postsCollected[this.data.currentPostId];
    //取反操作 收藏的变成未收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postsCollected, postCollected);
  },


  showModal: function (postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: "收藏",
      content: postCollected ? "收藏该文章?" : "取消收藏该文章?",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",

      success: function (res) {
        if (res.confirm) {
          //更新文章是否的缓存值
          wx.setStorageSync('posts_collected', postsCollected);
          //更新数据绑定变量，从而实现切换图片
          that.setData({
            collected: postCollected
          })
        }

      }
    })
  },
  showToast: function (postsCollected, postCollected) {
    //更新文章是否的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    //更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  }




  // onColletionTap: function (event) {
  //   var postsCollected = wx.getStorageSync('posts_collected');
  //   var postCollected = postsCollected[this.data.currentPostId];

  //   // 收藏变成未收藏，未收藏变成收藏
  //   postCollected = !postCollected;
  //   postsCollected[this.data.currentPostId] = postCollected;



  //   // 更新文章true和false的缓存值 不信失误点，错误点
  //   wx.setStorageSync('posts_collected', postsCollected)
  //   // 更新数据绑定变量，从而实现切换图片
  //   this.setData({
  //     collected: postCollected
  //   })
  // }
  ,
  onShareTap: function (event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        // res.cancel      //用户是不是点击了取消按钮，这个在最新的小程序API里面是没有的
        // res.tapIndex    //数字元素的序列,从0开始
        wx.showModal({
          title: "用户" + itemList[res.tapIndex],
          content: "用户是否取消？" + res.cancel + "现在无法实现分享功能"
        })
      }
    })
  },
  onMusicTap: function (event) {
    //第一种音乐播放与暂停的方法
    var currentPostId = this.data.currentPostId;
    var isPlayingMusic = this.data.isPlayingMusic;
    var postData = postsData.postList[currentPostId];
    if (isPlayingMusic) {
      wx.stopBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    }
    else {
      wx.playBackgroundAudio({
        // dataUrl:'http://ws.stream.qqmusic.qq.com/C100003507bR0gDKBm.m4a?fromtag=38',
        // title: '夜夜夜',
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }
    //第二种音乐播放与暂停的方法，比较现代的方法
    // var isPlayingMusic = this.data.isPlayingMusic;
    // const backgroundAudioManager = wx.getBackgroundAudioManager()
    // if (isPlayingMusic) {
    //   backgroundAudioManager.stop();
    //   this.setData({
    //     isPlayingMusic: false
    //   })
    // }
    // else {
    //   backgroundAudioManager.title = '夜夜夜'
    //   backgroundAudioManager.epname = '夜夜夜'
    //   backgroundAudioManager.singer = '秦'
    //   backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    //   backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/C100003507bR0gDKBm.m4a?fromtag=38' // 设置了 src 之后会自动播放
    //   this.setData({
    //     isPlayingMusic: true
    //   })
    // }



  }

})