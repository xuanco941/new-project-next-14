import React from 'react';
import { motion, MotionStyle } from 'framer-motion';

interface ScaleDivProps {
  children: any,
  style?: MotionStyle,
  duration?: number,
  className?: string;
  delay?: number;
}

const ScaleDiv: React.FC<ScaleDivProps> = ({ children, style, duration, className, delay }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 100, scale: 0.7 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false }}
      transition={{ duration: duration ?? 0.4, delay: delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default ScaleDiv;