$(function(){
    // 상태 저장용 플래그
    let isOpen = false;

    // 메뉴 클릭
    $("#top .content .menu").click(function(event){
        event.stopPropagation(); // 버블링 막기

        if (isOpen) {
            $("#top .content .left .alist").css("display", "none");
            isOpen = false;
        } else {
            $("#top .content .left .alist").css("display", "block");
            isOpen = true;
        }
    });

    // .alist 내부 클릭 시 닫히지 않게
    $("#top .content .left .alist").click(function(event){
        event.stopPropagation();
    });

    // 바깥 클릭 시 닫기
    $(document).click(function(){
        if (isOpen) {
            $("#top .content .left .alist").css("display", "none");
            isOpen = false;
        }
    });
});
