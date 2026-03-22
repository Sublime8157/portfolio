import { motion } from "framer-motion";

const directionMap = {
  right: { x: 50 },
  left: { x: -50 },
  top: { y: -50 },
  bottom: { y: 50 },
};

const Motion = ({
  direction = "bottom",
  duration = 0.8,
  className = "",
  once = true,
  delay = 0,
  children,
}) => {
  const initial = { opacity: 0, ...directionMap[direction] };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      viewport={{ once, amount: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default Motion;
