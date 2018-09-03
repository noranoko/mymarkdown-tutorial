<template>
    <div id="app">
    <v-app id="inspire" dark>
        <v-toolbar app fixed clipped-left>
        <v-toolbar-title>mymarkdown-tutorial</v-toolbar-title>
        <v-spacer></v-spacer>
        <span>ようこそ {{name}} さん</span>
        <v-btn small @click="logout">ログアウト</v-btn>
        </v-toolbar>
        <v-content>
        <v-container fluid fill-height>
            <div class="editor layout">
                <div class="editor__sidebar flex xs2">
                    <div class="editor__btnArea layout">
                        <v-btn fab class="pink darken-1" @click="addMemo"><v-icon class="white--text">note_add</v-icon></v-btn>
                        <v-btn fab class="blue darken-1" :disabled="memos.length < 2" @click="deleteMemo"><v-icon class="white--text">delete</v-icon></v-btn>
                        <v-btn fab class="green darken-1" @click="saveMemos"><v-icon class="white--text">save</v-icon></v-btn>
                        <br/>
                    </div>
                    <div class="memoList">
                        <div  v-if="memos" v-for="(memo, index) in memos" :key="index" @click="selectMemo(index)" :data-selected="index == selectedIndex" class="memoList__item">
                            <span v-if="index == selectedIndex" class="memoList__tag">選択中</span>
                            <v-card hover>{{memo.title}}</v-card> 
                        </div>
                    </div>
                </div>
                <div class="editor__content flex xs10">
                    <input type="text" class="editor__title" placeholder="タイトル" v-model="memos[selectedIndex].title">
                    <div class="editor__writeArea layout">
                        <textarea class="markdown flex xs6" v-model="memos[selectedIndex].markdown"></textarea>
                        <div class="preview flex xs6" v-html="preview()"></div>
                    </div>
                </div>
            </div>
        </v-container>
        </v-content>
        <v-footer app fixed>
        <span>&copy; 2018 noranokonoko</span>
        </v-footer>
    </v-app>
    </div>
</template>

<script>
import firebase from 'firebase'
import marked from 'marked';
export default {
    name: 'editor',
    data () {
        return {
            memos:[
                {
                    title: "無題のメモ",
                    markdown: "",
                }
            ],
        selectedIndex:0,
        name:"ゲストユーザ",
        user:{}
        }
    },
  created:function(){
    this.user = firebase.auth().currentUser; 
    if(this.user) { 
        this.name = this.user.displayName; 
    };
    firebase
      .database()
      .ref('memos/' + this.user.uid)
      .once('value')
      .then(result =>{
          if(result.val()){
              this.memos = result.val();
          }
      })
  },
  methods:{
      logout:function(){
          firebase.auth().signOut();
      },
      addMemo:function(){
            this.memos.push({
                title: "無題のメモ",
                markdown: ""
            })
      },
      deleteMemo:function(){
          this.memos.splice(this.selectedIndex,1);
          if(this.selectedIndex > 0){
              this.selectedIndex--;
          }
      },
      saveMemos:function(){
          firebase
          .database()
          .ref('memos/'+ this.user.uid)
          .set(this.memos);
      },
      selectMemo:function(index){
          this.selectedIndex = index;
      },
      preview:function(){
          return marked(this.memos[this.selectedIndex].markdown);
      },
  }
}
</script>
<style lang="scss">

.memoList {
    // Variable
    $tag-height: 20px;
    $tag-color: rgb(45, 251, 55);

    margin-top: 30px;

    &__item {
        position: relative;

        & + & {
            margin-top: $tag-height + 5px;
        }
    }

    &__tag {
        background-color: $tag-color;
        box-sizing: border-box;
        font-size: 12px;
        font-weight: bold;
        padding: 3px 5px 4px;
        position: absolute;
        right: 0;
        top: -$tag-height;

        &:after {
            border: 0 solid  transparent;
            border-width: $tag-height 10px 0 0;
            border-right-color: $tag-color;
            content: "";
            position: absolute;
            right: 100%;
            top: 0;
        }
    }
}
.editor {
    height: 100%;
    &__sidebar {
        margin-right: 20px;
    }

    &__content {
/*        overflow: scroll;*/
        padding: 5px 20px;

        > button {
            margin: 20px 20px 0;
        }
    }

    &__title {
        border: 1px solid #ccc;
        font-size: 20px;
        padding: 10px;
        margin: 0 10px;
        width: calc(100% - 20px);
    }

    &__writeArea {
        height: 80%;
        margin-top: 20px;

        > * {
            border: 1px solid #ccc;
            height: 100%;
            padding: 10px;
            margin: 0 10px;
        }
    }
}
.v-card {
    padding: 10px;
}

.v-btn {
    margin: 0 6px;
}
</style>
