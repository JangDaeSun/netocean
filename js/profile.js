$(function(){
    function gbar(){
        $("#profile .skill .pbox > div").find(".gbar").each(function() {
            var classList = $(this).attr("class").split(/\s+/);
            var widthPercent = "0%";
            
            classList.forEach(function(cls) {
                if (/^g\d+$/.test(cls)) {
                    widthPercent = cls.substring(1) + "%";
                }
            });

            $(this).stop().animate({
                width: widthPercent
            });
        });
    }
    
    $("#profile .skill .menu li").click(function(){
        $(this).addClass("on").removeClass("off") // 클릭한 요소는 on
        .siblings().removeClass("on").addClass("off"); // 나머지는 off

        // 클릭한 li의 인덱스를 가져옴
        var index = $(this).index();

        // 같은 인덱스의 pbox div에 on 클래스 설정, 나머지는 off
        $("#profile .skill .pbox > div").each(function(i) {
            if (i === index) {
                $(this).addClass("on").removeClass("off");
                $(this).find(".gbar").css({
                    width:"0%"
                })
                gbar()
            } else {
                $(this).removeClass("on").addClass("off");
            }
        });
    })

    $("#profile .content>.left .list li p").click(function() {
    let $profile = $(this).parent("li");
    let index = $profile.index(); // li의 index 구하기
    console.log($profile)
    console.log(index)

    // 클릭한 li에 on 클래스 부여, 나머지는 off
    $profile.addClass("on").removeClass("off")
        .siblings().removeClass("on").addClass("off");

    // 해당 인덱스에 맞는 .right 안의 div를 on, 나머지는 off
    $("#profile .content>.right>div").each(function(i) {
        if (i === index) {
            $(this).addClass("on").removeClass("off");
        } else {
            $(this).removeClass("on").addClass("off");
        }
    });
});

    $(document).ready(function() {
        gbar();
    });
})