$(function () {
    let isAnimating = false;
    let isMouseInside = false;

    const $banner = $('#center .content>.top .top_banner');
    const $left = $('#center .content>.top>.left');
    const $right = $('#center .content>.top>.right');
    const $cursor = $banner.find('.cursor');

    $banner.on('click', function () {
        if (isAnimating) return;
        isAnimating = true;

        // 클릭 시 cursor 숨기기
        $cursor.css('display', 'none');

        $left.css('padding-top', '760px');
        $right.css('padding-top', '760px');

        $(this).css({
            'top': '0',
            'left': '0',
            'position': 'absolute',
            'width': '100%',
            'height': 'inherit'
        });

        $(this).find('.cover').css('display', 'none');
        $(this).find('.action').css({
            'display': 'block',
            'height': '0',
            'transition': 'height 1s ease-in-out'
        });

        setTimeout(() => {
            $(this).find('.action').css('height', '720px');
        }, 10);
    });

    // 마우스 진입 여부 추적
    $banner.on('mouseenter', function () {
        isMouseInside = true;

        // 호버 중일 때 cursor 표시
        if (!isAnimating) {
            $cursor.css('display', 'block');
        }
    });

    $banner.on('mouseleave', function () {
        isMouseInside = false;

        // 호버 벗어나면 cursor 숨기기
        $cursor.css('display', 'none');

        // 애니메이션이 끝났을 때만 초기화
        if (!isAnimating) {
            resetBanner($(this));
        }
    });

    // transition 완료 시점 처리
    $banner.find('.action').on('transitionend', function () {
        isAnimating = false;

        // transition 끝났는데 마우스가 밖에 있으면 초기화
        if (!isMouseInside) {
            resetBanner($banner);
        }
    });

    function resetBanner($target) {
        $left.css('padding-top', '0');
        $right.css('padding-top', '0');

        $target.css({
            'top': '',
            'left': '',
            'position': '',
            'width': '',
            'height': ''
        });

        $target.find('.cover').css('display', 'block');
        $target.find('.action').css({
            'display': 'none',
            'height': '0',
            'transition': ''
        });

        // 리셋 시 cursor도 숨김
        $target.find('.cursor').css('display', 'none');
    }

    $banner.on('mousemove', function (e) {
        if (isAnimating) return;

        const offset = $banner.offset();
        const x = e.pageX - offset.left;
        const y = e.pageY - offset.top;

        $cursor.css({
            'position': 'absolute',
            'left': x + 'px',
            'top': y + 'px',
            'transform': 'translate(-50%, -50%)', // 가운데 정렬
            'pointer-events': 'none' // 커서에 마우스 이벤트 안 걸리게
        });
    });
});
