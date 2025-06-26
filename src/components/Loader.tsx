import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'white';
  text?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'medium', 
  color = 'primary', 
  text,
  className = '' 
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'w-5 h-5';
      case 'large': return 'w-12 h-12';
      case 'medium':
      default: return 'w-8 h-8';
    }
  };

  const getColorClass = () => {
    switch (color) {
      case 'secondary': return 'border-gray-300 border-t-gray-600';
      case 'white': return 'border-white/30 border-t-white';
      case 'primary':
      default: return 'border-blue-200 border-t-blue-500';
    }
  };

  const getBorderWidth = () => {
    switch (size) {
      case 'small': return 'border-2';
      case 'large': return 'border-4';
      case 'medium':
      default: return 'border-3';
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`
          ${getSizeClass()} 
          ${getColorClass()} 
          ${getBorderWidth()}
          border-solid 
          rounded-full 
          animate-spin
        `}
      />
      {text && (
        <p className="mt-3 text-sm text-gray-600 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export const PageLoader: React.FC<{ text?: string }> = ({ text = 'Ładowanie...' }) => (
  <div className="flex items-center justify-center min-h-64">
    <Loader size="large" text={text} />
  </div>
);

export const ButtonLoader: React.FC = () => (
  <Loader size="small" color="white" className="mr-2" />
);

export const InlineLoader: React.FC<{ text?: string }> = ({ text }) => (
  <div className="flex items-center justify-center py-8">
    <Loader size="medium" text={text} />
  </div>
);

export const FullScreenLoader: React.FC<{ text?: string }> = ({ 
  text = 'Inicjalizowanie aplikacji...' 
}) => (
  <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-50">
    <div className="text-center">
      <div className="mb-4">
        <span className="text-4xl">🎴</span>
      </div>
      <Loader size="large" color="primary" />
      <p className="mt-4 text-lg text-gray-700 font-medium">{text}</p>
    </div>
  </div>
);

export const SkeletonLoader: React.FC<{ 
  lines?: number; 
  className?: string;
}> = ({ lines = 3, className = '' }) => (
  <div className={`animate-pulse ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <div key={index} className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        {index < lines - 1 && <div className="h-4 bg-gray-200 rounded w-3/4"></div>}
      </div>
    ))}
  </div>
);

export const CardSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 bg-gray-200 rounded w-16"></div>
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>
      <div className="space-y-3">
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
      <div className="mt-6 flex justify-between">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  </div>
);

export default Loader;