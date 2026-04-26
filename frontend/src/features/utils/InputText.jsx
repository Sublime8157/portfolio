const InputText = ({
  placeholder = "",
  name = "",
  className = "",
  onChange = () => {},
}) => {
  return (
    <input
      onChange={onChange}
      type="text"
      className={`focus:outline-0 focus:border-b-gray-500 ps-2 text-xs bg-none text-text-paragraph border-b border-stroke h-9 w-full ${className}`}
      name={name}
      placeholder={placeholder}
    />
  );
};

export default InputText;
