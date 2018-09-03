<template lang="html">
  <div class="content">
    <div class="content-left">
        <br><br><br><br><br>
        <h1>mymarkdown-tutorial</h1>
        <div id="firebaseui-auth-container"></div>
    </div>
    <div class="content-right">
    </div>
  </div>
</template>


<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui'
import {config} from '../helpers/firebaseConfig';

export default {
  name: 'home',
  mounted() {
    var uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ]
      };
      let ui = firebaseui.auth.AuthUI.getInstance()
      if (!ui) {
          ui = new firebaseui.auth.AuthUI(firebase.auth())
      }
      ui.start('#firebaseui-auth-container', uiConfig)
    },
}
</script>


<style>
html, body {
  height: 100%;
}
#app{
    height: 100%;
}
#firebaseui-auth-container{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.content{
    overflow: hidden;
    padding: 0px;
    margin: 0px;
    height:100%;
}
.content-left{
    float: left;
    width:50%;
    height:100%;
    text-align: center;
    background: #000;
    position: relative;
    color: #fff
}
.content-right{
    background-image: url('../assets/bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    float: left;
    width:50%;
    height:100%;
}

</style>