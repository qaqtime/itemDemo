Page({
  onTap:function(event){
    // wx.navigateTo({
    //   url:"../posts/posts"
    // })

    wx.switchTab({
      url:"../posts/posts"
    })
    console.log("excute onContainerTap");
  }

})