import { motion } from "framer-motion";

const button = ({ variant = "primary", className = "", onClick, children }) => {
  const variants = {
    primary: "bg-[#ff8906] hover:opacity-60",
    outline: "border border-[#ff8906] text-[#ff8906]",
    plain: "",
  };

  return (
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1 }}>
      <div
        className={`text-center lg:text-base text-xs p-3 cursor-pointer ${variants[variant]} ${className} bg-accent text-accent-text`}
        onClick={onClick}
      >
        {children}
      </div>{" "}
    </motion.button>
  );
};

export default button;
