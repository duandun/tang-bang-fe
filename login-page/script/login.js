/**
 * Created by liunan on 2016/9/21.
 */

$(document).ready(function(){
    var config = {
        vx: 4,
        vy:  4,
        height: 2,
        width: 2,
        count: 100,
        color: "88, 206, 255",
        stroke: "88,206,255",
        dist: 6000,
        e_dist: 20000,
        max_conn: 10
    }
    CanvasParticle(config);
//     $(this).keypress(function(e) {
//         console.log(e)
//         if (e.which == 13) {
//             // console.log('enter被按下')
//             loginCheck();
//         }
// })
});
$('#loginBtn').on('click', function() {
  var postData = loginCheck();
  if (postData) {
    $.ajax({
      url: 'http://47.93.29.71/api/u/submitLogin',
      type: 'POST',
      data: postData,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      success: function (data) {
        console.log(data);
        if (data.flag) {
          layer.msg('登录成功', {icon: 1});
          //location.href=CONTEXTPATH+'/user/main.htm';
          //location.href=CONTEXTPATH+'/buildModel/denglitestD3.htm';
        } else {
          layer.msg('用户名或密码不正确', {icon: 5});
        }
      },
      error: function (data) {
      }
    });
  }
})
function loginCheck() {
    var userName = $('#userName').val();
    var password = $('#password').val();
    var rememberMe = $('#remember');
    if(userName.trim() === '') {
      layer.msg('用户名不能为空', {icon: 5});
    }else if(password.trim() === '') {
      layer.msg('密码不能为空', {icon: 5});
    }else {
      var postData = {
        email: userName,
        pswd: MD5(userName + '#' + password),
        rememberMe: rememberMe.is(':checked')
      }
      return postData;
        // $.ajax({
        //     url: '/user/login.htm',
        //     type: 'POST',
        //     data: postData,
        //     success: function (data) {
        //         console.log(data);
        //         if(data.flag){
        //             layer.msg('登录成功', {icon: 1});
        //             location.href=CONTEXTPATH+'/user/main.htm';
        //             //location.href=CONTEXTPATH+'/buildModel/denglitestD3.htm';
        //         }else{
        //             layer.msg('用户名或密码不正确', {icon: 5});
        //         }
        //     },
        //     error: function (data) {
        //     }
        // });
      // location.href = location.origin;
    }
}
