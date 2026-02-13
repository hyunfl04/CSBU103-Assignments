
import React, { useState } from 'react';
import { Delete, Hash, Minus, Plus, X, Divide, Percent, Equal } from 'lucide-react';

const CalculatorView: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (nextOp: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operation) {
      const currentValue = prevValue || 0;
      const result = calculate(currentValue, inputValue, operation);
      setPrevValue(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperation(nextOp);
  };

  const calculate = (v1: number, v2: number, op: string): number => {
    switch (op) {
      case '+': return v1 + v2;
      case '-': return v1 - v2;
      case '*': return v1 * v2;
      case '/': return v1 / v2;
      case '%': return v1 % v2;
      default: return v2;
    }
  };

  const handleEqual = () => {
    const inputValue = parseFloat(display);
    if (operation && prevValue !== null) {
      const result = calculate(prevValue, inputValue, operation);
      setDisplay(String(result));
      setPrevValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Smart Calculator</h2>
        <p className="text-slate-400">Supports Addition, Subtraction, Multiplication, Division & Modulo</p>
      </div>

      <div className="bg-slate-900/40 p-6 rounded-[2.5rem] border border-slate-800 shadow-2xl backdrop-blur-xl w-full max-w-sm">
        {/* Display */}
        <div className="bg-slate-950/50 p-6 rounded-3xl mb-6 border border-slate-800/50 flex flex-col items-end justify-center h-28">
          <div className="text-slate-500 text-sm mb-1 h-5 uppercase tracking-widest font-bold">
            {operation ? `${prevValue} ${operation}` : ''}
          </div>
          <div className="text-4xl font-light tracking-tight text-white mono truncate w-full text-right">
            {display}
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-3">
          <CalcButton label="C" onClick={clear} variant="danger" />
          <CalcButton label="%" icon={<Percent size={18} />} onClick={() => handleOperation('%')} variant="special" />
          <CalcButton label="/" icon={<Divide size={18} />} onClick={() => handleOperation('/')} variant="special" />
          <CalcButton label="DEL" icon={<Delete size={18} />} onClick={() => setDisplay(display.length > 1 ? display.slice(0, -1) : '0')} variant="special" />

          <CalcButton label="7" onClick={() => inputDigit('7')} />
          <CalcButton label="8" onClick={() => inputDigit('8')} />
          <CalcButton label="9" onClick={() => inputDigit('9')} />
          <CalcButton label="X" icon={<X size={18} />} onClick={() => handleOperation('*')} variant="special" />

          <CalcButton label="4" onClick={() => inputDigit('4')} />
          <CalcButton label="5" onClick={() => inputDigit('5')} />
          <CalcButton label="6" onClick={() => inputDigit('6')} />
          <CalcButton label="-" icon={<Minus size={18} />} onClick={() => handleOperation('-')} variant="special" />

          <CalcButton label="1" onClick={() => inputDigit('1')} />
          <CalcButton label="2" onClick={() => inputDigit('2')} />
          <CalcButton label="3" onClick={() => inputDigit('3')} />
          <CalcButton label="+" icon={<Plus size={18} />} onClick={() => handleOperation('+')} variant="special" />

          <CalcButton label="0" onClick={() => inputDigit('0')} span={2} />
          <CalcButton label="." onClick={inputDot} />
          <CalcButton label="=" icon={<Equal size={18} />} onClick={handleEqual} variant="primary" />
        </div>
      </div>
    </div>
  );
};

interface CalcButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'special' | 'danger';
  span?: number;
}

const CalcButton: React.FC<CalcButtonProps> = ({ label, icon, onClick, variant = 'default', span = 1 }) => {
  const baseStyles = "h-14 rounded-2xl flex items-center justify-center transition-all active:scale-95 text-lg font-medium";
  const variants = {
    default: "bg-slate-800/50 hover:bg-slate-800 text-slate-200 border border-slate-700/50",
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20",
    special: "bg-slate-800 text-blue-400 hover:bg-slate-700",
    danger: "bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${span > 1 ? `col-span-${span}` : ''}`}
    >
      {icon || label}
    </button>
  );
};

export default CalculatorView;
