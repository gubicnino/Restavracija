import { motion } from 'framer-motion';

// Primary Gold Button
export function GoldButton({ 
  href, 
  onClick, 
  children, 
  className = '',
  variant = 'primary', // 'primary' ali 'outline'
  ...props 
}) {
  const baseClasses = "group relative px-8 py-4 font-inter font-semibold tracking-wider uppercase text-sm transition-all duration-500";
  
  const variants = {
    primary: "bg-gold text-black-rich gold-glow hover:bg-gold-light",
    outline: "border border-gold text-gold hover:bg-gold hover:text-black-rich"
  };

  const Component = href ? motion.a : motion.button;
  
  return (
    <Component
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </Component>
  );
}

// Animated Link Button (npr. "View Full Menu")
export function AnimatedLink({ 
  href, 
  children, 
  className = '',
  onClick,
  ...props 
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`inline-flex items-center gap-3 text-gold font-inter text-sm tracking-wider uppercase hover:text-gold-light transition-colors duration-300 ${className}`}
      {...props}
    >
      <span>{children}</span>
      <span className="w-8 h-px bg-current" />
    </motion.a>
  );
}

// Navigation Link (za mobile menu)
export function NavLink({ 
  href, 
  children, 
  onClick, 
  index = 0,
  isOpen = true,
  className = ''
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      className={`font-playfair text-3xl text-white hover:text-gold transition-colors ${className}`}
    >
      {children}
    </motion.a>
  );
}