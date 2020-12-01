var proid = document.getElementById('proid');

function getRealPrice(proid) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      $('#buyCash').val(this.responseText);
    }
  };
  xmlhttp.open("get", "/Trans/getRealProce?roadid=" + proid, true);
  xmlhttp.send();
}

function getCashin() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          var data = JSON.parse(this.responseText);
          $('#buyCash').val(data.salsePrice);
          $('#nonCash').val(data.nonCash);
          $('#hasCash').val(data.cashIn);
          $('#giveCash').val(data.cashOut);
          if (data.buySuccess) {
              $('#buybutton').attr('disabled',false);
          } else {
              $('#buybutton').attr('disabled', true);
          }
    }
  };
  xmlhttp.open("POST", "/Trans/getCashin", true);
  xmlhttp.send();
}

function Cashout() {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        if (this.responseText) {
            if (cashOutcach == "0") {
                document.getElementById('refundTxt').innerHTML = "請稍後。";
            } else {
                document.getElementById('refundTxt').innerHTML = "退幣中。";
            }
          c = setTimeout(resets, 3000);
        $('#refund').addClass('popup_show');
      }
    }
  };

  xmlhttp.open("POST", "/Trans/Cashout", true);
  xmlhttp.send();
}

function resets() {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      clearTimeout(c);
      location.href = "/";
    }
  };

  xmlhttp.open("POST", "/Trans/ResetCashtemp", true);
  xmlhttp.send();
}

function linePay() {
  var datas = new FormData();
  datas.append('linepay', $('#linepay').val());
  $('#refund').addClass('popup_show');
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          var json = JSON.parse(this.responseText);
          if (json.returnCode == "0000") {
              location.href = json.info.paymentUrl.web;
          } else {
            document.getElementById('refundTxt').innerHTML = "交易失敗，返回首頁。(錯誤代號:" + json.returnCode + ")";
              //location.href = "/";
          }
      }
  };
  xmlhttp.open("post", "/Trans/LinePayOrderv3", true);
  xmlhttp.send();
}

function salseOffline(amount) {
  var datas = new FormData();
  datas.append('amount', amount);
  datas.append('csrf',$('#cardView #csrf').val());
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          lacation.href = "/";
      }
  };
  xmlhttp.open("post", "/Trans/LinePaySalse", true);
  xmlhttp.send(datas);
}