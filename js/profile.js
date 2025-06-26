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
        $(this).addClass("on").removeClass("off")
        .siblings().removeClass("on").addClass("off");

        var index = $(this).index();

        $("#profile .skill .pbox > div").each(function(i) {
            if (i === index) {
                $(this).addClass("on").removeClass("off");
                $(this).find(".gbar").css({
                    width:"0%"
                })
                gbar();
            } else {
                $(this).removeClass("on").addClass("off");
            }
        });
    });

    $("#profile .content>.left .list li p").click(function() {
        var $profile = $(this).parent("li");
        var index = $profile.index();

        $profile.addClass("on").removeClass("off")
            .siblings().removeClass("on").addClass("off");

        $("#profile .content>.right>div").each(function(i) {
            if (i === index) {
                $(this).addClass("on").removeClass("off");
            } else {
                $(this).removeClass("on").addClass("off");
            }
        });
    });

    // 링크 연결 관리
    function getQueryParam(name) {
        var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : null;
    }

    function activateTabFromURL() {
        var tab = getQueryParam("tab");

        if (tab) {
            $("#profile .content>.left .list li").each(function(index) {
                if ($(this).data("tab") === tab) {
                    $(this).addClass("on").removeClass("off")
                        .siblings().removeClass("on").addClass("off");

                    $("#profile .content>.right>div").each(function(i) {
                        if (i === index) {
                            $(this).addClass("on").removeClass("off");
                        } else {
                            $(this).removeClass("on").addClass("off");
                        }
                    });

                    return false; // each 루프 중단
                }
            });
        }
    }

    $(document).ready(function() {
        gbar();
        activateTabFromURL(); // 추가한 함수 실행
        // 깜빡임 방지용
        $('body').css('visibility', 'visible');
    });

});
