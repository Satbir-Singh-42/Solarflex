import { NeighborhoodView } from "@/components/NeighborhoodView";
import { GridHealthMonitor } from "@/components/GridHealthMonitor";
import { EnergyTradingPanel } from "@/components/EnergyTradingPanel";
import { MLForecastPanel } from "@/components/MLForecastPanel";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Zap, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-energy-grid.jpg";

const Index = () => {
  // Mock data for the energy trading platform
  const mockTrades = [
    {
      id: "1",
      seller: "H1",
      buyer: "H4",
      amount: 1.5,
      price: 4.20,
      timestamp: "14:23",
      status: 'active' as const
    },
    {
      id: "2", 
      seller: "H2",
      buyer: "H6",
      amount: 2.1,
      price: 4.15,
      timestamp: "14:20",
      status: 'active' as const
    },
    {
      id: "3",
      seller: "H1",
      buyer: "H6",
      amount: 1.8,
      price: 4.10,
      timestamp: "14:15",
      status: 'completed' as const
    }
  ];

  const mockForecasts = [
    {
      type: 'solar' as const,
      current: 14.2,
      predicted: 16.8,
      confidence: 92,
      timeframe: '2:30 PM',
      trend: 'up' as const
    },
    {
      type: 'demand' as const,
      current: 11.9,
      predicted: 18.5,
      confidence: 87,
      timeframe: '7:00 PM',
      trend: 'up' as const
    },
    {
      type: 'price' as const,
      current: 4.18,
      predicted: 5.25,
      confidence: 78,
      timeframe: '6:30 PM',
      trend: 'up' as const
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Smart Energy Grid Network"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
              Live Demo • Street-12
            </Badge>
            <h1 className="text-4xl font-bold text-foreground">
              Solar Weave Network
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Decentralized peer-to-peer energy trading platform with AI forecasting and smart grid management
            </p>
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-sm">
                <Activity className="w-4 h-4 text-battery" />
                <span className="text-muted-foreground">6 Houses Connected</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-solar" />
                <span className="text-muted-foreground">14.2 kW Generated</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">3 Active Trades</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Grid Status</div>
              <div className="text-2xl font-bold text-battery flex items-center gap-2">
                Optimal
                <Activity className="w-5 h-5" />
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Peak Load</div>
              <div className="text-2xl font-bold text-foreground">82%</div>
            </div>
          </Card>
          <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">CO₂ Avoided</div>
              <div className="text-2xl font-bold text-battery">2.4 kg</div>
            </div>
          </Card>
          <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Market Volume</div>
              <div className="text-2xl font-bold text-primary">₹182</div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Neighborhood */}
          <div className="xl:col-span-2">
            <NeighborhoodView />
          </div>

          {/* Right Column - Monitoring Panels */}
          <div className="space-y-6">
            <GridHealthMonitor 
              feederUtilization={49.2}
              feederLimit={60}
              currentLoad={11.9}
              status="optimal"
              peakPrediction={18.5}
              timeToNextPeak="4h 37m"
            />
            
            <EnergyTradingPanel 
              currentTrades={mockTrades}
              marketPrice={4.18}
              totalVolume={15.7}
              yourBalance={245.80}
            />
            
            <MLForecastPanel 
              forecasts={mockForecasts}
              weatherCondition="sunny"
              modelAccuracy={89}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
