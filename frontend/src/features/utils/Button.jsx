const button = ({ variant = "primary", classname = "", children }) => {
  const variants = {
    primary: "bg-[#ff8906] hover:opacity-60",
  };

  return (
    <button
      className={`text-center py-5 cursor-pointer ${variants[variant]} ${classname}`}
    >
      {children}
    </button>
  );
};

export default button;
