import React, { useState, useEffect, useRef } from 'react';
import { Activity, Gauge, Flame, Wrench, RotateCcw, AlertTriangle, ShieldCheck, Terminal, Play, Square, ChevronRight } from 'lucide-react';

interface EcuDiagnosticLabProps {
  isDarkMode: boolean;
  soundEnabled: boolean;
}

export const EcuDiagnosticLab: React.FC<EcuDiagnosticLabProps> = ({ isDarkMode, soundEnabled }) => {
  const [engineStarted, setEngineStarted] = useState<boolean>(false);
  const [throttle, setThrottle] = useState<number>(18); // 0 to 100%
  const [rpm, setRpm] = useState<number>(850); // idle RPM
  const [dynoHp, setDynoHp] = useState<number>(45);
  const [dynoTorque, setDynoTorque] = useState<number>(120);
  const [coolantTemp, setCoolantTemp] = useState<number>(88);
  const [mapPressure, setMapPressure] = useState<number>(38.4);
  const [packetLogs, setPacketLogs] = useState<string[]>([
    'TX [0x68 0x6A 0xF1 0x01 0x0C]: REQ RPM_MODE_1',
    'RX [0x48 0x6B 0x11 0x41 0x0C 0x1A 0x90]: RESP 850 RPM [OK]',
    'TX [0x68 0x6A 0xF1 0x01 0x05]: REQ ECT_TEMP_MODE_1',
    'RX [0x48 0x6B 0x11 0x41 0x05 0x78]: RESP 88 °C [OK]'
  ]);
  const [dtcCleared, setDtcCleared] = useState<boolean>(true);

  // Engine loop
  useEffect(() => {
    if (!engineStarted) {
      setRpm(0);
      setDynoHp(0);
      setDynoTorque(0);
      return;
    }

    const interval = setInterval(() => {
      // Calculate RPM based on throttle
      const targetRpm = 850 + (throttle / 100) * 6500;
      setRpm((prev) => {
        const jitter = Math.floor(Math.random() * 30) - 15;
        const nextRpm = Math.round(prev + (targetRpm - prev) * 0.25 + jitter);
        const clampedRpm = Math.max(820, Math.min(7800, nextRpm));

        // Calculate Dyno numbers
        // Torque peak around 4800 RPM
        const normalizedTorque = Math.sin((clampedRpm / 7800) * Math.PI) * 480 + 120;
        const calculatedHp = Math.round((normalizedTorque * clampedRpm) / 7127);
        setDynoHp(calculatedHp);
        setDynoTorque(Math.round(normalizedTorque));

        // MAP pressure
        setMapPressure(parseFloat((28 + (throttle / 100) * 72 + Math.random() * 0.8).toFixed(1)));

        return clampedRpm;
      });

      // Stream packet log
      if (Math.random() > 0.6) {
        const hexVal1 = (Math.floor(rpm / 4) >> 8).toString(16).toUpperCase().padStart(2, '0');
        const hexVal2 = (Math.floor(rpm / 4) & 0xff).toString(16).toUpperCase().padStart(2, '0');
        setPacketLogs((prev) => [
          `RX [0x48 0x6B 0x11 0x41 0x0C 0x${hexVal1} 0x${hexVal2}]: LIVE ${rpm} RPM [OK]`,
          ...prev.slice(0, 5)
        ]);
      }
    }, 180);

    return () => clearInterval(interval);
  }, [engineStarted, throttle, rpm]);

  const handleToggleEngine = () => {
    setEngineStarted(!engineStarted);
    if (!engineStarted) {
      setRpm(850);
      setPacketLogs((prev) => [
        'INIT: K-Line Fast Init [0x00 0x55 0x08 0x08 0x01] Handshake OK',
        ...prev
      ]);
    }
  };

  const handleClearDtc = () => {
    setDtcCleared(true);
    setPacketLogs((prev) => [
      'TX [0x68 0x6A 0xF1 0x04]: CLEAR DIAGNOSTIC TROUBLE CODES',
      'RX [0x48 0x6B 0x11 0x44]: ALL DTC CODES CLEARED SUCCESSFULLY [OK]',
      ...prev
    ]);
  };

  return (
    <section id="dyno-ecu" className="w-full space-y-6 pt-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-widest block flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>INTERACTIVE TEST BENCH</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            کنسول شبیه‌ساز داینو و عیب‌یابی دیاگ ECU خودرو
          </h2>
          <p className="text-sm text-[#b9cacb] mt-1 max-w-2xl">
            محیط تست عملیاتی بلادرنگ: پیاده‌سازی پروتکل ISO 14230 (KWP2000)، استخراج زنده پارامترهای موتور، رسم گراف داینامومتر و استریم بسته‌ها.
          </p>
        </div>

        {/* Engine Start / Stop Button */}
        <button
          onClick={handleToggleEngine}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs transition-all shadow-xl ${
            engineStarted
              ? 'bg-[#ffb4ab] text-[#690005] hover:bg-[#ffdad6] shadow-[0_0_20px_rgba(255,180,171,0.4)]'
              : 'bg-gradient-to-r from-[#00f0ff] to-[#00a3ff] text-[#002022] hover:scale-105 shadow-[0_0_24px_rgba(0,240,255,0.5)]'
          }`}
        >
          {engineStarted ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          <span>{engineStarted ? 'خاموش کردن موتور (Stop Engine)' : 'استارت شبیه‌ساز موتور (Start Engine)'}</span>
        </button>
      </div>

      {/* Main Interactive Test Bench Console */}
      <div
        className={`p-4 sm:p-8 rounded-3xl border border-white/15 space-y-4 sm:space-y-6 relative overflow-hidden ${
          isDarkMode ? 'glass-panel-elevated' : 'glass-panel-elevated-light'
        }`}
      >
        {/* Top Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10 text-[11px] font-mono">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className={`flex items-center gap-1.5 font-bold ${engineStarted ? 'text-[#65f2b5]' : 'text-[#849495]'}`}>
              <span className={`w-2 h-2 rounded-full ${engineStarted ? 'bg-[#65f2b5] animate-ping' : 'bg-[#849495]'}`} />
              ECU LINK: {engineStarted ? 'EMS71 ONLINE' : 'STANDBY'}
            </span>
            <span className="text-[#849495] hidden sm:inline">|</span>
            <span className="text-[#00f0ff] truncate">K-LINE ISO 14230</span>
          </div>

          <div className="flex items-center gap-3 text-[#dfe2ef]">
            <span>ENGINE: <strong className={engineStarted ? 'text-[#65f2b5]' : 'text-red-400'}>{engineStarted ? 'RUNNING' : 'OFF'}</strong></span>
            <span>LOOP: <strong>50 Hz</strong></span>
          </div>
        </div>

        {/* Big Telemetry Gauges Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {/* Gauge 1: RPM */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-2">
            <span className="text-[11px] font-mono text-[#849495] block">دور موتور (RPM)</span>
            <div className="text-2xl font-bold font-mono text-[#00f0ff]">
              {rpm.toLocaleString('fa-IR')}
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00f0ff] to-[#a855f7] transition-all duration-150"
                style={{ width: `${(rpm / 8000) * 100}%` }}
              />
            </div>
          </div>

          {/* Gauge 2: Dyno Horsepower */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-2">
            <span className="text-[11px] font-mono text-[#849495] block">توان داینو (BHP)</span>
            <div className="text-2xl font-bold font-mono text-[#65f2b5]">
              {dynoHp.toLocaleString('fa-IR')} <span className="text-xs font-normal">اسب</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-[#65f2b5] transition-all duration-150"
                style={{ width: `${(dynoHp / 550) * 100}%` }}
              />
            </div>
          </div>

          {/* Gauge 3: Dyno Torque */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-2">
            <span className="text-[11px] font-mono text-[#849495] block">گشتاور (Torque Nm)</span>
            <div className="text-2xl font-bold font-mono text-[#d0bcff]">
              {dynoTorque.toLocaleString('fa-IR')} <span className="text-xs font-normal">N.m</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-[#a855f7] transition-all duration-150"
                style={{ width: `${(dynoTorque / 600) * 100}%` }}
              />
            </div>
          </div>

          {/* Gauge 4: MAP Pressure */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-2">
            <span className="text-[11px] font-mono text-[#849495] block">فشار منیفولد (MAP)</span>
            <div className="text-2xl font-bold font-mono text-white">
              {mapPressure} <span className="text-xs font-normal">kPa</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-150"
                style={{ width: `${(mapPressure / 105) * 100}%` }}
              />
            </div>
          </div>

          {/* Gauge 5: Coolant Temp */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-2">
            <span className="text-[11px] font-mono text-[#849495] block">دمای مایع خنک‌کننده</span>
            <div className="text-2xl font-bold font-mono text-[#65f2b5]">
              {coolantTemp} <span className="text-xs font-normal">°C</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-[#65f2b5]"
                style={{ width: `${(coolantTemp / 120) * 100}%` }}
              />
            </div>
          </div>

          {/* Gauge 6: Battery Voltage */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-2">
            <span className="text-[11px] font-mono text-[#849495] block">ولتاژ دینام (BATT)</span>
            <div className="text-2xl font-bold font-mono text-[#00f0ff]">
              {engineStarted ? '14.2' : '12.4'} <span className="text-xs font-normal">V</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-[#00f0ff]"
                style={{ width: engineStarted ? '90%' : '75%' }}
              />
            </div>
          </div>
        </div>

        {/* Throttle Pedal Controller Slider */}
        <div className="p-3.5 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 sm:space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-white font-bold flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#00f0ff] shrink-0" />
              <span className="truncate">پدال گاز الکترونیکی (TPS)</span>
            </span>
            <span className="text-[#00f0ff] font-bold text-sm shrink-0">{throttle}%</span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={throttle}
            disabled={!engineStarted}
            onChange={(e) => setThrottle(Number(e.target.value))}
            className="w-full h-2 bg-black/60 rounded-lg appearance-none cursor-pointer accent-[#00f0ff] disabled:opacity-40"
          />

          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#849495]">
            <span>درجا (IDLE)</span>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                disabled={!engineStarted}
                onClick={() => setThrottle(25)}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 text-[10px] sm:text-xs"
              >
                25%
              </button>
              <button
                disabled={!engineStarted}
                onClick={() => setThrottle(50)}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 text-[10px] sm:text-xs"
              >
                50%
              </button>
              <button
                disabled={!engineStarted}
                onClick={() => setThrottle(85)}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 text-[10px] sm:text-xs"
              >
                85%
              </button>
              <button
                disabled={!engineStarted}
                onClick={() => setThrottle(100)}
                className="px-2 py-0.5 rounded bg-[#00f0ff]/20 text-[#00f0ff] font-bold disabled:opacity-30 text-[10px] sm:text-xs"
              >
                100% WOT
              </button>
            </div>
            <span>حداکثر</span>
          </div>
        </div>

        {/* Bottom DTC Trouble Code & K-Line Packet Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* DTC Diagnostic Box */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#65f2b5]" />
                <span>کدهای خطای تشخیصی (DTC Memory)</span>
              </span>
              <button
                onClick={handleClearDtc}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-[#65f2b5] transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>پاک کردن خطاها</span>
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[#090d16] text-xs font-mono space-y-1.5 border border-white/5">
              <div className="text-[#65f2b5] flex items-center gap-1.5">
                <span>✔</span>
                <span>P0000: NO ACTIVE DIAGNOSTIC TROUBLE CODES</span>
              </div>
              <div className="text-[#b9cacb]">MIL LAMP STATUS: OFF | READINESS: 8/8 MONITORS PASSED</div>
              <div className="text-[#849495]">FUEL INJECTION CONTROL: CLOSED LOOP ACTIVE</div>
            </div>
          </div>

          {/* K-Line Stream Packet Monitor */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00f0ff]" />
                <span>لاگ بسته‌های ارسالی و دریافتی K-Line</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00f0ff]/15 text-[#00f0ff]">
                LIVE STREAM
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#090d16] text-[11px] font-mono space-y-1 border border-white/5 max-h-28 overflow-y-auto">
              {packetLogs.map((log, idx) => (
                <div key={idx} className={log.startsWith('TX') ? 'text-[#00f0ff]' : log.startsWith('INIT') ? 'text-[#a855f7]' : 'text-[#65f2b5]'}>
                  &gt; {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
