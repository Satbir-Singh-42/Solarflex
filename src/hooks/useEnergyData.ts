import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = `http://${window.location.hostname}:3001/api`;

interface Trade {
  id: string;
  seller: string;
  buyer: string;
  amount: number;
  price: number;
  timestamp: string;
  status: 'active' | 'completed' | 'pending';
}

interface ForecastData {
  type: 'solar' | 'demand' | 'grid' | 'price';
  current: number;
  predicted: number;
  confidence: number;
  timeframe: string;
  trend: 'up' | 'down' | 'stable';
}

interface GridHealthData {
  feederUtilization: number;
  feederLimit: number;
  currentLoad: number;
  status: 'optimal' | 'warning' | 'critical';
  peakPrediction: number;
  timeToNextPeak: string;
  outageInfo?: {
    scenario: string;
    estimatedRecovery: string;
    batteryUsage: string;
  };
}

interface TradeData {
  trades: Trade[];
  marketPrice: number;
  totalVolume: number;
  yourBalance: number;
}

interface ForecastResponse {
  forecasts: ForecastData[];
  weatherCondition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  modelAccuracy: number;
  outageStatus: any;
}

export const useForecasts = () => {
  return useQuery<ForecastResponse>({
    queryKey: ['forecasts'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/forecasts`);
      if (!response.ok) {
        throw new Error('Failed to fetch forecasts');
      }
      return response.json();
    },
    refetchInterval: 15000, // Refresh every 15 seconds for real-time updates
  });
};

export const useTrades = () => {
  return useQuery<TradeData>({
    queryKey: ['trades'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/trades`);
      if (!response.ok) {
        throw new Error('Failed to fetch trades');
      }
      return response.json();
    },
    refetchInterval: 10000, // Refresh every 10 seconds
  });
};

export const useGridHealth = () => {
  return useQuery<GridHealthData>({
    queryKey: ['grid-health'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/grid-health`);
      if (!response.ok) {
        throw new Error('Failed to fetch grid health');
      }
      return response.json();
    },
    refetchInterval: 5000, // Refresh every 5 seconds for critical data
  });
};