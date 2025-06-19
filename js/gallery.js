$(function () {
    // 상단 탭 클릭 시 on/off 전환 + 내용 전환
    $('#gallery .left ul li').click(function () {
        // 왼쪽 메뉴 on/off 설정
        $('#gallery .left ul li').removeClass('on').addClass('off');
        $(this).removeClass('off').addClass('on');

        // 인덱스 기반으로 오른쪽 .right 하위 .publishing / .design 전환
        const index = $(this).index();
        const rightBoxes = $('#gallery .right > div');

        rightBoxes.removeClass('on').addClass('off');
        rightBoxes.eq(index).removeClass('off').addClass('on');
    });
});