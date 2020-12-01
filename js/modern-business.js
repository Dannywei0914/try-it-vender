var cp1 = document.getElementById('crushpay_timer');
var cp2 = document.getElementById('cardpay_timer');
var cp3 = document.getElementById('finish_timer');
var buycash = document.getElementById('buyCash');
var noncash = document.getElementById('nonCash');
var hascash = document.getElementById('hasCash');
var givecash = document.getElementById('giveCash');
var cp1time = 60;  // 現金時間
var cp2time = 30;  // 讀卡時間
var cp3time = 30;  // 完成時間
var count = 0;
var timer;
var imgTimeOut;
var payShowTime = 0;
var timeIndex = 0;
var finishTime;   //購買完成的時間
var payTime;      //付款時候的時間
var listenCash = true;
var adType = true;
var imgUrl = new Array();
imgUrl = ['./images/new/pic-ad1.jpg', './images/new/pic-ad2.jpg','./images/new/pic-ad3.jpg'];

//time
let hour = '';
let minutes = '';
let second = '';
let year = '';
let month = '';
let day = '';
let weekend = '';

function getTime() {
  const date = new Date();
  hour = date.getHours();
  minutes = date.getMinutes(); 
  second = date.getSeconds();
  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();
  weekend = date.getDay();
}

function startTime() {
  getTime();
  hour = checkTime(hour);
  minutes = checkTime(minutes);
  second = checkTime(second);
  document.getElementById('time__date').innerHTML = year + "/" + month + "/" + day;
  document.getElementById('time__clock').innerHTML = hour + ":" + minutes + ":" + second;
  let timeoutId = setTimeout(startTime, 1000);
}

function checkTime(i) {
  if(i < 10) {
      i = "0" + i;
  }
  return i;
}
//

/**
 * 呼叫付款方式彈窗的function
 * 依type去呼叫對應的視窗
 */
function showformpay(type) {
  document.getElementById("cash").style.display = "none";
  document.getElementById("linePayImg").style.display = "none";
  document.getElementById(type).style.display = "block";

  $('.popup').removeClass('popup_show');
  $('#formpay').addClass('popup_show');
  $('#cardView').hide();
  $('#cashView').hide();
  payShowTime++;

  switch (type) {
    case 'cash':
      // api
      // var xmlhttp = new XMLHttpRequest();
      // xmlhttp.onreadystatechange = function () {
      //   if (this.readyState == 4 && this.status == 200) {
      //     s = setInterval(test, 700);
      //     listenCash = true;
      //   }
      // };
      // xmlhttp.open("post", "/Trans/cashstampStart", true);
      // xmlhttp.send();
      //
      $('#cashView').show();
    break;
    case 'linePayImg':
      listenCash = false;
      $('#cardView').show();
      $('#linepay').show();
    break;
  
    default:
      break;
  }
}

/**
 * 現金的付款時間
 * cp1time 遞減
 * 判斷cp1time是否為0
 * 如果不是就過一秒在執行一次
 * 如果是就重置時間、clearTimeout(payTime)、timeGo();
 */
function countdown1() {
  $('#crushpay_timer').html(cp1time - 1);
  cp1time--;
  if (cp1time == 0) {
    cp1time = 60;
    payShowTime = 0;
    timeGo();
    $('#crushpay_timer').html(cp1time);
    $('.popup').removeClass('popup_show');
    // Cashout();   //退幣的api
    clearTimeout(payTime);
    clearInterval(s);
  }
  else {
    payTime = setTimeout('countdown1()', 1000);
  }
}

/**
 * 讀卡的付款時間
 * cp2time 遞減
 * 判斷cp2time是否為0
 * 如果不是就過一秒在執行一次
 * 如果是就重置時間、clearTimeout(payTime)、timeGo();
 */
function countdown2() {
  $('#cardpay_timer').html(cp2time - 1);
  cp2time--;
  if (cp2time == 0) {
    cp2time = 30;
    payShowTime = 0;
    timeGo();
    $('#cardpay_timer').html(cp2time);
    $('.popup').removeClass('popup_show');
    clearTimeout(payTime);
  }
  else {
    payTime = setTimeout('countdown2()', 1000);
  }
}

/**
 * 完成的付款時間
 * cp3time 遞減
 * 判斷cp3time是否為0
 * 如果不是就過一秒在執行一次
 * 如果是就重置時間、clearTimeout(finishTime)、timeGo();
 */
function countdown3() {
  $('#finish_timer').html(cp3time - 1);
  cp3time--;
  if (cp3time == 0) {
    cp3time = 30;
    payShowTime = 0;
    timeGo();
    $('#finish_timer').html(cp3time);
    $('.popup').removeClass('popup_show');
    clearTimeout(finishTime);
  }
  else {
    finishTime = setTimeout('countdown3()', 1000);
  }
}

/**
 * 取消付款或退幣
 * 執行過一秒後重置時間、clearTimeout(payTime);
 * 重置金錢欄位
 * timeGo();
 */
function stopcount() {
  setTimeout(() => {
    clearTimeout(payTime);
    // if (listenCash) {
    //   clearTimeout(s);
    // }
    cp1time = 60;
    cp2time = 30;
    cp3time = 30;
    $('#crushpay_timer').html(cp1time);
    $('#cardpay_timer').html(cp2time);
  }, 1000);
  $('#buyCash').text(0);
  $('#nobCash').text(0);
  $('#giveCash').text(0);
  $('#hasCash').text(0);
  payShowTime = 0
  $('.popup').removeClass('popup_show');
  timeGo()
}

/**
 * 現金付款
 * 執行過一秒後重置時間、clearTimeout(payTime)、countdown3();
 * 重置金錢欄位
 * timeGo();
 */
function salse() {
  setTimeout(() => {
    clearTimeout(payTime);
    cp1time = 60;
    $('#crushpay_timer').html(cp1time);
    countdown3();
  }, 1000);
  $('#buyCash').text(0);
  $('#nobCash').text(0);
  $('#giveCash').text(0);
  $('#hasCash').text(0);
  payShowTime = 0
  $('.popup').removeClass('popup_show');
  $('#finish').addClass('popup_show');
  $('#formpay').submit();
}

/**
 * 關閉完成畫面
 * 執行過一秒後重置時間、clearTimeout(finishTime);
 */
function closeBtn() {
  timeGo();
  setTimeout(() => {
    clearTimeout(finishTime);
    cp1time = 60;
    cp2time = 30;
    cp3time = 30;
    $('#crushpay_timer').html(cp1time);
    $('#cardpay_timer').html(cp2time);
    $('#finish_timer').html(cp3time);
  }, 1000);
  $('#finish').removeClass('popup_show');
  $('#refund').addClass('popup_show');
  document.getElementById('refundTxt').innerHTML = "請稍後。";
    
  setTimeout(function () { location.href = "./index.html"; }, 3000);
}

$('body').ready(function () {
  // chrome 直接加上下面这个就行了，但是ff無法
  $('body').css('zoom', 'reset');
  startTime()
  
	$(document).keydown(function (event) {
    //event.metaKey mac的command键
    if ((event.ctrlKey === true || event.metaKey === true)&& (event.which === 61 || event.which === 107 || event.which === 173 || event.which === 109 || event.which === 187  || event.which === 189)){
      event.preventDefault();
    }
  });
  
	$(window).bind('mousewheel DOMMouseScroll', function(event) {
    if (event.ctrlKey === true || event.metaKey) {
      event.preventDefault();
    }
  })

  // 呼叫scrollbar
  $('.body-list').overlayScrollbars({
    callbacks:{ //套件提供事件
      onScrollStop: function(e) { //提供的參數
        scrollTop = e.target.scrollTop;
    
        if (scrollTop > 0) {
          $('.top-button').addClass('top-button_show');
        } else {
          $('.top-button').removeClass('top-button_show');
        }

        $('.top-button').click(function() {
          $('.top-button').removeClass('top-button_show');
          e.target.scrollTop = 0;
        })
      }
    },
    
  });  

  $('.body-list__item').click(function () {
    payShowTime ++;
    $('.popup').removeClass('popup_show');
    $('#commodity').addClass('popup_show');
  })

  $('#commodityCancel').click(function () {
    payShowTime = 0;
    $('.popup').removeClass('popup_show');
    timeGo()
  })

  $('#close').click(function() {
    payShowTime = 0;
    $('.popup').removeClass('popup_show');
    $('#videoPlayer')[0].currentTime = 0;
    document.getElementById('videoPlayer').pause();
    timeGo()
  })

  $('#closeImg').click(function() {
    payShowTime = 0;
    clearInterval(imgTimeOut)
    $('.popup').removeClass('popup_show');
    timeGo()
  })

  $('.body').on('click',function() {
    setTime();
  })

  // 初始化計時待機
  initTime = setTimeout(()=>{
    $('#ad').addClass('popup_show');
    adType = false;
  }, 30000)
})

/**
 * 圖片廣告輪播
 */
function scrollPic() {
  var number = Math.floor(Math.random() * imgUrl.length);
  document.getElementById("adImg").src=imgUrl[number];

  imgTimeOut = setInterval(() => {
    if (timeIndex > imgUrl.length - 1) {
      timeIndex = 0;
    }
    
    for (var i = 0; i < imgUrl.length; i++){
      if (i == timeIndex) {
        document.getElementById("adImg").src=imgUrl[i];
      }
    }
    timeIndex++;
  }, 10000);
}

/**
 * 影片廣告結束時更換廣告
 * 設定結束後幾面再播放影片
 */
function changeAd() {
  $('#img1').addClass('popup__photo_show');
  $('#img2').removeClass('popup__photo_show');
  $('#videoPlayer')[0].currentTime = 0;
  document.getElementById('videoPlayer').pause();

  setTimeout(() => {
    $('#img1').removeClass('popup__photo_show');
    $('#img2').addClass('popup__photo_show');
    document.getElementById('videoPlayer').play();
  }, 20000);
}

// 清除待機計時
// 判斷是不是在商品彈窗
function setTime() {
  clearTimeout(initTime);
  if (payShowTime === 0) {
    timeGo();
  } else {
    payShowTime = 0;
    clearTimeout(timer);
  }
}

// 待機計數器
function timeGo() {
  clearTimeout(timer);
  count ++;
  if (count == 1) {
    timer = setTimeout(()=>{
      if (adType) {
        $('#ad').addClass('popup_show');
        document.getElementById('videoPlayer').play();
        adType = false;
      } else {
        $('#adPhoto').addClass('popup_show');
        scrollPic();
        adType = true;
      }
    }, 30000)
  } else {
    count = 0;
    timeGo();
  }
}