import React from 'react';

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface StatsChartProps {
  data: ChartData[];
  type: 'pie' | 'bar';
  width?: number;
  height?: number;
}

const StatsChart: React.FC<StatsChartProps> = ({ 
  data, 
  type, 
  width = 300, 
  height = 200 
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return (
      <div className="flex items-center justify-center" style={{ width, height }}>
        <p className="text-gray-500">Brak danych do wyświetlenia</p>
      </div>
    );
  }

  if (type === 'pie') {
    return <PieChart data={data} width={width} height={height} total={total} />;
  }

  return <BarChart data={data} width={width} height={height} />;
};

const PieChart: React.FC<{ 
  data: ChartData[]; 
  width: number; 
  height: number; 
  total: number; 
}> = ({ data, width, height, total }) => {
  const radius = Math.min(width, height) / 2 - 40;
  const centerX = width / 2;
  const centerY = height / 2;

  let cumulativePercentage = 0;

  const createArcPath = (percentage: number, startPercentage: number) => {
    const startAngle = startPercentage * 2 * Math.PI;
    const endAngle = (startPercentage + percentage) * 2 * Math.PI;
    
    const startX = centerX + radius * Math.cos(startAngle - Math.PI / 2);
    const startY = centerY + radius * Math.sin(startAngle - Math.PI / 2);
    const endX = centerX + radius * Math.cos(endAngle - Math.PI / 2);
    const endY = centerY + radius * Math.sin(endAngle - Math.PI / 2);
    
    const largeArc = percentage > 0.5 ? 1 : 0;
    
    return `M ${centerX} ${centerY} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY} Z`;
  };

  return (
    <div className="flex flex-col items-center">
      <svg width={width} height={height} className="mb-4">
        {data.map((item, index) => {
          const percentage = item.value / total;
          const path = createArcPath(percentage, cumulativePercentage);
          const prevCumulative = cumulativePercentage;
          cumulativePercentage += percentage;

          return (
            <g key={index}>
              <path
                d={path}
                fill={item.color}
                stroke="white"
                strokeWidth="2"
                className="transition-opacity hover:opacity-80"
              />
              {percentage > 0.05 && (
                <text
                  x={centerX + (radius * 0.7) * Math.cos((prevCumulative + percentage / 2) * 2 * Math.PI - Math.PI / 2)}
                  y={centerY + (radius * 0.7) * Math.sin((prevCumulative + percentage / 2) * 2 * Math.PI - Math.PI / 2)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {Math.round(percentage * 100)}%
                </text>
              )}
            </g>
          );
        })}
      </svg>
      
      <div className="flex flex-wrap justify-center gap-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-sm">
              {item.name}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const BarChart: React.FC<{ 
  data: ChartData[]; 
  width: number; 
  height: number; 
}> = ({ data, width, height }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const chartHeight = height - 60; 
  const barWidth = (width - 60) / data.length - 20; 
  const startX = 40;

  return (
    <div className="flex flex-col items-center">
      <svg width={width} height={height} className="mb-4">
        {/* Y-axis */}
        <line 
          x1={startX} 
          y1={20} 
          x2={startX} 
          y2={chartHeight + 20} 
          stroke="#e2e8f0" 
          strokeWidth="2"
        />

        <line 
          x1={startX} 
          y1={chartHeight + 20} 
          x2={width - 20} 
          y2={chartHeight + 20} 
          stroke="#e2e8f0" 
          strokeWidth="2"
        />

        {data.map((item, index) => {
          const barHeight = maxValue > 0 ? (item.value / maxValue) * chartHeight : 0;
          const x = startX + index * (barWidth + 20) + 10;
          const y = chartHeight + 20 - barHeight;

          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={item.color}
                className="transition-opacity hover:opacity-80"
                rx="4"
              />
              <text
                x={x + barWidth / 2}
                y={y - 5}
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
                fill="#4a5568"
              >
                {item.value}
              </text>
              <text
                x={x + barWidth / 2}
                y={chartHeight + 35}
                textAnchor="middle"
                fontSize="11"
                fill="#718096"
                className="max-w-16"
              >
                {item.name.length > 8 ? `${item.name.slice(0, 8)}...` : item.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default StatsChart;