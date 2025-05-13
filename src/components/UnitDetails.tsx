import React, { useState } from 'react';
import { Unit } from '../types';
import { X, MessageSquare, Target, Info, MoreHorizontal } from 'lucide-react';

interface UnitDetailsProps {
  unit: Unit;
  onClose: () => void;
}

const UnitDetails: React.FC<UnitDetailsProps> = ({ unit, onClose }) => {
  const [activeTab, setActiveTab] = useState('info');
  
  const renderAmmoStatus = () => {
    if (!unit.ammo) return null;
    
    return (
      <div className="grid grid-cols-4 gap-2 mt-4">
        {unit.ammo.map((ammo) => (
          <div key={ammo.type} className="flex flex-col items-center">
            <div className="h-24 w-6 bg-[#1e2c40]/60 rounded-sm relative flex flex-col-reverse">
              <div
                className={`w-full rounded-sm ${ammo.current < 30 ? 'bg-red-500/60' : 'bg-green-500/60'}`}
                style={{ height: `${(ammo.current / ammo.max) * 100}%` }}
              ></div>
            </div>
            <div className="text-center mt-1 whitespace-pre-line">
              <div className="text-sm font-semibold">{ammo.current}</div>
              <div className="text-xs text-gray-400">{ammo.label}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-[#1a2638]/60 backdrop-blur-sm text-white rounded shadow-lg overflow-hidden w-80 border border-[#1e2c40]/60">
      <div className="flex justify-end p-2 border-b border-[#1e2c40]/60">
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={16} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">{unit.id}</h3>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Type</span>
            <span>{unit.type}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400">Location</span>
            <span>{unit.locationText}</span>
          </div>
          
          {unit.codeword && (
            <div className="flex justify-between">
              <span className="text-gray-400">Codeword</span>
              <span>{unit.codeword}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-400">Status</span>
            <span className={unit.status === 'Active' ? 'text-green-400' : 'text-yellow-400'}>
              {unit.status}
            </span>
          </div>
          
          {unit.alerts && unit.alerts.length > 0 && (
            <div>
              <span className="text-gray-400 block">Alerts</span>
              <div className="mt-1 text-yellow-400">
                {unit.alerts.map((alert, index) => (
                  <div key={index} className="ml-2">• {alert}</div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {renderAmmoStatus()}
      </div>
      
      <div className="flex border-t border-[#1e2c40]/60">
        <button
          className={`flex-1 p-2 flex items-center justify-center ${
            activeTab === 'chat' ? 'bg-[#1e2c40]/80' : ''
          } hover:bg-[#1e2c40]/60`}
          onClick={() => setActiveTab('chat')}
        >
          <MessageSquare size={14} className="mr-1" />
          <span className="text-xs">Chat</span>
        </button>
        
        <button
          className={`flex-1 p-2 flex items-center justify-center ${
            activeTab === 'center' ? 'bg-[#1e2c40]/80' : ''
          } hover:bg-[#1e2c40]/60`}
          onClick={() => setActiveTab('center')}
        >
          <Target size={14} className="mr-1" />
          <span className="text-xs">Center</span>
        </button>
        
        <button
          className={`flex-1 p-2 flex items-center justify-center ${
            activeTab === 'info' ? 'bg-[#1e2c40]/80' : ''
          } hover:bg-[#1e2c40]/60`}
          onClick={() => setActiveTab('info')}
        >
          <Info size={14} className="mr-1" />
          <span className="text-xs">Info</span>
        </button>
        
        <button
          className={`flex-1 p-2 flex items-center justify-center ${
            activeTab === 'more' ? 'bg-[#1e2c40]/80' : ''
          } hover:bg-[#1e2c40]/60`}
          onClick={() => setActiveTab('more')}
        >
          <MoreHorizontal size={14} className="mr-1" />
          <span className="text-xs">More</span>
        </button>
      </div>
    </div>
  );
};

export default UnitDetails;