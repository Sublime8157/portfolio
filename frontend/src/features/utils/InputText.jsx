const InputText = ({ placeholder = "", name = "", className = "" }) => {
  return (
    <div>
      <input
        type="text"
        className={`text-black ps-2 text-xs bg-white h-9 w-100 ${className}`}
        name={name}
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export default InputText;
