document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 36; // ボードのタイル数
    let playerPosition = 0;

    // サイコロを振る
    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    // サイコロの画像を更新
    function updateDiceImage(dice) {
        document.getElementById('dice-image').src = `dice${dice}.png`;
    }

    // ゲームの状態を更新
    function updateGame(dice) {
        playerPosition += dice;

        if (playerPosition >= boardSize - 1) {
            playerPosition = boardSize - 1; // プレイヤーの位置をゴール位置に固定
            alert('ゴール！ゲーム終了！');
        }

        document.getElementById('dice-result').textContent = `Dice: ${dice}`;
        document.getElementById('player-position').textContent = `Position: ${playerPosition}`;
        updateDiceImage(dice); // サイコロの画像を更新
        updateBoard();
    }

    // ボードの状態を更新
    function updateBoard() {
        for (let i = 0; i < boardSize; i++) {
            document.getElementById(`tile-${i}`).style.backgroundColor = '#fff';
        }
        document.getElementById(`tile-${playerPosition}`).style.backgroundColor = '#ff0000';
    }

    // ゲームをリセット
    function resetGame() {
        playerPosition = 0;
        document.getElementById('dice-result').textContent = 'Dice: 0';
        document.getElementById('player-position').textContent = 'Position: 0';
        updateDiceImage(1); // 初期状態のサイコロ画像を表示
        updateBoard();
    }

    document.getElementById('roll-dice').addEventListener('click', () => {
        const dice = rollDice();
        updateGame(dice);
    });

    document.getElementById('reset-game').addEventListener('click', resetGame); // リセットボタンのイベントリスナーを追加

    updateBoard(); // 初期状態のボードを描画
});
const image = document.getElementById("map");
const coordinates = document.getElementById("coordinates");

image.addEventListener("click", function(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    coordinates.textContent = `X: ${x}, Y: ${y}`;
});

