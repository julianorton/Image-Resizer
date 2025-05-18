import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import SizeSelector from './components/SizeSelector';
import ImagePreview from './components/ImagePreview';
import ProcessButton from './components/ProcessButton';
import OptionsPanel from './components/OptionsPanel';
import Header from './components/Header';
import { 
  ImageFile, 
  ResizeOption, 
  NamingOptions,
  ProcessingOptions,
  ExportOptions
} from './types/types';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<ResizeOption[]>([
    { width: 800, height: 600, isSelected: true },
    { width: 1024, height: 768, isSelected: false },
    { width: 1920, height: 1080, isSelected: false },
  ]);
  const [customSizes, setCustomSizes] = useState<ResizeOption[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [namingOptions, setNamingOptions] = useState<NamingOptions>({
    prefix: '',
    suffix: '_resized',
    separator: '_',
    useSequentialNumbers: false,
  });

  const [processingOptions, setProcessingOptions] = useState<ProcessingOptions>({
    quality: 'high',
    format: 'jpeg',
    optimization: 'medium',
    stripMetadata: false,
    maxFileSize: 1024, // 1MB
  });

  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    zipFileName: 'resized_images',
    organizeBySize: false,
    allowIndividualDownload: false,
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleFilesSelected = (files: ImageFile[]) => {
    setImageFiles([...imageFiles, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...imageFiles];
    newFiles.splice(index, 1);
    setImageFiles(newFiles);
  };

  const handleUpdateFile = (index: number, newFile: ImageFile) => {
    const newFiles = [...imageFiles];
    newFiles[index] = newFile;
    setImageFiles(newFiles);
  };

  const handleSizeToggle = (index: number) => {
    const newSizes = [...selectedSizes];
    newSizes[index].isSelected = !newSizes[index].isSelected;
    setSelectedSizes(newSizes);
  };

  const handleAddCustomSize = (width: number, height: number) => {
    if (width > 0 && height > 0) {
      setCustomSizes([...customSizes, { width, height, isSelected: true }]);
    }
  };

  const handleRemoveCustomSize = (index: number) => {
    const newSizes = [...customSizes];
    newSizes.splice(index, 1);
    setCustomSizes(newSizes);
  };

  const clearAllImages = () => {
    setImageFiles([]);
  };

  const clearAllSizes = () => {
    setSelectedSizes(selectedSizes.map(size => ({ ...size, isSelected: false })));
    setCustomSizes([]);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Header />
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'} transition-all duration-300`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-12 gap-6`}>
          <div className="md:col-span-8">
            <ImageUploader 
              onFilesSelected={handleFilesSelected} 
              darkMode={darkMode} 
            />
            
            <div className={`mt-6 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md transition-all duration-300`}>
              <ImagePreview 
                imageFiles={imageFiles} 
                onRemoveFile={handleRemoveFile}
                onUpdateFile={handleUpdateFile}
                darkMode={darkMode} 
              />
            </div>
          </div>
          
          <div className="md:col-span-4">
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md transition-all duration-300`}>
              <SizeSelector 
                selectedSizes={selectedSizes} 
                customSizes={customSizes}
                onSizeToggle={handleSizeToggle}
                onAddCustomSize={handleAddCustomSize}
                onRemoveCustomSize={handleRemoveCustomSize}
                darkMode={darkMode}
              />
            </div>
            
            <div className={`mt-6 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md transition-all duration-300`}>
              <OptionsPanel
                darkMode={darkMode}
                namingOptions={namingOptions}
                setNamingOptions={setNamingOptions}
                processingOptions={processingOptions}
                setProcessingOptions={setProcessingOptions}
                exportOptions={exportOptions}
                setExportOptions={setExportOptions}
              />
            </div>
            
            <div className="mt-6">
              <ProcessButton 
                imageFiles={imageFiles} 
                selectedSizes={selectedSizes.filter(size => size.isSelected)} 
                customSizes={customSizes}
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
                darkMode={darkMode}
                namingOptions={namingOptions}
                processingOptions={processingOptions}
                exportOptions={exportOptions}
              />
              
              <div className="flex gap-4 mt-4">
                <button
                  onClick={clearAllImages}
                  className="flex-1 py-2 px-4 rounded text-white bg-red-500 hover:bg-red-600 transition-colors duration-300"
                  disabled={imageFiles.length === 0}
                >
                  Clear All Images
                </button>
                <button
                  onClick={clearAllSizes}
                  className="flex-1 py-2 px-4 rounded text-white bg-red-500 hover:bg-red-600 transition-colors duration-300"
                  disabled={!selectedSizes.some(s => s.isSelected) && customSizes.length === 0}
                >
                  Clear All Sizes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;