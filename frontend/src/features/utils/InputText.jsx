const InputText = ({ placeholder = "", name = "", className = "" }) => {
  return (
    <div>
      <input
        type="text"
        className={`focus:outline-0 focus:border-b-gray-500 ps-2 text-xs bg-none text-white border-b border-gray-800 h-9 w-full ${className}`}
        name={name}
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export default InputText;
