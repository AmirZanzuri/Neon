import React, { useState } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import type { LayerProps } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Unit, Target, Boundary } from '../types';
import UnitIcon from './UnitIcon';

interface MapViewProps {
  units: Unit[];
  targets: Target[];
  boundaries: Boundary[];
  onSelectUnit: (unit: Unit) => void;
  selectedUnitId: string | null;
}

const MapView: React.FC<MapViewProps> = ({ 
  units, 
  targets, 
  boundaries, 
  onSelectUnit, 
  selectedUnitId 
}) => {
  const [viewState, setViewState] = useState({
    longitude: 34.8417,
    latitude: 32.0784,
    zoom: 12
  });

  // Layer style for boundaries
  const boundaryLayer: LayerProps = {
    id: 'boundaries',
    type: 'line',
    paint: {
      'line-color': '#0080ff',
      'line-width': 2,
      'line-dasharray': [2, 2]
    }
  };

  // Convert boundaries to GeoJSON
  const boundariesGeoJSON = {
    type: 'FeatureCollection',
    features: boundaries.map(boundary => ({
      type: 'Feature',
      properties: {
        name: boundary.name,
        isDashed: boundary.isDashed,
        color: boundary.color
      },
      geometry: {
        type: 'LineString',
        coordinates: boundary.coordinates.map(coord => [coord.lng, coord.lat])
      }
    }))
  };

  return (
    <div className="relative w-full h-full">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken="pk.eyJ1IjoiYW10cnRtIiwiYSI6ImNrcWJzdG41aTBsbHEyb2sxeTdsa2FkOG4ifQ.bmaBLt4tVWrM4CVr5DLVYQ"
        dragRotate={false}
        attributionControl={false}
        reuseMaps
        style={{ width: '100%', height: '100%' }}
        cursor="grab"
        interactive={true}
      >
        {/* Render boundaries */}
        <Source type="geojson" data={boundariesGeoJSON}>
          <Layer {...boundaryLayer} />
        </Source>

        {/* Render target zones */}
        {targets.map(target => {
          const targetUnits = units.filter(u => target.units.includes(u.id));
          if (targetUnits.length === 0) return null;

          const centerUnit = targetUnits[0];
          return (
            <Marker
              key={target.id}
              longitude={centerUnit.location.lng}
              latitude={centerUnit.location.lat}
            >
              <div className="relative">
                <div 
                  className="absolute border-2 border-red-500 rounded-full opacity-70"
                  style={{
                    width: '120px',
                    height: '120px',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 bg-red-500 text-white px-2 py-0.5 text-xs rounded">
                    Targets
                  </div>
                </div>
              </div>
            </Marker>
          );
        })}

        {/* Render units */}
        {units.map(unit => (
          <Marker
            key={unit.id}
            longitude={unit.location.lng}
            latitude={unit.location.lat}
          >
            <div onClick={() => onSelectUnit(unit)}>
              <UnitIcon 
                unit={unit}
                selected={selectedUnitId === unit.id}
              />
            </div>
          </Marker>
        ))}
      </Map>

      {/* Map coordinates indicator */}
      <div className="absolute bottom-0 right-0 bg-gray-900/80 text-white text-xs p-1">
        38°T PK 45262-43132 | 1103.9 m | 1,000 m
      </div>
    </div>
  );
};

export default MapView;