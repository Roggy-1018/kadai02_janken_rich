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
  const [gameResult, setGameResult] = useState(null);
  const [lastCard, setLastCard] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const news = [
    "内閣支持率が急落...",
    "新法案が可決される",
    "最高裁で違憲判決",
    "行政改革が進行中",
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#6366f1]">三権分立ゲーム</h1>
          <div className="space-x-4">
            <button
              onClick={() => setShowRules(true)}
              className="bg-[#4b5563] text-white px-6 py-2 rounded-full hover:bg-[#374151] transition-colors"
            >
              ルールを見る
            </button>
            <a
              href="/stats"
              className="bg-[#6366f1] text-white px-6 py-2 rounded-full hover:bg-[#4f46e5] transition-colors"
            >
              戦歴を見る
            </a>
          </div>
        </div>

        {/* カード選択エリア */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl mb-4">基本カード：三権</h2>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <button
              onClick={() => handleCardSelect("行政")}
              className="bg-[#dc2626] text-white p-8 rounded-xl hover:bg-[#b91c1c] transition-colors flex flex-col items-center"
              disabled={gameOver}
            >
              <span className="text-4xl mb-2">⛪</span>
              <span>行政</span>
            </button>
            <button
              onClick={() => handleCardSelect("立法")}
              className="bg-[#6366f1] text-white p-8 rounded-xl hover:bg-[#4f46e5] transition-colors flex flex-col items-center"
              disabled={gameOver}
            >
              <span className="text-4xl mb-2">📜</span>
              <span>立法</span>
            </button>
            <button
              onClick={() => handleCardSelect("司法")}
              className="bg-[#2563eb] text-white p-8 rounded-xl hover:bg-[#1d4ed8] transition-colors flex flex-col items-center"
              disabled={gameOver}
            >
              <span className="text-4xl mb-2">⚖️</span>
              <span>司法</span>
            </button>
          </div>

          <h2 className="text-xl mb-4">特別カード</h2>
          <button
            onClick={() => handleCardSelect("官僚制")}
            className="w-full bg-[#15803d] text-white p-8 rounded-xl hover:bg-[#166534] transition-colors flex flex-col items-center"
            disabled={gameOver}
          >
            <span className="text-4xl mb-2">🏛️</span>
            <span>官僚制</span>
            <span className="text-sm mt-2">
              (停滞率上昇、2連続使用でゲーム終了)
            </span>
          </button>
        </div>

        {/* 対戦結果表示エリア */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">あなたの選択</h3>
              {selectedCard && (
                <div
                  className={`${getCardColor(
                    selectedCard
                  )} text-white p-4 rounded-xl inline-block`}
                >
                  {selectedCard}
                </div>
              )}
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{gameResult || "VS"}</div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">CPUの選択</h3>
              {cpuCard && (
                <div
                  className={`${getCardColor(
                    cpuCard
                  )} text-white p-4 rounded-xl inline-block`}
                >
                  {cpuCard}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span>停滞率: {stagnationRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-[#f59e0b] h-4 rounded-full transition-all duration-300"
              style={{ width: `${stagnationRate}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 text-center mb-8">
          <div>
            <div className="font-bold">総ラウンド数</div>
            <div className="text-2xl">{totalRounds}</div>
          </div>
          <div>
            <div className="font-bold">停滞ラウンド</div>
            <div className="text-2xl">{stagnantRounds}</div>
          </div>
          <div>
            <div className="font-bold">解散回数</div>
            <div className="text-2xl">{dissolutions}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl mb-4">ニュース速報</h2>
          <div className="overflow-hidden">
            <div className="whitespace-nowrap animate-marquee">
              {news.map((item, index) => (
                <span key={index} className="mr-8">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {gameOver && (
          <div className="mt-8 text-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-[#6366f1] text-white px-8 py-3 rounded-full hover:bg-[#4f46e5] transition-colors"
            >
              新しいゲームを始める
            </button>
          </div>
        )}
      </div>

      {/* ルール説明モーダル */}
      {showRules && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">ゲームルール</h2>
                <button
                  onClick={() => setShowRules(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <section className="border-b pb-6">
                <h3 className="text-xl font-bold mb-4">ゲームの目的</h3>
                <div className="flex items-center gap-4">
                  <div className="bg-[#f8f9fa] p-4 rounded-lg flex-1">
                    <p>
                      三権分立の力関係を理解しながら、CPUと対戦して高得点を目指すゲームです。
                    </p>
                    <p className="mt-2">
                      各権力のバランスを保ちながら、戦略的にカードを使用しましょう！
                    </p>
                  </div>
                  <div className="text-6xl">⚖️</div>
                </div>
              </section>

              <section className="border-b pb-6">
                <h3 className="text-xl font-bold mb-4">カードの種類と効果</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#e74c3c] text-white p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">行政カード 👨‍💼</h4>
                    <p>司法に強く、立法に弱い</p>
                  </div>
                  <div className="bg-[#3498db] text-white p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">立法カード 📜</h4>
                    <p>行政に強く、司法に弱い</p>
                  </div>
                  <div className="bg-[#2ecc71] text-white p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">司法カード ⚖️</h4>
                    <p>立法に強く、行政に弱い</p>
                  </div>
                  <div className="bg-[#95a5a6] text-white p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">官僚制カード 🏛️</h4>
                    <p>特殊カード：使用すると停滞が発生</p>
                  </div>
                </div>
              </section>

              <section className="border-b pb-6">
                <h3 className="text-xl font-bold mb-4">特殊ルール</h3>
                <div className="space-y-4">
                  <div className="bg-[#f8f9fa] p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">官僚制 🏛️</h4>
                    <p>使用すると必ず引き分けになり、停滞率が上昇</p>
                    <p>連続使用するとゲームオーバー</p>
                  </div>
                  <div className="bg-[#f8f9fa] p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">解散総選挙 🗳️</h4>
                    <p>20%の確率で発生</p>
                    <p>発生時：両者のスコアがリセット</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">停滞率について</h3>
                <div className="bg-[#f8f9fa] p-4 rounded-lg">
                  <p>官僚制カードの使用で上昇する特殊な指標です。</p>
                  <p className="mt-2">
                    100%に近づくほど、政策の実行が困難になっていきます。
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;