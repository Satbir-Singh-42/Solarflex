import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Activity } from "lucide-react";

interface GridHealthMonitorProps {
  feederUtilization: number;
  feederLimit: number;
  currentLoad: number;
  status: 'optimal' | 'warning' | 'critical';
  peakPrediction: number;
  timeToNextPeak: string;
}

export function GridHealthMonitor({
  feederUtilization,
  feederLimit,
  currentLoad,
  status,
  peakPrediction,
  timeToNextPeak
}: GridHealthMonitorProps) {
  const utilizationPercent = (feederUtilization / feederLimit) * 100;
  
  const getStatusColor = () => {
    switch (status) {
      case 'optimal': return 'text-battery';
      case 'warning': return 'text-primary';
      case 'critical': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'optimal': return <CheckCircle className="w-5 h-5 text-battery" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-primary" />;
      case 'critical': return <AlertTriangle className="w-5 h-5 text-destructive" />;
      default: return <Activity className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'optimal': return <Badge variant="secondary" className="bg-battery/20 text-battery border-battery/30">Optimal</Badge>;
      case 'warning': return <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">Warning</Badge>;
      case 'critical': return <Badge variant="destructive">Critical</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <h3 className="text-lg font-semibold text-foreground">Grid Health</h3>
          </div>
          {getStatusBadge()}
        </div>

        <div className="space-y-4">
          {/* Feeder Utilization */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Feeder Utilization</span>
              <span className={`font-medium ${getStatusColor()}`}>
                {utilizationPercent.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={utilizationPercent} 
              className="h-2 bg-muted/50"
              style={{
                background: `linear-gradient(to right, 
                  ${utilizationPercent < 70 ? 'hsl(var(--battery))' : 
                    utilizationPercent < 85 ? 'hsl(var(--primary))' : 
                    'hsl(var(--destructive))'} 0%, 
                  transparent ${utilizationPercent}%)`
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0A</span>
              <span>{feederLimit}A Limit</span>
            </div>
          </div>

          {/* Current Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Current Load</div>
              <div className="text-lg font-semibold text-foreground">
                {currentLoad.toFixed(1)} kW
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Peak Prediction</div>
              <div className="text-lg font-semibold text-primary">
                {peakPrediction.toFixed(1)} kW
              </div>
            </div>
          </div>

          {/* Time to Peak */}
          <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
            <div className="text-xs text-muted-foreground mb-1">Next Peak Expected</div>
            <div className="text-sm font-medium text-foreground">{timeToNextPeak}</div>
          </div>

          {/* Status Message */}
          <div className="text-xs text-muted-foreground">
            {status === 'optimal' && "All systems operating within normal parameters"}
            {status === 'warning' && "Approaching feeder capacity limits - load balancing active"}
            {status === 'critical' && "Critical load detected - implementing emergency protocols"}
          </div>
        </div>
      </div>
    </Card>
  );
}