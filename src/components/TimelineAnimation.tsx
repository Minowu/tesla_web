import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

// Type definitions
interface TimelineItem {
  year: string;
  title: string;
  description: string;
  color: string;
}

interface TimelineAnimationProps {
  data?: TimelineItem[];
  className?: string;
}

const TimelineAnimation: React.FC<TimelineAnimationProps> = ({ 
  data, 
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [lineProgress, setLineProgress] = useState<number>(0);
  
  const { scrollYProgress }: { scrollYProgress: MotionValue<number> } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth spring animation cho marker movement
  const smoothProgress: MotionValue<number> = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Default data cho timeline - có thể override bằng props
  const defaultTimelineData: TimelineItem[] = [
    {
      year: "2018",
      title: "The Beginning",
      description: "Founded with a vision to transform digital experiences and create meaningful connections.",
      color: "#4F46E5"
    },
    {
      year: "2019", 
      title: "Growth & Innovation",
      description: "Expanded our team and launched groundbreaking products that redefined industry standards.",
      color: "#7C3AED"
    },
    {
      year: "2020",
      title: "Global Expansion",
      description: "Despite challenges, we grew internationally and adapted to serve clients worldwide.",
      color: "#EC4899"
    },
    {
      year: "2021",
      title: "Digital Transformation",
      description: "Led the digital revolution with cutting-edge solutions and innovative approaches.",
      color: "#F59E0B"
    },
    {
      year: "2022",
      title: "Industry Leadership",
      description: "Became recognized industry leaders, setting new benchmarks for excellence.",
      color: "#10B981"
    },
    {
      year: "2023",
      title: "Future Vision",
      description: "Continuing to innovate and shape the future of technology and human connection.",
      color: "#06B6D4"
    }
  ];

  // Sử dụng data từ props hoặc default data
  const timelineData: TimelineItem[] = data || defaultTimelineData;

  // Tạo background pattern SVG
  const createBackgroundPattern = (): string => {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="trianglePattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M20 80 L50 20 L80 80 Z" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
            <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
            <path d="M10 10 L90 10 L90 90 L10 90 Z" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="500" height="500" fill="#0a0a0a"/>
        <rect width="500" height="500" fill="url(#trianglePattern)"/>
        <circle cx="150" cy="150" r="100" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
        <circle cx="350" cy="350" r="80" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <path d="M100 100 L150 50 L200 100 L175 150 L125 150 Z" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
        <path d="M300 200 L350 150 L400 200 L375 250 L325 250 Z" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
      </svg>
    `)}`;
  };

  // Calculate marker position và active section
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const sectionIndex = Math.min(
        Math.floor(latest * timelineData.length),
        timelineData.length - 1
      );
      setCurrentSection(sectionIndex);
      
      // Calculate line progress
      const progress = Math.min(latest * timelineData.length, timelineData.length - 1);
      setLineProgress(progress);
    });
    return unsubscribe;
  }, [scrollYProgress, timelineData.length]);



  // Calculate timeline line Y position để di chuyển theo scroll
  const timelineLineY = useTransform(
    smoothProgress,
    [0, 1],
    [0, -(timelineData.length - 1) * 100] // Di chuyển ngược chiều với scroll, sử dụng vh
  );

  return (
    <div ref={containerRef} className="timeline-container">

      {/* Timeline Line */}
      <motion.div 
        className="timeline-line-container"
        style={{ y: timelineLineY }}
      >
        {/* Background line */}
        <div className="timeline-line-background" />
        
        {/* Progressive segments */}
        {timelineData.map((_, index) => {
          const segmentProgress = Math.max(0, Math.min(1, lineProgress - index));
          return (
            <div
              key={`segment-${index}`}
              className={`timeline-line-segment ${segmentProgress > 0.01? 'active' : ''}`}
              style={{
                top: `${5 + (index * 16.67)}rem`,
                height: `16.67rem`,
                opacity: segmentProgress
              }}
            />
          );
        })}
        
        {/* Timeline pins với year labels */}
        {timelineData.map((item, index) => {
          const pinProgress = lineProgress >= index ? 1 : 0;
          const isActive = currentSection === index;
          
          return (
            <div
              key={`pin-${index}`}
              className="timeline-pin-container"
              style={{ top: `${15 + (index * 60)}rem` }}
            >
              <div
                className={`timeline-pin ${
                  isActive ? 'active' : pinProgress > 0 ? 'lit' : 'inactive'
                }`}
                style={{
                  backgroundColor: isActive ? item.color : 
                                 pinProgress > 0 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)',
                  boxShadow: isActive ? `0 0 20px ${item.color}60, 0 0 40px ${item.color}30` :
                            pinProgress > 0 ? '0 0 15px rgba(255,255,255,0.5)' : 'none'
                }}
              >
                {pinProgress > 0 && (
                  <div
                    className="timeline-pin-inner"
                    style={{
                      backgroundColor: isActive ? item.color : 'white',
                      opacity: isActive ? 0.8 : pinProgress * 0.6
                    }}
                  />
                )}
              </div>
              
              <div
                className={`timeline-year-label ${pinProgress > 0 ? 'visible' : ''} ${isActive ? 'active' : ''}`}
                style={{
                  color: isActive ? item.color : 'white',
                  transitionDelay: pinProgress > 0 ? '0.2s' : '0s'
                }}
              >
                {item.year}
              </div>
            </div>
          );
        })}


      </motion.div>

      {/* Content Sections */}
      <div className="timeline-content">
        {timelineData.map((item, index) => (
          <section key={index} className="timeline-section">
            <div className="timeline-section-content">
              {/* Text Content */}
              <motion.div
                className="timeline-text-content"
                style={{ backgroundColor: `${item.color}15`, borderColor: `${item.color}40` }}
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Year Badge */}
                <motion.div
                  className="timeline-year-badge"
                  style={{ 
                    backgroundColor: `${item.color}30`,
                    borderColor: `${item.color}50`
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <div 
                    className="timeline-year-badge-dot"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.year}
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="timeline-title"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                  viewport={{ once: true }}
                >
                  {item.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  className="timeline-description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                  viewport={{ once: true }}
                >
                  {item.description}
                </motion.p>

                {/* Decorative line */}
                <motion.div
                  className="timeline-decorative-line"
                  style={{ backgroundColor: item.color }}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '5rem', opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.8 }}
                  viewport={{ once: true }}
                />
              </motion.div>

              {/* Visual Card removed as requested; background moved to text content */}
            </div>
          </section>
        ))}
      </div>



      {/* Scroll Hint */}
      <motion.div
        className="timeline-scroll-hint"
        initial={{ opacity: 1 }}
        animate={{ opacity: scrollYProgress.get() < 0.1 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="timeline-scroll-hint-text">Scroll to explore our journey</div>
        <div className="timeline-scroll-mouse">
          <div className="timeline-scroll-mouse-dot" />
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineAnimation;
