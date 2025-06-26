$(document).ready(function () {
    const apiKey = "fcdd7eb1d27374a945b48cb26d38e75f";

    // [추가] 영문 → 한글 지명 매핑 함수
    function toKoreanLocation(name) {
        const locationMap = {
            "Kwanghŭi-dong": "광희동",
            "Jongno-gu": "종로구",
            "Jung-gu": "중구",
            "Yongsan-gu": "용산구",
            "Seongdong-gu": "성동구",
            "Gwangjin-gu": "광진구",
            "Dongdaemun-gu": "동대문구",
            "Jungnang-gu": "중랑구",
            "Seongbuk-gu": "성북구",
            "Gangbuk-gu": "강북구",
            "Dobong-gu": "도봉구",
            "Nowon-gu": "노원구",
            "Eunpyeong-gu": "은평구",
            "Seodaemun-gu": "서대문구",
            "Mapo-gu": "마포구",
            "Yangcheon-gu": "양천구",
            "Gangseo-gu": "강서구",
            "Guro-gu": "구로구",
            "Geumcheon-gu": "금천구",
            "Yeongdeungpo-gu": "영등포구",
            "Dongjak-gu": "동작구",
            "Gwanak-gu": "관악구",
            "Seocho-gu": "서초구",
            "Gangnam-gu": "강남구",
            "Songpa-gu": "송파구",
            "Gangdong-gu": "강동구",
            "Seoul": "서울",
            // 여기에 계속 추가하시면 됩니다
        };
        return locationMap[name] || name; // 없으면 원래 이름 반환
    }

    function getForecast(lat, lon, locateName) {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;

        $.getJSON(forecastUrl, function (data) {
            const days = {};

            data.list.forEach(item => {
                const date = new Date(item.dt_txt);
                const day = date.toISOString().split('T')[0];
                const hour = date.getHours();

                if (!days[day] && (hour === 12 || hour === 15)) {
                    days[day] = {
                        temp: item.main.temp.toFixed(1),
                        desc: item.weather[0].description,
                        icon: item.weather[0].icon,
                        date: `${(date.getMonth() + 1).toString().padStart(2, '0')} / ${date.getDate().toString().padStart(2, '0')}`
                    };
                }
            });

            const dayKeys = Object.keys(days);
            const todayInfo = days[dayKeys[0]];

            let html = `
            <div class="wbox">
                <div class="locate">${locateName}</div>
                <div class="weather-info today">
                    <img src="https://openweathermap.org/img/wn/${todayInfo.icon}@2x.png" alt="${todayInfo.desc}">
                    <ul>
                        <li class="temp">${todayInfo.temp}℃</li>
                        <li class="winfo">${todayInfo.desc}</li>
                        <li class="date">${todayInfo.date}</li>
                    </ul>
                </div>
                <div class="next">
            `;

            for (let i = 1; i <= 4 && i < dayKeys.length; i++) {
                const info = days[dayKeys[i]];
                html += `
                <div class="weather-info">
                    <img src="https://openweathermap.org/img/wn/${info.icon}@2x.png" alt="${info.desc}">
                    <ul>
                        <li class="temp">${info.temp}℃</li>
                        <li class="date">${info.date}</li>
                    </ul>
                </div>`;
            }

            html += `</div></div>`;
            $('#weather-box').html(html);
        }).fail(function () {
            $('#weather-box').html('날씨 정보를 불러올 수 없습니다.');
        });
    }

    function getWeatherByCoords(lat, lon) {
        const geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;
        $.getJSON(geoUrl, function (geoData) {
            const rawName = geoData.name || "내 위치";
            const locateName = toKoreanLocation(rawName); // [변경] 한글 매핑
            getForecast(lat, lon, locateName);
        }).fail(function () {
            getForecast(lat, lon, "내 위치");
        });
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoords(lat, lon);
        }, function () {
            getForecast(37.5665, 126.9780, "서울");
        });
    } else {
        getForecast(37.5665, 126.9780, "서울");
    }
});
