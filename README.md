# Image Resizer

A modern, client-side image resizing tool built with React and TypeScript. Resize multiple images to different dimensions in your browser without uploading them anywhere.

## Features

- 🖼️ Upload multiple images (JPG, PNG, WebP)
- 📏 Choose from preset sizes or create custom dimensions
- 🎯 Resize images in the browser using Canvas API
- 📦 Download all resized images as a ZIP file
- 🔒 No server upload - everything happens in your browser
- 🎨 Clean, modern UI with responsive design

## Live Demo

[Add your deployed demo link here]

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/image-resizer.git
cd image-resizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

1. Click the upload area or drag and drop your images
2. Select preset sizes or enter custom dimensions
3. Click "Resize & Download" to process your images
4. A ZIP file containing all resized images will be downloaded

## Technical Details

- Built with React 18 and TypeScript
- Uses Canvas API for image processing
- Uses JSZip for creating ZIP archives
- Styled with modern CSS
- No external dependencies for image processing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [JSZip](https://stuk.github.io/jszip/)
- [Vite](https://vitejs.dev/)

## Roadmap

- [ ] Add drag-and-drop support
- [ ] Add image previews
- [ ] Add progress bar
- [ ] Add dark mode
- [ ] Add aspect ratio lock
- [ ] Add quality control
- [ ] Add batch rename options
- [ ] Add format conversion
- [ ] Add unit tests
- [ ] Add error boundaries
- [ ] Add keyboard shortcuts
- [ ] Add tooltips 