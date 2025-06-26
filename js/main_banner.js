$(function () {
    $('#center .content>.top').hover(
        function () {
            const $banner = $(this).find('.top_banner');

            // 슬라이드다운
            $banner.stop(true, true).slideDown(400, function () {
                // 슬라이드가 완료되면 position 등 스타일 적용
                $(this).css({
                    'top': '0',
                    'left': '0',
                    'position': 'absolute',
                    'width': '100%'
                });

                // padding-top 설정
                $('#center .content>.top>.left, #center .content>.top>.right').css('padding-top', '760px');

                // 내부 요소 조작
                $(this).find('.cover').css('display', 'none');
                $(this).find('.action').css('display', 'block');
            });
        },
        function () {
            const $banner = $(this).find('.top_banner');

            // 다시 접기 (원한다면)
            $banner.stop(true, true).slideUp(400, function () {
                // 복원 동작이 필요하면 여기에 추가
                $('#center .content>.top>.left, #center .content>.top>.right').css('padding-top', '');
                $(this).find('.cover').css('display', '');
                $(this).find('.action').css('display', 'none');
            });
        }
    );
});
