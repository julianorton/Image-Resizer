import React from 'react';
import { Settings, FileType, Sliders, Download, Tag } from 'lucide-react';
import { ImageFormat, ImageQuality, OptimizationLevel, NamingOptions, ProcessingOptions, ExportOptions } from '../types/types';

interface OptionsPanelProps {
  darkMode: boolean;
  namingOptions: NamingOptions;
  setNamingOptions: (options: NamingOptions) => void;
  processingOptions: ProcessingOptions;
  setProcessingOptions: (options: ProcessingOptions) => void;
  exportOptions: ExportOptions;
  setExportOptions: (options: ExportOptions) => void;
}

const OptionsPanel: React.FC<OptionsPanelProps> = ({
  darkMode,
  namingOptions,
  setNamingOptions,
  processingOptions,
  setProcessingOptions,
  exportOptions,
  setExportOptions,
}) => {
  const baseInputClass = `
    w-full px-3 py-2 rounded-md text-sm
    ${darkMode 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}
    border focus:ring-2 focus:ring-blue-500 focus:border-transparent
  `;

  const basePanelClass = `
    p-4 rounded-lg mb-4
    ${darkMode ? 'bg-gray-800' : 'bg-white'}
    border ${darkMode ? 'border-gray-700' : 'border-gray-200'}
  `;

  return (
    <div className="space-y-4">
      {/* Naming Options */}
      <div className={basePanelClass}>
        <div className="flex items-center mb-3">
          <Tag className="w-5 h-5 mr-2" />
          <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Naming Options
          </h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Prefix</label>
            <input
              type="text"
              value={namingOptions.prefix}
              onChange={(e) => setNamingOptions({ ...namingOptions, prefix: e.target.value })}
              placeholder="e.g., img_"
              className={baseInputClass}
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Suffix</label>
            <input
              type="text"
              value={namingOptions.suffix}
              onChange={(e) => setNamingOptions({ ...namingOptions, suffix: e.target.value })}
              placeholder="e.g., _resized"
              className={baseInputClass}
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Separator</label>
            <input
              type="text"
              value={namingOptions.separator}
              onChange={(e) => setNamingOptions({ ...namingOptions, separator: e.target.value })}
              placeholder="e.g., _"
              className={baseInputClass}
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="sequential-numbers"
              checked={namingOptions.useSequentialNumbers}
              onChange={(e) => setNamingOptions({ ...namingOptions, useSequentialNumbers: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="sequential-numbers" className="ml-2 text-sm">
              Add Sequential Numbers
            </label>
          </div>
        </div>
      </div>

      {/* Format Options */}
      <div className={basePanelClass}>
        <div className="flex items-center mb-3">
          <FileType className="w-5 h-5 mr-2" />
          <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Format Options
          </h3>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {(['jpeg', 'png', 'webp'] as ImageFormat[]).map((format) => (
            <button
              key={format}
              onClick={() => setProcessingOptions({ ...processingOptions, format })}
              className={`
                px-3 py-2 rounded-md text-sm font-medium
                ${processingOptions.format === format
                  ? darkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {format.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Quality Options */}
      <div className={basePanelClass}>
        <div className="flex items-center mb-3">
          <Settings className="w-5 h-5 mr-2" />
          <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Quality Options
          </h3>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {(['high', 'medium', 'low'] as ImageQuality[]).map((quality) => (
            <button
              key={quality}
              onClick={() => setProcessingOptions({ ...processingOptions, quality })}
              className={`
                px-3 py-2 rounded-md text-sm font-medium
                ${processingOptions.quality === quality
                  ? darkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {quality.charAt(0).toUpperCase() + quality.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Optimization Options */}
      <div className={basePanelClass}>
        <div className="flex items-center mb-3">
          <Sliders className="w-5 h-5 mr-2" />
          <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Optimization Options
          </h3>
        </div>
        
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-2">
            {(['none', 'light', 'medium', 'heavy'] as OptimizationLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => setProcessingOptions({ ...processingOptions, optimization: level })}
                className={`
                  px-3 py-2 rounded-md text-sm font-medium
                  ${processingOptions.optimization === level
                    ? darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="strip-metadata"
              checked={processingOptions.stripMetadata}
              onChange={(e) => setProcessingOptions({ ...processingOptions, stripMetadata: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="strip-metadata" className="ml-2 text-sm">
              Strip Metadata
            </label>
          </div>
          
          <div>
            <label className="block text-sm mb-1">Max File Size (KB)</label>
            <input
              type="number"
              value={processingOptions.maxFileSize}
              onChange={(e) => setProcessingOptions({ ...processingOptions, maxFileSize: parseInt(e.target.value) })}
              min="0"
              step="100"
              className={baseInputClass}
            />
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className={basePanelClass}>
        <div className="flex items-center mb-3">
          <Download className="w-5 h-5 mr-2" />
          <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Export Options
          </h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">ZIP File Name</label>
            <input
              type="text"
              value={exportOptions.zipFileName}
              onChange={(e) => setExportOptions({ ...exportOptions, zipFileName: e.target.value })}
              placeholder="resized_images"
              className={baseInputClass}
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="organize-by-size"
              checked={exportOptions.organizeBySize}
              onChange={(e) => setExportOptions({ ...exportOptions, organizeBySize: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="organize-by-size" className="ml-2 text-sm">
              Organize by Size
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="individual-download"
              checked={exportOptions.allowIndividualDownload}
              onChange={(e) => setExportOptions({ ...exportOptions, allowIndividualDownload: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="individual-download" className="ml-2 text-sm">
              Allow Individual Downloads
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsPanel;