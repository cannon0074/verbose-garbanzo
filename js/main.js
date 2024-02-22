//HTML要素取得
const starttxt = document.getElementById("start-txt");
const gametxt = document.getElementById("game-txt");
const notice = document.getElementById("notice-txt");
const card = document.getElementById("img-card");
const cardura = document.getElementById("img-card-ura");
const high = document.getElementById("choice-high");
const low = document.getElementById("choice-low");
const next = document.getElementById("nextgame");
const ai = document.getElementById("img-ai");

//ゲーム内テキスト
const txts = [
  "こんにちは。\n私とゲームをしましょう。",
  //0
  "ハイ&ローはご存じですか？\nルールは簡単です。",
  //1
  "私がカードを1枚引きます。\nあなたは次のカードの数字が、\n場のカードの数字より大きいか小さいかを選んでください。",
  //2
  "10回連続で当てればあなたの勝ちです。\n外した場合ははじめからです。\n罰などはありませんのでご安心ください。",
  //3
];
const gametxts = [
  "1回目。\nジョーカーは入っていません。",
  //0
  "2回目。\n罰はありませんがご褒美もありません。",
  //1
  "3回目。\nAと2が来たらチャンスですね。",
  //2
  "4回目。\n「はじめから」はカードもリセットされます。",
  //3
  "5回目。\n失敗しても何もしませんよ。何も。",
  //4
  "6回目。\nAと2が来たらチャンスですね。",
  "7回目。\nカウンティングは有効ですが必要ありませんよ。",
  "8回目。\n私はこのゲームは苦手です。",
  "9回目。\n6,7,8が来ると困りますよね。",
  "10回目。\n最後の勝負です。",
];

//カード定義
const ranks = [
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
];

const suits = ["spade", "club", "heart", "diamond"];

let deck = [];
cardindeck();
function cardindeck() {
  deck = [];
  // トランプのカードを生成して deck 配列に追加
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ suit, rank });
    }
  }
}

function drawCard() {
  if (deck.length === 0) {
    console.log("すべてのカードが引かれました。");
    return null; // カードがない場合は null を返す
  }
  // ランダムにカードを選択
  const randomCard = Math.floor(Math.random() * deck.length);
  const selectedCard = deck[randomCard];
  // 選択したカードを deck から削除
  deck.splice(randomCard, 1);
  return selectedCard;
}
//デッキからカードをランダムに引いて、引いたカードの値をselectedCardに入れる
//この関数が呼び出されたときにselectedCardの値を返す。

let fieldCard = drawCard();
let drawnCard = drawCard();
let savecard = drawnCard;
//カードをドローし、変数fieldCardにselectedCardの値を入れる

// console.log(fieldCard);
// console.log(drawnCard);
// console.log(savecard);

let txtno = 1;
let gametxtno = 0;

starttxt.innerHTML = txts[0].replace(/\n/g, "<br>");
//初期表示は配列の0を表示

starttxt.addEventListener("click", () => {
  //クリックしたらtxtのHTMLを配列のtxtno番目に書き換え
  if (txtno <= txts.length - 1) {
    starttxt.innerHTML = txts[txtno].replace(/\n/g, "<br>");
    //txts.lengthは5なので-1している
    txtno++;
  } else {
    starttxt.innerHTML = "";
    gametxt.innerHTML = "ではゲームスタートです。";
  }
});

gametxt.addEventListener("click", highandlow);

function highandlow(call) {
  starttxt.innerHTML = "";
  gametxt.innerHTML = gametxts[gametxtno].replace(/\n/g, "<br>");
  card.src = `img/card_${fieldCard.suit}_${fieldCard.rank}.png`;
  cardura.src = `img/card_back.png`;
  high.innerHTML = `high`;
  low.innerHTML = `low`;
  call();
}

function erase() {
  notice.innerHTML = "";
  next.innerHTML = "";
}

next.addEventListener("click", () => {
  aiimg();
  if (gametxtno > 9) {
    gametxt.innerHTML = "";
    high.innerHTML = ``;
    low.innerHTML = ``;
    card.src = ``;
    cardura.src = ``;
    ai.src = `img/ai_dance_character.png`;
    next.innerHTML = ``;
    notice.innerHTML =
      "10連続成功です！おめでとうございます！\n暇潰しくらいにはなったでしょうか？".replace(
        /\n/g,
        "<br>"
      );
  } else {
    fieldCard = savecard;
    highandlow(erase);
    drawnCard = drawCard();
    savecard = drawnCard;
    // console.log(`場のカードは${fieldCard.rank}`);
    // console.log(`引いたカードは${drawnCard.rank}`);
  }
});

high.addEventListener("click", () => {
  cardura.src = `img/card_${drawnCard.suit}_${drawnCard.rank}.png`;
  if (fieldCard.rank < drawnCard.rank) {
    selecthigh();
  } else if (fieldCard.rank > drawnCard.rank) {
    gameover();
  } else {
    rankdraw();
  }
});

low.addEventListener("click", () => {
  cardura.src = `img/card_${drawnCard.suit}_${drawnCard.rank}.png`;
  if (fieldCard.rank < drawnCard.rank) {
    gameover();
  } else if (fieldCard.rank > drawnCard.rank) {
    selectlow();
  } else {
    rankdraw();
  }
});

function selecthigh() {
  gametxt.innerHTML = "";
  high.innerHTML = ``;
  low.innerHTML = ``;
  notice.innerHTML = "おめでとうございます。\nhighです。".replace(
    /\n/g,
    "<br>"
  );
  next.innerHTML = "次のゲームへ";
  gametxtno++;
}

function selectlow() {
  gametxt.innerHTML = ``;
  high.innerHTML = ``;
  low.innerHTML = ``;
  notice.innerHTML = "おめでとうございます。\nlowです。".replace(/\n/g, "<br>");
  next.innerHTML = "次のゲームへ";
  gametxtno++;
}

function rankdraw() {
  fieldCard = savecard;
  drawnCard = drawCard();
  savecard = drawnCard;
  gametxt.innerHTML = ``;
  notice.innerHTML = "同じですね。\nもう一度選んでください。".replace(
    /\n/g,
    "<br>"
  );
}

function gameover() {
  gametxt.innerHTML = ``;
  high.innerHTML = ``;
  low.innerHTML = ``;
  notice.innerHTML = "残念。\nはずれです。".replace(/\n/g, "<br>");
  next.innerHTML = "はじめから";
  gametxtno = 0;
  cardindeck();
  fieldCard = drawCard();
  drawnCard = drawCard();
  savecard = drawnCard;
}

function aiimg() {
  if (gametxtno === 4) {
    ai.src = `img/ai_kanabou_buki.png`;
  } else if (gametxtno === 10) {
    ai.src = `img/ai_dance_character.png`;
  } else {
    ai.src = `img/ai_character.png`;
  }
}
// const text = "こんにちは。私とゲームをしましょう。";
// const delay = 100; // テキストが表示される間隔（ミリ秒）

// let index = 0;

// function displayText() {
//     document.getElementById("txt").textContent += text[index];
//     index++;

//     if (index < text.length) {
//         setTimeout(displayText, delay); // 次の文字を表示するためのタイマー
//     }
// }

// displayText(); // テキストを表示する関数を呼び出す
