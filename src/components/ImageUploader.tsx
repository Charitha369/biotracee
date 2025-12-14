import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  onImageSelect: (file: File, preview: string) => void;
  selectedImage: string | null;
  onClear: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageSelect, 
  selectedImage,
  onClear 
}) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageSelect(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!selectedImage ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div
              {...getRootProps()}
              className={`
                relative border-2 border-dashed rounded-xl p-12 cursor-pointer
                transition-all duration-300 group
                ${isDragActive 
                  ? 'border-primary bg-primary/5 scale-[1.02]' 
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }
              `}
            >
              <input {...getInputProps()} />
              
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  className={`
                    w-20 h-20 rounded-2xl flex items-center justify-center
                    transition-all duration-300
                    ${isDragActive ? 'gradient-bg shadow-glow' : 'bg-muted group-hover:bg-primary/10'}
                  `}
                  animate={isDragActive ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5, repeat: isDragActive ? Infinity : 0 }}
                >
                  <Upload className={`w-10 h-10 ${isDragActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                </motion.div>
                
                <div className="text-center">
                  <p className="text-lg font-medium text-foreground mb-1">
                    {isDragActive ? 'Drop your image here' : 'Drag & drop your image here'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse • JPG, PNG accepted
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ImageIcon className="w-4 h-4" />
                  <span>Fingerprint or hand image for best results</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden border border-border shadow-medium">
              <img 
                src={selectedImage} 
                alt="Selected image" 
                className="w-full h-64 object-contain bg-muted/30"
              />
              
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-3 right-3"
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-center text-sm text-muted-foreground mt-3">
              Image ready for processing
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUploader;
