import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  HelpCircle, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  Activity, 
  Landmark, 
  Unlock, 
  Layers, 
  Eye, 
  Info,
  RotateCcw
} from 'lucide-react';

export default function App() {
  // Navigation: 
  // 'welcome' (default start) | 'home'
  // 'add-amount' | 'decision' | 'first-investment' | 'celebration'
  // 'withdraw-input' | 'withdraw-flexible-prompt' | 'withdraw-transparency' | 'withdraw-success'
  const [currentScreen, setCurrentScreen] = useState('welcome');

  // BRAND-NEW USER: State starts at exactly ₹0 for both
  const [flexibleBalance, setFlexibleBalance] = useState(0);
  const [investedBalance, setInvestedBalance] = useState(0);

  // Flow State
  const [inputAmount, setInputAmount] = useState('500');
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const parsedAddAmount = Math.max(0, parseInt(inputAmount, 10) || 0);
  const parsedWithdrawAmount = Math.max(0, parseInt(withdrawAmount, 10) || 0);
  const totalBalance = flexibleBalance + investedBalance;

  // Dynamic Investment Calculations:
  // Gains only exist if money is actually invested.
  // When money is invested, a gentle +3.0% starter gain is shown (e.g. ₹15 on ₹500).
  const hasInvestment = investedBalance > 0;
  const currentInvestedGain = hasInvestment ? Math.round(investedBalance * 0.03) : 0;
  const currentInvestedValue = investedBalance + currentInvestedGain;
  const gainPercentage = hasInvestment ? '3.0' : '0.0';

  const withdrawalCharge = 2; // Nominal placeholder (Govt STT / tax)
  const netWithdrawalAmount = Math.max(0, currentInvestedValue - withdrawalCharge);

  // Reset entire prototype back to brand-new user state (₹0 / ₹0)
  const handleResetPrototype = () => {
    setFlexibleBalance(0);
    setInvestedBalance(0);
    setInputAmount('500');
    setWithdrawAmount('');
    setIsEducationOpen(false);
    setShowInfoModal(false);
    setCurrentScreen('welcome');
    showToast('Reset to brand-new user state (₹0 balances).');
  };

  // Add Money Flow
  const handleStartAddMoney = () => {
    setInputAmount('');
    setIsEducationOpen(false);
    setCurrentScreen('add-amount');
  };

  const handleContinueToDecision = () => {
    if (parsedAddAmount > 0) {
      setCurrentScreen('decision');
    }
  };

  const handleTimingSelection = (choice) => {
    if (choice === 'Soon' || choice === 'Not sure') {
      setFlexibleBalance(prev => prev + parsedAddAmount);
      setCurrentScreen('home');
      showToast(`Added ₹${parsedAddAmount.toLocaleString('en-IN')} to Flexible money.`);
    } else if (choice === 'Later') {
      setIsEducationOpen(false);
      setCurrentScreen('first-investment');
    }
  };

  const handleInvestNow = () => {
    setCurrentScreen('celebration');
  };

  const handleReturnHomeAfterInvesting = () => {
    setInvestedBalance(prev => prev + parsedAddAmount);
    setCurrentScreen('home');
    showToast(`₹${parsedAddAmount.toLocaleString('en-IN')} invested in Nifty 50 Index Fund!`);
  };

  // Withdraw Flow
  const handleStartWithdraw = () => {
    if (totalBalance === 0) return;
    // Suggest withdrawing whatever flexible balance exists, or default chip
    setWithdrawAmount(flexibleBalance > 0 ? String(Math.min(flexibleBalance, 500)) : String(currentInvestedValue));
    setCurrentScreen('withdraw-input');
  };

  const handleContinueWithdrawInput = () => {
    if (parsedWithdrawAmount <= 0) return;

    if (flexibleBalance >= parsedWithdrawAmount) {
      setCurrentScreen('withdraw-flexible-prompt');
    } else {
      setCurrentScreen('withdraw-transparency');
    }
  };

  const handleUseFlexibleMoney = () => {
    setFlexibleBalance(prev => Math.max(0, prev - parsedWithdrawAmount));
    setCurrentScreen('home');
    showToast(`₹${parsedWithdrawAmount.toLocaleString('en-IN')} withdrawn from Flexible money. Your investments remain untouched!`);
  };

  const handleConfirmInvestmentWithdrawal = () => {
    setInvestedBalance(0);
    setCurrentScreen('withdraw-success');
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-0 sm:p-4 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Mobile container - single phone width, Groww clean look */}
      <div className="w-full max-w-[390px] bg-white min-h-screen sm:min-h-[820px] sm:max-h-[860px] sm:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:border-[8px] sm:border-[#1C1C28]/90 flex flex-col justify-between p-6 sm:p-7 relative overflow-hidden">
        
        {/* Subtle iOS-like status bar */}
        <div className="-mx-2 -mt-2 pb-3 flex justify-between items-center text-xs font-semibold text-[#8E90A6] select-none z-10">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00D09C]"></span>
            <span className="text-[11px] font-medium text-[#7C7E8C]">Groww · Keeper</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2.5 border border-[#8E90A6] rounded-sm p-0.5 flex items-center">
              <div className="h-full w-full bg-[#1C1C28] rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="absolute top-12 left-5 right-5 z-50 bg-[#1C1C28] text-white p-3.5 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckCircle2 className="w-5 h-5 text-[#00D09C] shrink-0" />
            <p className="text-xs font-medium leading-snug">{toastMessage}</p>
          </div>
        )}

        {/* Info / Reset Modal */}
        {showInfoModal && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 w-full shadow-2xl border border-slate-100 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-emerald-50 text-[#00A87D] flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 stroke-[2.4]" />
                  </div>
                  <span className="text-sm font-bold text-[#1C1C28]">Prototype State</span>
                </div>
                <button 
                  onClick={() => setShowInfoModal(false)}
                  className="text-xs font-semibold text-[#8E90A6] hover:text-[#1C1C28] p-1 cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="text-xs text-[#5A5D72] space-y-2 leading-relaxed">
                <p>
                  <strong>Current Balances:</strong><br />
                  Flexible: ₹{flexibleBalance.toLocaleString('en-IN')}<br />
                  Invested: ₹{investedBalance.toLocaleString('en-IN')} {hasInvestment && `(worth ₹${currentInvestedValue})`}
                </p>
                <p className="text-[#8E90A6]">
                  Keeper starts at ₹0 for first-time users. Balances update with real arithmetic as you add, allocate, or withdraw funds.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setShowInfoModal(false);
                    setCurrentScreen('welcome');
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-[#1C1C28] transition-colors cursor-pointer"
                >
                  Go to Intro Screen
                </button>
                <button
                  onClick={handleResetPrototype}
                  className="w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-xs font-bold text-rose-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Brand-New User (₹0)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SCREEN 1: WELCOME / INTRO SCREEN */}
        {/* ============================================================ */}
        {currentScreen === 'welcome' && (
          <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-300">
            {/* Logo Mark & Context */}
            <header className="pt-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#00A87D] shadow-xs">
                  <ShieldCheck className="w-5 h-5 stroke-[2.4]" />
                </div>
                <span className="text-xl font-bold text-[#1C1C28] tracking-tight">
                  Keeper
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00A87D] bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full ml-1">
                  for Groww
                </span>
              </div>

              {/* Exact Tagline */}
              <h1 className="text-[26px] font-bold text-[#1C1C28] tracking-tight leading-snug mt-2">
                Keep your money flexible. Invest when you're ready.
              </h1>
              <p className="text-xs text-[#7C7E8C] mt-1.5 leading-relaxed">
                Designed for first jobs, internships, freelance, and irregular income.
              </p>
            </header>

            {/* Three One-Line Reassuring Points with Small Icons */}
            <main className="my-auto py-5 flex flex-col gap-3">
              {/* Point 1 */}
              <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-slate-100/90 flex items-center gap-3.5 transition-all">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center text-[#00A87D] shrink-0 shadow-xs">
                  <Unlock className="w-4 h-4 stroke-[2.2]" />
                </div>
                <p className="text-xs font-medium text-[#1C1C28] leading-relaxed">
                  Start with any amount, no monthly lock-in.
                </p>
              </div>

              {/* Point 2 */}
              <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-slate-100/90 flex items-center gap-3.5 transition-all">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center text-[#00A87D] shrink-0 shadow-xs">
                  <Layers className="w-4 h-4 stroke-[2.2]" />
                </div>
                <p className="text-xs font-medium text-[#1C1C28] leading-relaxed">
                  Decide what's for now and what's for later.
                </p>
              </div>

              {/* Point 3 */}
              <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-slate-100/90 flex items-center gap-3.5 transition-all">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center text-[#00A87D] shrink-0 shadow-xs">
                  <Eye className="w-4 h-4 stroke-[2.2]" />
                </div>
                <p className="text-xs font-medium text-[#1C1C28] leading-relaxed">
                  Always see what happens before you withdraw.
                </p>
              </div>
            </main>

            {/* Green "Get started" button leading to home */}
            <footer className="pt-2 pb-1">
              <button
                onClick={() => setCurrentScreen('home')}
                type="button"
                className="w-full py-4 px-6 rounded-2xl bg-[#00D09C] hover:bg-[#00ba8b] active:scale-[0.99] text-[#1C1C28] font-bold text-base transition-all shadow-[0_8px_20px_rgba(0,208,156,0.25)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get started</span>
                <ArrowRight className="w-5 h-5 stroke-[2.2]" />
              </button>
              <p className="text-center text-[11px] text-[#8E90A6] mt-2.5">
                Takes 5 seconds · Start on your own terms
              </p>
            </footer>
          </div>
        )}

        {/* ============================================================ */}
        {/* SCREEN 2: HOME (STARTS BRAND-NEW & EMPTY: ₹0 & ₹0) */}
        {/* ============================================================ */}
        {currentScreen === 'home' && (
          <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-200">
            {/* Top Greeting */}
            <header className="pt-3 pb-2 flex items-start justify-between">
              <div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 mb-2.5">
                  <span className="text-[11px] font-bold tracking-wider text-[#00A87D] uppercase">
                    Keeper
                  </span>
                </div>
                <h1 className="text-[28px] font-bold text-[#1C1C28] tracking-tight leading-tight">
                  Hi Aanya 👋
                </h1>
                <p className="text-sm text-[#7C7E8C] mt-1 font-normal">
                  Your money at a glance
                </p>
              </div>

              <button
                onClick={() => setShowInfoModal(true)}
                title="Status & Reset"
                className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[#8E90A6] hover:text-[#1C1C28] mt-1 transition-colors cursor-pointer"
              >
                <Info className="w-4 h-4" />
              </button>
            </header>

            {/* Main Cards Section */}
            <main className="flex-1 flex flex-col justify-center gap-4 my-5">
              
              {/* Card: Flexible Money (Starts at ₹0) */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_24px_rgba(28,28,40,0.04)] transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700">
                      <Unlock className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                    <h2 className="text-base font-semibold text-[#1C1C28]">
                      Flexible money
                    </h2>
                  </div>
                  <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                    Ready anytime
                  </span>
                </div>

                <div className="mt-3">
                  <span className="text-[34px] font-bold text-[#1C1C28] tracking-tight leading-none block">
                    ₹{flexibleBalance.toLocaleString('en-IN')}
                  </span>
                  <p className="text-xs text-[#7C7E8C] mt-1.5 font-normal">
                    Ready when you need it.
                  </p>
                </div>
              </div>

              {/* Card: Invested (Starts at ₹0, NO gain/percentage shown when empty) */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_24px_rgba(28,28,40,0.04)] transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center text-[#00A87D]">
                      <TrendingUp className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                    <h2 className="text-base font-semibold text-[#1C1C28]">
                      Invested
                    </h2>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    Long term
                  </span>
                </div>

                <div className="mt-3">
                  <span className="text-[34px] font-bold text-[#1C1C28] tracking-tight leading-none block">
                    ₹{investedBalance.toLocaleString('en-IN')}
                  </span>
                  <p className="text-xs text-[#7C7E8C] mt-1.5 font-normal">
                    Growing for the long term.
                  </p>
                </div>

                {/* Only display gain once money is actually invested */}
                {hasInvestment && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between animate-in fade-in duration-300">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-emerald-700">
                        +₹{currentInvestedGain} (+{gainPercentage}%)
                      </span>
                      <span className="text-[11px] text-[#8E90A6]">
                        since you started.
                      </span>
                    </div>
                    <span className="text-[10px] text-[#7C7E8C] bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      normal ups & downs
                    </span>
                  </div>
                )}
              </div>

              {/* Friendly Empty-State Nudge when both are empty */}
              {totalBalance === 0 && (
                <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-slate-100 flex items-start gap-3 animate-in fade-in duration-200">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00A87D] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#1C1C28]">
                      You haven't added anything yet.
                    </p>
                    <p className="text-xs text-[#7C7E8C] mt-0.5 leading-relaxed">
                      Add your first bit of money to begin.
                    </p>
                  </div>
                </div>
              )}

            </main>

            {/* Footer Actions */}
            <footer className="pt-2 pb-1 flex flex-col items-center gap-3">
              {/* Primary Action Button */}
              <button
                onClick={handleStartAddMoney}
                type="button"
                className="w-full py-4 px-6 rounded-2xl bg-[#00D09C] hover:bg-[#00ba8b] active:scale-[0.99] text-[#1C1C28] font-bold text-base transition-all shadow-[0_8px_20px_rgba(0,208,156,0.25)] cursor-pointer"
              >
                Add money
              </button>

              {/* Secondary Withdraw Link: greyed out / inactive when empty */}
              {totalBalance > 0 ? (
                <button
                  onClick={handleStartWithdraw}
                  type="button"
                  className="text-sm font-semibold text-[#7C7E8C] hover:text-[#1C1C28] transition-colors py-1.5 px-3 cursor-pointer"
                >
                  Withdraw
                </button>
              ) : (
                <span
                  title="Add money first to enable withdrawals"
                  className="text-sm font-semibold text-slate-300 py-1.5 px-3 select-none cursor-not-allowed"
                >
                  Withdraw
                </span>
              )}
            </footer>
          </div>
        )}

        {/* ============================================================ */}
        {/* ADD MONEY SCREEN A: ENTER AMOUNT */}
        {/* ============================================================ */}
        {currentScreen === 'add-amount' && (
          <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-200">
            <div className="pt-2 pb-1 flex items-center justify-between">
              <button
                onClick={() => setCurrentScreen('home')}
                className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-[#1C1C28] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8E90A6]">
                Add money
              </span>
              <div className="w-10"></div>
            </div>

            <div className="flex-1 flex flex-col justify-center my-auto">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-[#1C1C28] tracking-tight">
                  How much would you like to add?
                </h1>
                <p className="text-xs text-[#7C7E8C] mt-1">
                  No minimum required
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_24px_rgba(28,28,40,0.04)] flex flex-col items-center">
                <div className="flex items-center justify-center gap-1.5 w-full">
                  <span className="text-4xl font-semibold text-[#8E90A6] select-none">₹</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    autoFocus
                    placeholder="0"
                    value={inputAmount}
                    onChange={(e) => setInputAmount(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full text-5xl font-extrabold text-[#1C1C28] tracking-tight text-center outline-none bg-transparent placeholder:text-slate-300"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                  {['100', '250', '500', '1000'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setInputAmount(val)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                        inputAmount === val
                          ? 'bg-[#1C1C28] text-white border-[#1C1C28]'
                          : 'bg-slate-50 text-[#7C7E8C] border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      +₹{val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#00D09C] shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                  Add whatever you're comfortable with. No monthly commitment.
                </p>
              </div>
            </div>

            <footer className="pt-2 pb-1">
              <button
                onClick={handleContinueToDecision}
                disabled={parsedAddAmount <= 0}
                type="button"
                className={`w-full py-4 px-6 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  parsedAddAmount > 0
                    ? 'bg-[#00D09C] hover:bg-[#00ba8b] active:scale-[0.99] text-[#1C1C28] shadow-[0_8px_20px_rgba(0,208,156,0.25)]'
                    : 'bg-slate-100 text-[#8E90A6] cursor-not-allowed'
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </footer>
          </div>
        )}

        {/* ============================================================ */}
        {/* ADD MONEY SCREEN B: THE KEY DECISION */}
        {/* ============================================================ */}
        {currentScreen === 'decision' && (
          <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-200">
            <div className="pt-2 pb-1 flex items-center justify-between">
              <button
                onClick={() => setCurrentScreen('add-amount')}
                className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-[#1C1C28] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                aria-label="Back to amount"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-10"></div>
            </div>

            <main className="flex-1 flex flex-col justify-center my-auto">
              <div className="text-center mb-8">
                <h1 className="text-[27px] font-bold text-[#1C1C28] tracking-tight leading-snug">
                  When might you need this money?
                </h1>
                <p className="text-xs text-[#7C7E8C] mt-2">
                  Allocating ₹{parsedAddAmount.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="flex flex-col gap-3.5">
                {/* Soon */}
                <button
                  onClick={() => handleTimingSelection('Soon')}
                  type="button"
                  className="w-full text-left bg-white hover:bg-amber-50/40 active:scale-[0.99] border border-slate-200/80 hover:border-amber-300 rounded-2xl p-4.5 transition-all shadow-[0_2px_12px_rgba(28,28,40,0.03)] flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
                      <Clock className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-[#1C1C28]">
                          Soon
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-100">
                          keeps it flexible
                        </span>
                      </div>
                      <p className="text-xs text-[#7C7E8C] mt-0.5">
                        within a month
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-amber-600 transition-colors" />
                </button>

                {/* Later */}
                <button
                  onClick={() => handleTimingSelection('Later')}
                  type="button"
                  className="w-full text-left bg-white hover:bg-emerald-50/40 active:scale-[0.99] border border-slate-200/80 hover:border-[#00D09C] rounded-2xl p-4.5 transition-all shadow-[0_2px_12px_rgba(28,28,40,0.03)] flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#00A87D]">
                      <TrendingUp className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-[#1C1C28]">
                          Later
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-[#00A87D] border border-emerald-100">
                          can be invested
                        </span>
                      </div>
                      <p className="text-xs text-[#7C7E8C] mt-0.5">
                        a few months or more
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#00D09C] transition-colors" />
                </button>

                {/* Not sure */}
                <button
                  onClick={() => handleTimingSelection('Not sure')}
                  type="button"
                  className="w-full text-left bg-white hover:bg-slate-50 active:scale-[0.99] border border-slate-200/80 hover:border-slate-300 rounded-2xl p-4.5 transition-all shadow-[0_2px_12px_rgba(28,28,40,0.03)] flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#7C7E8C]">
                      <HelpCircle className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-[#1C1C28]">
                          Not sure
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-[#5A5D72] border border-slate-200">
                          keeps it flexible for now
                        </span>
                      </div>
                      <p className="text-xs text-[#7C7E8C] mt-0.5">
                        I'll decide later
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#1C1C28] transition-colors" />
                </button>
              </div>
            </main>

            <div className="pb-2"></div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ADD MONEY SCREEN C: FIRST INVESTMENT (NIFTY 50 INDEX FUND) */}
        {/* ============================================================ */}
        {currentScreen === 'first-investment' && (
          <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-200">
            <div className="pt-2 pb-1 flex items-center justify-between">
              <button
                onClick={() => setCurrentScreen('decision')}
                className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-[#1C1C28] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#00A87D]">
                First Investment
              </span>
              <div className="w-10"></div>
            </div>

            <main className="flex-1 flex flex-col justify-center my-auto">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-[#1C1C28] tracking-tight">
                  Your first investment
                </h1>
                <p className="text-xs text-[#7C7E8C] mt-1">
                  One recommended choice. No catalogue clutter.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_24px_rgba(28,28,40,0.04)] transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#00A87D]">
                      <TrendingUp className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A87D]">
                      Recommended
                    </span>
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-50 text-[#7C7E8C] border border-slate-100">
                    50 Companies
                  </span>
                </div>

                <h2 className="text-lg font-bold text-[#1C1C28]">
                  Nifty 50 Index Fund
                </h2>

                <p className="text-xs text-[#5A5D72] mt-2 leading-relaxed">
                  This spreads your money across 50 of India's biggest companies. It can rise and fall, but it's built to grow over the long run.
                </p>

                {/* Expandable "What does this mean?" Education Section */}
                <div className="mt-4 pt-3.5 border-t border-slate-100">
                  <button
                    onClick={() => setIsEducationOpen(!isEducationOpen)}
                    type="button"
                    className="w-full flex items-center justify-between text-left py-1 text-xs font-semibold text-[#00A87D] hover:text-[#00875A] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-[#00D09C]" />
                      What does this mean?
                    </span>
                    {isEducationOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#8E90A6]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#8E90A6]" />
                    )}
                  </button>

                  {isEducationOpen && (
                    <div className="mt-3 space-y-2.5 pt-1 text-xs text-[#5A5D72] animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="bg-[#F8F9FA] rounded-2xl p-3 border border-slate-100 flex items-start gap-2.5">
                        <Building2 className="w-4 h-4 text-[#00A87D] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#1C1C28] block text-[11px] mb-0.5 uppercase tracking-wide">
                            What is an index fund?
                          </span>
                          <p className="text-[#7C7E8C] text-[11px] leading-relaxed">
                            Instead of picking individual stocks, your money buys a small piece of India's top 50 companies all at once.
                          </p>
                        </div>
                      </div>

                      <div className="bg-[#F8F9FA] rounded-2xl p-3 border border-slate-100 flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#1C1C28] block text-[11px] mb-0.5 uppercase tracking-wide">
                            Why time horizon matters
                          </span>
                          <p className="text-[#7C7E8C] text-[11px] leading-relaxed">
                            Because you picked "Later," you give your money time to ride out short-term bumps and grow steadily.
                          </p>
                        </div>
                      </div>

                      <div className="bg-[#F8F9FA] rounded-2xl p-3 border border-slate-100 flex items-start gap-2.5">
                        <Activity className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#1C1C28] block text-[11px] mb-0.5 uppercase tracking-wide">
                            Ups and downs are normal
                          </span>
                          <p className="text-[#7C7E8C] text-[11px] leading-relaxed">
                            Daily ups and downs are completely normal for index funds—a dip isn't a failure, just regular market movement.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[#8E90A6] text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00D09C]" />
                <span>Zero exit penalties · You can withdraw anytime</span>
              </div>
            </main>

            <footer className="pt-2 pb-1">
              <button
                onClick={handleInvestNow}
                type="button"
                className="w-full py-4 px-6 rounded-2xl bg-[#00D09C] hover:bg-[#00ba8b] active:scale-[0.99] text-[#1C1C28] font-bold text-base transition-all shadow-[0_8px_20px_rgba(0,208,156,0.25)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Invest ₹{parsedAddAmount.toLocaleString('en-IN')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </footer>
          </div>
        )}

        {/* ============================================================ */}
        {/* ADD MONEY SCREEN D: CELEBRATION */}
        {/* ============================================================ */}
        {currentScreen === 'celebration' && (
          <div className="flex-1 flex flex-col justify-between p-2 animate-in fade-in zoom-in-95 duration-300">
            <div className="pt-2 flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[#00A87D] text-[11px] font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#00D09C]" />
                <span>First milestone</span>
              </div>
            </div>

            <main className="flex-1 flex flex-col items-center justify-center text-center my-auto">
              <div className="relative mb-5">
                <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#00D09C] shadow-sm">
                  <CheckCircle2 className="w-10 h-10 text-[#00A87D] stroke-[2.2]" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 animate-bounce">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>

              <h1 className="text-2xl font-extrabold text-[#1C1C28] tracking-tight leading-snug max-w-[310px]">
                You just made your first investment 🎉 You're an investor now.
              </h1>

              <p className="text-xs text-[#7C7E8C] mt-2.5 max-w-[270px] leading-relaxed">
                ₹{parsedAddAmount.toLocaleString('en-IN')} is now invested in Nifty 50 Index Fund.
              </p>

              <div className="mt-5 w-full max-w-[290px] bg-[#F8F9FA] rounded-2xl p-4 border border-slate-100 text-left">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200/60">
                  <span className="text-[#8E90A6]">Invested in</span>
                  <span className="font-semibold text-[#1C1C28]">Nifty 50 Index Fund</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="text-[#8E90A6]">Amount</span>
                  <span className="font-bold text-[#1C1C28]">₹{parsedAddAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] text-[#7C7E8C] flex items-start gap-1.5 leading-relaxed">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00D09C] shrink-0 mt-0.5" />
                  <span>No need to check daily. It's built to grow quietly for the long term.</span>
                </div>
              </div>
            </main>

            <footer className="pt-2 pb-1">
              <button
                onClick={handleReturnHomeAfterInvesting}
                type="button"
                className="w-full py-4 px-6 rounded-2xl bg-[#00D09C] hover:bg-[#00ba8b] active:scale-[0.99] text-[#1C1C28] font-bold text-base transition-all shadow-[0_8px_20px_rgba(0,208,156,0.25)] cursor-pointer"
              >
                Go to home
              </button>
            </footer>
          </div>
        )}

        {/* ============================================================ */}
        {/* WITHDRAW FLOW: STEP 0 - HOW MUCH DO YOU NEED? */}
        {/* ============================================================ */}
        {currentScreen === 'withdraw-input' && (
          <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-200">
            <div className="pt-2 pb-1 flex items-center justify-between">
              <button
                onClick={() => setCurrentScreen('home')}
                className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-[#1C1C28] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8E90A6]">
                Withdraw
              </span>
              <div className="w-10"></div>
            </div>

            <div className="flex-1 flex flex-col justify-center my-auto">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-[#1C1C28] tracking-tight">
                  How much do you need?
                </h1>
                <p className="text-xs text-[#7C7E8C] mt-1">
                  We'll help you access it without breaking good habits
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_24px_rgba(28,28,40,0.04)] flex flex-col items-center">
                <div className="flex items-center justify-center gap-1.5 w-full">
                  <span className="text-4xl font-semibold text-[#8E90A6] select-none">₹</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    autoFocus
                    placeholder="0"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full text-5xl font-extrabold text-[#1C1C28] tracking-tight text-center outline-none bg-transparent placeholder:text-slate-300"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                  {[
                    flexibleBalance > 0 ? String(flexibleBalance) : null,
                    '250',
                    '500',
                    '800'
                  ].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setWithdrawAmount(val)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                        withdrawAmount === val
                          ? 'bg-[#1C1C28] text-white border-[#1C1C28]'
                          : 'bg-slate-50 text-[#7C7E8C] border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      ₹{val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 bg-[#F8F9FA] rounded-2xl p-4 border border-slate-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#00D09C] shrink-0 mt-0.5" />
                <p className="text-xs text-[#7C7E8C] leading-relaxed">
                  Available in flexible money: <strong className="text-[#1C1C28]">₹{flexibleBalance.toLocaleString('en-IN')}</strong>.
                </p>
              </div>
            </div>

            <footer className="pt-2 pb-1">
              <button
                onClick={handleContinueWithdrawInput}
                disabled={parsedWithdrawAmount <= 0}
                type="button"
                className={`w-full py-4 px-6 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  parsedWithdrawAmount > 0
                    ? 'bg-[#00D09C] hover:bg-[#00ba8b] active:scale-[0.99] text-[#1C1C28] shadow-[0_8px_20px_rgba(0,208,156,0.25)]'
                    : 'bg-slate-100 text-[#8E90A6] cursor-not-allowed'
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </footer>
          </div>
        )}

        {/* ============================================================ */}
        {/* WITHDRAW STEP 1: CHECK FLEXIBLE MONEY FIRST (PROTECTED CHOICE) */}
        {/* ============================================================ */}
        {currentScreen === 'withdraw-flexible-prompt' && (
          <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-200">
            <div className="pt-2 pb-1 flex items-center justify-between">
              <button
                onClick={() => setCurrentScreen('withdraw-input')}
                className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-[#1C1C28] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#00A87D]">
                Protected Choice
              </span>
              <div className="w-10"></div>
            </div>

            <main className="flex-1 flex flex-col justify-center my-auto">
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#00A87D] mx-auto mb-4">
                  <ShieldCheck className="w-7 h-7 stroke-[2.2]" />
                </div>

                <h1 className="text-[23px] font-bold text-[#1C1C28] tracking-tight leading-snug">
                  You have ₹{flexibleBalance.toLocaleString('en-IN')} in flexible money. Use that and keep your investment growing?
                </h1>

                <p className="text-xs text-[#7C7E8C] mt-2 max-w-[270px] mx-auto">
                  You're withdrawing ₹{parsedWithdrawAmount.toLocaleString('en-IN')}.
                </p>
              </div>

              <div className="flex flex-col gap-3.5">
                {/* Option 1: Use flexible money (Recommended, green, highlighted) */}
                <button
                  onClick={handleUseFlexibleMoney}
                  type="button"
                  className="w-full text-left bg-emerald-50/70 hover:bg-emerald-50 border-2 border-[#00D09C] rounded-2xl p-4.5 transition-all shadow-[0_4px_16px_rgba(0,208,156,0.15)] flex items-start gap-3.5 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#00D09C] text-[#1C1C28] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-[#1C1C28]">
                        Use flexible money
                      </span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#00D09C] text-[#1C1C28]">
                        Recommended
                      </span>
                    </div>
                    <p className="text-xs text-[#5A5D72] mt-1 leading-relaxed">
                      Instant withdrawal · Zero lock-in · Your ₹{investedBalance.toLocaleString('en-IN')} investment stays untouched and keeps compounding.
                    </p>
                  </div>
                </button>

                {/* Option 2: Withdraw from investment instead (Secondary, muted) */}
                {hasInvestment && (
                  <button
                    onClick={() => setCurrentScreen('withdraw-transparency')}
                    type="button"
                    className="w-full text-left bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-4 transition-all flex items-center justify-between text-[#7C7E8C] hover:text-[#1C1C28] cursor-pointer"
                  >
                    <div>
                      <span className="text-sm font-semibold text-[#5A5D72] block">
                        Withdraw from investment instead
                      </span>
                      <span className="text-xs text-[#8E90A6]">
                        Sells shares in Nifty 50 Index Fund
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#8E90A6]" />
                  </button>
                )}
              </div>
            </main>

            <div className="pb-2"></div>
          </div>
        )}

        {/* ============================================================ */}
        {/* WITHDRAW STEP 2: FULL TRANSPARENCY SCREEN */}
        {/* ============================================================ */}
        {currentScreen === 'withdraw-transparency' && (
          <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-200">
            <div className="pt-2 pb-1 flex items-center justify-between">
              <button
                onClick={() => {
                  if (flexibleBalance >= parsedWithdrawAmount) {
                    setCurrentScreen('withdraw-flexible-prompt');
                  } else {
                    setCurrentScreen('withdraw-input');
                  }
                }}
                className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-[#1C1C28] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8E90A6]">
                Transparency
              </span>
              <div className="w-10"></div>
            </div>

            <main className="flex-1 flex flex-col justify-center my-auto">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-[#1C1C28] tracking-tight">
                  Before you confirm
                </h1>
                <p className="text-xs text-[#7C7E8C] mt-1">
                  Here is the exact breakdown of selling your investment.
                </p>
              </div>

              {/* Exact Transparency Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_24px_rgba(28,28,40,0.04)] space-y-3.5">
                {/* 1. Amount invested */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#7C7E8C] font-medium">Amount invested</span>
                  <span className="font-semibold text-[#1C1C28]">
                    ₹{investedBalance.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* 2. Current value */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#7C7E8C] font-medium">Current value</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#1C1C28]">
                      ₹{currentInvestedValue.toLocaleString('en-IN')}
                    </span>
                    {hasInvestment && (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        +{gainPercentage}%
                      </span>
                    )}
                  </div>
                </div>

                {/* 3. Applicable charges/taxes */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                  <span className="text-[#7C7E8C] font-medium">Applicable charges/taxes</span>
                  <span className="font-medium text-[#5A5D72]">
                    ₹{withdrawalCharge} <span className="text-[10px] text-[#8E90A6]">(Govt STT / stamp)</span>
                  </span>
                </div>

                {/* 4. You'll receive */}
                <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-100">
                  <span className="font-bold text-[#1C1C28]">You'll receive</span>
                  <span className="text-lg font-extrabold text-[#00A87D]">
                    ₹{netWithdrawalAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* 5. Settles in */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="text-[#7C7E8C] font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    Settles in
                  </span>
                  <span className="font-semibold text-[#1C1C28]">
                    2-3 working days
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3.5 rounded-2xl bg-[#F8F9FA] border border-slate-100 flex items-start gap-2.5 text-[#7C7E8C] text-xs leading-relaxed">
                <Landmark className="w-4 h-4 text-[#00A87D] shrink-0 mt-0.5" />
                <span>
                  The money will be sent directly to your linked bank account. You can always restart investing whenever you have spare cash again.
                </span>
              </div>
            </main>

            <footer className="pt-2 pb-1 flex flex-col gap-2">
              <button
                onClick={handleConfirmInvestmentWithdrawal}
                type="button"
                className="w-full py-4 px-6 rounded-2xl bg-[#1C1C28] hover:bg-slate-800 active:scale-[0.99] text-white font-bold text-base transition-all shadow-md cursor-pointer"
              >
                Confirm withdrawal
              </button>

              <button
                onClick={() => setCurrentScreen('home')}
                type="button"
                className="text-xs font-semibold text-[#7C7E8C] hover:text-[#1C1C28] text-center py-2 cursor-pointer"
              >
                Keep my money invested
              </button>
            </footer>
          </div>
        )}

        {/* ============================================================ */}
        {/* WITHDRAW SUCCESS CONFIRMATION */}
        {/* ============================================================ */}
        {currentScreen === 'withdraw-success' && (
          <div className="flex-1 flex flex-col justify-between p-2 animate-in fade-in zoom-in-95 duration-300">
            <div className="pt-2 flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[#5A5D72] text-[11px] font-semibold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Withdrawal Initiated</span>
              </div>
            </div>

            <main className="flex-1 flex flex-col items-center justify-center text-center my-auto">
              <div className="w-18 h-18 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#00D09C] mb-4">
                <CheckCircle2 className="w-9 h-9 text-[#00A87D] stroke-[2.2]" />
              </div>

              <h1 className="text-2xl font-bold text-[#1C1C28] tracking-tight leading-snug">
                Your ₹{netWithdrawalAmount.toLocaleString('en-IN')} is on its way
              </h1>

              <p className="text-xs text-[#7C7E8C] mt-2 max-w-[270px] leading-relaxed">
                It will settle into your primary bank account in 2-3 working days.
              </p>

              <div className="mt-5 w-full max-w-[290px] bg-[#F8F9FA] rounded-2xl p-4 border border-slate-100 text-left">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200/60">
                  <span className="text-[#8E90A6]">Total gain received</span>
                  <span className="font-bold text-emerald-700">+₹{currentInvestedGain} (+{gainPercentage}%)</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="text-[#8E90A6]">Destination</span>
                  <span className="font-semibold text-[#1C1C28]">Linked Bank Account</span>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] text-[#7C7E8C] flex items-start gap-1.5 leading-relaxed">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00D09C] shrink-0 mt-0.5" />
                  <span>Whenever you're ready again, Keeper makes restarting just as easy.</span>
                </div>
              </div>
            </main>

            <footer className="pt-2 pb-1">
              <button
                onClick={() => setCurrentScreen('home')}
                type="button"
                className="w-full py-4 px-6 rounded-2xl bg-[#00D09C] hover:bg-[#00ba8b] active:scale-[0.99] text-[#1C1C28] font-bold text-base transition-all shadow-[0_8px_20px_rgba(0,208,156,0.25)] cursor-pointer"
              >
                Return to home
              </button>
            </footer>
          </div>
        )}

        {/* iOS Home Indicator */}
        <div className="pt-2 flex justify-center select-none">
          <div className="w-32 h-1 bg-slate-200 rounded-full"></div>
        </div>

      </div>
    </div>
  );
}
