// 出発点選択ページ用：出発点の選択処理
function setupDeparturePage(departureData) {
  const departureSelect = document.getElementById("departure");
  const departureInfo = document.getElementById("departure_info");

  departureSelect.addEventListener("change", () => {
    const selectedValue = departureSelect.value;
    if (!selectedValue) {
      departureInfo.innerHTML = "<p>出発点を選択してください。</p>";
      departureInfo.classList.remove("loaded");
      return;
    }

    const selectedData = departureData[selectedValue];
    if (selectedData) {
      departureInfo.innerHTML = `
        <p>${selectedData.content}</p>
        <img src="${selectedData.image}" alt="${selectedValue}の画像" style="max-width: 100%;">
        <p><a href="${selectedData.link}" target="_blank">詳細を見る</a></p>
      `;
      departureInfo.classList.add("loaded");
    }
  });
}
// 行き先選択ページ用：行き先の選択処理
function setupDestinationPage(destinationData) {
  const destinationSelect = document.getElementById("destination");
  const destinationInfo = document.getElementById("destination_info");

  destinationSelect.addEventListener("change", () => {
    const selectedValue = destinationSelect.value;
    if (!selectedValue) {
      destinationInfo.innerHTML = "<p>行き先を選択してください。</p>";
      destinationInfo.classList.remove("loaded");
      return;
    }

    const selectedData = destinationData[selectedValue];
    if (selectedData) {
      destinationInfo.innerHTML = `
        <p>${selectedData.content}</p>
        <img src="${selectedData.image}" alt="${selectedValue}の画像" style="max-width: 100%;">
        <p><a href="${selectedData.link}" target="_blank">詳細を見る</a></p>
      `;
      destinationInfo.classList.add("loaded");
    }
  });
}

// 共通：ゲーム開始ボタンの設定
function setupStartGameButton(departureData, destinationData) {
  const startGameButton = document.getElementById("startGameButton");
  const departureSelect = document.getElementById("departure");
  const destinationSelect = document.getElementById("destination");

  function startGame() {
    const departureValue = departureSelect.value;
    const destinationValue = destinationSelect.value;

    if (departureValue && destinationValue) {
      const departureInfo = departureData[departureValue];
      const destinationInfo = destinationData[destinationValue];

      const departureNumber = departureInfo.number;
      const destinationNumber = destinationInfo.number;
      const totalNumber = (departureInfo.number || 0) + (destinationInfo.number || 0);

      const url = `routes/route.html?departure=${encodeURIComponent(departureValue)}&destination=${encodeURIComponent(destinationValue)}&departureNumber=${departureNumber}&destinationNumber=${destinationNumber}&total=${totalNumber}`;
      window.location.href = url;
    } else {
      alert("出発点と行き先を選択してください。");
    }
  }

  function checkSelection() {
    startGameButton.style.display = (departureSelect.value && destinationSelect.value) ? "block" : "none";
  }

  departureSelect?.addEventListener("change", checkSelection);
  destinationSelect?.addEventListener("change", checkSelection);
  startGameButton?.addEventListener("click", startGame);
  startGameButton.style.display = "none";
}
