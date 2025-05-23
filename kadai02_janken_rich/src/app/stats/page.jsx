"use client";
import React from "react";

function MainComponent() {
  const [stats] = useState({
    totalGames: 3,
    winRate: 66.7,
    wins: 2,
    draws: 1,
    losses: 0,
    cardUsage: {
      admin: 33.3,
      legislative: 33.3,
      judicial: 0.0,
      bureaucracy: 33.3,
    },
    matchHistory: [
      {
        date: "2025-01-15",
        playerCard: "行政",
        cpuCard: "司法",
        result: "勝利",
        stagnation: 15,
      },
      {
        date: "2025-01-15",
        playerCard: "立法",
        cpuCard: "行政",
        result: "勝利",
        stagnation: 10,
      },
      {
        date: "2025-01-15",
        playerCard: "官僚制",
        cpuCard: "立法",
        result: "引分",
        stagnation: 20,
      },
    ],
  });

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

  const getResultColor = (result) => {
    switch (result) {
      case "勝利":
        return "bg-[#2ecc71]";
      case "敗北":
        return "bg-[#e74c3c]";
      case "引分":
        return "bg-[#f1c40f]";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#6366f1]">戦歴</h1>
          <a
            href="/"
            className="bg-[#4b5563] text-white px-6 py-2 rounded-full hover:bg-[#374151] transition-colors"
          >
            ゲームに戻る
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">総合成績</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>総対戦数:</span>
                <span className="text-xl font-bold">{stats.totalGames}回</span>
              </div>
              <div className="flex justify-between items-center">
                <span>勝率:</span>
                <span className="text-xl font-bold text-[#2ecc71]">
                  {stats.winRate}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>勝利:</span>
                <span className="text-[#2ecc71]">{stats.wins}回</span>
              </div>
              <div className="flex justify-between items-center">
                <span>引き分け:</span>
                <span className="text-[#f1c40f]">{stats.draws}回</span>
              </div>
              <div className="flex justify-between items-center">
                <span>敗北:</span>
                <span className="text-[#e74c3c]">{stats.losses}回</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">カード使用率</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>行政:</span>
                <div
                  className={`${getCardColor(
                    "行政"
                  )} w-24 h-24 rounded-xl flex flex-col items-center justify-center text-white`}
                >
                  <span className="text-3xl mb-1">⛪</span>
                  <span className="text-sm">{stats.cardUsage.admin}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>立法:</span>
                <div
                  className={`${getCardColor(
                    "立法"
                  )} w-24 h-24 rounded-xl flex flex-col items-center justify-center text-white`}
                >
                  <span className="text-3xl mb-1">📜</span>
                  <span className="text-sm">
                    {stats.cardUsage.legislative}%
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>司法:</span>
                <div
                  className={`${getCardColor(
                    "司法"
                  )} w-24 h-24 rounded-xl flex flex-col items-center justify-center text-white`}
                >
                  <span className="text-3xl mb-1">⚖️</span>
                  <span className="text-sm">{stats.cardUsage.judicial}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>官僚制:</span>
                <div
                  className={`${getCardColor(
                    "官僚制"
                  )} w-24 h-24 rounded-xl flex flex-col items-center justify-center text-white`}
                >
                  <span className="text-3xl mb-1">🏛️</span>
                  <span className="text-sm">
                    {stats.cardUsage.bureaucracy}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">対戦履歴</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">日時</th>
                  <th className="text-left py-2">プレイヤー</th>
                  <th className="text-left py-2">CPU</th>
                  <th className="text-left py-2">結果</th>
                  <th className="text-left py-2">停滞率</th>
                </tr>
              </thead>
              <tbody>
                {stats.matchHistory.map((match, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{match.date}</td>
                    <td className="py-2">
                      <div
                        className={`${getCardColor(
                          match.playerCard
                        )} w-24 h-24 rounded-xl flex flex-col items-center justify-center text-white`}
                      >
                        <span className="text-3xl mb-1">
                          {match.playerCard === "行政"
                            ? "⛪"
                            : match.playerCard === "立法"
                            ? "📜"
                            : match.playerCard === "司法"
                            ? "⚖️"
                            : "🏛️"}
                        </span>
                        <span className="text-sm">{match.playerCard}</span>
                      </div>
                    </td>
                    <td className="py-2">
                      <div
                        className={`${getCardColor(
                          match.cpuCard
                        )} w-24 h-24 rounded-xl flex flex-col items-center justify-center text-white`}
                      >
                        <span className="text-3xl mb-1">
                          {match.cpuCard === "行政"
                            ? "⛪"
                            : match.cpuCard === "立法"
                            ? "📜"
                            : match.cpuCard === "司法"
                            ? "⚖️"
                            : "🏛️"}
                        </span>
                        <span className="text-sm">{match.cpuCard}</span>
                      </div>
                    </td>
                    <td className="py-2">
                      <div
                        className={`${getResultColor(
                          match.result
                        )} w-24 h-24 rounded-xl flex flex-col items-center justify-center text-white`}
                      >
                        <span className="text-3xl mb-1">
                          {match.result === "勝利"
                            ? "🏆"
                            : match.result === "敗北"
                            ? "💔"
                            : "🤝"}
                        </span>
                        <span className="text-sm">{match.result}</span>
                      </div>
                    </td>
                    <td className="py-2">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#f59e0b] h-2 rounded-full"
                            style={{ width: `${match.stagnation}%` }}
                          ></div>
                        </div>
                        <span>{match.stagnation}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;