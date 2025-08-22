import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Battery, Zap, Car, Sun, Home } from "lucide-react";

interface HouseCardProps {
  houseId: string;
  solarCapacity?: number;
  batteryCapacity?: number;
  hasEV?: boolean;
  currentGeneration: number;
  currentConsumption: number;
  batteryLevel?: number;
  isTrading: boolean;
  tradingWith?: string[];
  priority?: 'medical' | 'normal';
}

export function HouseCard({
  houseId,
  solarCapacity,
  batteryCapacity,
  hasEV,
  currentGeneration,
  currentConsumption,
  batteryLevel,
  isTrading,
  tradingWith = [],
  priority
}: HouseCardProps) {
  const netFlow = currentGeneration - currentConsumption;
  const isProducing = netFlow > 0;
  
  return (
    <Card className="p-4 relative overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-elevated)] border-border/50">
      <div className="absolute inset-0 bg-gradient-to-br from-card to-card/50" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-foreground" />
            <h3 className="font-semibold text-foreground">{houseId}</h3>
          </div>
          
          {priority === 'medical' && (
            <Badge variant="destructive" className="text-xs">
              Medical Priority
            </Badge>
          )}
          
          {isTrading && (
            <Badge variant="secondary" className="text-xs animate-pulse">
              Trading
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          {/* Solar Panel */}
          {solarCapacity && (
            <div className="flex items-center justify-between p-2 rounded-md bg-muted/30">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-solar" />
                <span className="text-sm text-muted-foreground">Solar</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-solar">
                  {currentGeneration.toFixed(1)} kW
                </div>
                <div className="text-xs text-muted-foreground">
                  {solarCapacity} kW max
                </div>
              </div>
            </div>
          )}

          {/* Battery */}
          {batteryCapacity && (
            <div className="flex items-center justify-between p-2 rounded-md bg-muted/30">
              <div className="flex items-center gap-2">
                <Battery className="w-4 h-4 text-battery" />
                <span className="text-sm text-muted-foreground">Battery</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-battery">
                  {batteryLevel}%
                </div>
                <div className="text-xs text-muted-foreground">
                  {batteryCapacity} kWh
                </div>
              </div>
            </div>
          )}

          {/* EV */}
          {hasEV && (
            <div className="flex items-center justify-between p-2 rounded-md bg-muted/30">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">EV</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-accent">
                  Charging
                </div>
                <div className="text-xs text-muted-foreground">
                  40 kWh
                </div>
              </div>
            </div>
          )}

          {/* Net Flow */}
          <div className="flex items-center justify-between p-2 rounded-md bg-muted/50 border border-border/30">
            <div className="flex items-center gap-2">
              <Zap className={`w-4 h-4 ${isProducing ? 'text-battery' : 'text-destructive'}`} />
              <span className="text-sm text-muted-foreground">Net Flow</span>
            </div>
            <div className="text-right">
              <div className={`text-sm font-medium ${isProducing ? 'text-battery' : 'text-destructive'}`}>
                {isProducing ? '+' : ''}{netFlow.toFixed(1)} kW
              </div>
              <div className="text-xs text-muted-foreground">
                {isProducing ? 'Surplus' : 'Deficit'}
              </div>
            </div>
          </div>

          {/* Trading Partners */}
          {tradingWith.length > 0 && (
            <div className="text-xs text-muted-foreground">
              Trading with: {tradingWith.join(', ')}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}