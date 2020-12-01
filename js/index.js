$('body').ready(function () {
    $('.body-list__item').click(function () {
        $('.popup').removeClass('popup_show');
        $('#commodity').addClass('popup_show');
    })

    // $('.commodity-pay__item').click(function () {
    //     $('.popup').removeClass('popup_show');
    //     $('#pay').addClass('popup_show');
    // })

    $('#payCancel').click(function () {
        $('.popup').removeClass('popup_show');
    })

    $('#commodityCancel').click(function () {
        $('.popup').removeClass('popup_show');
    })

    $('#close').click(function() {
        ('.popup').removeClass('popup_show');
    })
})






