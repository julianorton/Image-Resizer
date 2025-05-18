import React, { useCallback, useState } from 'react';
import { Upload, Image } from 'lucide-react';
import { ImageFile } from '../types/types';
import { generateImageId } from '../utils/imageUtils';

interface ImageUploaderProps {
  onFilesSelected: (files: ImageFile[]) => void;
  darkMode: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onFilesSelected, darkMode }) => {
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = useCallback(
    (fileList: FileList) => {
      const validFiles: ImageFile[] = [];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

      Array.from(fileList).forEach((file) => {
        if (allowedTypes.includes(file.type)) {
          const id = generateImageId();
          const preview = URL.createObjectURL(file);
          validFiles.push({ file, id, preview });
        }
      });

      if (validFiles.length > 0) {
        onFilesSelected(validFiles);
      }
    },
    [onFilesSelected]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      // Reset the input so the same file can be uploaded again if needed
      e.target.value = '';
    }
  };

  return (
    <div
      className={`
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} 
        border-2 border-dashed rounded-lg transition-all duration-300
        ${isDragging ? (darkMode ? 'border-blue-400 bg-gray-700' : 'border-blue-500 bg-blue-50') : ''}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className={`mb-4 p-4 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
          <Upload 
            className={`h-10 w-10 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}
            strokeWidth={1.5}
          />
        </div>
        <p className={`mb-2 text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Drag and drop images here, or click to select files
        </p>
        <p className="text-sm text-gray-500">
          Supported formats: JPG, PNG, WebP
        </p>
        <div className="flex items-center mt-4">
          <Image className={`mr-2 h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          <span className="text-sm font-medium">Multiple files supported</span>
        </div>
        <input
          id="fileInput"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileInputChange}
        />
        <label
          htmlFor="fileInput"
          className={`
            mt-6 px-4 py-2 rounded cursor-pointer
            ${darkMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'} 
            transition-colors duration-300
          `}
        >
          Select Files
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;