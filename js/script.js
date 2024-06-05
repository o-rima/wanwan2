
/// スタートボタンを取得
const startButton = document.getElementById('startButton');
// スタートボタンがクリックされたときの処理
startButton.addEventListener('click', function() {
// タップされた時点の現在時刻を開始時間として設定
startTime = new Date();
startTimer(); // タイマー開始
    
// 子画面を非表示にする
document.querySelector('.start-screen').style.display = 'none';
 // ページのメインコンテンツを表示する
document.getElementById('mainContent').classList.remove('hidden');
});
document.addEventListener('DOMContentLoaded', function() {
// ここにJavaScriptコードを配置
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', function() {
    // 以下の処理を実行
});
});
// 開始時間
let startTime;
// 経過秒数用 タイマーID
let timer;
// カードめくり用 タイマーID(動作中はカードがめくれないように)
let backTimer;
// 1枚目かどうかのフラグ(1枚目: true 2枚目: false)
let flgFirst = true;
// 1枚目のカードを格納
let cardFirst;
// そろえた枚数(ペアができるたびに+1 10ペアで終了)
let countUnit = 0;
let img_arr = [
    "img/dog0.jpg", "img/dog1.jpg",
    "img/dog2.jpg", "img/dog3.jpg",
    "img/dog4.jpg", "img/dog5.jpg",
    "img/dog6.jpg", "img/dog7.jpg",
    "img/dog8.jpg", "img/dog9.jpg",
];
let img_tag_arr = [];
for (let i = 0; i < 10; i++ ){
img_tag_arr.push("<img src='" + img_arr[i] + "'>");
}
window.onload = function () {
let arr = [];
for (let i = 0; i < 10; i++) {
    arr.push(i);
    arr.push(i);
}  //[0,0,1,1,2,2,...........8,8,9,9] 合計20の要素
shuffle(arr);// シャッフル [1,7,3,4,4,5......]
let game_board = document.getElementById('game_board');
// div要素作成(カード)
for (i = 0; i < 20; i++) {
    let div = document.createElement('div');
    div.className = 'card back'; //カードの裏側を表示
    div.number = arr[i]; //プロパティを設定
    //console.log(Object.keys(div));
    //console.log(Object.values(div));
    div.onclick = turn;
    game_board.appendChild(div);
}
}
//シャッフル用関数
function shuffle(arr) {
let n = arr.length;
while (n) { //nが0になったら終了      ここで毎回-1
    i = Math.floor(Math.random() * n--);
    [arr[n], arr[i]] = [arr[i], arr[n]]
}
return arr;
}
// カードクリック時の処理
function turn(e) {
let div = e.target; //クリックしたカード
// カードのタイマー処理が動作中は return
if (backTimer) return; //連続で押せないように
// 裏向きのカードをクリックした場合は画像を表示する
if (div.innerHTML == '') {
    div.className = 'card'; //backというクラス名を取り除いた
    div.innerHTML = img_tag_arr[div.number];
} else {
    return // 数字が表示されているカードは return
}
if (flgFirst) { // 1枚目の処理 一枚目ならtrue
    cardFirst = div;  //最初にクリックしたカード
    flgFirst = false; //次は２枚目だから
} else { // ２枚目の処理
    if (cardFirst.number == div.number) {
        countUnit++; //揃ったペアの数
        backTimer = setTimeout(function () {
            div.className = 'card finish'; //0.5秒で透明
            cardFirst.className = 'card finish';
            backTimer = NaN;
            if (countUnit == 10) { //すべてカードが揃ったら
                clearInterval(timer);  // timer終了

// タイマーが停止したらreload-screenを表示する
document.querySelector('.reload-screen').style.display = 'block';
                //setInterval(showSecond, 1000)
            }
        }, 500)
    } else {
        backTimer = setTimeout(function () {
            div.className = 'card back';
            div.innerHTML = ''; // カードを裏側に戻す
            cardFirst.className = 'card back';
            cardFirst.innerHTML = '';
            cardFirst = null;
            backTimer = NaN;
        }, 500);
    }
    flgFirst = true;
}
}
// タイマー開始
function startTimer() {
timer = setInterval(showSecond, 1000);
}
        // 秒数表示関数
function showSecond() {
    let nowTime = new Date();
    let elapsedTime = Math.floor((nowTime - startTime) / 1000);
    let str = '⏱Elapsed Time: ' + elapsedTime + 's';
    let re = document.getElementById('result');
    re.innerHTML = str;

    // 数字をローカルストレージに保存
    localStorage.setItem('Time2', elapsedTime);
}
$(function(){
    // ページ読み込み時にローカルストレージからTime1のキーに保存された数字を取得して表示
    var Time1 = localStorage.getItem('Time1');
    if (Time1 !== null) {
        $('#countboard').text('🔥Previous Score：' + Time1 +'s');
    }

// ボタンクリック時にローカルストレージからTime2のキーに保存された数字を取得して表示
$('#reloadButton').click(function(){
        var Time2 = localStorage.getItem('Time2');    

//Time2の値をTime1に更新
localStorage.setItem('Time1', Time2);

});
});



