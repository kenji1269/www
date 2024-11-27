// hyouji_script.js

// 出発点と行き先のセレクトボックスを取得
const departureSelect = document.getElementById('departure');
const destinationSelect = document.getElementById('destination');

// 出発点の情報エリアの要素を取得
const departureInfo = document.getElementById('departure_info');

const departureLink = document.getElementById('departure_link');

// 行き先の情報エリアの要素を取得
const destinationInfo = document.getElementById('destination_info');

const destinationLink = document.getElementById('destination_link');

// 出発点のデータ
const departureData = {
  start1: {
    text: '詳細情報です。',
    image: 'images/八王子駅行.jpg', // 画像のパスを実際のファイルに変更
    link: 'info/hachioji.html'
  },
  start2: {
    text: '詳細情報です。',
    image: 'images/八王子南野駅.jpg',
    link: 'https://example.com/start2'
  }
};

// 行き先のデータ
const destinationData = {
  end1: {
    text: 'エンドポイント1の詳細情報です。',
    image: 'images/end1.jpg', // 画像のパスを実際のファイルに変更
    link: 'https://example.com/end1'
  },
  end2: {
    text: 'エンドポイント2の詳細情報です。',
    image: 'images/end2.jpg',
    link: 'https://example.com/end2'
  }
};

// 出発点が選択されたときの処理
departureSelect.addEventListener('change', function() {
  const selectedValue = this.value;
  if (departureData[selectedValue]) {
    departureInfo.innerHTML = `
      <p>${departureData[selectedValue].text}</p>
      <img src="${departureData[selectedValue].image}" alt="出発点の画像">
      <p><a href="${departureData[selectedValue].link}" target="_blank">出発点の詳細はこちら</a></p>
    `;
  } else {
    departureInfo.innerHTML = '<p>出発点を選択してください。</p>';
  }
});

// 行き先が選択されたときの処理
destinationSelect.addEventListener('change', function() {
  const selectedValue = this.value;
  if (destinationData[selectedValue]) {
    destinationInfo.innerHTML = `
      <p>${destinationData[selectedValue].text}</p>
      <img src="${destinationData[selectedValue].image}" alt="行き先の画像">
      <p><a href="${destinationData[selectedValue].link}" target="_blank">行き先の詳細はこちら</a></p>
    `;
  } else {
    destinationInfo.innerHTML = '<p>行き先を選択してください。</p>';
  }
});
