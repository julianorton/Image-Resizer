import '@testing-library/jest-dom';

// Mock URL.createObjectURL and URL.revokeObjectURL
window.URL.createObjectURL = jest.fn();
window.URL.revokeObjectURL = jest.fn();

// Mock canvas context
const mockContext = {
  drawImage: jest.fn(),
  setTransform: jest.fn(),
  translate: jest.fn(),
  rotate: jest.fn(),
  imageSmoothingQuality: 'high',
} as unknown as CanvasRenderingContext2D;

(HTMLCanvasElement.prototype.getContext as jest.Mock) = jest.fn(() => mockContext);

// Mock FileReader
global.FileReader = class MockFileReader extends FileReader {
  // @ts-ignore
  readAsDataURL(blob: Blob) {
    if (this.onload) {
      this.onload({
        target: { result: 'data:image/jpeg;base64,mock' },
      } as any);
    }
  }
}; 