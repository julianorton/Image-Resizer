import React, { useState, useRef } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Crop as CropIcon, Check, X } from 'lucide-react';

interface ImageCropperProps {
  imageUrl: string;
  onCropComplete: (croppedBlob: Blob) => void;
  onCancel: () => void;
  aspectRatio?: number;
  darkMode: boolean;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  imageUrl,
  onCropComplete,
  onCancel,
  aspectRatio,
  darkMode,
}) => {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5,
  });
  
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const crop = centerAspectCrop(width, height, aspectRatio || 16 / 9);
    setCrop(crop);
  };

  const centerAspectCrop = (
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
  ) => {
    const result: Crop = {
      unit: '%',
      width: 90,
      height: 90,
      x: 5,
      y: 5,
    };

    if (aspect) {
      const expectedHeight = (mediaWidth / aspect) * (result.width / 100);
      const percentHeight = (expectedHeight / mediaHeight) * 100;
      
      if (percentHeight > 100) {
        const expectedWidth = (mediaHeight * aspect) * (result.height / 100);
        const percentWidth = (expectedWidth / mediaWidth) * 100;
        
        result.width = percentWidth;
        result.x = (100 - percentWidth) / 2;
      } else {
        result.height = percentHeight;
        result.y = (100 - percentHeight) / 2;
      }
    }

    return result;
  };

  const handleComplete = async () => {
    if (!completedCrop || !imgRef.current) return;

    const canvas = document.createElement('canvas');
    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    );

    canvas.toBlob((blob) => {
      if (blob) {
        onCropComplete(blob);
      }
    }, 'image/jpeg', 0.9);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${darkMode ? 'bg-black/80' : 'bg-white/80'}`}>
      <div className={`relative max-w-4xl w-full p-6 rounded-lg shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <CropIcon className={`w-5 h-5 mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Crop Image
            </h3>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleComplete}
              className={`p-2 rounded-full ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              title="Apply Crop"
            >
              <Check className="w-5 h-5" />
            </button>
            <button
              onClick={onCancel}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              title="Cancel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className={`overflow-auto max-h-[calc(100vh-200px)] ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg`}>
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspectRatio}
            className="max-w-full"
          >
            <img
              ref={imgRef}
              src={imageUrl}
              alt="Crop preview"
              onLoad={onImageLoad}
              className="max-w-full"
            />
          </ReactCrop>
        </div>

        <div className="mt-4 text-sm text-center text-gray-500">
          Drag to adjust the crop area or use the corner handles to resize
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;