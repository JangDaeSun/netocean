$(function() {
    // ✅ 쿼리 파라미터 확인
    const params = new URLSearchParams(window.location.search);
    const introOff = params.get('intro');

    if (introOff === 'off') {
        // intro=off 이면 인트로 건너뛰고 바로 스크롤 가능하게
        $('html, body').css('overflow', '');
        $('#hide-scrollbar').remove();
        $('#intro').remove(); // 필요하다면 제거
        return; // intro 애니메이션 실행 안함
    }

    // ✅ 이하 원래 intro.js 코드 실행
    const $backgroundBoxes = $('#intro .background .box');
    const $upBoxes = $('#intro .up .box');
    const total = $backgroundBoxes.length;

    const windowHeight = window.innerHeight;

    function animateBox(i) {
        if (i >= total) {
        animateTitle();
        return;
        }

        const $bgBox = $backgroundBoxes.eq(i);
        const $upBox = $upBoxes.eq(i);
        const $img = $bgBox.find('img');

        const imgHeight = $img.height();
        const moveAmount = -(imgHeight - windowHeight);

        $bgBox.css({ top: 0, zIndex: 2 }).removeClass('off');

        const $nextBgBox = $backgroundBoxes.eq(i + 1);

        if ($nextBgBox.length) {
        const $nextImg = $nextBgBox.find('img');
        $nextBgBox.css({ top: '100%', zIndex: 1 }).removeClass('off');
        $nextBgBox.animate({ top: '0%' }, 1000);
        }

        $bgBox.animate({ top: moveAmount + 'px' }, 1000, function() {
        $upBox.removeClass('off');
        $bgBox.addClass('off').css({ top: 0, zIndex: '' });

        if ($nextBgBox.length) {
            animateBox(i + 1);
        } else {
            animateTitle();
        }
        });
    }

    animateBox(0);

    function animateTitle() {
        const $titles = $('#intro .title > div');
        const $title = $titles.eq(0);

        $title.on('transitionend', function() {
        $('#intro').fadeOut(1000, function() {
            $(this).css('display', 'none');
            $('html, body').css('overflow', '');
            $('#hide-scrollbar').remove();
        });
        $title.off('transitionend');
        });

        $title.css({
        transition: '2s ease',
        scale: '1',
        fontSize: '128px'
        });
    }
});
