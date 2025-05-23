"use client";
import React from "react";

function MainComponent() {
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [stagnationRate, setStagnationRate] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [stagnantRounds, setStagnantRounds] = useState(0);
  const [dissolutions, setDissolutions] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cpuCard, setCpuCard] = useState(null);
  const [showRules, setShowRules] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [currentNews, setCurrentNews] = useState("");
  const [lastCard, setLastCard] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [battleHistory, setBattleHistory] = useState([]);

  const newsItems = [
    "内閣支持率が急落...",
    "新法案が可決される",
    "最高裁で違憲判決",
    "行政改革が進行中",
    "官僚制度の見直しを検討",
    "国会で法案審議が停滞",
    "司法制度改革案が提出",
  ];

  const getNewsForResult = (result, playerCard, cpuCard) => {
    const newsPool = {
      // 行政が勝った時のニュース
      行政_勝利: [
        '政府、裁判所の財布を握り勝利！"人事って便利"',
        '首相官邸がドヤ顔発表――"三権のバランス？聞こえません"',
        '行政パワー炸裂！司法は"予算カット"に震えた一日',
      ],
      // 立法が勝った時のニュース
      立法_勝利: [
        '国会、内閣にレッドカード！"不信任でスッキリ"',
        "立法の逆襲：法律改正で政府を縛りプレイ",
        '議員たち大はしゃぎ――"今日こそ行政を黙らせた！"',
      ],
      // 司法が勝った時のニュース
      司法_勝利: [
        "最高裁『その法律ムリ！』— 国会は紙くずの山",
        "判決一閃！裁判所、議員の野望を粉砕",
        '司法が本気を出した日――"憲法は最強カード"',
      ],
      // プレイヤーが負けた時のニュース
      敗北: [
        '痛恨の敗北…"権力ゲームは甘くない"',
        `作戦ミス！${cpuCard}が${playerCard}を押し切る　次こそリベンジだ`,
        '負けても学びアリ？— "世の中、力関係がすべてじゃない"',
      ],
      // 引き分けの時のニュース
      引き分け: [
        "膠着状態…今日も何も決まらず",
        'どうなる政治の行方　"このままでいいの？"',
        "引き分け連発！傍観者たちはもう飽き気味",
      ],
      // 官僚制使用時のニュース
      官僚制: [
        '書類の山がすべてを止めた—"ハンコ待ち3年"',
        "縦割りの壁は高かった…議論はエンドレス迷路へ",
        "官僚制カード発動！時計だけが進み、政策は進まず",
      ],
      // 官僚制2連続使用時のニュース
      官僚制_終了: [
        '手続き地獄でタイムオーバー！"結局何も決まらず解散"',
        "官僚制がゲームを完全ストップ　プレイヤーのやる気も停止",
        '"決裁待ち"が2ターン続き、ついにシステムダウン！',
      ],
      // 解散総選挙時のニュース
      解散: [
        "突然の解散！スコアも議論もリセットボタン",
        '"選挙で仕切り直し"— でも課題は山積みのまま…',
        "また解散!? 国民もスコアも振り回され放題",
      ],
    };

    // ������ュース������択ロジック
    let newsCategory;
    if (result === "解散") {
      newsCategory = "解散";
    } else if (playerCard === "官僚制" || cpuCard === "官僚制") {
      if (lastCard === "官僚制") {
        newsCategory = "官僚制_終了";
      } else {
        newsCategory = "官僚制";
      }
    } else if (result === "引き分け") {
      newsCategory = "引き分け";
    } else if (result === "勝利") {
      newsCategory = `${playerCard}_勝利`;
    } else {
      newsCategory = "敗北";
    }

    const newsArray = newsPool[newsCategory] || newsPool["引き分け"];
    return newsArray[Math.floor(Math.random() * newsArray.length)];
  };

  const determineWinner = (playerCard, cpuCard) => {
    if (playerCard === "官僚制" || cpuCard === "官僚制") {
      return "引き分け";
    }

    const winConditions = {
      行政: "司法",
      司法: "立法",
      立法: "行政",
    };

    if (playerCard === cpuCard) {
      return "引き分け";
    }

    return winConditions[playerCard] === cpuCard ? "勝利" : "敗北";
  };

  const updateStagnationRate = (result, playerCard, cpuCard) => {
    let shouldIncrement = false;
    let incrementAmount = 0;

    // 官僚制カードの使用時
    if (playerCard === "官僚制" || cpuCard === "官僚制") {
      shouldIncrement = true;
      incrementAmount = 20; // 官僚制使用時は20%上昇

      // 連続使用チェック（プレイヤーが2回連続で使用した場合のみ）
      if (playerCard === "官僚制" && lastCard === "官僚制") {
        setGameOver(true);
        setCurrentNews(
          "⚠️ 官僚制の連続使用により、政治システムが機能不全に陥りました！"
        );
        return true;
      }
    }
    // 通常の引き分けの場合の停滞率上昇（5%）
    else if (result === "引き分け") {
      shouldIncrement = true;
      incrementAmount = 5;
    }

    if (shouldIncrement) {
      setStagnantRounds((prev) => prev + 1);
      setStagnationRate((prev) => Math.min(100, prev + incrementAmount)); // 100%を超えないように制限
    }

    // プレイヤーのカードのみを記録
    if (playerCard === "官僚制") {
      setLastCard("官僚制");
    } else {
      setLastCard(null);
    }
    return false;
  };

  const checkDissolution = () => {
    if (Math.random() < 0.2) {
      setDissolutions((prev) => prev + 1);
      setPlayerScore(0);
      setCpuScore(0);
      setCurrentNews("⚠️ 解散総選挙が発生！すべてがリセットされました");
      return true;
    }
    return false;
  };

  const handleCardSelect = (card) => {
    if (gameOver) {
      return;
    }

    setSelectedCard(card);
    setIsPlaying(true);
    setTotalRounds((prev) => prev + 1);

    setTimeout(() => {
      const cards = ["行政", "立法", "司法", "官僚制"];
      const cpuChoice = cards[Math.floor(Math.random() * cards.length)];
      setCpuCard(cpuChoice);

      setTimeout(() => {
        if (checkDissolution()) {
          setCurrentNews(getNewsForResult("解散"));
          setBattleHistory((prev) =>
            [
              {
                playerCard: card,
                cpuCard: cpuChoice,
                result: "解散",
                stagnationRate,
                timestamp: new Date().toISOString(),
              },
              ...prev,
            ].slice(0, 10)
          );
          return;
        }

        const result = determineWinner(card, cpuChoice);

        if (updateStagnationRate(result, card, cpuChoice)) {
          setBattleHistory((prev) =>
            [
              {
                playerCard: card,
                cpuCard: cpuChoice,
                result: "官僚制崩壊",
                stagnationRate,
                timestamp: new Date().toISOString(),
              },
              ...prev,
            ].slice(0, 10)
          );
          return;
        }

        setGameResult(result);
        setCurrentNews(getNewsForResult(result, card, cpuChoice));

        if (result === "勝利") {
          setPlayerScore((prev) => prev + 1);
        } else if (result === "敗北") {
          setCpuScore((prev) => prev + 1);
        }

        setBattleHistory((prev) =>
          [
            {
              playerCard: card,
              cpuCard: cpuChoice,
              result,
              stagnationRate,
              timestamp: new Date().toISOString(),
            },
            ...prev,
          ].slice(0, 10)
        );

        setIsPlaying(false);
      }, 500);
    }, 1000);
  };

  const getCardColor = (card) => {
    switch (card) {
      case "行政":
        return "bg-[#dc2626]";
      case "立法":
        return "bg-[#6366f1]";
      case "司法":
        return "bg-[#2563eb]";
      case "官僚制":
        return "bg-[#15803d]";
      default:
        return "bg-gray-500";
    }
  };

  const getCardEmoji = (card) => {
    switch (card) {
      case "行政":
        return "⛪";
      case "立法":
        return "📜";
      case "司法":
        return "⚖️";
      case "官僚制":
        return "🏛️";
      default:
        return "❓";
    }
  };

  const resetGame = () => {
    setGameOver(false);
    setPlayerScore(0);
    setCpuScore(0);
    setStagnationRate(0);
    setTotalRounds(0);
    setStagnantRounds(0);
    setDissolutions(0);
    setSelectedCard(null);
    setCpuCard(null);
    setLastCard(null);
    setGameResult(null);
    setCurrentNews("");
    setBattleHistory([]); // 戦歴もリセット
  };

  return (
    <div
      className="min-h-screen p-4"
      style={{
        background: `
        linear-gradient(45deg, 
          rgba(255, 255, 255, 0.9),
          rgba(255, 255, 255, 0.8)
        ),
        url('https://ucarecdn.com/912b391a-5578-4069-8c0a-53be529d1eb8/-/format/auto/') center/cover no-repeat fixed
      `,
      }}
    >
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center h-[50px] mb-3">
          <h1 className="text-2xl font-bold text-[#6366f1]">三権分立ゲーム</h1>
          <div className="space-x-3">
            <button
              onClick={() => setShowRules(true)}
              className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors"
            >
              ルールを見る
            </button>
            <button
              onClick={() => setShowStats(true)}
              className="bg-[#6366f1] text-white px-4 py-2 rounded-full hover:bg-[#4f46e5] transition-colors"
            >
              戦歴を見る
            </button>
          </div>
        </div>

        {/* スコア表示 */}
        <div className="flex justify-between text-lg mb-3 px-2">
          <div>プレイヤー: {playerScore}</div>
          <div>CPU: {cpuScore}</div>
        </div>

        {/* ニュース速報 */}
        <div className="bg-white rounded-lg shadow-lg p-2 mb-4">
          <div className="flex items-center">
            <span className="bg-red-600 text-white px-2 py-1 rounded-md text-sm font-bold mr-2">
              ニュース速報！
            </span>
            <div className="overflow-hidden flex-1">
              <div className="whitespace-nowrap animate-marquee">
                {currentNews || "政界は今日も活気に満ちている..."}
              </div>
            </div>
          </div>
        </div>

        {/* メインのゲームエリア */}
        <div className="flex-1 grid grid-rows-[auto_auto_auto] gap-4 mb-4">
          {/* 基本カード */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-bold mb-3">基本カード：三権</h2>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {["行政", "立法", "司法"].map((card) => (
                <button
                  key={card}
                  onClick={() => handleCardSelect(card)}
                  disabled={isPlaying}
                  className={`${getCardColor(
                    card
                  )} text-white p-4 rounded-xl hover:bg-opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed h-28 w-full`}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className="text-3xl mb-2">{getCardEmoji(card)}</span>
                    <span className="text-base">{card}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 特別カード */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-bold mb-3">特別カード</h2>
            <div className="max-w-2xl mx-auto">
              <button
                onClick={() => handleCardSelect("官僚制")}
                disabled={isPlaying}
                className="w-full bg-[#15803d] text-white p-4 rounded-xl hover:bg-opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed h-28"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-3xl mb-2">🏛️</span>
                  <span className="text-base">官僚制</span>
                  <span className="text-sm mt-1">
                    (停滞率+20%、2連続使用でゲーム終了)
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* 対戦エリア */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="grid grid-cols-3 gap-4 items-center max-w-2xl mx-auto">
              <div className="text-center">
                <h3 className="text-base font-bold mb-2">あなたの選択</h3>
                <div
                  className={`h-28 flex items-center justify-center ${
                    isPlaying ? "animate-bounce" : ""
                  }`}
                >
                  {selectedCard ? (
                    <div
                      className={`${getCardColor(
                        selectedCard
                      )} text-white p-4 rounded-xl w-full h-28 flex items-center justify-center`}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">
                          {getCardEmoji(selectedCard)}
                        </div>
                        <div className="text-base">{selectedCard}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-base">未選択</div>
                  )}
                </div>
              </div>

              <div className="text-center">
                <div
                  className={`text-4xl font-bold ${
                    isPlaying ? "animate-pulse" : ""
                  }`}
                >
                  {isPlaying ? "VS" : gameResult || "---"}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-base font-bold mb-2">CPUの選択</h3>
                <div
                  className={`h-28 flex items-center justify-center ${
                    isPlaying ? "animate-bounce" : ""
                  }`}
                >
                  {cpuCard ? (
                    <div
                      className={`${getCardColor(
                        cpuCard
                      )} text-white p-4 rounded-xl w-full h-28 flex items-center justify-center`}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">
                          {getCardEmoji(cpuCard)}
                        </div>
                        <div className="text-base">{cpuCard}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-base">未選択</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 下部の情報エリア */}
        <div className="h-[80px]">
          {/* 停滞率 */}
          <div className="mb-3">
            <div className="flex justify-between mb-2 text-base">
              <span>停滞率: {stagnationRate}%</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
              <div
                className="bg-[#f59e0b] h-3 rounded-full transition-all duration-300"
                style={{ width: `${stagnationRate}%` }}
              ></div>
            </div>
          </div>

          {/* 統計情報 */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-base font-bold">総ラウンド数</div>
              <div className="text-base">{totalRounds}</div>
            </div>
            <div>
              <div className="text-base font-bold">停滞ラウンド</div>
              <div className="text-base">{stagnantRounds}</div>
            </div>
            <div>
              <div className="text-base font-bold">解散回数</div>
              <div className="text-base">{dissolutions}</div>
            </div>
          </div>
        </div>
      </div>

      {/* モーダル部分 - ルール説明 */}
      {showRules && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">ゲームルール</h2>
              <button
                onClick={() => setShowRules(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-bold mb-2">ゲームの目的</h3>
                <p>
                  三権分立の力関係を理解しながら、CPUと対戦して高得点を目指すゲームです。
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold mb-2">カードの種類と効果</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="bg-[#dc2626] text-white p-2 rounded-lg">
                    <h4 className="font-bold">行政カード ⛪</h4>
                    <p className="text-sm">司法に強く、立法に弱い</p>
                  </div>
                  <div className="bg-[#6366f1] text-white p-2 rounded-lg">
                    <h4 className="font-bold">立法カード 📜</h4>
                    <p className="text-sm">行政に強く、司法に弱い</p>
                  </div>
                  <div className="bg-[#2563eb] text-white p-2 rounded-lg">
                    <h4 className="font-bold">司法カード ⚖️</h4>
                    <p className="text-sm">立法に強く、行政に弱い</p>
                  </div>
                  <div className="bg-[#15803d] text-white p-2 rounded-lg">
                    <h4 className="font-bold">官僚制カード 🏛️</h4>
                    <p className="text-sm">すべてを引き分けにする特殊カード</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold mb-2">特殊ルール</h3>
                <div className="space-y-2">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <h4 className="font-bold">官僚制カード</h4>
                    <p className="text-sm">
                      使用すると必ず引き分けになり、停滞率が20%上昇。2回連続使用するとゲームオーバー。
                    </p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <h4 className="font-bold">解散総選挙</h4>
                    <p className="text-sm">
                      20%の確率で発生。両者のスコアがリセットされます。
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold mb-2">停滞率について</h3>
                <p className="text-sm">
                  官僚制カードの使用で上昇する特殊な指標です。
                  100%に近づくほど、政策の実行が困難になっていきます。
                </p>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* 戦歴モーダル */}
      {showStats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#6366f1]">戦歴</h2>
                <button
                  onClick={() => setShowStats(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#f8f9fa] rounded-xl p-4">
                  <h3 className="text-lg font-bold mb-3">総合成績</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>総対戦数:</span>
                      <span className="font-bold">{totalRounds}回</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>勝率:</span>
                      <span className="font-bold text-[#2ecc71]">
                        {Math.round((playerScore / totalRounds) * 100) || 0}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>勝利:</span>
                      <span className="text-[#2ecc71]">{playerScore}回</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>敗北:</span>
                      <span className="text-[#e74c3c]">{cpuScore}回</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f8f9fa] rounded-xl p-4">
                  <h3 className="text-lg font-bold mb-3">その他の統計</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>停滞ラウンド:</span>
                      <span>{stagnantRounds}回</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>現在の停滞率:</span>
                      <span>{stagnationRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>解散回数:</span>
                      <span>{dissolutions}回</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#f8f9fa] rounded-xl p-4">
                <h3 className="text-lg font-bold mb-3">最近の対戦</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">プレイヤー</th>
                        <th className="text-left py-2">CPU</th>
                        <th className="text-left py-2">結果</th>
                        <th className="text-left py-2">停滞率</th>
                        <th className="text-left py-2">日時</th>
                      </tr>
                    </thead>
                    <tbody>
                      {battleHistory.map((battle, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2">
                            <span
                              className={`${getCardColor(
                                battle.playerCard
                              )} text-white px-3 py-1 rounded-full`}
                            >
                              {battle.playerCard}
                            </span>
                          </td>
                          <td className="py-2">
                            <span
                              className={`${getCardColor(
                                battle.cpuCard
                              )} text-white px-3 py-1 rounded-full`}
                            >
                              {battle.cpuCard}
                            </span>
                          </td>
                          <td className="py-2">
                            <span
                              className={`${
                                battle.result === "勝利"
                                  ? "bg-[#2ecc71]"
                                  : battle.result === "敗北"
                                  ? "bg-[#e74c3c]"
                                  : battle.result === "官僚制崩壊"
                                  ? "bg-[#e74c3c]"
                                  : "bg-[#f1c40f]"
                              } text-white px-3 py-1 rounded-full`}
                            >
                              {battle.result}
                            </span>
                          </td>
                          <td className="py-2">
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-[#f59e0b] h-2 rounded-full"
                                  style={{ width: `${battle.stagnationRate}%` }}
                                ></div>
                              </div>
                              <span>{battle.stagnationRate}%</span>
                            </div>
                          </td>
                          <td className="py-2 text-sm text-gray-600">
                            {new Date(battle.timestamp).toLocaleString("ja-JP")}
                          </td>
                        </tr>
                      ))}
                      {battleHistory.length === 0 && (
                        <tr>
                          <td
                            colSpan="5"
                            className="py-4 text-center text-gray-500"
                          >
                            まだ対戦記録がありません
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ゲームオーバーモーダル */}
      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold mb-3">ゲームオーバー</h2>
            <p className="mb-3">
              官僚制の連続使用により、政治システムが機能不全に陥りました。
            </p>
            <button
              onClick={resetGame}
              className="bg-[#6366f1] text-white px-4 py-2 rounded-full hover:bg-[#4f46e5] transition-colors"
            >
              新しいゲームを始める
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce {
          animation: bounce 0.5s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 1s infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 8s linear infinite; /* 15秒から8秒に変更 */
        }
      `}</style>
    </div>
  );
}

export default MainComponent;