var arrIMG = ["plug/s1.png", "plug/s2.png", "plug/s3.png", "plug/s4.png"];
        var arrCAP = ["AAA", "BBB", "CCC", "DDD"];
        var n = 0;
        var repeatation = setInterval(IMGchangeRight, 2500);
        function IMGchangeRight() {
            clearInterval(repeatation);
            repeatation = setInterval(IMGchangeRight, 2500);
            n = (n + 1) % 4;
            document.getElementById("pluggy_img").src = arrIMG[n];
            document.getElementById("pluggy_cap").innerHTML = arrCAP[n];
        }
        function IMGchangeLeft() {
            clearInterval(repeatation);
            repeatation = setInterval(IMGchangeRight, 2500);
            if (n == 0)
                n = 3;
            else
                n = (n - 1) % 4;
            document.getElementById("pluggy_img").src = arrIMG[n];
            document.getElementById("pluggy_cap").innerHTML = arrCAP[n];
        }