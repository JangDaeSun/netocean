$(function () {
    var $ul = $("#center .content>.top .news .head .info ul");
    var intervalId;
    var initialTimeoutId;
    var isExpanded = false;

    function slideNews() {
        $ul.stop().animate({ top: "-100%" }, 750, function () {
            var $firstLi = $ul.children("li").first();
            $ul.append($firstLi);
            $ul.css("top", "0");
        });
    }

    function startSliding() {
        intervalId = setInterval(slideNews, 3750);
    }

    function stopSliding() {
        clearInterval(intervalId);
        $ul.stop(true, true).css("top", "0");
    }

    // 최초 시작 예약
    initialTimeoutId = setTimeout(function () {
        slideNews();
        startSliding();
    }, 3000);

    $(".menu").on("click", function (e) {
        e.stopPropagation();

        if (!isExpanded) {
            clearTimeout(initialTimeoutId); // 초기 예약된 슬라이딩도 제거
            stopSliding(); // 주기 슬라이딩도 제거

            var $head = $("#center .content>.top .news .head");

            $head.css({ overflow: "initial", padding: "0" });
            $head.find(".title").hide();
            $head.find(".menu").css({
                position: "absolute",
                "margin-right": "0",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)"
            });
            $head.find(".info").css({
                width: "100%",
                "margin-right": "0",
                "margin-left": "0",
                "line-height": "57px"
            });
            $ul.css({
                background: "#D9D9D9",
                "padding-left": "20px",
                "border-radius": "20px"
            });

            $ul.find("li").css("font-weight", "bold");

            isExpanded = true;
        } else {
            restoreState();
        }
    });

    $(document).on("click", function () {
        if (isExpanded) {
            restoreState();
        }
    });

    function restoreState() {
        var $head = $("#center .content>.top .news .head");

        $head.css({ overflow: "", padding: "" });
        $head.find(".title").show();
        $head.find(".menu").css({
            position: "",
            "margin-right": "",
            right: "",
            top: "",
            transform: ""
        });
        $head.find(".info").css({
            width: "",
            "margin-right": "",
            "margin-left": "",
            "line-height": ""
        });
        $ul.css({
            background: "",
            "padding-left": "",
            "border-radius": ""
        });

        $ul.find("li").css("font-weight", "");

        slideNews();
        startSliding();
        isExpanded = false;
    }
});
