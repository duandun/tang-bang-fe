/**
 * Created by liunan on 2016/9/21.
 */

// $(document).ready(function(){
//     var config = {
//         vx: 4,
//         vy:  4,
//         height: 2,
//         width: 2,
//         count: 100,
//         color: "88, 206, 255",
//         stroke: "88,206,255",
//         dist: 6000,
//         e_dist: 20000,
//         max_conn: 10
//     }
//     CanvasParticle(config);
//     $(this).keypress(function(e) {
//         console.log(e)
//         if (e.which == 13) {
//             // console.log('enter被按下')
//             loginCheck();
//         }
// })
// });
$("#loginBtn").on("click",function(){
    //loginCheck();
    $.ajax({
        url: '/api/login.htm',
        type: 'POST',
        data: {"databaseName": "1", "tableName": "2"},
        success: function (data) {
            console.log(data);
            if(data.flag){
                layer.msg('登录成功', {icon: 1});
                //location.href=CONTEXTPATH+'/user/main.htm';
                //location.href=CONTEXTPATH+'/buildModel/denglitestD3.htm';
            }else{
                layer.msg('用户名或密码不正确', {icon: 5});
            }
        },
        error: function (data) {
        }
    });
})
function loginCheck() {
    var userName = $("#userName").val();
    var password = $("#password").val();
    if(userName == ""){
        layer.msg('用户名不能为空', {icon: 5});
    }else if(password == ""){
        layer.msg('密码不能为空', {icon: 5});
    }else {
        var postData = {
            "userName":userName,
            "password":password
        }
        $.ajax({
            url: '/user/login.htm',
            type: 'POST',
            data: postData,
            success: function (data) {
                console.log(data);
                if(data.flag){
                    layer.msg('登录成功', {icon: 1});
                    location.href=CONTEXTPATH+'/user/main.htm';
                    //location.href=CONTEXTPATH+'/buildModel/denglitestD3.htm';
                }else{
                    layer.msg('用户名或密码不正确', {icon: 5});
                }
            },
            error: function (data) {
            }
        });

    }
}
