import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText('Image Resizer')).toBeInTheDocument();
  });

  it('toggles dark mode when clicking the theme toggle button', () => {
    render(<App />);
    const themeToggle = screen.getByTitle(/switch to dark mode/i);
    fireEvent.click(themeToggle);
    expect(screen.getByTitle(/switch to light mode/i)).toBeInTheDocument();
  });

  it('shows keyboard shortcuts modal when clicking the shortcuts button', () => {
    render(<App />);
    const shortcutsButton = screen.getByTitle(/keyboard shortcuts/i);
    fireEvent.click(shortcutsButton);
    expect(screen.getByText('Keyboard Shortcuts')).toBeInTheDocument();
  });

  it('handles file upload', async () => {
    render(<App />);
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/upload images/i);

    await userEvent.upload(input, file);

    expect(screen.getByText('test.jpg')).toBeInTheDocument();
  });

  it('shows error message when processing fails', async () => {
    render(<App />);
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/upload images/i);

    await userEvent.upload(input, file);

    // Mock canvas.toBlob to throw an error
    const canvas = document.createElement('canvas');
    canvas.toBlob = jest.fn().mockImplementation((callback) => {
      callback(null);
    });

    const resizeButton = screen.getByText(/resize and download/i);
    fireEvent.click(resizeButton);

    await waitFor(() => {
      expect(screen.getByText(/an error occurred while processing the images/i)).toBeInTheDocument();
    });
  });

  it('handles custom size input', () => {
    render(<App />);
    const widthInput = screen.getByLabelText(/width/i);
    const heightInput = screen.getByLabelText(/height/i);

    fireEvent.change(widthInput, { target: { value: '800' } });
    fireEvent.change(heightInput, { target: { value: '600' } });

    expect(widthInput).toHaveValue(800);
    expect(heightInput).toHaveValue(600);
  });

  it('toggles aspect ratio lock', () => {
    render(<App />);
    const lockButton = screen.getByTitle(/toggle aspect ratio lock/i);
    
    fireEvent.click(lockButton);
    expect(screen.getByTitle(/aspect ratio unlocked/i)).toBeInTheDocument();
    
    fireEvent.click(lockButton);
    expect(screen.getByTitle(/aspect ratio locked/i)).toBeInTheDocument();
  });

  it('shows and hides naming options panel', () => {
    render(<App />);
    const namingButton = screen.getByText(/naming options/i);
    
    fireEvent.click(namingButton);
    expect(screen.getByText(/prefix/i)).toBeInTheDocument();
    
    fireEvent.click(namingButton);
    expect(screen.queryByText(/prefix/i)).not.toBeInTheDocument();
  });

  it('shows and hides format options panel', () => {
    render(<App />);
    const formatButton = screen.getByText(/format options/i);
    
    fireEvent.click(formatButton);
    expect(screen.getByText(/jpeg/i)).toBeInTheDocument();
    
    fireEvent.click(formatButton);
    expect(screen.queryByText(/jpeg/i)).not.toBeInTheDocument();
  });

  it('shows and hides quality options panel', () => {
    render(<App />);
    const qualityButton = screen.getByText(/quality options/i);
    
    fireEvent.click(qualityButton);
    expect(screen.getByText(/high/i)).toBeInTheDocument();
    
    fireEvent.click(qualityButton);
    expect(screen.queryByText(/high/i)).not.toBeInTheDocument();
  });
}); 