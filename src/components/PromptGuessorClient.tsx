"use client";

import { useEffect, useMemo, useState } from "react";

type PuzzleChoice = {
  key: string;
  promptShort: string;
};

type PuzzleData = {
  id: string;
  asset: {
    type: string;
    path: string;
    alt: string;
  };
  choices: PuzzleChoice[];
  answer: {
    choiceKey: string;
    fullPrompt: string;
    negativePrompt?: string;
  };
};

type Stats = {
  played: number;
  correct: number;
  currentStreak: number;
  bestStreak: number;
  lastPlayedDate: string | null;
};

type SavedResult = {
  selectedKey: string;
  isCorrect: boolean;
};

const STATS_KEY = "prompt_guessor_stats_v1";
const FALLBACK_PUZZLE_ID = "2026-03-02";

function getUtcDateKey() {
  return new Date().toISOString().slice(0, 10);
}

function getResultKey(puzzleId: string) {
  return `prompt_guessor_result_${puzzleId}`;
}

function loadStats(): Stats {
  if (typeof window === "undefined") {
    return {
      played: 0,
      correct: 0,
      currentStreak: 0,
      bestStreak: 0,
      lastPlayedDate: null
    };
  }

  try {
    const raw = window.localStorage.getItem(STATS_KEY);
    if (!raw) {
      return {
        played: 0,
        correct: 0,
        currentStreak: 0,
        bestStreak: 0,
        lastPlayedDate: null
      };
    }
    return JSON.parse(raw) as Stats;
  } catch {
    return {
      played: 0,
      correct: 0,
      currentStreak: 0,
      bestStreak: 0,
      lastPlayedDate: null
    };
  }
}

function saveStats(stats: Stats) {
  window.localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

function updateStats(stats: Stats, puzzleId: string, isCorrect: boolean): Stats {
  const nextPlayed = stats.played + 1;
  const nextCorrect = stats.correct + (isCorrect ? 1 : 0);

  let currentStreak = isCorrect ? stats.currentStreak + 1 : 0;
  if (stats.lastPlayedDate !== null && stats.lastPlayedDate === puzzleId) {
    currentStreak = isCorrect ? stats.currentStreak : 0;
  }

  const bestStreak = Math.max(stats.bestStreak, currentStreak);
  return {
    played: nextPlayed,
    correct: nextCorrect,
    currentStreak,
    bestStreak,
    lastPlayedDate: puzzleId
  };
}

export function PromptGuessorClient() {
  const [puzzle, setPuzzle] = useState<PuzzleData | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({
    played: 0,
    correct: 0,
    currentStreak: 0,
    bestStreak: 0,
    lastPlayedDate: null
  });
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setStats(loadStats());
  }, []);

  useEffect(() => {
    const today = getUtcDateKey();

    async function loadPuzzle() {
      setStatus("loading");
      try {
        const res = await fetch(`/puzzles/daily/${today}.json`, { cache: "no-store" });
        if (res.ok) {
          const data = (await res.json()) as PuzzleData;
          setPuzzle(data);
          setStatus("ready");
          return;
        }

        const fallback = await fetch(`/puzzles/daily/${FALLBACK_PUZZLE_ID}.json`, {
          cache: "no-store"
        });
        if (!fallback.ok) {
          throw new Error("Puzzle not found");
        }
        const data = (await fallback.json()) as PuzzleData;
        setPuzzle(data);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }

    loadPuzzle();
  }, []);

  useEffect(() => {
    if (!puzzle) {
      return;
    }
    const raw = window.localStorage.getItem(getResultKey(puzzle.id));
    if (!raw) {
      return;
    }
    try {
      const result = JSON.parse(raw) as SavedResult;
      setSelectedKey(result.selectedKey);
    } catch {
      setSelectedKey(null);
    }
  }, [puzzle]);

  const isCorrect = useMemo(() => {
    if (!puzzle || !selectedKey) {
      return null;
    }
    return selectedKey === puzzle.answer.choiceKey;
  }, [puzzle, selectedKey]);

  useEffect(() => {
    const state = {
      mode: status,
      puzzleId: puzzle?.id ?? null,
      selectedKey,
      isCorrect,
      coordSystem: "N/A (UI card game)"
    };
    window.render_game_to_text = () => JSON.stringify(state);
    window.advanceTime = () => {
      return;
    };
  }, [isCorrect, puzzle?.id, selectedKey, status]);

  function onSelect(choiceKey: string) {
    if (!puzzle || selectedKey) {
      return;
    }

    const result: SavedResult = {
      selectedKey: choiceKey,
      isCorrect: choiceKey === puzzle.answer.choiceKey
    };

    setSelectedKey(choiceKey);
    window.localStorage.setItem(getResultKey(puzzle.id), JSON.stringify(result));

    const raw = loadStats();
    const next = updateStats(raw, puzzle.id, result.isCorrect);
    saveStats(next);
    setStats(next);
  }

  async function onShare() {
    if (!puzzle || isCorrect === null) {
      return;
    }
    const shareText = `PromptGuessr #${puzzle.id} ${isCorrect ? "✅ (1/1)" : "❌ (0/1)"}`;
    try {
      await navigator.clipboard.writeText(shareText);
      setMessage("결과 텍스트를 복사했습니다.");
    } catch {
      setMessage("복사에 실패했습니다. 수동으로 복사해주세요.");
    }
  }

  const accuracy =
    stats.played === 0 ? "0.0" : ((stats.correct / stats.played) * 100).toFixed(1);

  return (
    <main className="page">
      <section className="card">
        <h1>Prompt Guessor</h1>
        <p className="subtitle">이미지를 보고 생성 프롬프트를 맞혀보세요.</p>

        {status === "loading" && <p>오늘의 퍼즐을 불러오는 중...</p>}
        {status === "error" && (
          <p>퍼즐 로딩에 실패했습니다. 잠시 후 다시 시도해 주세요.</p>
        )}

        {status === "ready" && puzzle && (
          <>
            <p className="date">Puzzle #{puzzle.id} (UTC 00:00 기준)</p>
            <img className="puzzle-image" src={puzzle.asset.path} alt={puzzle.asset.alt} />

            <div className="choice-grid">
              {puzzle.choices.map((choice) => (
                <button
                  key={choice.key}
                  className={`choice ${selectedKey === choice.key ? "selected" : ""}`}
                  onClick={() => onSelect(choice.key)}
                  disabled={selectedKey !== null}
                >
                  <span className="choice-key">{choice.key}</span>
                  <span>{choice.promptShort}</span>
                </button>
              ))}
            </div>

            {selectedKey && (
              <section className="result">
                <h2>{isCorrect ? "정답입니다." : "오답입니다."}</h2>
                <p>
                  정답 선택지: <strong>{puzzle.answer.choiceKey}</strong>
                </p>

                <details>
                  <summary>Full Prompt 보기</summary>
                  <p className="prompt-text">{puzzle.answer.fullPrompt}</p>
                  {puzzle.answer.negativePrompt && (
                    <p className="prompt-text">
                      <strong>Negative Prompt:</strong> {puzzle.answer.negativePrompt}
                    </p>
                  )}
                </details>

                <button className="share-btn" onClick={onShare}>
                  결과 텍스트 복사
                </button>
                {message && <p className="message">{message}</p>}
              </section>
            )}
          </>
        )}
      </section>

      <section className="stats">
        <h2>내 통계</h2>
        <p>총 플레이: {stats.played}</p>
        <p>정답 수: {stats.correct}</p>
        <p>정답률: {accuracy}%</p>
        <p>현재 연속 정답: {stats.currentStreak}</p>
        <p>최고 연속 정답: {stats.bestStreak}</p>
      </section>
    </main>
  );
}

declare global {
  interface Window {
    render_game_to_text: () => string;
    advanceTime: (ms: number) => void;
  }
}
