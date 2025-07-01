$(function() {
    // ✅ 쿼리 파라미터 확인
    const params = new URLSearchParams(window.location.search);
    const introOff = params.get('intro');

    if (introOff === 'off') {
        $('html, body').css('overflow', '');
        $('#hide-scrollbar').remove();
        $('#intro').remove();
        return;
    }

    // ✅ 이미지 미리 로드 함수
    function preloadImages($images) {
        const promises = [];
        $images.each(function() {
            const img = new Image();
            const src = $(this).attr('src');
            const promise = new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve; // 에러여도 resolve 해주기
                img.src = src;
            });
            promises.push(promise);
        });
        return Promise.all(promises);
    }

    // ✅ intro.js 원래 코드
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

    // ✅ 이미지 로딩 끝나면 시작
    const $allImages = $('#intro .background .box img');
    preloadImages($allImages).then(() => {
        console.log('✅ 모든 이미지 로딩 완료! 인트로 시작');
        animateBox(0);
    });
});
