import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useIncubator } from '../contexts/IncubatorContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IncubatorChartProps {
  timeframe: string;
  dataType?: 'temperature' | 'humidity' | 'both';
}

const IncubatorChart: React.FC<IncubatorChartProps> = ({ 
  timeframe, 
  dataType = 'both' 
}) => {
  const { generateChartData } = useIncubator();
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const data = generateChartData(timeframe);
    
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            boxWidth: 10,
            usePointStyle: true,
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            display: true,
            color: 'rgba(0, 0, 0, 0.05)',
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      elements: {
        line: {
          tension: 0.4,
        },
        point: {
          radius: 2,
          hoverRadius: 4,
        },
      },
    };

    const datasets = [];
    
    if (dataType === 'both' || dataType === 'temperature') {
      datasets.push({
        label: 'Temperature (°C)',
        data: data.temperatureData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      });
    }
    
    if (dataType === 'both' || dataType === 'humidity') {
      datasets.push({
        label: 'Humidity (%)',
        data: data.humidityData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y',
      });
    }

    setChartData({
      labels: data.labels,
      datasets,
      options,
    });
  }, [timeframe, dataType, generateChartData]);

  if (!chartData) {
    return <div className="h-60 flex items-center justify-center">Loading chart...</div>;
  }

  return (
    <div className="h-60">
      <Line data={chartData} options={chartData.options} />
    </div>
  );
};

export default IncubatorChart;
