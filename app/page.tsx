"use client";

import { useEffect, useState } from "react";
import StartScreen from "../components/StartScreen";
import IntroScreen from "../components/IntroScreen";
import GameScreen from "../components/GameScreen";
import AllClearScreen from "../components/AllClearScreen";
import ClearScreen from "../components/ClearScreen";
import HowToScreen from "@/components/HowTo";

// 仮ログイン用（本番のアクセス制御には使用しない）
const LOGIN_ID = "admin";
const LOGIN_PASSWORD = "1234";


type Screen = "start" | "intro" | "howTo" | "game" | "clear" | "allClear";

type GameResult = {
  mistakes: number;
  solvedCards: number;
};

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");

  const [screen, setScreen] = useState<Screen>("start");

  const [result, setResult] = useState<GameResult>({
    mistakes: 0,
    solvedCards: 0,
  });

  // 画面切り替え時に先頭へ
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [screen, loggedIn]);

  const completeGame = (gameResult: GameResult) => {
    setResult(gameResult);
    setScreen("clear");
  };

  const completeSecret = (gameResult: GameResult) => {
    setResult(gameResult);
    setScreen("allClear");
  };

  const handleRestart = () => {
    setResult({
      mistakes: 0,
      solvedCards: 0,
    });
    setScreen("start");
  };

  // ゲーム画面の切り替え
  switch (screen) {
    case "start":
      return (
        <StartScreen
          onStart={() => setScreen("intro")}
          onRestart={handleRestart}
        />
      );

    case "intro":
      return (
        <IntroScreen
          onBack={() => setScreen("start")}
          onNext={() => setScreen("howTo")}
          onRestart={handleRestart}
        />
      );

    case "howTo":
      return (
        <HowToScreen
          onBack={() => setScreen("intro")}
          onNext={() => setScreen("game")}
          onRestart={handleRestart}
        />
      );

    case "game":
      return (
        <GameScreen
          onComplete={completeGame}
          onSecretComplete={completeSecret}
          onRestart={handleRestart}
        />
      );

    case "clear":
      return (
        <ClearScreen
          {...result}
          onRestart={handleRestart}
        />
      );

    case "allClear":
      return (
        <AllClearScreen
          {...result}
          onRestart={handleRestart}
        />
      );
  }
}
