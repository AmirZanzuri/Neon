import React from 'react';
import { ToolbarButton } from '../types';
import { 
  Layers, 
  Move, 
  MessageSquare, 
  FileText, 
  Target, 
  File, 
  Settings, 
  Map, 
  BarChart,
  ChevronRight
} from 'lucide-react';

interface ToolbarProps {
  buttons: ToolbarButton[];
}

const Toolbar: React.FC<ToolbarProps> = ({ buttons }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'layers':
        return <Layers size={16} />;
      case 'move':
        return <Move size={16} />;
      case 'message-square':
        return <MessageSquare size={16} />;
      case 'file':
        return <File size={16} />;
      case 'target':
        return <Target size={16} />;
      case 'file-text':
        return <FileText size={16} />;
      case 'settings':
        return <Settings size={16} />;
      case 'map':
        return <Map size={16} />;
      case 'chart':
        return <BarChart size={16} />;
      default:
        return <div>?</div>;
    }
  };
  
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center">
      <div className="bg-black/40 rounded-t-md px-2 py-1 flex items-center space-x-4">
        {buttons.map((button, index) => (
          <React.Fragment key={button.id}>
            <button
              className="p-1.5 rounded-sm hover:bg-black/40 text-gray-300 hover:text-white transition-colors"
              onClick={button.action}
              title={button.name}
            >
              {getIcon(button.icon)}
            </button>
            {index < buttons.length - 1 && index % 3 === 2 && (
              <div className="h-6 w-px bg-gray-700/30"></div>
            )}
          </React.Fragment>
        ))}
        
        <div className="h-6 w-px bg-gray-700/30"></div>
        
        <button className="p-1.5 rounded-sm hover:bg-black/40 text-gray-300 hover:text-white transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;