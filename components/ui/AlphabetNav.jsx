"use client";

import React from "react";

export default function AlphabetNav({
  selectedLetter = "ALL",
  onSelectLetter,
  availableLetters = [],
}) {
  const letters = ["ALL", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-white rounded-2xl border border-brand-border shadow-xs my-4">
      {letters.map((letter) => {
        const isSelected = selectedLetter === letter;
        const isAvailable =
          letter === "ALL" ||
          availableLetters.length === 0 ||
          availableLetters.includes(letter);

        return (
          <button
            key={letter}
            onClick={() => onSelectLetter && onSelectLetter(letter)}
            disabled={!isAvailable}
            className={`min-w-[34px] h-[34px] px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
              isSelected
                ? "bg-brand-teal text-white shadow-xs scale-105"
                : isAvailable
                ? "bg-brand-bg text-brand-navy hover:bg-brand-mint hover:text-brand-teal-dark"
                : "opacity-30 cursor-not-allowed bg-slate-50 text-slate-400"
            }`}
            aria-label={`Filter by letter ${letter}`}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
