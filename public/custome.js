$(document).ready(function(){
    var loop = 0;
    $('#form-load').submit(function(e){
        e.preventDefault();
        var value = $(this).serialize();
        if(loop!=0){
            clearInterval(loop);
            loop = 0;   
        }
        if(loop==0){
            var load = '<div class="loading"><img src="image/load.gif" alt=" " /><div class="clr10"></div><span>Đang tải thông tin...</span></div>';
            $('.data-show').html(load);
            $.post('http://localhost:3000/check_post',value).done(function(data){
                $('.data-show').html(data);
            });
        }
        time = $('#time_post').val();
        loop = setInterval(function(){
            var load = '<div class="loading"><img src="image/load.gif" alt=" " /><div class="clr10"></div><span>Đang tải thông tin...</span></div>';
            $('.data-show').html(load);
            $.post('http://localhost:3000/check_post',value).done(function(data){
                $('.data-show').html(data);
            });
        },time);
    })
})