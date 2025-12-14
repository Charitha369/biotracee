import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Fingerprint, Shield, FileText, Zap, Scan, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <Link to="/login">
            <Button variant="gradient">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Scan className="w-4 h-4" />
              Hackathon Demo Project
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Fingerprint <span className="gradient-text">Tracing</span>
            <br />Made Simple
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Upload an image, trace ridge patterns using advanced edge detection, 
            and download professional PDF reports. All in your browser.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/login">
              <Button variant="gradient" size="xl">
                Start Tracing
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            className="mt-20 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80">
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Middle ring */}
              <motion.div
                className="absolute inset-6 rounded-full border-2 border-primary/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Inner ring */}
              <motion.div
                className="absolute inset-12 rounded-full border-2 border-primary/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Center icon */}
              <motion.div
                className="absolute inset-20 rounded-full gradient-bg shadow-glow flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Fingerprint className="w-16 h-16 md:w-20 md:h-20 text-primary-foreground" />
              </motion.div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 rounded-xl bg-card shadow-medium flex items-center justify-center"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Scan className="w-6 h-6 text-primary" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 rounded-xl bg-card shadow-medium flex items-center justify-center"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <FileText className="w-6 h-6 text-accent" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Three simple steps to trace fingerprints and generate professional reports
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Shield,
              title: 'Authenticate',
              description: 'Create an account or sign in to access the fingerprint tracing tools securely.',
              step: '01',
            },
            {
              icon: Zap,
              title: 'Upload & Process',
              description: 'Upload your image and our algorithm traces ridge patterns using edge detection.',
              step: '02',
            },
            {
              icon: Download,
              title: 'Download PDF',
              description: 'Get a professional PDF report with original and traced images side by side.',
              step: '03',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative bg-card rounded-2xl border shadow-soft p-8 h-full hover:shadow-medium transition-shadow duration-300">
                <span className="absolute top-4 right-4 text-5xl font-bold text-muted/30">
                  {feature.step}
                </span>
                
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-6 shadow-glow">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="bg-card rounded-3xl border shadow-medium p-8 md:p-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Processing Pipeline</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              'Grayscale',
              'Gaussian Blur',
              'CLAHE',
              'Sobel Edges',
              'Thresholding',
              'Morphology',
            ].map((step, index) => (
              <motion.div
                key={step}
                className="text-center p-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="w-10 h-10 rounded-full gradient-bg text-primary-foreground flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-sm font-medium">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Trace Fingerprints?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Start using BioTrace today. No complex setup required.
          </p>
          <Link to="/login">
            <Button variant="gradient" size="xl">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Hackathon Demo Project • BioTrace Fingerprint Analysis
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
