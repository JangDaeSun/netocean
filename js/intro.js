$(function() {
    const $backgroundBoxes = $('#intro .background .box');
    const $upBoxes = $('#intro .up .box');
    const total = $backgroundBoxes.length;

    // ✅ 화면 높이 동적 처리
    const windowHeight = window.innerHeight;

    function animateBox(i) {
        if (i >= total) {
            animateTitle(); // 슬라이드 다 끝나면 타이틀 애니메이션 실행
            return;
        }

        const $bgBox = $backgroundBoxes.eq(i);
        const $upBox = $upBoxes.eq(i);
        const $img = $bgBox.find('img');

        const imgHeight = $img.height();
        const moveAmount = -(imgHeight - windowHeight); // 화면 높이 기반

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
                animateTitle(); // 마지막 안전 실행
            }
        });
    }

    animateBox(0);

    function animateTitle() {
        const $titles = $('#intro .title > div');
        const $title = $titles.eq(0);

        // 트랜지션 끝나면
        $title.on('transitionend', function() {
            // ✅ 페이드 아웃 1초
            $('#intro').fadeOut(1000, function() {
                // 페이드 아웃 끝난 후 display none 보장
                $(this).css('display', 'none');

                // ✅ html, body overflow 초기화
                $('html, body').css('overflow', '');

                // ✅ 스크롤바 숨김 스타일 제거
                $('#hide-scrollbar').remove();
            });

            // 리스너 해제
            $title.off('transitionend');
        });

        // 타이틀 트랜지션 시작
        $title.css({
            transition: '2s ease',
            scale: '1',
            fontSize: '128px'
        });
    }
});