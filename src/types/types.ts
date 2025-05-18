export interface ImageFile {
  file: File;
  id: string;
  preview: string;
}

export interface ResizeOption {
  width: number;
  height: number;
  isSelected: boolean;
}

export interface ProcessedImage {
  originalName: string;
  width: number;
  height: number;
  blob: Blob;
  fileName: string;
}

export type ImageQuality = 'high' | 'medium' | 'low';
export type ImageFormat = 'jpeg' | 'png' | 'webp';
export type OptimizationLevel = 'none' | 'light' | 'medium' | 'heavy';

export interface NamingOptions {
  prefix: string;
  suffix: string;
  separator: string;
  useSequentialNumbers: boolean;
}

export interface ProcessingOptions {
  quality: ImageQuality;
  format: ImageFormat;
  optimization: OptimizationLevel;
  stripMetadata: boolean;
  maxFileSize: number;
}

export interface ExportOptions {
  zipFileName: string;
  organizeBySize: boolean;
  allowIndividualDownload: boolean;
}