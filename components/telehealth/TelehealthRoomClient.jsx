"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  MessageSquare,
  FileText,
  ShieldCheck,
  Stethoscope,
  Send,
  User,
  Settings,
  Share2,
  Clock,
  Sparkles,
} from "lucide-react";

export default function TelehealthRoomClient({ appointment }) {
  const router = useRouter();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "System",
      text: "End-to-end encrypted telehealth room initialized. Verified by PMDC/PMC standards.",
      time: "Just now",
      isSystem: true,
    },
    {
      id: 2,
      sender: `${appointment.provider.title} ${appointment.provider.fullName}`,
      text: `Hello ${appointment.patientName}, I have your medical intake notes. How are you feeling today?`,
      time: "1m ago",
      isDoctor: true,
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Attempt local video stream if user permits
  useEffect(() => {
    let stream = null;
    if (isVideoOn && typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            setCameraActive(true);
          }
        })
        .catch(() => {
          // Fallback gracefully without throwing
          setCameraActive(false);
        });
    } else {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isVideoOn]);

  const formatDuration = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: appointment.patientName,
        text: chatInput.trim(),
        time: "Just now",
        isPatient: true,
      },
    ]);
    setChatInput("");

    // Simulate doctor response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: `${appointment.provider.title} ${appointment.provider.fullName}`,
          text: "Understood. I am noting down these symptoms and reviewing your medication history.",
          time: "Just now",
          isDoctor: true,
        },
      ]);
    }, 1500);
  };

  const handleEndCall = () => {
    if (confirm("Are you sure you want to exit this telehealth consultation?")) {
      router.push(`/appointments/confirmation/${appointment.id}`);
    }
  };

  return (
    <div className="bg-slate-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col min-h-[620px]">
      {/* Call Header */}
      <div className="px-6 py-4 bg-slate-900/95 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-teal text-white flex items-center justify-center font-bold shadow-xs">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold">
                {appointment.provider.title} {appointment.provider.fullName}
              </h2>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800">
                PMC Verified
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {appointment.provider.specialty} • Session Time: {appointment.timeSlot}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-xl text-xs font-mono font-semibold">
            <Clock className="w-3.5 h-3.5 text-brand-teal" />
            <span>{formatDuration(callDuration)}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Live Encrypted</span>
          </span>
        </div>
      </div>

      {/* Video Grid & Chat Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
        {/* Main Video Presentation Canvas */}
        <div
          className={`${
            isChatOpen ? "lg:col-span-8" : "lg:col-span-12"
          } p-4 sm:p-6 flex flex-col items-center justify-center relative bg-gradient-to-b from-slate-900 to-slate-950 transition-all`}
        >
          {/* Remote Doctor Stage */}
          <div className="w-full h-full max-h-[460px] rounded-2xl bg-slate-800/80 border border-slate-700/60 relative flex flex-col items-center justify-center p-6 overflow-hidden">
            <div className="w-24 h-24 rounded-full bg-slate-700/80 border-4 border-brand-teal/40 flex items-center justify-center text-brand-teal mb-4 relative">
              <Stethoscope className="w-12 h-12" />
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-800"></span>
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white">
                {appointment.provider.title} {appointment.provider.fullName}
              </h3>
              <p className="text-xs text-slate-400">
                Audio Stream Connected • Speaking with {appointment.patientName}
              </p>
            </div>

            {/* Speaking audio visualizer bar simulation */}
            <div className="flex items-center gap-1 mt-4">
              {[40, 70, 30, 90, 50, 80, 45, 65, 35].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h * 0.25}px` }}
                  className="w-1 bg-brand-teal rounded-full animate-pulse"
                />
              ))}
            </div>

            {/* Self PIP Camera View */}
            <div className="absolute bottom-4 right-4 w-36 sm:w-44 h-28 sm:h-32 rounded-xl bg-slate-950 border-2 border-slate-700 overflow-hidden shadow-xl flex items-center justify-center">
              {isVideoOn ? (
                cameraActive ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover mirror"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-2 text-slate-400">
                    <User className="w-8 h-8 mb-1 text-slate-500" />
                    <span className="text-[10px]">Camera Ready</span>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-2 text-slate-400">
                  <VideoOff className="w-6 h-6 mb-1 text-red-400" />
                  <span className="text-[10px]">Camera Off</span>
                </div>
              )}
              <span className="absolute bottom-1 left-2 text-[9px] font-bold text-white/80 bg-black/60 px-1.5 py-0.5 rounded">
                You ({isMicOn ? "Mic On" : "Muted"})
              </span>
            </div>
          </div>
        </div>

        {/* In-Call Consultation Chat Drawer */}
        {isChatOpen && (
          <div className="lg:col-span-4 bg-slate-900 border-l border-slate-800 flex flex-col h-full max-h-[520px]">
            <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-brand-teal" />
                <h3 className="text-xs font-bold text-white">Clinical In-Call Chat</h3>
              </div>
              <span className="text-[10px] text-slate-400">Confidential</span>
            </div>

            {/* Message Stream */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`p-2.5 rounded-xl ${
                    m.isSystem
                      ? "bg-slate-800 text-slate-300 border border-slate-700/60 text-[11px]"
                      : m.isDoctor
                      ? "bg-brand-teal/20 border border-brand-teal/40 text-emerald-100"
                      : "bg-brand-blue/30 border border-blue-500/40 text-blue-100 ml-4"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-[10px] opacity-80 mb-0.5">
                    <span>{m.sender}</span>
                    <span>{m.time}</span>
                  </div>
                  <p className="leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a clinical note or question..."
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-teal"
              />
              <button
                type="submit"
                className="p-2 bg-brand-teal hover:bg-brand-teal-dark rounded-xl text-white transition-colors"
                title="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Call Controls Strip */}
      <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* Mic Toggle */}
          <button
            onClick={() => setIsMicOn(!isMicOn)}
            className={`p-3 rounded-full transition-colors flex items-center gap-2 text-xs font-bold ${
              isMicOn
                ? "bg-slate-800 hover:bg-slate-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
            title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
          >
            {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            <span className="hidden sm:inline">{isMicOn ? "Mute" : "Unmuted"}</span>
          </button>

          {/* Camera Toggle */}
          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`p-3 rounded-full transition-colors flex items-center gap-2 text-xs font-bold ${
              isVideoOn
                ? "bg-slate-800 hover:bg-slate-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
            title={isVideoOn ? "Turn Camera Off" : "Turn Camera On"}
          >
            {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            <span className="hidden sm:inline">{isVideoOn ? "Stop Video" : "Start Video"}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Chat Drawer Toggle */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isChatOpen
                ? "bg-brand-teal text-white"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat Panel</span>
          </button>

          {/* End Consultation */}
          <button
            onClick={handleEndCall}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-colors"
          >
            <PhoneOff className="w-4 h-4" />
            <span>End Consultation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
