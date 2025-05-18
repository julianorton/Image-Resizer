import React, { useCallback } from 'react';
import JSZip from 'jszip';
import { Download, Loader } from 'lucide-react';
import { 
  ImageFile, 
  ResizeOption, 
  ProcessedImage,
  NamingOptions,
  ProcessingOptions,
  ExportOptions 
} from '../types/types';
import { resizeImage, generateFileName } from '../utils/imageUtils';

interface ProcessButtonProps {
  imageFiles: ImageFile[];
  selectedSizes: ResizeOption[];
  customSizes: ResizeOption[];
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  darkMode: boolean;
  namingOptions: NamingOptions;
  processingOptions: ProcessingOptions;
  exportOptions: ExportOptions;
}

const ProcessButton: React.FC<ProcessButtonProps> = ({
  imageFiles,
  selectedSizes,
  customSizes,
  isProcessing,
  setIsProcessing,
  darkMode,
  namingOptions,
  processingOptions,
  exportOptions,
}) => {
  const getQualityValue = (quality: string): number => {
    switch (quality) {
      case 'high': return 0.9;
      case 'medium': return 0.7;
      case 'low': return 0.5;
      default: return 0.7;
    }
  };

  const processImages = useCallback(async () => {
    if (imageFiles.length === 0 || (selectedSizes.length === 0 && customSizes.length === 0)) {
      return;
    }

    setIsProcessing(true);
    const zip = new JSZip();
    const allSizes = [...selectedSizes, ...customSizes];
    const processedImages: ProcessedImage[] = [];
    let sequenceNumber = 1;

    try {
      for (const imageFile of imageFiles) {
        const { name } = imageFile.file;
        
        for (const size of allSizes) {
          const { width, height } = size;
          
          const resizedBlob = await resizeImage(
            imageFile.file,
            width,
            height,
            {
              quality: getQualityValue(processingOptions.quality),
              format: processingOptions.format,
              stripMetadata: processingOptions.stripMetadata,
              maxFileSize: processingOptions.maxFileSize,
            }
          );

          const fileName = generateFileName(name, width, height, {
            ...namingOptions,
            format: processingOptions.format,
            sequenceNumber: namingOptions.useSequentialNumbers ? sequenceNumber++ : undefined,
          });

          processedImages.push({
            originalName: name,
            width,
            height,
            blob: resizedBlob,
            fileName,
          });

          if (exportOptions.organizeBySize) {
            zip.folder(`${width}x${height}`)?.file(fileName, resizedBlob);
          } else {
            zip.file(fileName, resizedBlob);
          }

          if (exportOptions.allowIndividualDownload) {
            const downloadUrl = URL.createObjectURL(resizedBlob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = fileName;
            link.click();
            URL.revokeObjectURL(downloadUrl);
          }
        }
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(zipBlob);
      downloadLink.download = `${exportOptions.zipFileName}.zip`;
      downloadLink.click();
      URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
      console.error('Error processing images:', error);
      alert('An error occurred while processing the images. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [
    imageFiles,
    selectedSizes,
    customSizes,
    setIsProcessing,
    namingOptions,
    processingOptions,
    exportOptions,
  ]);

  const isDisabled = 
    isProcessing || 
    imageFiles.length === 0 || 
    (selectedSizes.length === 0 && customSizes.length === 0);

  return (
    <button
      onClick={processImages}
      disabled={isDisabled}
      className={`
        w-full py-3 px-4 flex items-center justify-center rounded-md text-white font-medium
        transition-all duration-300
        ${isDisabled 
          ? 'cursor-not-allowed opacity-50 bg-gray-500' 
          : darkMode 
            ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/20' 
            : 'bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-blue-500/20'
        }
      `}
    >
      {isProcessing ? (
        <>
          <Loader className="animate-spin mr-2" size={20} />
          Processing...
        </>
      ) : (
        <>
          <Download className="mr-2" size={20} />
          Resize & Download
        </>
      )}
    </button>
  );
};

export default ProcessButton;