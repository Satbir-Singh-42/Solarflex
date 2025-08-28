import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// Fixed API configuration - always use localhost for Replit environment
const API_BASE_URL = 'http://localhost:3001/api';

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
      try {
        const response = await fetch(`${API_BASE_URL}/forecasts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching forecasts:', error);
        throw error;
      }
    },
    refetchInterval: 30000, // Reduced frequency to avoid overwhelming the server
    retry: 1,
    retryDelay: 1000,
  });
};

export const useTrades = () => {
  return useQuery<TradeData>({
    queryKey: ['trades'],
    queryFn: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/trades`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching trades:', error);
        throw error;
      }
    },
    refetchInterval: 30000,
    retry: 1,
    retryDelay: 1000,
  });
};

export const useGridHealth = () => {
  return useQuery<GridHealthData>({
    queryKey: ['grid-health'],
    queryFn: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/grid-health`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching grid health:', error);
        throw error;
      }
    },
    refetchInterval: 30000,
    retry: 1,
    retryDelay: 1000,
  });
};