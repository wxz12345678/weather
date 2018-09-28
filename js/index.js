//当前页面加载完成时
$(function () {
    //获取当前城市的天气信息
    let tianqi;
    $.ajax({
        type:'get',
        url:'https://www.toutiao.com/stream/widget/local_weather/data/?city=太原',
        dataType:'jsonp',
        success:function(obj){
            tianqi=obj.data;
            console.log(tianqi);
            // $('pre').html(tianqi.city);
            updata(tianqi);
        }
    })
    function updata(tianqi){
        //获取当前的城市
        $('.heade li:nth-child(2)').html(tianqi.city);
        //获取当前的天气状况
        $('.qulity').html(tianqi.weather.quality_level);
        //获取当前的温度
        $('.temperature').html(tianqi.weather.current_temperature+'°');
        //获取当前的天气状况
        $('.dayweather').html(tianqi.weather.dat_condition);
        //获取今天的最低气温
        $('.left .leftl .high-low .low').html(tianqi.weather.
        day_low_temperature);
        //获取今天胡最高气温
        $('.left .leftl .high-low .high').html(tianqi.weather.
            dat_high_temperature);
        //获取明天的最低气温
        $('.right .leftl .high-low .low').html(tianqi.weather.
            dat_low_temperature);
        //获取明天胡最高气温
        $('.right .leftl .high-low .high').html(tianqi.weather.
            dat_high_temperature);
        //获取明天的天气
        $('.right .leftr .tomorrow-weather').html(tianqi.weather.
            day_condition);
        //获取明天天气图标
        $('.left .leftr img').attr("src","./img/"+tianqi.weather.forecast_list[0].weather_icon_id+".png");
        $('.right .leftr img').attr("src","./img/"+tianqi.weather.forecast_list[1].weather_icon_id+".png");

        // 未来24小时的天气
    let hweather=tianqi.weather.hourly_forecast;
    console.log(hweather);
    hweather.forEach(function (v) {
        let str=`<li class="bott2-list-first">
               <p class="hour-time">${v.hour}:00</p>
                <img src="./img/${v.weather_icon_id}.png" alt="">
               <p class="hour-temperature">${v.temperature}°</p>
           </li>`
        $('.bott2-list').append(str);
    })
        //未来半个月天气
        let mweather=tianqi.weather.forecast_list;
        console.log(mweather);
        mweather.forEach(function (val) {
            let mstr = ` <li>
                    <div>
                        <p>${val.date}</p>
                        <p>${val.high_temperature}°</p>
                    </div>
                    <p>${val.condition}</p>
                   <div><img src="./img/${val.weather_icon_id}.png" alt=""></div>
                  
                    <div><img src="./img/${val.weather_icon_id}.png" alt=""></div>

                    <p>${val.condition}</p>
                    <div>
                        <p>${val.wind_direction}</p>
                        <p>${val.wind_level}级</p>
                    </div>
                </li>`
            $('.bott3 ul').append(mstr);
        })
    }
    //获取城市信息
    let city;
    $.ajax({
        type:'get',
        url:'https://www.toutiao.com/stream/widget/local_weather/city/',
        dataType:'jsonp',
        success:function(obj){
            city=obj.data;
            console.log(city);
            updataCity(city);
        }
    })
    //获取每个城市信息
    function updataCity(city){
        for(let i in city){
            //追加p
            let city_title=document.createElement("p");
            city_title.className="city-title";
            city_title.innerHTML=i;
            let hot_city=document.querySelector('.hot-city');
            hot_city.appendChild(city_title);
            //追加ul
            let city_list=document.createElement('ul');
            city_list.classname="city-list";
            hot_city.appendChild(city_list);
            //追加li
            for(let j in city[i]){
                let lis=document.createElement('li');
                lis.className="city-list-li";
                lis.innerHTML=j;
                // console.log(lis);
                city_list.appendChild(lis);
            }
        }
    }
// 点击每个城市，获取当前城市的天气信息
//     console.log($('.city-list-li'));
window.onload=function(){
    $('.city-list-li').click(function () {
        $('section').css({'display':'none'});
        $('.content').css({'display':'block'});
        $('.bott1').css({'display':'block'});
        $('.bott2').css({'display':'block'});
        $('.bott3').css({'display':'block'});
        $('.bott4').css({'display':'block'});
        $('.footer').css({'display':'block'});
        let con=$(this).html();
        console.log(con);
        ajaxs(con);
        // updataCity($('.city-list-li'));
    })
    }
    function ajaxs(str){
        let url1=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`;
        $.ajax({
            type:'get',
            url:url1,
            dataType:'jsonp',
            success:function(obj){
                let tianqi2=obj.data;
                console.log(tianqi2);
                $('.bott2 li').remove();
                $('.bott3 li').remove();
                updata(tianqi2);
            }
        })
    }
    //input获取焦点时，取消变搜索...在搜索框中输入内容，可以搜索当前城市的天气
    $('input').focus(function () {
        $('header p').html('搜索');
    })
    //当点击搜索时，获取input的内容获取城市
    $('header p').click(function () {
        if($('header p').html()=="取消"){
            $('section').css({'display':'none'});
            $('.content').css({'display':'block'});
            $('.bott1').css({'display':'block'});
            $('.bott2').css({'display':'block'});
            $('.bott3').css({'display':'block'});
            $('.bott4').css({'display':'block'});
            $('.footer').css({'display':'block'});
            $('header p').html()=="取消"
        }else if($('header p').html()=="搜索" && $('input').val()==''){
            alert('输入为空，请重新输入');
            $('header p').html("取消");
            $('section').css({'display':'block'});
            $('.content').css({'display':'none'});
            $('.bott1').css({'display':'none'});
            $('.bott2').css({'display':'none'});
            $('.bott3').css({'display':'none'});
            $('.bott4').css({'display':'none'});
            $('.footer').css({'display':'none'});
        }else{
        let text=$('input').val();
            for(let i in city){
                for(let j in city[i]){
                    for(let m in j){
                        if(text!=m){
                            alert('输入城市有误');
                            return;
                        }
                    }
                }
            }
        ajaxs(text);
        $('header p').html("取消");
        $('input').val('');
        }
    })
})

//1,获取默认城市的天气信息
// 2，获取所有城市的信息
// 3，点击每个城市可以获取当前城市的天气信息
// 4，在搜索框中输入要搜索的城市，点击搜索按钮可以搜索天气


//点击城市，出现城市页面
//点击取消，城市页面消失
//获取城市信息