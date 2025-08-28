import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// Use dynamic URL based on environment  
const getApiBaseUrl = () => {
  if (typeof window === 'undefined') return 'http://localhost:3001/api';
  
  const hostname = window.location.hostname;
  
  // Check if we're in a Replit environment
  if (hostname.includes('replit') || hostname.includes('.app')) {
    // For Replit, replace port 00 with 01 to access backend
    const backendUrl = `https://${hostname.replace('-00-', '-01-')}/api`;
    return backendUrl;
  }
  
  // Default to localhost for local development
  return 'http://localhost:3001/api';
};

const API_BASE_URL = getApiBaseUrl();

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
      const response = await fetch(`${API_BASE_URL}/forecasts`, {
        mode: 'cors',
        credentials: 'include',
      });
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
      const response = await fetch(`${API_BASE_URL}/trades`, {
        mode: 'cors',
        credentials: 'include',
      });
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
      const response = await fetch(`${API_BASE_URL}/grid-health`, {
        mode: 'cors',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch grid health');
      }
      return response.json();
    },
    refetchInterval: 5000, // Refresh every 5 seconds for critical data
  });
};