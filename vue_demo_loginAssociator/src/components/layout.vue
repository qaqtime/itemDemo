<template>
  <div>
    <div class="app-head">
      <div class="app-head-inner">

        <img src="../assets/logo.png">

        <div class="head-nav">
          <ul class="nav-list">
            <!--这里的{{ username }}起到的是渲染传递参数的作用-->
            <li>{{ username }}</li>
            <li v-if="username!==''" class="nav-pile">|</li>
            <li  v-if="username===''" @click="logClick">登录</li>
            <li  v-if="username!==''" @click="quit">退出</li>
            <li class="nav-pile">|</li>
            <li v-if="username===''" @click="regClick">注册</li>
            <li v-if="username===''" class="nav-pile">|</li>
            <li @click="aboutClick">关于</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>

    </div>
    <div class="app-foot">
      <p>© 2018 fishenal MIT</p>
    </div>
    <my-dialog :is-show="isShowLogDialog" @on-close="closeDialog('isShowLogDialog')">
      <p>Log</p>
      <log-form @has-log="onSuccessLog"></log-form>
    </my-dialog>
    <my-dialog :is-show="isShowRegDialog" @on-close="closeDialog('isShowRegDialog')">
      <p>Reg</p>
      <reg-form></reg-form>
    </my-dialog>
    <my-dialog :is-show="isShowAboutDialog" @on-close="closeDialog('isShowAboutDialog')">
      <p>　社保报销指由社会保险按比例补偿职工居民医疗费用、生育费用和工伤治疗费用的行为。社保报销主要包括生育保险报销和工伤保险报销三部分。社会医疗保险报销办法各地有一定差异。
        　　社保报销流程：
        　　首先到医保定点的公立医院进行住院治疗→住院三个工作日内必须到医院医保办公室登记备案→出院时到医保办公室开住院申批单，住院发票、明细清单、病历。
        　　如果是外伤的话，还应到医院医保办公室填写外伤表并加盖所住医院的公章及投保单位的公章，写好各人情况说明，投保单位情况说明或证明→到社会劳动保障局二楼办公室报销。报销时城镇居民医疗保险需要以上材料的原件，如果需要再进行商业险报销的，请把以上材料全部再复印加盖上医院的章，以备报商业险用。
        　　如有新农村合作医疗的不能与城镇居民医疗保险同时报，两者只能报一处。
        　　如有商业险的，应先报城镇居民医疗保险，再报商业险;如先报了商业险，那城镇居民医疗保险不再给予报销。</p>
    </my-dialog>
  </div>
</template>

<script>
    import Dialog from './dialog'
    import LogForm from './logForm'
    import RegForm from './regForm'
    export default {
//    注册Dialog
        components:{
            MyDialog:Dialog,
            LogForm,
            RegForm
        },
        data () {
            return {
                isShowLogDialog:false,
                isShowRegDialog:false,
                isShowAboutDialog:false,
                username:''
            }
        },
        methods: {
            logClick(){
                this.isShowLogDialog=true
            },
            regClick(){
                this.isShowRegDialog=true
            },
            aboutClick(){
                this.isShowAboutDialog=true
            },
            closeDialog(attr){
                this[attr]=false
            },
            addOne () {
                this.$store.dispatch('increase',this.price)
            },
            minusOne () {
                this.$store.dispatch('increase',this.price)
            },
            onSuccessLog(data){
                console.log(data)
                this.username=data.username,
                this.closeDialog('isShowLogDialog')
            },
            quit(){
                this.username=''
                console.log(this.username)
            }

        }
    }
</script>

<style>
  /* http://meyerweb.com/eric/tools/css/reset/
     v2.0 | 20110126
     License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  body {
    background: #f0f2f5;
    font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
    font-size: 14px;
    color: #444;
  }
  .app-head {
    background: #363636;
    color: #b2b2b2;
    height: 90px;
    line-height: 90px;
    width: 100%;
  }
  .app-head-inner {
    width: 1200px;
    margin: 0 auto;
  }
  .head-logo {
    float: left;
  }
  .app-head-inner img {
    width: 50px;
    margin-top: 20px;
  }
  .head-nav {
    float: right;
  }
  .head-nav ul {
    overflow: hidden;
  }
  .head-nav li {
    cursor: pointer;
    float: left;
  }
  .nav-pile {
    padding: 0 10px;
  }
  .app-foot {
    text-align: center;
    height: 80px;
    width: 100%;
    line-height: 80px;
    background: #e3e4e8;
    clear: both;
    margin-top: 30px;
  }
  .container {
    width: 1200px;
    margin: 0 auto;
  }
  .hr {
    height: 1px;
    width: 100%;
    background: #ddd;
  }
  .button {
    background: #4fc08d;
    color: #fff;
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
  }
  .button:hover {
    background: #4fc08d;
  }
  .g-form {

  }
  .g-form-line {
    padding: 15px 0;
  }
  .g-form-label {
    width: 100px;
    font-size: 16px;
    display: inline-block;
  }
  .g-form-input {
    display: inline-block;
  }
  .g-form-input input {
    height: 30px;
    width: 200px;
    line-height: 30px;
    vertical-align: middle;
    padding: 0 10px;
    border: 1px solid #ccc;
  }
  .g-form-btn {
    padding-left: 100px;
  }
  .g-form-error {
    color: red;
    padding-left: 15px;
  }
</style>
