import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Sun, Zap, CloudRain, TrendingUp } from "lucide-react";

interface ForecastData {
  type: 'solar' | 'demand' | 'grid' | 'price';
  current: number;
  predicted: number;
  confidence: number;
  timeframe: string;
  trend: 'up' | 'down' | 'stable';
}

interface MLForecastPanelProps {
  forecasts: ForecastData[];
  weatherCondition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  modelAccuracy: number;
  outageStatus?: {
    outageScenario: string;
    emergencyMode: boolean;
    batteryUsage: number;
    loadShedding: number;
    estimatedRecoveryTime: number;
  };
}

export function MLForecastPanel({
  forecasts,
  weatherCondition,
  modelAccuracy,
  outageStatus
}: MLForecastPanelProps) {
  const getWeatherIcon = () => {
    switch (weatherCondition) {
      case 'sunny': return <Sun className="w-4 h-4 text-solar" />;
      case 'cloudy': return <Sun className="w-4 h-4 text-muted-foreground" />;
      case 'rainy': return <CloudRain className="w-4 h-4 text-accent" />;
      case 'stormy': return <CloudRain className="w-4 h-4 text-destructive" />;
      default: return <Sun className="w-4 h-4 text-solar" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'solar': return <Sun className="w-4 h-4 text-solar" />;
      case 'demand': return <Zap className="w-4 h-4 text-destructive" />;
      case 'grid': return <TrendingUp className="w-4 h-4 text-grid" />;
      case 'price': return <TrendingUp className="w-4 h-4 text-primary" />;
      default: return <Brain className="w-4 h-4 text-accent" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'solar': return 'Solar Generation';
      case 'demand': return 'Energy Demand';
      case 'grid': return 'Grid Load';
      case 'price': return 'Market Price';
      default: return type;
    }
  };

  const getTypeUnit = (type: string) => {
    switch (type) {
      case 'solar':
      case 'demand':
      case 'grid': return 'kW';
      case 'price': return '₹/kWh';
      default: return '';
    }
  };

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">ML Forecasts</h3>
          </div>
          <div className="flex items-center gap-2">
            {getWeatherIcon()}
            <Badge 
              variant="secondary" 
              className="bg-accent/20 text-accent border-accent/30"
            >
              {weatherCondition}
            </Badge>
          </div>
        </div>

        {/* Model Accuracy */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Model Accuracy</span>
            <span className="font-medium text-battery">{modelAccuracy}%</span>
          </div>
          <Progress value={modelAccuracy} className="h-2 bg-muted/50" />
        </div>

        {/* Forecasts */}
        <div className="space-y-3">
          {forecasts.map((forecast, index) => (
            <div key={index} className="p-3 rounded-lg bg-muted/30 border border-border/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(forecast.type)}
                  <span className="text-sm font-medium text-foreground">
                    {getTypeLabel(forecast.type)}
                  </span>
                </div>
                <Badge 
                  variant="outline" 
                  className="text-xs"
                >
                  {forecast.timeframe}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">Current</div>
                  <div className="font-medium text-foreground">
                    {forecast.current.toFixed(1)} {getTypeUnit(forecast.type)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Predicted</div>
                  <div className={`font-medium ${
                    forecast.trend === 'up' ? 'text-battery' : 
                    forecast.trend === 'down' ? 'text-destructive' : 
                    'text-foreground'
                  }`}>
                    {forecast.predicted.toFixed(1)} {getTypeUnit(forecast.type)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Confidence</div>
                  <div className="font-medium text-accent">
                    {forecast.confidence}%
                  </div>
                </div>
              </div>

              {/* Confidence bar */}
              <div className="mt-2">
                <Progress value={forecast.confidence} className="h-1 bg-muted/50" />
              </div>
            </div>
          ))}
        </div>

        {/* Outage Status and Adaptation */}
        {outageStatus && outageStatus.emergencyMode && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
            <div className="text-xs font-medium text-destructive mb-2 flex items-center gap-2">
              <span>🚨 Emergency Response Active</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Scenario:</span>
                <div className="font-medium text-foreground capitalize">
                  {outageStatus.outageScenario.replace('_', ' ')}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Battery Usage:</span>
                <div className="font-medium text-battery">
                  {Math.round(outageStatus.batteryUsage * 100)}%
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Load Shed:</span>
                <div className="font-medium text-primary">
                  {Math.round(outageStatus.loadShedding * 100)}%
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Recovery:</span>
                <div className="font-medium text-accent">
                  {outageStatus.estimatedRecoveryTime}m
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ML Adaptation Insights */}
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
          <div className="text-xs font-medium text-primary mb-1 flex items-center gap-2">
            🤖 ML Adaptation Engine
          </div>
          <div className="text-xs text-muted-foreground">
            {outageStatus?.emergencyMode 
              ? `Emergency protocols activated. Load balancing adapted for ${outageStatus.outageScenario.replace('_', ' ')} scenario.`
              : `Weather-adapted forecasting active. Solar generation optimized for ${weatherCondition} conditions.`
            }
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Next adaptation cycle: {Math.floor(Math.random() * 5) + 3} minutes
          </div>
        </div>
      </div>
    </Card>
  );
}