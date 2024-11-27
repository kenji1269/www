window.onload = function() {
    console.log('window.onload called');
    adjustImageMap(); // 初期ロード時に調整

//     // 出発点の選択肢にイベントリスナーを追加
//     const areaS = document.getElementById('area_s');
//     console.log(areaS);
//     if (areaS) {
//         areaS.addEventListener('change', function(event){
//             console.log('出発点が変更されました');
//             updateHighlightCircle(event, 'highlight-circle-start');
//         });
//     } else {
//         console.log('area_s not found');
//     }

//     // 行き先の選択肢にイベントリスナーを追加
//     const areaF = document.getElementById('area_f');
//     console.log(areaF);
//     if (areaF) {
//         areaF.addEventListener('change', function(event){
//             console.log('行き先が変更されました');
//             updateHighlightCircle(event, 'highlight-circle-end');
//         });
//     } else {
//         console.log('area_f not found');
//     }
//     console.log(highlightStart ? 'highlight-circle-start exists' : 'highlight-circle-start not found');
//     console.log(highlightEnd ? 'highlight-circle-end exists' : 'highlight-circle-end not found');
};

window.onresize = function() {
    console.log('window.onresize, called');
    adjustImageMap(); // ウィンドウサイズが変わるたびに調整
}

function adjustImageMap() {
    console.log('adjustImageMap called');
    var img = document.getElementById('map');
    var map = document.getElementsByName('image-map')[0];
    var areas = map.getElementsByTagName('area');

    // 元の画像の幅と高さを動的に取得
    var originalWidth = img.naturalWidth;  // 画像の元の幅
    var originalHeight = img.naturalHeight;  // 画像の元の高さ

    // 現在の画像の幅と高さを取得
    var currentWidth = img.offsetWidth;
    var currentHeight = img.offsetHeight;

    // 幅と高さの比率を計算
    var widthRatio = currentWidth / originalWidth;
    var heightRatio = currentHeight / originalHeight;

    // 全てのareaタグのcoordsを更新
    for (var i = 0; i < areas.length; i++) {
        var coords = areas[i].coords.split(',').map(Number);
        if (areas[i].shape === 'circle') {
            // "center-x,center-y,radius" 形式に変換
            coords[0] = Math.round(coords[0] * widthRatio); // center-x
            coords[1] = Math.round(coords[1] * heightRatio); // center-y
            coords[2] = Math.round(coords[2] * Math.min(widthRatio, heightRatio)); // radius
        } else {
            for (var j = 0; j < coords.length; j += 2) {
                // X座標をwidthRatioで、Y座標をheightRatioで掛ける
                coords[j] = Math.round(coords[j] * widthRatio);
                coords[j + 1] = Math.round(coords[j + 1] * heightRatio);
            }
        }
        areas[i].coords = coords.join(',');
    }
}
function getScaleFactors() {
    console.log('getScaleFactors called');
    const map = document.getElementById('map');
    const mapRect = map.getBoundingClientRect(); // 実際のマップのサイズを取得

    const originalWidth = 1920;  // マップの元の幅（例として1920pxと仮定）
    const originalHeight = 1080; // マップの元の高さ（例として1080pxと仮定）
    const scaleX = mapRect.width / originalWidth; // スケール計算
    const scaleY = mapRect.height / originalHeight; // スケール計算

    console.log(`scaleX: ${scaleX}, scaleY: ${scaleY}`);
    return { scaleX, scaleY };
}
function updateHighlightCircle(event, highlightCircleId) {
    console.log('updateHighlightCircle called');
    const selectedOption = event.target.options[event.target.selectedIndex];
    const coords = selectedOption.getAttribute('data-coords');

    if (coords) {
        // 座標の形式 "x,y,r" を分解
        const [x, y, r] = coords.split(',').map(Number);
        console.log(`coords: x=${x}, y=${y}, r=${r}`);
        
        // ハイライト用の円を表示
        const highlightCircle = document.getElementById(highlightCircleId); 
        const { scaleX, scaleY } = getScaleFactors();
        console.log(`scaleX: ${scaleX}, scaleY: ${scaleY}`);
        
        highlightCircle.style.left = `${(x * scaleX) - (r * scaleX)}px`;  // 新しい左位置
        highlightCircle.style.top = `${(y * scaleY) - (r * scaleY)}px`;   // 新しい上位置
        highlightCircle.style.width = `${(r * 2 * scaleX)}px`; // 新しい幅
        highlightCircle.style.height = `${(r * 2 * scaleY)}px`; // 新しい高さ
        highlightCircle.style.display = 'block'; // 円を表示

        console.log(`highlightCircle.style.left: ${highlightCircle.style.left}`);
        console.log(`highlightCircle.style.top: ${highlightCircle.style.top}`);
        console.log(`highlightCircle.style.width: ${highlightCircle.style.width}`);
        console.log(`highlightCircle.style.height: ${highlightCircle.style.height}`);
    }
}


