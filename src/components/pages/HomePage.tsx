// HPI 1.8-V (Visual Update)
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { ArrowDown, ArrowRight, ExternalLink, Mail, MapPin, Calendar, Phone } from 'lucide-react';

// --- Local Types for Hardcoded Data ---
type CoreService = {
  _id: string;
  serviceName: string;
  description: string;
  integrationPartner?: string;
  tagline?: string;
  serviceImage?: string;
};

type Partner = {
  _id: string;
  partnerName: string;
  partnerDescription: string;
  partnerLogo?: string;
};

type TimelineItem = {
  _id: string;
  milestoneName: string;
  milestoneDate: string;
  description: string;
  status: string;
};

// --- Utility Components ---

const FilmGrain = () => (
  <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay">
    <svg className="h-full w-full">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  direction = 'up'
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
            element.classList.add('is-visible');
        }, delay);
        observer.unobserve(element);
      }
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  const getTransform = () => {
    switch(direction) {
      case 'up': return 'translate-y-8';
      case 'down': return '-translate-y-8';
      case 'left': return 'translate-x-8';
      case 'right': return '-translate-x-8';
      default: return '';
    }
  };

  return (
    <div 
      ref={ref} 
      className={`opacity-0 transition-all duration-1000 ease-out ${getTransform()} [&.is-visible]:opacity-100 [&.is-visible]:translate-x-0 [&.is-visible]:translate-y-0 ${className}`}
    >
      {children}
    </div>
  );
};

const ParallaxImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="h-[120%] w-full relative -top-[10%]">
        <Image 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
          width={1200}
        />
      </motion.div>
    </div>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  
  // --- 1. HARDCODED SERVICES DATA (With Official Images) ---
  const services: CoreService[] = [
    {
      _id: '1',
      serviceName: 'Smart Sync',
      description: 'Revolutionizes the way you schedule appointments. TERA negotiates times and syncs directly to your calendar for unmatched efficiency.',
      integrationPartner: 'Google Calendar',
      tagline: 'Time Reclaimed',
      serviceImage: 'https://static.wixstatic.com/media/362827_c666923c320d4ea1b03ba73bc2bca802~mv2.png' // Official Google Calendar graphic
    },
    {
      _id: '2',
      serviceName: 'Financial Fusion',
      description: 'Handle payments and financial transactions directly within the chat interface. Secure, borderless, and instant.',
      integrationPartner: 'Wise',
      tagline: 'Borderless Economy',
      serviceImage: 'https://static.wixstatic.com/media/362827_e4abddc80ceb4cc4988388fbd84bf831~mv2.png' // Official Wise graphic
    },
    {
      _id: '3',
      serviceName: 'Service Bridge',
      description: 'Make service bookings and navigate logistics without leaving WhatsApp. The "Do-It-All" assistant for your daily needs.',
      integrationPartner: 'Google Maps',
      tagline: 'Logistics Solved',
      serviceImage: 'https://static.wixstatic.com/media/362827_d090ed83cbd44596b6abc29fcff14d86~mv2.png' // Official Google Maps graphic
    }
  ];

  // --- 2. HARDCODED PARTNERS DATA (With Logos) ---
  const partners: Partner[] = [
    { 
      _id: '1', 
      partnerName: 'NVIDIA Inception', 
      partnerDescription: 'Startup Program',
      partnerLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg'
    },
    { 
      _id: '2', 
      partnerName: 'AWS', 
      partnerDescription: 'Cloud Infrastructure',
      partnerLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg'
    },
    { 
      _id: '3', 
      partnerName: 'Wise', 
      partnerDescription: 'Payment Integration',
      partnerLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Wise_Logo.svg'
    },
    { 
      _id: '4', 
      partnerName: 'Google Maps', 
      partnerDescription: 'Navigation Sync',
      partnerLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg'
    },
    { 
      _id: '5', 
      partnerName: 'WhatsApp', 
      partnerDescription: 'Native Platform',
      partnerLogo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'
    }
  ];

  // --- 3. HARDCODED TIMELINE DATA ---
  const timeline: TimelineItem[] = [
    { 
      _id: '1', 
      milestoneName: 'Ideation', 
      milestoneDate: '2025-05-01', 
      description: 'The concept of a WhatsApp-native AI assistant is born.', 
      status: 'COMPLETED' 
    },
    { 
      _id: '2', 
      milestoneName: 'Foundation', 
      milestoneDate: '2025-06-01', 
      description: 'The core structure was created. Partnership discussions begin.', 
      status: 'COMPLETED' 
    },
    { 
      _id: '3', 
      milestoneName: 'Building Blocks', 
      milestoneDate: '2025-07-01', 
      description: 'Started development in collaboration with AWS & NVIDIA Inception Program.', 
      status: 'COMPLETED' 
    },
    { 
      _id: '4', 
      milestoneName: 'AI Fusion', 
      milestoneDate: '2025-08-01', 
      description: 'Integrated with ChatGPT 5.0 and Google Gemini 2.5 models.', 
      status: 'COMPLETED' 
    },
    { 
      _id: '5', 
      milestoneName: 'Smart Sync', 
      milestoneDate: '2025-08-01', 
      description: 'Integrated with Google Calendar for automated scheduling.', 
      status: 'COMPLETED' 
    },
    { 
      _id: '6', 
      milestoneName: 'In Motion', 
      milestoneDate: '2025-09-01', 
      description: 'Currently in active use and iteration – gathering feedback and refining features.', 
      status: 'LIVE' 
    }
  ];

  // --- Scroll Effects ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-deep-matte-charcoal text-off-white-bone font-paragraph selection:bg-muted-terracotta selection:text-deep-matte-charcoal overflow-clip relative">
      <style>{`
        .text-stroke {
          -webkit-text-stroke: 1px rgba(227, 227, 227, 0.2);
          color: transparent;
        }
      `}</style>
      <FilmGrain />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-muted-terracotta origin-left z-[100]"
        style={{ scaleX }}
      />

      <Header />

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-b from-deep-matte-charcoal/80 via-deep-matte-charcoal/40 to-deep-matte-charcoal z-10" />
             <ParallaxImage 
               src="https://static.wixstatic.com/media/190b6f_e8963e8b1c8f40e08019aa36662cdd99~mv2.png?originWidth=1152&originHeight=640"
               alt="Abstract cinematic texture representing AI neural networks"
               className="h-full w-full opacity-40"
             />
          </div>

          <div className="relative z-20 w-full max-w-[120rem] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col gap-6">
              <AnimatedElement delay={200}>
                <div className="flex items-center gap-4 text-muted-terracotta mb-4">
                  <span className="h-[1px] w-12 bg-muted-terracotta"></span>
                  <span className="uppercase tracking-[0.2em] text-sm font-medium">System Online</span>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={400}>
                <h1 className="text-7xl md:text-8xl lg:text-[9rem] leading-[0.9] font-heading font-black tracking-tighter text-off-white-bone mix-blend-lighten">
                  THE <br />
                  <span className="text-stroke">{"TERA"}</span> <br />
                  ENGINE
                </h1>
              </AnimatedElement>

              <AnimatedElement delay={600} className="max-w-2xl mt-8">
                <p className="text-xl md:text-2xl text-off-white-bone/80 font-light leading-relaxed border-l-2 border-muted-terracotta pl-6">
                  Your WhatsApp AI Personal Assistant. Bridging the gap between complex AI and everyday utility.
                </p>
              </AnimatedElement>

              <AnimatedElement delay={800} className="mt-12 flex flex-wrap gap-6">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative px-8 py-4 bg-off-white-bone text-deep-matte-charcoal font-bold tracking-wide overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    INITIATE SEQUENCE <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-muted-terracotta transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
                
                <div className="flex items-center gap-4 text-off-white-bone/50 text-sm font-mono">
                  <span>v2.5 GEMINI</span>
                  <span className="w-1 h-1 bg-muted-terracotta rounded-full" />
                  <span>v5.0 CHATGPT</span>
                </div>
              </AnimatedElement>
            </div>

            <div className="hidden lg:col-span-4 lg:flex flex-col justify-end items-end h-full opacity-50">
               <div className="w-full aspect-[3/4] border border-off-white-bone/10 relative p-4">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-muted-terracotta" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-muted-terracotta" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-muted-terracotta" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-muted-terracotta" />
                  
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="text-6xl font-heading text-muted-terracotta/20">01</div>
                      <div className="text-xs tracking-widest uppercase">Neural Link Active</div>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-off-white-bone/40"
          >
            <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </motion.div>
        </section>

        {/* --- PARTNERS STRIP --- */}
        <section className="py-12 border-y border-off-white-bone/5 bg-deep-matte-charcoal relative z-30">
          <div className="max-w-[120rem] mx-auto px-6">
            <p className="text-center text-sm uppercase tracking-[0.3em] text-off-white-bone/40 mb-8">Trusted Ecosystem Partners</p>
            
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
              {partners.map((partner) => (
                <div key={partner._id} className="group relative flex flex-col items-center justify-center">
                  <div className="h-10 md:h-14 w-auto relative grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                    <Image 
                      src={partner.partnerLogo || ''} 
                      alt={partner.partnerName} 
                      className="h-full w-auto object-contain brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-500"
                      width={200}
                    />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] whitespace-nowrap text-muted-terracotta uppercase tracking-widest">
                    {partner.partnerDescription}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SERVICES SECTION --- */}
        <section id="services" className="relative py-32 bg-deep-matte-charcoal">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              
              <div className="lg:col-span-4 relative">
                <div className="sticky top-32">
                  <AnimatedElement direction="right">
                    <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-off-white-bone">
                      Core <br />
                      <span className="text-muted-terracotta">Services</span>
                    </h2>
                    <p className="text-lg text-off-white-bone/60 mb-8 leading-relaxed">
                      Advanced AI capabilities integrated directly into your daily workflow. No apps to install, just natural conversation.
                    </p>
                    <div className="hidden lg:block w-24 h-1 bg-off-white-bone/10 mb-8" />
                    <div className="flex flex-col gap-4 text-sm text-off-white-bone/40 font-mono">
                      <div className="flex justify-between border-b border-off-white-bone/10 pb-2">
                        <span>STATUS</span>
                        <span className="text-green-500">OPERATIONAL</span>
                      </div>
                      <div className="flex justify-between border-b border-off-white-bone/10 pb-2">
                        <span>LATENCY</span>
                        <span>&lt; 120ms</span>
                      </div>
                      <div className="flex justify-between border-b border-off-white-bone/10 pb-2">
                        <span>ENCRYPTION</span>
                        <span>AES-256</span>
                      </div>
                    </div>
                  </AnimatedElement>
                </div>
              </div>

              <div className="lg:col-span-8 flex flex-col gap-24">
                {services.map((service, index) => (
                  <AnimatedElement key={service._id} delay={index * 100} className="group">
                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center border border-off-white-bone/10 bg-off-white-bone/5 p-8 md:p-12 rounded-sm hover:border-muted-terracotta/50 transition-colors duration-500">
                      
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-off-white-bone/30 group-hover:border-muted-terracotta transition-colors" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-off-white-bone/30 group-hover:border-muted-terracotta transition-colors" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-off-white-bone/30 group-hover:border-muted-terracotta transition-colors" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-off-white-bone/30 group-hover:border-muted-terracotta transition-colors" />

                      <div className="order-2 md:order-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xs font-mono text-muted-terracotta px-2 py-1 border border-muted-terracotta/30 rounded">
                            MODULE 0{index + 1}
                          </span>
                          {service.integrationPartner && (
                            <span className="text-xs text-off-white-bone/40 uppercase tracking-wider">
                              Via {service.integrationPartner}
                            </span>
                          )}
                        </div>
                        <h3 className="text-3xl font-heading font-bold mb-4 text-off-white-bone group-hover:text-muted-terracotta transition-colors">
                          {service.serviceName}
                        </h3>
                        <p className="text-off-white-bone/70 leading-relaxed mb-6">
                          {service.description}
                        </p>
                        {service.tagline && (
                          <div className="flex items-center gap-2 text-sm text-off-white-bone/50 italic">
                            <span className="w-4 h-[1px] bg-muted-terracotta" />
                            {service.tagline}
                          </div>
                        )}
                      </div>

                      <div className="order-1 md:order-2 relative aspect-square md:aspect-[4/3] overflow-hidden rounded-sm">
                        {service.serviceImage ? (
                          <Image 
                            src={service.serviceImage}
                            alt={service.serviceName || 'Service visualization'}
                            className="w-full h-full object-contain bg-black/50 grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                            width={600}
                          />
                        ) : (
                          <div className="w-full h-full bg-off-white-bone/5 flex items-center justify-center">
                            <span className="text-off-white-bone/20 text-6xl font-heading">{index + 1}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-matte-charcoal/80 to-transparent opacity-60" />
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- TIMELINE SECTION (Header Updated) --- */}
        <section id="timeline" className="py-32 bg-deep-matte-charcoal relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'linear-gradient(#E3E3E3 1px, transparent 1px), linear-gradient(90deg, #E3E3E3 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
          />

          <div className="max-w-[80rem] mx-auto px-6 relative z-10">
            <AnimatedElement className="text-center mb-24">
              {/* UPDATED HEADER HERE */}
              <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6">Development <span className="text-muted-terracotta">Log</span></h2>
              <p className="text-off-white-bone/60 max-w-2xl mx-auto">Tracing the evolution of the TERA engine from concept to reality.</p>
            </AnimatedElement>

            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-off-white-bone/20 md:-translate-x-1/2" />

              <div className="space-y-16 md:space-y-24">
                {timeline.map((item, index) => {
                  const isAIFocus = item.milestoneName?.includes('AI Fusion') || item.milestoneName?.includes('Smart Sync');
                  
                  return (
                    <div key={item._id} className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="md:w-1/2 pl-12 md:pl-0 md:px-16">
                        <AnimatedElement direction={index % 2 === 0 ? 'left' : 'right'} delay={index * 100}>
                          <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'} md:text-right`}>
                            <div className={`text-left ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                              <span className={`inline-block px-3 py-1 mb-3 text-xs font-mono border rounded-full ${isAIFocus ? 'text-muted-terracotta border-muted-terracotta/50 bg-muted-terracotta/10' : 'text-muted-terracotta border-muted-terracotta/30 bg-muted-terracotta/5'}`}>
                                {item.status || 'ARCHIVED'}
                              </span>
                              <h3 className={`font-heading font-bold mb-2 text-off-white-bone ${isAIFocus ? 'text-3xl' : 'text-2xl'}`}>{item.milestoneName}</h3>
                              <div className="flex items-center gap-2 text-off-white-bone/50 text-sm mb-4 md:justify-start justify-start">
                                <Calendar className="w-4 h-4" />
                                {new Date(item.milestoneDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                              </div>
                              <p className={`leading-relaxed ${isAIFocus ? 'text-lg text-off-white-bone' : 'text-off-white-bone/70'}`}>
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </AnimatedElement>
                      </div>

                      <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-deep-matte-charcoal border-2 border-muted-terracotta z-10 mt-1.5 ${isAIFocus ? 'scale-125' : ''}`}>
                        <div className="absolute inset-0 bg-muted-terracotta rounded-full animate-ping opacity-20" />
                      </div>
                      <div className="hidden md:block md:w-1/2" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* --- CONTACT SECTION (Removed Visual Breather) --- */}
        <section id="contact" className="py-32 bg-deep-matte-charcoal border-t border-off-white-bone/10">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              
              <AnimatedElement direction="right">
                <h2 className="text-6xl md:text-8xl font-heading font-black text-off-white-bone mb-8">
                  LET'S <br />
                  <span className="text-muted-terracotta">TALK</span>
                </h2>
                <p className="text-xl text-off-white-bone/60 max-w-md mb-12">
                  Ready to deploy the invisible engine? Reach out to discuss integration and partnership opportunities.
                </p>
                
                <div className="space-y-8">
                  <a href="mailto:charles@hellotera.ai" className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-full border border-off-white-bone/20 flex items-center justify-center group-hover:bg-muted-terracotta group-hover:border-muted-terracotta transition-all duration-300">
                      <Mail className="w-6 h-6 text-off-white-bone group-hover:text-deep-matte-charcoal" />
                    </div>
                    <div>
                      <div className="text-sm text-off-white-bone/40 uppercase tracking-wider mb-1">Email Us</div>
                      <div className="text-2xl font-heading text-off-white-bone group-hover:text-muted-terracotta transition-colors">charles@hellotera.ai</div>
                    </div>
                  </a>

                  <a href="tel:+60137336001" className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-full border border-off-white-bone/20 flex items-center justify-center group-hover:bg-muted-terracotta group-hover:border-muted-terracotta transition-all duration-300">
                      <Phone className="w-6 h-6 text-off-white-bone group-hover:text-deep-matte-charcoal" />
                    </div>
                    <div>
                      <div className="text-sm text-off-white-bone/40 uppercase tracking-wider mb-1">Direct Line</div>
                      <div className="text-2xl font-heading text-off-white-bone group-hover:text-muted-terracotta transition-colors">+60 13-733 6001</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-full border border-off-white-bone/20 flex items-center justify-center group-hover:bg-muted-terracotta group-hover:border-muted-terracotta transition-all duration-300">
                      <MapPin className="w-6 h-6 text-off-white-bone group-hover:text-deep-matte-charcoal" />
                    </div>
                    <div>
                      <div className="text-sm text-off-white-bone/40 uppercase tracking-wider mb-1">HQ Location</div>
                      <div className="text-2xl font-heading text-off-white-bone">Petaling Jaya, Selangor</div>
                    </div>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement direction="left" delay={200}>
                <div className="relative aspect-square md:aspect-[4/5] w-full bg-off-white-bone/5 rounded-sm overflow-hidden border border-off-white-bone/10 p-2">
                  <div className="absolute inset-0 bg-[url('https://static.wixstatic.com/media/190b6f_48160ec9837342ada0744378cebc0740~mv2.png?originWidth=640&originHeight=768')] bg-cover bg-center opacity-20 grayscale mix-blend-overlay" />
                  <div className="h-full w-full border border-off-white-bone/10 flex flex-col justify-between p-8 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 border-t-2 border-l-2 border-muted-terracotta" />
                      <ExternalLink className="w-6 h-6 text-off-white-bone/40" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-6xl font-heading font-bold text-off-white-bone/10">TERA</div>
                      <div className="text-sm font-mono text-muted-terracotta">3.1390° N, 101.6869° E</div>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="text-xs text-off-white-bone/30 max-w-[150px]">
                        SECURE FACILITY
                        <br />ACCESS RESTRICTED
                      </div>
                      <div className="w-12 h-12 border-b-2 border-r-2 border-muted-terracotta" />
                    </div>
                  </div>
                </div>
              </AnimatedElement>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}