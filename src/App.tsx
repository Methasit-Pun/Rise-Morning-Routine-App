import React, { useState, useEffect } from 'react';
import { Sun, Moon, Trophy, ArrowRight, CheckCircle2, Dumbbell, Home, Cog as Yoga, FileWarning as Running, Timer, SkipBack as Skip, ArrowLeft, Brain, Coffee, ShowerHead as Shower, Shirt, ClipboardCheck, Trash2 } from 'lucide-react';

type Step = 'initial' | 'workout' | 'meditation' | 'stretch' | 'breakfast' | 'shower' | 'dressed' | 'space' | 'declutter' | 'complete';
type WorkoutType = 'home' | 'gym' | 'yoga' | 'cardio' | null;

function App() {
  const [sleptWell, setSleptWell] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(5);
  const [currentStep, setCurrentStep] = useState<Step>('initial');
  const [workoutType, setWorkoutType] = useState<WorkoutType>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: number | null = null;
    if (isTimerRunning && timer !== null && timer > 0) {
      interval = window.setInterval(() => {
        setTimer(prev => prev !== null ? prev - 1 : null);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      setTimer(null);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (duration: number) => {
    setTimer(duration);
    setIsTimerRunning(true);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'initial':
        return (
          <>
            <div className="text-center my-12">
              <p className="text-2xl md:text-3xl font-light text-dawn-100 max-w-2xl mx-auto leading-relaxed">
                "Don't wake up to watch the sunrise.
                <br />
                Wake up earlier and let the sun watch you rise."
              </p>
            </div>

            <div className="relative h-40 flex items-center justify-center mb-12">
              <div className="absolute w-40 h-40 bg-dawn-500/20 rounded-full animate-float"></div>
              <Sun className="w-20 h-20 text-yellow-400 z-10 animate-float" />
            </div>

            <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-6 text-center">How did you sleep?</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSleptWell(true)}
                  className={`flex items-center justify-center gap-2 p-4 rounded-xl transition
                    ${sleptWell === true 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white/5 hover:bg-white/10'}`}
                >
                  <Sun className="w-6 h-6" />
                  <span>Well Rested</span>
                  {sleptWell === true && <CheckCircle2 className="w-5 h-5 ml-2" />}
                </button>

                <button
                  onClick={() => setSleptWell(false)}
                  className={`flex items-center justify-center gap-2 p-4 rounded-xl transition
                    ${sleptWell === false 
                      ? 'bg-dawn-600 text-white' 
                      : 'bg-white/5 hover:bg-white/10'}`}
                >
                  <Moon className="w-6 h-6" />
                  <span>Tired</span>
                  {sleptWell === false && <CheckCircle2 className="w-5 h-5 ml-2" />}
                </button>
              </div>

              {sleptWell !== null && (
                <button 
                  onClick={() => setCurrentStep(sleptWell ? 'workout' : 'meditation')}
                  className="w-full mt-6 bg-dawn-500 hover:bg-dawn-600 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  Start Your Morning
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </>
        );

      case 'workout':
        return (
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">Quick 20-Minute Workout</h2>
            {!workoutType ? (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setWorkoutType('home')}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/5 hover:bg-white/10 transition"
                >
                  <Home className="w-8 h-8" />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => setWorkoutType('gym')}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/5 hover:bg-white/10 transition"
                >
                  <Dumbbell className="w-8 h-8" />
                  <span>Gym</span>
                </button>
                <button
                  onClick={() => setWorkoutType('yoga')}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/5 hover:bg-white/10 transition"
                >
                  <Yoga className="w-8 h-8" />
                  <span>Yoga</span>
                </button>
                <button
                  onClick={() => setWorkoutType('cardio')}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/5 hover:bg-white/10 transition"
                >
                  <Running className="w-8 h-8" />
                  <span>Cardio</span>
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-8">
                  <div className="text-6xl font-bold mb-4">
                    {timer !== null ? formatTime(timer) : '20:00'}
                  </div>
                  {!isTimerRunning && timer === null && (
                    <button
                      onClick={() => startTimer(1200)}
                      className="bg-dawn-500 hover:bg-dawn-600 text-white py-3 px-6 rounded-xl inline-flex items-center gap-2 transition"
                    >
                      <Timer className="w-5 h-5" />
                      Start Timer
                    </button>
                  )}
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setCurrentStep('stretch')}
                    className="bg-white/20 hover:bg-white/30 py-2 px-4 rounded-lg transition flex items-center gap-2"
                  >
                    <Skip className="w-4 h-4" />
                    Skip
                  </button>
                  {timer === null && (
                    <button
                      onClick={() => setCurrentStep('stretch')}
                      className="bg-dawn-500 hover:bg-dawn-600 py-2 px-4 rounded-lg transition flex items-center gap-2"
                    >
                      <ArrowRight className="w-4 h-4" />
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 'meditation':
        return (
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">Morning Meditation</h2>
            <div className="text-center">
              <Brain className="w-16 h-16 mx-auto mb-6 text-dawn-300" />
              <div className="mb-8">
                <div className="text-6xl font-bold mb-4">
                  {timer !== null ? formatTime(timer) : '10:00'}
                </div>
                {!isTimerRunning && timer === null && (
                  <button
                    onClick={() => startTimer(600)}
                    className="bg-dawn-500 hover:bg-dawn-600 text-white py-3 px-6 rounded-xl inline-flex items-center gap-2 transition"
                  >
                    <Timer className="w-5 h-5" />
                    Start Timer
                  </button>
                )}
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setCurrentStep('breakfast')}
                  className="bg-white/20 hover:bg-white/30 py-2 px-4 rounded-lg transition flex items-center gap-2"
                >
                  <Skip className="w-4 h-4" />
                  Skip
                </button>
                {timer === null && (
                  <button
                    onClick={() => setCurrentStep('breakfast')}
                    className="bg-dawn-500 hover:bg-dawn-600 py-2 px-4 rounded-lg transition flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        );

      case 'stretch':
        return (
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">Stretch Your Muscles</h2>
            <div className="text-center">
              <Yoga className="w-16 h-16 mx-auto mb-6 text-dawn-300" />
              <div className="mb-8">
                <div className="text-6xl font-bold mb-4">
                  {timer !== null ? formatTime(timer) : '5:00'}
                </div>
                {!isTimerRunning && timer === null && (
                  <button
                    onClick={() => startTimer(300)}
                    className="bg-dawn-500 hover:bg-dawn-600 text-white py-3 px-6 rounded-xl inline-flex items-center gap-2 transition"
                  >
                    <Timer className="w-5 h-5" />
                    Start Timer
                  </button>
                )}
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setCurrentStep('breakfast')}
                  className="bg-white/20 hover:bg-white/30 py-2 px-4 rounded-lg transition flex items-center gap-2"
                >
                  <Skip className="w-4 h-4" />
                  Skip
                </button>
                {timer === null && (
                  <button
                    onClick={() => setCurrentStep('breakfast')}
                    className="bg-dawn-500 hover:bg-dawn-600 py-2 px-4 rounded-lg transition flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        );

      case 'breakfast':
        return (
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">Eat Breakfast</h2>
            <div className="text-center">
              <Coffee className="w-16 h-16 mx-auto mb-6 text-dawn-300" />
              <p className="text-lg mb-8">Take time to enjoy a healthy breakfast</p>
              <button
                onClick={() => setCurrentStep('shower')}
                className="bg-dawn-500 hover:bg-dawn-600 text-white py-3 px-6 rounded-xl inline-flex items-center gap-2 transition"
              >
                Done
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        );

      case 'shower':
        return (
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">Take a Cold Shower</h2>
            <div className="text-center">
              <Shower className="w-16 h-16 mx-auto mb-6 text-dawn-300" />
              <p className="text-lg mb-8">A cold shower helps wake you up!</p>
              <button
                onClick={() => setCurrentStep('dressed')}
                className="bg-dawn-500 hover:bg-dawn-600 text-white py-3 px-6 rounded-xl inline-flex items-center gap-2 transition"
              >
                Done
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        );

      case 'dressed':
        return (
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">Get Dressed</h2>
            <div className="text-center">
              <Shirt className="w-16 h-16 mx-auto mb-6 text-dawn-300" />
              <p className="text-lg mb-8">Put on your clothes for the day</p>
              <button
                onClick={() => setCurrentStep('space')}
                className="bg-dawn-500 hover:bg-dawn-600 text-white py-3 px-6 rounded-xl inline-flex items-center gap-2 transition"
              >
                Done
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        );

      case 'space':
        return (
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">Check Your Space</h2>
            <div className="text-center">
              <ClipboardCheck className="w-16 h-16 mx-auto mb-6 text-dawn-300" />
              <p className="text-lg mb-8">Is your space messy or cluttered?</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setCurrentStep('declutter')}
                  className="bg-dawn-500 hover:bg-dawn-600 text-white py-3 px-6 rounded-xl transition"
                >
                  Yes
                </button>
                <button
                  onClick={() => setCurrentStep('complete')}
                  className="bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-xl transition"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        );

      case 'declutter':
        return (
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">Quick Declutter</h2>
            <div className="text-center">
              <Trash2 className="w-16 h-16 mx-auto mb-6 text-dawn-300" />
              <div className="mb-8">
                <div className="text-6xl font-bold mb-4">
                  {timer !== null ? formatTime(timer) : '15:00'}
                </div>
                {!isTimerRunning && timer === null && (
                  <button
                    onClick={() => startTimer(900)}
                    className="bg-dawn-500 hover:bg-dawn-600 text-white py-3 px-6 rounded-xl inline-flex items-center gap-2 transition"
                  >
                    <Timer className="w-5 h-5" />
                    Start Timer
                  </button>
                )}
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setCurrentStep('complete')}
                  className="bg-white/20 hover:bg-white/30 py-2 px-4 rounded-lg transition flex items-center gap-2"
                >
                  <Skip className="w-4 h-4" />
                  Skip
                </button>
                {timer === null && (
                  <button
                    onClick={() => setCurrentStep('complete')}
                    className="bg-dawn-500 hover:bg-dawn-600 py-2 px-4 rounded-lg transition flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">You're Ready!</h2>
            <div className="text-center">
              <Sun className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
              <p className="text-xl mb-4">Your day has started powerfully.</p>
              <p className="text-lg mb-8 text-dawn-200">Keep up the momentum!</p>
              <button
                onClick={() => {
                  setCurrentStep('initial');
                  setSleptWell(null);
                  setWorkoutType(null);
                  setTimer(null);
                  setIsTimerRunning(false);
                  setStreak(s => s + 1);
                }}
                className="bg-dawn-500 hover:bg-dawn-600 text-white py-3 px-6 rounded-xl inline-flex items-center gap-2 transition"
              >
                Complete Morning
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-night-900 via-night-800 to-dawn-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            {currentStep !== 'initial' && (
              <button
                onClick={() => {
                  setCurrentStep('initial');
                  setSleptWell(null);
                  setWorkoutType(null);
                  setTimer(null);
                  setIsTimerRunning(false);
                }}
                className="p-2 rounded-lg hover:bg-white/10 transition"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}
            <h1 className="text-4xl font-bold tracking-tight">rise</h1>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-lg font-semibold">{streak} day streak</span>
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  );
}

export default App;