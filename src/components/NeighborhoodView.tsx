import { HouseCard } from "./HouseCard";

const street12Houses = [
  {
    id: "H1",
    solarCapacity: 8,
    batteryCapacity: 10,
    hasEV: false,
    currentGeneration: 6.2,
    currentConsumption: 2.1,
    batteryLevel: 78,
    isTrading: true,
    tradingWith: ["H4", "H6"],
    priority: 'normal' as const
  },
  {
    id: "H2", 
    solarCapacity: 5,
    batteryCapacity: 0,
    hasEV: false,
    currentGeneration: 4.1,
    currentConsumption: 1.8,
    batteryLevel: undefined,
    isTrading: true,
    tradingWith: ["H6"],
    priority: 'normal' as const
  },
  {
    id: "H3",
    solarCapacity: 3,
    batteryCapacity: 0,
    hasEV: true,
    currentGeneration: 1.9,
    currentConsumption: 3.2,
    batteryLevel: undefined,
    isTrading: false,
    tradingWith: [],
    priority: 'normal' as const
  },
  {
    id: "H4",
    solarCapacity: 0,
    batteryCapacity: 0,
    hasEV: false,
    currentGeneration: 0,
    currentConsumption: 1.5,
    batteryLevel: undefined,
    isTrading: true,
    tradingWith: ["H1"],
    priority: 'medical' as const
  },
  {
    id: "H5",
    solarCapacity: 4,
    batteryCapacity: 5,
    hasEV: false,
    currentGeneration: 2.8,
    currentConsumption: 0.9,
    batteryLevel: 85,
    isTrading: false,
    tradingWith: [],
    priority: 'normal' as const
  },
  {
    id: "H6",
    solarCapacity: 0,
    batteryCapacity: 0,
    hasEV: false,
    currentGeneration: 0,
    currentConsumption: 2.4,
    batteryLevel: undefined,
    isTrading: true,
    tradingWith: ["H1", "H2"],
    priority: 'normal' as const
  }
];

export function NeighborhoodView() {
  const totalGeneration = street12Houses.reduce((sum, house) => sum + house.currentGeneration, 0);
  const totalConsumption = street12Houses.reduce((sum, house) => sum + house.currentConsumption, 0);
  const activeTrades = street12Houses.filter(house => house.isTrading).length;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Street-12 Neighborhood</h2>
          <p className="text-muted-foreground">Live energy trading network</p>
        </div>
        
        <div className="flex gap-6 text-sm">
          <div className="text-center">
            <div className="text-lg font-semibold text-solar">{totalGeneration.toFixed(1)} kW</div>
            <div className="text-muted-foreground">Total Generation</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-destructive">{totalConsumption.toFixed(1)} kW</div>
            <div className="text-muted-foreground">Total Consumption</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">{activeTrades}</div>
            <div className="text-muted-foreground">Active Trades</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {street12Houses.map((house) => (
          <HouseCard
            key={house.id}
            houseId={house.id}
            solarCapacity={house.solarCapacity || undefined}
            batteryCapacity={house.batteryCapacity || undefined}
            hasEV={house.hasEV}
            currentGeneration={house.currentGeneration}
            currentConsumption={house.currentConsumption}
            batteryLevel={house.batteryLevel}
            isTrading={house.isTrading}
            tradingWith={house.tradingWith}
            priority={house.priority}
          />
        ))}
      </div>
    </div>
  );
}