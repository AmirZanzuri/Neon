import { Unit, Target, Boundary, MapLayer, ToolbarButton } from '../types';

// Mock Units Data
export const unitsMock: Unit[] = [
  // Echelon 1 - Friendly Units
  {
    id: '583500',
    name: 'Unit Alpha',
    type: 'Infantry',
    commander: 'Maj. Anderson',
    equipment: 'Standard Issue',
    location: { lat: 32.07, lng: 34.48 },
    locationText: 'Grid 583500',
    status: 'Active',
    echelon: 1,
    isEnemy: false,
    alerts: [],
  },
  {
    id: '584500',
    name: 'Unit Bravo',
    type: 'Armor',
    commander: 'Capt. Richards',
    equipment: 'M1A2 Abrams',
    location: { lat: 32.08, lng: 34.47 },
    locationText: 'Grid 584500',
    status: 'Active',
    echelon: 1,
    isEnemy: false,
    alerts: [],
  },
  {
    id: '584600',
    name: 'Unit Charlie',
    type: 'Artillery',
    commander: 'Lt. Sanders',
    equipment: 'M109A6',
    location: { lat: 32.09, lng: 34.46 },
    locationText: 'Grid 584600',
    status: 'Active',
    echelon: 1,
    isEnemy: false,
    alerts: [],
  },
  {
    id: '584800',
    name: 'Unit Delta',
    type: 'Infantry',
    commander: 'Capt. Martinez',
    equipment: 'Light Armor',
    location: { lat: 32.06, lng: 34.45 },
    locationText: 'Grid 584800',
    status: 'Moving',
    echelon: 1,
    isEnemy: false,
    alerts: [],
  },
  {
    id: '585200',
    name: 'Unit Echo',
    type: 'Command',
    commander: 'Col. Johnson',
    equipment: 'Command Vehicle',
    location: { lat: 32.05, lng: 34.44 },
    locationText: 'Grid 585200',
    status: 'Stationary',
    echelon: 1,
    isEnemy: false,
    alerts: [],
  },
  // Echelon 2 - Friendly Units
  {
    id: '584300',
    name: 'Support Team 1',
    type: 'Infantry',
    commander: 'Lt. Thompson',
    equipment: 'Support Vehicles',
    location: { lat: 32.04, lng: 34.43 },
    locationText: 'Grid 584300',
    status: 'Active',
    echelon: 2,
    isEnemy: false,
    alerts: [],
  },
  {
    id: '584400',
    name: 'Support Team 2',
    type: 'Artillery',
    commander: 'Lt. Davis',
    equipment: 'M777 Howitzer',
    location: { lat: 32.03, lng: 34.42 },
    locationText: 'Grid 584400',
    status: 'Active',
    echelon: 2,
    isEnemy: false,
    alerts: [],
  },
  {
    id: '584500',
    name: 'Support Team 3',
    type: 'Armor',
    commander: 'Capt. Wilson',
    equipment: 'Bradley IFV',
    location: { lat: 32.02, lng: 34.41 },
    locationText: 'Grid 584500',
    status: 'Active',
    echelon: 2,
    isEnemy: false,
    alerts: [],
  },
  // Enemy Units
  {
    id: '12345678-1',
    name: 'Enemy Unit 1',
    type: 'Enemy',
    commander: 'Unknown',
    equipment: 'Unknown',
    location: { lat: 32.11, lng: 34.55 },
    locationText: '32°11\'N 34°55\'E',
    status: 'Active',
    echelon: 0,
    isEnemy: true,
    alerts: ['ImpendingEntry'],
    codeword: 'Puffin',
    ammo: [
      { type: '120mm', current: 98, max: 100, label: '120\nmm' },
      { type: '155mm', current: 98, max: 100, label: '155\nmm' },
      { type: '160mm', current: 25, max: 100, label: '160\nmm' },
      { type: '203mm', current: 88, max: 100, label: '203\nmm' },
    ],
  },
  {
    id: '12345678-2',
    name: 'Enemy Unit 2',
    type: 'Enemy',
    commander: 'Unknown',
    equipment: 'Unknown',
    location: { lat: 32.12, lng: 34.56 },
    locationText: '32°12\'N 34°56\'E',
    status: 'Moving',
    echelon: 0,
    isEnemy: true,
    alerts: [],
  },
];

// Mock Targets Data
export const targetsMock: Target[] = [
  {
    id: 'target-1',
    location: { lat: 32.11, lng: 34.55 },
    priority: 1,
    units: ['12345678-1', '12345678-2'],
  },
  {
    id: 'target-2',
    location: { lat: 32.13, lng: 34.57 },
    priority: 2,
    units: ['12345678-3', '12345678-4'],
  },
];

// Mock Boundaries Data
export const boundariesMock: Boundary[] = [
  {
    id: 'pl-1',
    type: 'PhaseLine',
    name: 'PL 1',
    coordinates: [
      { lat: 32.01, lng: 34.40 },
      { lat: 32.05, lng: 34.45 },
    ],
    color: '#0080ff',
    isDashed: true,
  },
  {
    id: 'pl-2',
    type: 'PhaseLine',
    name: 'PL 2',
    coordinates: [
      { lat: 32.06, lng: 34.46 },
      { lat: 32.10, lng: 34.51 },
    ],
    color: '#0080ff',
    isDashed: true,
  },
  {
    id: 'boundary-1',
    type: 'Boundary',
    name: '',
    coordinates: [
      { lat: 32.05, lng: 34.45 },
      { lat: 32.15, lng: 34.60 },
    ],
    color: '#000000',
    isDashed: false,
  },
];

// Mock Map Layers
export const mapLayersMock: MapLayer[] = [
  { id: 'satellite', name: 'Satellite', active: true, icon: 'globe' },
  { id: 'tactical', name: 'Tactical', active: true, icon: 'map' },
  { id: 'terrain', name: 'Terrain', active: false, icon: 'mountain' },
  { id: 'weather', name: 'Weather', active: false, icon: 'cloud' },
];

// Mock Toolbar Buttons
export const toolbarButtonsMock: ToolbarButton[] = [
  { id: 'map-layers', name: 'Map Layers', icon: 'layers', action: () => console.log('Map Layers clicked') },
  { id: 'movement', name: 'Movement', icon: 'move', action: () => console.log('Movement clicked') },
  { id: 'communication', name: 'Communication', icon: 'message-square', action: () => console.log('Communication clicked') },
  { id: 'files', name: 'Files', icon: 'file', action: () => console.log('Files clicked') },
  { id: 'targeting', name: 'Targeting', icon: 'target', action: () => console.log('Targeting clicked') },
  { id: 'reports', name: 'Reports', icon: 'file-text', action: () => console.log('Reports clicked') },
  { id: 'settings', name: 'Settings', icon: 'settings', action: () => console.log('Settings clicked') },
];

// Mock Selected Unit (for unit details popup)
export const selectedUnitMock: Unit = {
  id: '19-234',
  name: 'RFZ',
  type: 'Enemy',
  commander: 'Unknown',
  equipment: 'Unknown',
  location: { lat: 32.0784, lng: 34.8417 },
  locationText: '32°07\'84.6"N 34°84\'17.7"E',
  status: 'Active',
  echelon: 0,
  isEnemy: true,
  alerts: ['ImpendingEntry', 'ExitImpendingEntry', 'ExitImpendingExit'],
  codeword: 'Puffin',
  ammo: [
    { type: '120mm', current: 98, max: 100, label: '120\nmm' },
    { type: '155mm', current: 98, max: 100, label: '155\nmm' },
    { type: '160mm', current: 25, max: 100, label: '160\nmm' },
    { type: '203mm', current: 88, max: 100, label: '203\nmm' },
  ],
};