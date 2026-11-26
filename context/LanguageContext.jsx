"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
const { translations } = require("@/lib/translations");

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
  t: () => {},
  dir: "ltr",
  isUrdu: false,
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("sehat_lang");
    if (saved === "ur" || saved === "en") {
      setLanguageState(saved);
      document.documentElement.dir = saved === "ur" ? "rtl" : "ltr";
      document.documentElement.lang = saved;
    }
  }, []);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem("sehat_lang", lang);
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  const t = (path) => {
    const parts = path.split(".");
    let current = translations[language] || translations.en;
    for (const part of parts) {
      if (current && current[part] !== undefined) {
        current = current[part];
      } else {
        // Fallback to English
        let fallback = translations.en;
        for (const p of parts) {
          if (fallback && fallback[p] !== undefined) {
            fallback = fallback[p];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return current;
  };

  const dir = language === "ur" ? "rtl" : "ltr";
  const isUrdu = language === "ur";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir, isUrdu }}>
      <div className={isUrdu ? "font-urdu" : "font-sans"} dir={dir}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
