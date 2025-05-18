import React, { useState } from 'react';
import { XCircle, Image as ImageIcon, Crop } from 'lucide-react';
import { ImageFile } from '../types/types';
import ImageCropper from './ImageCropper';

interface ImagePreviewProps {
  imageFiles: ImageFile[];
  onRemoveFile: (index: number) => void;
  onUpdateFile: (index: number, newFile: ImageFile) => void;
  darkMode: boolean;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  imageFiles, 
  onRemoveFile,
  onUpdateFile,
  darkMode 
}) => {
  const [cropImageIndex, setCropImageIndex] = useState<number | null>(null);

  const handleCropComplete = (index: number, croppedBlob: Blob) => {
    const file = new File([croppedBlob], imageFiles[index].file.name, {
      type: 'image/jpeg',
    });
    const preview = URL.createObjectURL(croppedBlob);
    
    const newImageFile = {
      ...imageFiles[index],
      file,
      preview,
    };
    
    onUpdateFile(index, newImageFile);
    setCropImageIndex(null);
  };

  if (imageFiles.length === 0) {
    return (
      <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p className="font-medium">No images selected</p>
        <p className="text-sm mt-1">Upload images to see previews here</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Selected Images ({imageFiles.length})
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {imageFiles.map((imageFile, index) => (
          <div 
            key={imageFile.id}
            className={`
              relative group rounded-lg overflow-hidden border
              ${darkMode ? 'border-gray-700' : 'border-gray-200'}
            `}
          >
            <img
              src={imageFile.preview}
              alt={`Preview of ${imageFile.file.name}`}
              className="w-full h-32 object-cover"
            />
            <div className={`
              absolute inset-0 flex items-end transition-opacity duration-300
              ${darkMode ? 'bg-gradient-to-t from-black/70 to-transparent' : 'bg-gradient-to-t from-black/50 to-transparent'}
            `}>
              <div className="p-2 w-full">
                <p className="text-white text-xs truncate font-mono">
                  {imageFile.file.name}
                </p>
                <p className="text-gray-300 text-xs mt-1">
                  {Math.round(imageFile.file.size / 1024)} KB
                </p>
              </div>
            </div>
            <div className="absolute top-1 right-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                type="button"
                onClick={() => setCropImageIndex(index)}
                className="text-white bg-blue-500 rounded-full p-0.5 hover:bg-blue-600 transition-colors duration-300"
                aria-label={`Crop ${imageFile.file.name}`}
              >
                <Crop size={20} />
              </button>
              <button
                type="button"
                onClick={() => onRemoveFile(index)}
                className="text-white bg-red-500 rounded-full p-0.5 hover:bg-red-600 transition-colors duration-300"
                aria-label={`Remove ${imageFile.file.name}`}
              >
                <XCircle size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {cropImageIndex !== null && (
        <ImageCropper
          imageUrl={imageFiles[cropImageIndex].preview}
          onCropComplete={(blob) => handleCropComplete(cropImageIndex, blob)}
          onCancel={() => setCropImageIndex(null)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default ImagePreview;