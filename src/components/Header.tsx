import React from 'react';
import { ImageDown } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <ImageDown className="h-8 w-8 text-blue-500" />
      <h1 className="text-2xl font-bold tracking-tight">Image Resizer</h1>
    </div>
  );
};

export default Header;