"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Play,
  Square,
  Volume2,
  VolumeX,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Clock,
  Sparkles,
} from "lucide-react";

export default function FirstAidToolkit() {
  const [activeScenario, setActiveScenario] = useState("cpr");
  const [isMetronomeActive, setIsMetronomeActive] = useState(false);
  const [compressions, setCompressions] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [isBreathPhase, setIsBreathPhase] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // Audio Context ref
  const audioCtxRef = useRef(null);

  // Play click sound using Web Audio API
  const playClickSound = () => {
    if (isAudioMuted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(0.3, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      osc.start();
      osc.stop(audioCtxRef.current.currentTime + 0.09);
    } catch (e) {
      // AudioContext blocked
    }
  };

  // Metronome interval: 110 beats per minute = 545.45 ms per beat
  useEffect(() => {
    let interval = null;
    if (isMetronomeActive && !isBreathPhase) {
      interval = setInterval(() => {
        playClickSound();
        setCompressions((prev) => {
          if (prev >= 29) {
            // Trigger 2 rescue breaths phase
            setIsBreathPhase(true);
            return 30;
          }
          return prev + 1;
        });
      }, 545);
    }
    return () => clearInterval(interval);
  }, [isMetronomeActive, isBreathPhase, isAudioMuted]);

  // Handle 2 rescue breaths delay (approx 4 seconds) then continue
  useEffect(() => {
    let timer = null;
    if (isBreathPhase && isMetronomeActive) {
      timer = setTimeout(() => {
        setCycles((c) => c + 1);
        setCompressions(0);
        setIsBreathPhase(false);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [isBreathPhase, isMetronomeActive]);

  const toggleMetronome = () => {
    if (isMetronomeActive) {
      setIsMetronomeActive(false);
      setCompressions(0);
      setIsBreathPhase(false);
    } else {
      setIsMetronomeActive(true);
      setCompressions(0);
      setCycles(0);
      setIsBreathPhase(false);
    }
  };

  const scenarios = {
    cpr: {
      title: "Adult CPR (100–120 bpm)",
      steps: [
        "Check consciousness: Shake shoulders gently and shout 'Are you okay?'.",
        "Call Rescue 1122 or shout for a bystander to call immediately.",
        "Check normal breathing for no more than 10 seconds. If absent or agonal gasping, begin CPR.",
        "Position hands in center of chest (lower breastbone). Interlock fingers.",
        "Push hard and fast: at least 2 inches (5 cm) deep, allowing chest to rise completely.",
        "Push to the metronome rhythm below (30 compressions followed by 2 breaths).",
      ],
    },
    choking: {
      title: "Choking (Adult & Child > 1 yr)",
      steps: [
        "Ask 'Are you choking? Can you speak?' If they nod or clutch their throat without sound, act quickly.",
        "Give 5 sharp back blows between shoulder blades with heel of hand.",
        "If still obstructed: Stand behind them, make a fist above navel, wrap hands and pull sharply inward and upward (5 abdominal thrusts).",
        "Repeat cycles of 5 back blows and 5 abdominal thrusts.",
        "If person becomes unconscious, lower to ground and begin CPR immediately.",
      ],
    },
    heatstroke: {
      title: "Severe Heatstroke (Pakistani Summer)",
      steps: [
        "Move victim immediately to shade or air-conditioned room. Dial Rescue 1122.",
        "Strip excess clothing to expose skin to air circulation.",
        "Apply wet towels, tap water, or ice packs to armpits, groin, and neck.",
        "Fan vigorously to promote evaporative cooling.",
        "Do NOT give oral fluids if patient is disoriented or vomiting.",
      ],
    },
    bleeding: {
      title: "Severe Bleeding & Hemorrhage",
      steps: [
        "Apply direct, continuous pressure over wound using sterile gauze or clean cloth.",
        "Maintain pressure for at least 10 minutes without lifting cloth to peek.",
        "If cloth soaks through, add another cloth on top without removing original layer.",
        "Keep victim lying flat and warm to counteract hypovolemic shock while awaiting ambulance.",
      ],
    },
    snakebite: {
      title: "Snakebite First Aid (Krait / Viper / Cobra)",
      steps: [
        "Keep patient calm and completely still. Movement spreads venom rapidly.",
        "Immobilize the bitten limb below heart level using a splint or sling.",
        "Remove rings, tight bracelets, and footwear before swelling occurs.",
        "Do NOT cut, suck venom, apply tourniquets, or apply ice/chemicals.",
        "Rush patient immediately to nearest tertiary hospital with Anti-Snake Venom (ASV).",
      ],
    },
  };

  return (
    <div className="space-y-6">
      {/* CPR Audio-Visual Metronome Tool */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                isMetronomeActive
                  ? "bg-red-600 text-white animate-pulse"
                  : "bg-slate-800 text-red-400"
              }`}
            >
              <Heart className={`w-6 h-6 ${isMetronomeActive ? "fill-white" : ""}`} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Interactive CPR Compression Metronome</h2>
              <p className="text-xs text-slate-400">110 BPM Clinical Cadence • 30:2 Compression Ratio</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAudioMuted(!isAudioMuted)}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
              title={isAudioMuted ? "Unmute Beats" : "Mute Beats"}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            <button
              onClick={toggleMetronome}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold shadow-md flex items-center gap-2 transition-all ${
                isMetronomeActive
                  ? "bg-red-600 hover:bg-red-700 text-white ring-4 ring-red-900/50"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              {isMetronomeActive ? (
                <>
                  <Square className="w-4 h-4 fill-white" />
                  <span>Stop Metronome</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start CPR Beats (110 BPM)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Compression Display Counter */}
        {isMetronomeActive ? (
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center text-center space-y-3">
            {isBreathPhase ? (
              <div className="space-y-1 animate-bounce">
                <span className="text-3xl sm:text-4xl font-extrabold text-blue-400">
                  💨 GIVE 2 RESCUE BREATHS
                </span>
                <p className="text-xs text-slate-300">Tilt head, pinch nose, seal mouth for 1 second each</p>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="text-6xl sm:text-7xl font-mono font-black text-white tracking-wider">
                  {compressions} <span className="text-2xl text-slate-500 font-normal">/ 30</span>
                </div>
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                  Push Hard & Fast in Center of Chest
                </p>
              </div>
            )}

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800 w-full justify-center">
              <span>Completed Cycles: <strong className="text-white">{cycles}</strong></span>
              <span>•</span>
              <span>Rate: <strong className="text-white">110 compressions/min</strong></span>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800/80 text-xs text-slate-400 flex items-center gap-3">
            <Clock className="w-5 h-5 text-brand-teal flex-shrink-0" />
            <span>
              Press <strong>Start CPR Beats</strong> to maintain the recommended clinical cadence while performing chest compressions on an unresponsive individual.
            </span>
          </div>
        )}
      </div>

      {/* Triage Scenario Selector */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-brand-navy">Interactive Protocol Action Steps</h2>
          <p className="text-xs text-brand-muted">Select an emergency scenario to review immediate action steps</p>
        </div>

        {/* Scenario Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {Object.entries(scenarios).map(([key, item]) => (
            <button
              key={key}
              onClick={() => setActiveScenario(key)}
              className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-colors ${
                activeScenario === key
                  ? "bg-brand-navy text-white shadow-xs"
                  : "bg-brand-bg text-brand-navy hover:bg-slate-200"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Active Checklist */}
        <div className="space-y-3 pt-2">
          {scenarios[activeScenario].steps.map((step, idx) => (
            <label
              key={idx}
              className="p-4 rounded-2xl bg-brand-bg border border-brand-border flex items-start gap-3 cursor-pointer hover:bg-brand-mint/30 transition-colors"
            >
              <input
                type="checkbox"
                className="mt-0.5 rounded text-brand-teal focus:ring-brand-teal w-4 h-4 cursor-pointer"
              />
              <div className="text-xs sm:text-sm text-brand-text leading-relaxed">
                <span className="font-bold text-brand-navy mr-1.5">Step {idx + 1}:</span>
                <span>{step}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
