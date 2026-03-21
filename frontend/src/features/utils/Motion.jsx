import { motion } from "framer-motion";

const directionMap = {
  right: { x: 50 },
  left: { x: -50 },
  top: { y: -50 },
  bottom: { y: 50 },
};

const Motion = ({ direction = "bottom", duration = 0.8, className = "", children }) => {
  const initial = { opacity: 0, ...directionMap[direction] };

  return (
    <motion.div
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Motion;
