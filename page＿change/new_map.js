const map = document.getElementById('map');
window.onload = function() {
    // DOMが完全に読み込まれてからスクリプトを実行するようにします
document.addEventListener('DOMContentLoaded', function() {
    if (map) {
        adjustImageMap(); // 画像がすでに読み込まれている場合
    } else {
        console.error('map element is not found');
    }
});
};

let resizeTimer;
// window.onresize = function() {
//     clearTimeout(resizeTimer);
//     resizeTimer = setTimeout(adjustImageMap, 200); // 200ms後にadjustImageMapを呼び出し
// };
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);  // 既存のタイマーをクリア
    resizeTimer = setTimeout(function() {
        // リサイズ後に実行する処理をここに記述
        adjustImageMap();  // 例: adjustImageMap関数を呼び出し
    }, 200);  // 200ミリ秒待ってから実行
});

function adjustImageMap() {
    var img = document.getElementById('map');
    var map = document.querySelector('#image-map'); // mapの取得方法を修正
    var areas = map.getElementsByTagName('area');

    // 元の画像の幅と高さを動的に取得
    var originalWidth = img.naturalWidth;
    var originalHeight = img.naturalHeight;

    // 現在の画像の幅と高さを取得
    var currentWidth = img.offsetWidth;
    var currentHeight = img.offsetHeight;

    // 幅と高さの比率を計算
    var widthRatio = currentWidth / originalWidth;
    var heightRatio = currentHeight / originalHeight;

    // 全てのareaタグのcoordsを更新
    for (var i = 0; i < areas.length; i++) {
        if (areas[i].coords) { // coordsが空でないか確認
            var coords = areas[i].coords.split(',').map(Number);
            for (var j = 0; j < coords.length; j += 2) {
                // X座標をwidthRatioで、Y座標をheightRatioで掛ける
                coords[j] = Math.round(coords[j] * widthRatio);
                coords[j + 1] = Math.round(coords[j + 1] * heightRatio);
            }
            areas[i].coords = coords.join(',');
        }
    }
}
