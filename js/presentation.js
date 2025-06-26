$(function () {
    $('.cbbox').on('click', function () {
        // 클릭한 요소 외 모든 cbbox는 바로 숨기기 (display:none)
        $('.cbbox').not(this).hide();

        // 클릭한 cbbox는 슬라이드 다운으로 보여주기
        $(this).hide().css('width','100%').slideDown();

        // 내부 요소 조작
        $(this).find('.image, .title, .info').hide();
        $(this).find('.scroll').css('display', 'block');
        $(this).find('.back').css('display', 'block');
    });

    $('.scroll').on('click', function(e) {
        // scroll 내부 클릭 시 부모 cbbox 클릭 이벤트 버블링 막기
        e.stopPropagation();
    });

    $('.scroll').on('click', '.sbox.on', function () {
        const $current = $(this);
        const $next = $current.next('.sbox.off');

        if ($next.length > 0) {
            $current.removeClass('on').addClass('off');
            $next.removeClass('off').addClass('on');
        }
    });

    $('.cbbox .back').on('click', function (e) {
        e.stopPropagation();

        const $cbbox = $(this).closest('.cbbox');
        $cbbox.css('width', '32%');

        $cbbox.find('.image, .title, .info').show();
        $cbbox.find('.scroll, .back').hide();

        // sbox 상태 초기화
        const $sboxes = $cbbox.find('.sbox');
        $sboxes.removeClass('on').addClass('off');
        $sboxes.first().removeClass('off').addClass('on');

        // 숨겨졌던 다른 cbbox들은 바로 보이게
        $('.cbbox').show();
    });
});
