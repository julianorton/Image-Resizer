import React, { useState } from 'react';
import { PlusCircle, Trash2, Lock, Unlock } from 'lucide-react';
import { ResizeOption } from '../types/types';

interface SizeSelectorProps {
  selectedSizes: ResizeOption[];
  customSizes: ResizeOption[];
  onSizeToggle: (index: number) => void;
  onAddCustomSize: (width: number, height: number) => void;
  onRemoveCustomSize: (index: number) => void;
  darkMode: boolean;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  selectedSizes,
  customSizes,
  onSizeToggle,
  onAddCustomSize,
  onRemoveCustomSize,
  darkMode,
}) => {
  const [customWidth, setCustomWidth] = useState<string>('');
  const [customHeight, setCustomHeight] = useState<string>('');
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<number>(16 / 9);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomWidth(value);
    
    if (maintainAspectRatio && value !== '') {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        setCustomHeight(Math.round(numValue / aspectRatio).toString());
      }
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomHeight(value);
    
    if (maintainAspectRatio && value !== '') {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        setCustomWidth(Math.round(numValue * aspectRatio).toString());
      }
    }
  };

  const toggleAspectRatioLock = () => {
    if (!maintainAspectRatio && customWidth && customHeight) {
      const width = parseInt(customWidth);
      const height = parseInt(customHeight);
      if (!isNaN(width) && !isNaN(height) && height !== 0) {
        setAspectRatio(width / height);
      }
    }
    setMaintainAspectRatio(!maintainAspectRatio);
  };

  const handleAddSize = () => {
    const width = parseInt(customWidth);
    const height = parseInt(customHeight);
    
    if (!isNaN(width) && !isNaN(height) && width > 0 && height > 0) {
      onAddCustomSize(width, height);
      setCustomWidth('');
      setCustomHeight('');
    }
  };

  return (
    <div>
      <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Select Sizes
      </h2>
      
      <div className="space-y-3 mb-6">
        {selectedSizes.map((size, index) => (
          <div key={`preset-${index}`} className="flex items-center">
            <input
              type="checkbox"
              id={`size-${size.width}x${size.height}`}
              checked={size.isSelected}
              onChange={() => onSizeToggle(index)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor={`size-${size.width}x${size.height}`}
              className={`ml-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              {size.width} × {size.height}
            </label>
          </div>
        ))}
      </div>

      <div className="border-t border-b py-4 my-4 border-gray-200 dark:border-gray-700">
        <h3 className={`text-md font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Custom Size
        </h3>
        
        <div className="flex items-center space-x-2 mb-3">
          <div>
            <label htmlFor="custom-width" className="sr-only">Width</label>
            <input
              type="number"
              id="custom-width"
              placeholder="Width"
              value={customWidth}
              onChange={handleWidthChange}
              min="1"
              className={`
                w-24 px-3 py-2 border rounded-md text-sm
                ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}
              `}
            />
          </div>
          
          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>×</span>
          
          <div>
            <label htmlFor="custom-height" className="sr-only">Height</label>
            <input
              type="number"
              id="custom-height"
              placeholder="Height"
              value={customHeight}
              onChange={handleHeightChange}
              min="1"
              className={`
                w-24 px-3 py-2 border rounded-md text-sm
                ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}
              `}
            />
          </div>
          
          <button
            type="button"
            onClick={toggleAspectRatioLock}
            className={`p-2 rounded-md ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
            title={maintainAspectRatio ? "Unlock aspect ratio" : "Lock aspect ratio"}
          >
            {maintainAspectRatio ? <Lock size={18} /> : <Unlock size={18} />}
          </button>
          
          <button
            type="button"
            onClick={handleAddSize}
            disabled={!customWidth || !customHeight}
            className={`
              p-2 rounded-md flex items-center justify-center
              ${(!customWidth || !customHeight) 
                ? 'opacity-50 cursor-not-allowed' 
                : darkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'}
            `}
          >
            <PlusCircle size={18} />
          </button>
        </div>
      </div>

      {customSizes.length > 0 && (
        <div className="mt-4">
          <h3 className={`text-md font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Custom Sizes
          </h3>
          <div className="space-y-2">
            {customSizes.map((size, index) => (
              <div 
                key={`custom-${index}`} 
                className={`
                  flex items-center justify-between px-3 py-2 rounded
                  ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}
                `}
              >
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {size.width} × {size.height}
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveCustomSize(index)}
                  className={`
                    p-1 rounded-md
                    ${darkMode ? 'text-gray-400 hover:text-red-400 hover:bg-gray-600' : 'text-gray-500 hover:text-red-500 hover:bg-gray-200'}
                  `}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SizeSelector;