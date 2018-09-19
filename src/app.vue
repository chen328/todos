<template>
    <div class="contain">
      <h3 class="title">todos</h3>
      <div class="box">
        <div class="head">
          <input  class="todo-inp " placeholder="What needs to be done?" v-model="msg" @keyup.enter="sumbitMsg">
          <!--全选-->
          <div class="btn" v-show="liHas" @click="allChange" >
            <span class="mui-icon mui-icon-arrowdown " :class="{gou:liHas,allGou:showBtn}"></span>

          </div>
        </div>

        <section class="sec">
          <ul class="sec-ul" >
            <li class="sec-li" v-for="(item,i) in list" :key="item.val" v-show="item.showFlag">
              <input type="checkbox" class="" :id="'aaa' + i" :checked="item.claFlag">
              <!--复选框,点击切换checked-->
              <label :for="'aaa' + i" class="mui-icon "  @click="trgClass(item.claFlag,i)">
              </label>

              <div :class="{checkact:item.claFlag}" >{{item.val}}</div>
              <a href="javascript:;" @click="delLi(i)">
                <span class="mui-icon mui-icon-closeempty"></span>
              </a>
            </li>

          </ul>
        </section>
        <footer class="foot" v-show="list.length">
          <span > {{actNum}}items left</span>
          <ul >
            <li :class="{liActive:flagAry[0].flag}" @click="lookAll">All</li>
            <li :class="{liActive:flagAry[1].flag}" @click="lookAct">Active</li>
            <li :class="{liActive:flagAry[2].flag}" @click="lookCom">Completed</li>
          </ul>
          <a href="javascript:;" @click="delAll">Clear completed</a>
        </footer>
      </div>

    </div>

</template>

<script>
  export default {
    name: "app",
    data(){
      return {
        showBtn:false, //全选框
        msg:'',
        list:[
          // {val:'aaa',claFlag:false,showFlag:true},
          // {val:'bbb',claFlag:false,showFlag:true}
        ],
        flagAry:[
          {flag:true},//all选项判断
          {flag:false},//active 选项
          {flag:false}  //completed选项
        ],
        liHas:false, //是否有li标签
        actNum:'1'
      }
    },
    created: function() {
      document.getElementsByTagName("body")[0].style.backgroundColor="#f5f5f5";
      this.liHave();
      this.getActNum()
    },
    updated:function(){
      this.allShow();
      this.liHave();
      this.getActNum()
    },
    methods:{
      sumbitMsg(){
        //添加input信息到list中
        this.list.push({
          val:this.msg,
          claFlag:false,
          showFlag:true
        });
        this.msg = ''
      },
      trgClass(cla,i){
        this.list[i].claFlag = !cla
      },
      allShow(){
        this.showBtn = this.list.every(item => {
          return item.claFlag === true
        })
      },
      allChange(){
        this.showBtn = !this.showBtn;
        this.list.forEach(item => {
          item.claFlag = this.showBtn
        })
      },
      liHave(){ //判断是否有li
       this.list.length === 0 ? this.liHas = false:this.liHas = true
      },
      delLi(i){
        //删除li标签
        this.list.splice(i,1)
      },
      delAll(){
        //删除所以被勾选的
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].claFlag === true){
            this.list.splice(i,1);
            i--;
          }
        }
      },
      lookAll(){
        //看所有li
        this.flagAry.forEach(item => {
          item.flag = false
        });
        this.flagAry[0].flag = true
        this.list.forEach(item => {
          item.showFlag = true
        })
      },
      lookAct(){
        //看被激活的li
        this.flagAry.forEach(item => {
          item.flag = false
        });
        this.flagAry[1].flag = true;
        this.list.forEach(item => {
          item.showFlag = !item.claFlag
        })

      },
      lookCom(){
        this.flagAry.forEach(item => {
          item.flag = false
        });
        this.flagAry[2].flag = true;
        this.list.forEach(item => {
          item.showFlag = item.claFlag
        })
      },
      getActNum(){
        let num = 0;
        this.list.forEach(item => {
          if (item.claFlag === false){
            num++;
          }
        });
        this.actNum = num
      }
    }

  }
</script>

<style scoped lang="less">
 .contain {
   width: 550px;
   margin: 0 auto;
   box-sizing: border-box;
   /*background: #f5f5f5;*/
   color: #4d4d4d;
   .title {
     /*标题*/
     margin: 0;
     font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
     line-height: 1.4em;
     width: 100%;
     font-size: 100px;
     font-weight: 100;
     text-align: center;
     color: rgba(175, 47, 47, 0.15);
   }
   .box {
     box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
     .head {
       width: 100%;
       background-color: #fff;
       position: relative;
       /*输入框*/
       .todo-inp {
         width: 100%;
         font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
         font-size: 24px;
         line-height: 1.4em;
         border: none;
         padding: 16px 16px 16px 60px;
         background: rgba(0, 0, 0, 0.003);
         color: rgb(77,77,77);
         box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
         &::-webkit-input-placeholder {
           color: #deded4;
         }
       }
        /*字体勾*/
       .btn {
         width: 30px;
         height: 30px;
         position: absolute;
         left: 16px;
         top: 22px;
         span {
           opacity: 0;
         }
          .gou {
            opacity: 0.7;
            color: #deded4;
          }
         .allGou {
           opacity: 1;
           color: #8f8f94;
         }
       }
       .btn-active {

       }
     }
     /*选项列表*/
     .sec {
       position: relative;
       z-index: 2;
       border-top: 1px solid #e6e6e6;
       background-color: #fff;
       .sec-ul {

         .sec-li{
           font-size: 24px;
           border-bottom: 1px solid #ededed;
           line-height: 1.4em;
           position: relative;
           input {
             width: 40px;
             height: 40px;
             border-radius: 50%;
             display: none;
             &:checked {
               + label {
                 &:before {
                   content: '\E472';
                   position: absolute;
                   left: -3px;
                   top: 0;

                 }
               }
             }
           }
           /*复选框*/
           label {
             width: 30px;
             height: 30px;
             border-radius: 50%;
             border:1px solid #d3d3d3;
             text-align: center;
             display: inline-block;
             position: absolute;
             left: 13px;
             top: 13px;
             font-size: 35px;
             line-height: 31px;
             color: rgb(93,194,175);
           }
           /*文字*/
           div {
             word-break: break-all;
             padding: 15px 15px 15px 60px;
             display: block;
             line-height: 1.2;
             transition: color 0.4s;
             &.checkact {
               color: #deded4;
               text-decoration: line-through;
             }
           }
           /*删除键*/
           a {
             display: block;
             position: absolute;
             right: 5px;
             top: 13px;
             width: 32px;
             height: 32px;
             background-color: #fff;
             /*transition: all .5s;*/
             span {
               position: absolute;
               color: rgb(204,154,154);
               font-size: 32px;
               line-height: 32px;
               opacity: 0;
             }
             /*&:hover span {*/
               /*opacity: 1;*/
               /*transition: all .5s;*/

             /*}*/
           }
           &:hover {
             a {
               span {
                 opacity: 1;
                 transition: all .5s;
               }
             }
           }
         }
       }
     }
     /*底部*/
     .foot {
       color: #777;
       padding: 10px 15px;
       height: 40px;
       box-sizing: border-box;
       text-align: center;
       border-top: 1px solid #e6e6e6;
       position: relative;
       background-color: #fff;
       display: flex;
       justify-content: space-between;
       font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
       line-height: 1.4em;
       &:before {
         content: '';
         position: absolute;
         right: 0;
         bottom: 0;
         left: 0;
         height: 50px;
         overflow: hidden;
         z-index: -1;
         box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
       }

       ul {
            display: flex;
            height: 22px;
         li {
           margin-right: 18px;
           box-sizing: border-box;
           padding: 3px 4px;
           height: 22px;
           border: 1px solid #ffffff;
           line-height: 1em;
           &:hover {
             border: 1px solid #ebebeb;
             border-radius: 3px;
           }
           &.liActive {
             border: 1px solid rgba(175, 47, 47, 0.2);
             border-radius: 3px;
           }
         }
       }
       a {
         text-decoration: none;
         color: #777;
         position: relative;
         z-index: 20;
         &:hover {
           text-decoration: underline;
           /*color: red;*/
         }
       }
     }

   }


 }
  ul,li {
    padding: 0;
    margin: 0;
    list-style: none;
  }


</style>