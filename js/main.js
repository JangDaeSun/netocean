$(function(){
    $(".btitle .menu li").click(function(){
        $(this).addClass("on").removeClass("off") // 클릭한 요소는 on
        .siblings().removeClass("on").addClass("off"); // 나머지는 off

        // 클릭한 li의 인덱스를 가져옴
        var index = $(this).index();

        // 같은 인덱스의 pbox div에 on 클래스 설정, 나머지는 off
        $(this).parents(".btitle").parent("div").find(".box").each(function(i) {
            if (i === index) {
                $(this).addClass("on").removeClass("off");
            } else {
                $(this).removeClass("on").addClass("off");
            }
        });
    })
})