const button = ({ variant = "primary", className = "", onClick, children }) => {
  const variants = {
    primary: "bg-[#ff8906] hover:opacity-60",
    outline: "border border-[#ff8906] text-[#ff8906]",
  };

  return (
    <button
      className={`text-center md:text-base text-xs md:py-5 p-3 cursor-pointer ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default button;
