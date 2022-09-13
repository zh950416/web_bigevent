$(function(){
    //点击去注册账号的链解
    $('#link_reg').on('click', function(){
       $('.login-box').hide()
       $('.reg-box').show()
    })

    // 点击去登录
    $('#link_login').on('click', function(){
        $('.login-box').show()
        $('.reg-box').hide()
     })
     //从layui中获取form对象
  var form = layui.form
  var layer=layui.layer
// 通过form。verify（）自定义规则
  form.verify({

   pwd: [/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'
      ] ,

  repwd:function(value){
        //确认密码
     var pw = $('.reg-box [name=password]').val()
     if(pwd !== value){
        return '密码不一致'
     }

      }
    //监听登录事件
    $('#form_login').submit(function(e){
        // 阻止默认提交
        e.preventDefault
        $.ajax({
            url:'http://www.liulongbin.top:3007/api/login',
            method:'POST',

            // 快速获取表单信息
            date:$(this).serialize(),
            success:function(res){
                if (res.status !==0){
                    return layer.msg('失败')
                }
                layer.msg('成功')
                // 存token的值，并跳转后台主页
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }

        })
    })
  })


  //监听注册表单
  $('#from_reg').on('submit',function(e){
    e.preventDefault()
    $.post('http://www.liulongbin.top:3007/api/reguser',
    {username: $('#from_reg [name=username]').val() , password:$('#from_reg [name=password]').val() },
    function(res){
if(res.status !== 0){
    return layer.msg(res.message)
}
 layer.msg('注册成功请登录')
//  自动跳转登录
$('#link_login').click()
    })
  })

})
