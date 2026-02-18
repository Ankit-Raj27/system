'use client';

import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarData {
  label: string;
  value: number;
}

export function MasteryRadar({ data }: { data: RadarData[] }) {
  const chartData = {
    labels: data.map(d => d.label),
    datasets: [
      {
        label: 'Competence Level',
        data: data.map(d => d.value),
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 10,
            weight: 'bold' as const,
          },
        },
        ticks: {
          display: false,
          stepSize: 2,
        },
        min: 0,
        max: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="h-64 w-full flex items-center justify-center p-4 rounded-xl border border-white/5 bg-black/20">
      <Radar data={chartData} options={options} />
    </div>
  );
}
