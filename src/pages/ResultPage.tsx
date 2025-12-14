import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import { generatePDF } from '@/utils/pdfGenerator';

const ResultPage: React.FC = () => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();

  const { originalImage, tracedImage } = location.state || {};

  React.useEffect(() => {
    if (!originalImage || !tracedImage) {
      toast({
        title: "No results found",
        description: "Please process an image first.",
        variant: "destructive",
      });
      navigate('/upload');
    }
  }, [originalImage, tracedImage, navigate, toast]);

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      const pdf = await generatePDF({
        userName: user?.name || 'Unknown User',
        originalImage,
        tracedImage,
        date: new Date(),
      });
      
      // Download the PDF
      pdf.save(`BioTrace_Report_${Date.now()}.pdf`);
      
      toast({
        title: "PDF Generated!",
        description: "Your fingerprint analysis report has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "PDF Generation Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleNewScan = () => {
    navigate('/upload');
  };

  if (!originalImage || !tracedImage) {
    return null;
  }

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
          <Button variant="ghost" onClick={handleNewScan}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            New Scan
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-bg mb-4 shadow-glow"
            >
              <ImageIcon className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">Analysis Complete</h1>
            <p className="text-muted-foreground">
              Fingerprint ridge patterns have been extracted successfully
            </p>
          </div>

          {/* Image comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="shadow-medium overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                    Original Image
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted/30 flex items-center justify-center">
                    <img 
                      src={originalImage} 
                      alt="Original" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="shadow-medium overflow-hidden border-primary/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full gradient-bg" />
                    Traced Fingerprint
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted/30 flex items-center justify-center">
                    <img 
                      src={tracedImage} 
                      alt="Traced Fingerprint" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="shadow-medium">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Download Report</h3>
                      <p className="text-sm text-muted-foreground">
                        Get a PDF with both images and analysis details
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="gradient" 
                    size="lg"
                    onClick={handleGeneratePDF}
                    disabled={isGeneratingPDF}
                  >
                    {isGeneratingPDF ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Generate PDF
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Processing steps */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">Processing Pipeline Applied:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Grayscale', 'Gaussian Blur', 'CLAHE', 'Sobel Edges', 'Morphological Ops'].map((step, index) => (
                <span 
                  key={step}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                >
                  {index + 1}. {step}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default ResultPage;
