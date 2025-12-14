import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';
import ProcessingAnimation from '@/components/ProcessingAnimation';
import { traceFingerprint } from '@/utils/fingerprintTracer';

const ProcessingPage: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const imageData = location.state?.imageData;

  useEffect(() => {
    if (!imageData) {
      toast({
        title: "No image found",
        description: "Please upload an image first.",
        variant: "destructive",
      });
      navigate('/upload');
      return;
    }

    // Process the fingerprint
    const processImage = async () => {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 5, 90));
      }, 200);

      try {
        // Process the fingerprint
        const tracedImage = await traceFingerprint(imageData);
        
        clearInterval(progressInterval);
        setProgress(100);

        // Wait a moment before navigating
        setTimeout(() => {
          navigate('/result', { 
            state: { 
              originalImage: imageData, 
              tracedImage 
            } 
          });
        }, 500);
      } catch (error) {
        clearInterval(progressInterval);
        toast({
          title: "Processing failed",
          description: "Failed to trace fingerprint. Please try again.",
          variant: "destructive",
        });
        navigate('/upload');
      }
    };

    processImage();
  }, [imageData, navigate, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Logo />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-card rounded-2xl border shadow-medium p-8">
            <ProcessingAnimation />
            
            {/* Progress bar */}
            <div className="mt-8">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Processing</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full gradient-bg"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Applying image processing pipeline:</p>
              <p className="font-mono text-xs mt-2">
                Grayscale → Blur → Enhance → Edges → Morph
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ProcessingPage;
