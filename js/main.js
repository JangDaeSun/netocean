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

    function slideNews() {
        var $ul = $("#center .content>.top .news .head .info ul");

        $ul.animate({ top: "-100%" }, 750, function() {
            var $firstLi = $ul.children("li").first();
            $ul.append($firstLi);
            $ul.css("top", "0");
        });
    }

    // 최초 3초 뒤에 시작하고 이후에도 3.75초 간격으로 반복
    setTimeout(function() {
        slideNews();
        setInterval(slideNews, 3750); // 3초 대기 + 0.75초 애니메이션 시간 포함
    }, 3000);
})