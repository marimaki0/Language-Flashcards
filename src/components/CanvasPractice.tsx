import React, { useRef, useEffect, useState } from 'react';

interface CanvasPracticeProps {
  word: string;
  onComplete?: (success: boolean) => void;
  className?: string;
}

const CanvasPractice: React.FC<CanvasPracticeProps> = ({ 
  word, 
  onComplete, 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#4299e1';
    ctx.lineWidth = 3;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let clientX, clientY;
    if ('touches' in e) {
      e.preventDefault(); // Prevent scrolling on touch
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);

    if (value.toLowerCase().trim() === word.toLowerCase().trim()) {
      onComplete?.(true);
    }
  };

  const handleSubmit = () => {
    const isCorrect = userInput.toLowerCase().trim() === word.toLowerCase().trim();
    onComplete?.(isCorrect);
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const getHintText = () => {
    if (!showHint) return '';
    
    const wordLength = word.length;
    if (wordLength <= 2) return word;
    

    return word[0] + '•'.repeat(wordLength - 1);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Napisz słowo na planszy lub wpisz je poniżej</h3>
        {showHint && (
          <div className="text-blue-600 font-mono text-xl mb-2">
            {getHintText()}
          </div>
        )}
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-48 border-2 border-gray-300 rounded-lg bg-white cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        
        <button
          onClick={clearCanvas}
          className="absolute top-2 right-2 btn btn-small btn-secondary"
        >
          Wyczyść
        </button>
      </div>

      {/* Text input */}
      <div className="flex gap-2">
        <input
          type="text"
          className="form-input flex-1"
          placeholder="Lub wpisz słowo tutaj..."
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          className="btn btn-primary"
          disabled={!userInput.trim()}
        >
          Sprawdź
        </button>
      </div>


      <div className="flex justify-center gap-4">
        <button
          onClick={toggleHint}
          className="btn btn-outline btn-small"
        >
          {showHint ? 'Ukryj podpowiedź' : 'Pokaż podpowiedź'}
        </button>
        
        <button
          onClick={() => onComplete?.(false)}
          className="btn btn-secondary btn-small"
        >
          Nie znam
        </button>
      </div>

      <div className="text-center text-sm text-gray-600">
        <p>💡 Możesz narysować słowo na planszy lub wpisać je w polu tekstowym</p>
      </div>
    </div>
  );
};

export default CanvasPractice;