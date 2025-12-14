import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, LogOut, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import ImageUploader from '@/components/ImageUploader';

const UploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleImageSelect = (file: File, preview: string) => {
    setSelectedFile(file);
    setSelectedPreview(preview);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setSelectedPreview(null);
  };

  const handleProcess = () => {
    if (!selectedPreview) {
      toast({
        title: "No image selected",
        description: "Please upload an image first.",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate to processing page with the image data
    navigate('/processing', { state: { imageData: selectedPreview } });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Welcome, <span className="text-foreground font-medium">{user?.name}</span>
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Upload Your Image</h1>
            <p className="text-muted-foreground">
              Upload a fingerprint or hand image to extract ridge patterns
            </p>
          </div>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Image Upload
              </CardTitle>
              <CardDescription>
                Drag and drop or click to select an image file (JPG, PNG)
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <ImageUploader
                onImageSelect={handleImageSelect}
                selectedImage={selectedPreview}
                onClear={handleClear}
              />

              <Button 
                variant="gradient" 
                size="lg" 
                className="w-full"
                onClick={handleProcess}
                disabled={!selectedPreview}
              >
                <Zap className="w-5 h-5" />
                Start Fingerprint Tracing
              </Button>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              { title: 'Edge Detection', desc: 'Sobel algorithm' },
              { title: 'Noise Reduction', desc: 'Gaussian blur' },
              { title: 'PDF Export', desc: 'Downloadable report' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="text-center p-4 rounded-xl bg-card/50 border border-border/50"
              >
                <p className="font-medium text-foreground">{feature.title}</p>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default UploadPage;
