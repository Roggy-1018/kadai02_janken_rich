"use client";
import React from "react";

function MainComponent() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] font-noto-sans">
      <header className="bg-[#2c3e50] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">三権分立ゲーム - ルール説明</h1>
          <a
            href="/"
            className="bg-[#34495e] px-4 py-2 rounded hover:bg-[#2c3e50]"
          >
            ゲームに戻る
          </a>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-8">
          <section className="border-b pb-6">
            <h2 className="text-2xl font-bold mb-4">ゲームの目的</h2>
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
            <h2 className="text-2xl font-bold mb-4">カードの種類と効果</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#dc2626] text-white rounded-xl h-24 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl mb-1">⛪</div>
                  <div className="text-sm">行政カード</div>
                  <div className="text-xs">司法に強く、立法に弱い</div>
                </div>
              </div>
              <div className="bg-[#6366f1] text-white rounded-xl h-24 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl mb-1">📜</div>
                  <div className="text-sm">立法カード</div>
                  <div className="text-xs">行政に強く、司法に弱い</div>
                </div>
              </div>
              <div className="bg-[#2563eb] text-white rounded-xl h-24 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl mb-1">⚖️</div>
                  <div className="text-sm">司法カード</div>
                  <div className="text-xs">立法に強く、行政に弱い</div>
                </div>
              </div>
              <div className="bg-[#15803d] text-white rounded-xl h-24 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl mb-1">🏛️</div>
                  <div className="text-sm">官僚制カード</div>
                  <div className="text-xs">使用すると停滞が発生</div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b pb-6">
            <h2 className="text-2xl font-bold mb-4">勝敗ルール</h2>
            <div className="bg-[#f8f9fa] p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-2">
                <li>行政 ＞ 司法 ＞ 立法 ＞ 行政</li>
                <li>勝利：1ポイント獲得</li>
                <li>引き分け：ポイント変動なし</li>
                <li>敗北：相手が1ポイント獲得</li>
              </ul>
            </div>
          </section>

          <section className="border-b pb-6">
            <h2 className="text-2xl font-bold mb-4">特殊ルール</h2>
            <div className="space-y-4">
              <div className="bg-[#f8f9fa] p-4 rounded-lg">
                <h3 className="font-bold text-xl mb-2">官僚制 🏛️</h3>
                <p>使用すると必ず引き分けになり、停滞率が上昇</p>
                <p>連続使用するとゲームオーバー</p>
              </div>
              <div className="bg-[#f8f9fa] p-4 rounded-lg">
                <h3 className="font-bold text-xl mb-2">解散総選挙 🗳️</h3>
                <p>20%の確率で発生</p>
                <p>発生時：両者のスコアがリセット</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">停滞率について</h2>
            <div className="bg-[#f8f9fa] p-4 rounded-lg flex items-center gap-4">
              <div className="flex-1">
                <p>官僚制カードの使用で上昇する特殊な指標です。</p>
                <p className="mt-2">
                  100%に近づくほど、政策の実行が困難になっていきます。
                </p>
                <p className="mt-2">
                  高すぎる停滞率は、政治システムの機能不全を引き起こす可能性があります。
                </p>
              </div>
              <div className="text-6xl">📊</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;