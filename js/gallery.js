$(function () {
    // 상단 탭 클릭 시 on/off 전환 + 내용 전환
    $('#gallery .left ul li').click(function () {
        $('#gallery .left ul li').removeClass('on').addClass('off');
        $(this).removeClass('off').addClass('on');

        const index = $(this).index();
        const rightBoxes = $('#gallery .right > div');

        rightBoxes.removeClass('on').addClass('off');
        rightBoxes.eq(index).removeClass('off').addClass('on');
    });

    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');     // 예: 're'
    const view = params.get('view');   // 예: 'design'

    if (view === 'design') {
        // 디자인 탭 열기
        $('.left ul li').removeClass('on').addClass('off');
        $('.left ul li[data-tab="design"]').removeClass('off').addClass('on');
        $('.design').removeClass('off').addClass('on');
        $('.publishing').removeClass('on').addClass('off');

        // 디자인 안쪽 메뉴 처리
        if (tab) {
            $('.design .menu li').removeClass('on').addClass('off');
            $('.design .menu li[data-tab="' + tab + '"]').removeClass('off').addClass('on');

            $('.design .box').removeClass('on').addClass('off');
            $('.design .box.' + tab).removeClass('off').addClass('on');
        }
    } else if (tab) {
        // 퍼블리싱 탭 열기 (기존 로직)
        $('.left ul li').removeClass('on').addClass('off');
        $('.left ul li[data-tab="publishing"]').removeClass('off').addClass('on');
        $('.publishing').removeClass('off').addClass('on');
        $('.design').removeClass('on').addClass('off');

        $('.publishing .menu li').removeClass('on').addClass('off');
        $('.publishing .menu li[data-tab="' + tab + '"]').removeClass('off').addClass('on');

        $('.publishing .box').removeClass('on').addClass('off');
        $('.publishing .box.' + tab).removeClass('off').addClass('on');
    }

    // 깜빡임 방지용
    $('body').css('visibility', 'visible');
});
