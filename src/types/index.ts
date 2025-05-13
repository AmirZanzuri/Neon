export type UnitType = 'Infantry' | 'Armor' | 'Artillery' | 'Air' | 'Command' | 'Enemy';

export type UnitStatus = 'Active' | 'Engaged' | 'Moving' | 'Stationary' | 'Inactive';

export type AlertType = 'None' | 'ImpendingEntry' | 'ExitImpendingEntry' | 'ExitImpendingExit';

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface AmmoStatus {
  type: string;
  current: number;
  max: number;
  label: string;
}

export interface Unit {
  id: string;
  name: string;
  type: UnitType;
  commander: string;
  equipment: string;
  location: Coordinate;
  locationText: string;
  status: UnitStatus;
  echelon: number;
  isEnemy: boolean;
  alerts: AlertType[];
  ammo?: AmmoStatus[];
  codeword?: string;
}

export interface Target {
  id: string;
  location: Coordinate;
  priority: number;
  units: string[];
}

export interface Boundary {
  id: string;
  type: 'PhaseLine' | 'Boundary';
  name: string;
  coordinates: Coordinate[];
  color: string;
  isDashed: boolean;
}

export interface MapLayer {
  id: string;
  name: string;
  active: boolean;
  icon: string;
}

export interface ToolbarButton {
  id: string;
  name: string;
  icon: string;
  action: () => void;
}