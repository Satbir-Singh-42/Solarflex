import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Clock, Zap } from "lucide-react";

interface Trade {
  id: string;
  seller: string;
  buyer: string;
  amount: number;
  price: number;
  timestamp: string;
  status: 'active' | 'completed' | 'pending';
}

interface EnergyTradingPanelProps {
  currentTrades: Trade[];
  marketPrice: number;
  totalVolume: number;
  yourBalance: number;
}

export function EnergyTradingPanel({
  currentTrades,
  marketPrice,
  totalVolume,
  yourBalance
}: EnergyTradingPanelProps) {
  const activeTrades = currentTrades.filter(trade => trade.status === 'active');
  const completedTrades = currentTrades.filter(trade => trade.status === 'completed');

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Energy Trading</h3>
          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
            Live Market
          </Badge>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Market Price</div>
            <div className="text-lg font-semibold text-primary flex items-center gap-1">
              ₹{marketPrice.toFixed(2)}
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="text-xs text-muted-foreground">per kWh</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Volume (1h)</div>
            <div className="text-lg font-semibold text-accent">
              {totalVolume.toFixed(1)} kWh
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Your Balance</div>
            <div className="text-lg font-semibold text-battery">
              ₹{yourBalance.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Active Trades */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">Active Trades</h4>
            <Badge variant="outline" className="text-xs">
              {activeTrades.length} active
            </Badge>
          </div>
          
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {activeTrades.map((trade) => (
              <div key={trade.id} className="flex items-center justify-between p-2 rounded-md bg-muted/30 border border-border/30">
                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-energy-flow" />
                  <div className="text-xs">
                    <div className="font-medium text-foreground">
                      {trade.seller} → {trade.buyer}
                    </div>
                    <div className="text-muted-foreground">
                      {trade.amount.toFixed(1)} kWh @ ₹{trade.price.toFixed(2)}
                    </div>
                  </div>
                </div>
                <Badge 
                  variant="secondary" 
                  className="text-xs bg-battery/20 text-battery border-battery/30"
                >
                  Live
                </Badge>
              </div>
            ))}
            
            {activeTrades.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-4">
                No active trades
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" size="sm" className="w-full">
            <TrendingUp className="w-4 h-4 mr-2" />
            Sell Energy
          </Button>
          <Button variant="outline" size="sm" className="w-full">
            <TrendingDown className="w-4 h-4 mr-2" />
            Buy Energy
          </Button>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Recent Transactions
          </h4>
          <div className="space-y-1 max-h-24 overflow-y-auto">
            {completedTrades.slice(0, 3).map((trade) => (
              <div key={trade.id} className="flex items-center justify-between text-xs p-2 rounded bg-muted/20">
                <span className="text-muted-foreground">
                  {trade.seller} → {trade.buyer}
                </span>
                <span className="text-foreground font-medium">
                  {trade.amount.toFixed(1)} kWh
                </span>
                <span className="text-primary">
                  ₹{(trade.amount * trade.price).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}