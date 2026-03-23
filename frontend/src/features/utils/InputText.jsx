const InputText = ({ placeholder = "", name = "", className = "" }) => {
  return (
    <div>
      <input
        type="text"
        className={`text-black ps-2 text-xs bg-white h-9 w-full ${className}`}
        name={name}
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export default InputText;
