const InputTextArea = ({ placeholder = "", name = "", classname = "" }) => {
  return (
    <div>
      <textarea
        type="textarea"
        className={`text-black p-2 text-xs bg-white h-9 w-full ${classname}`}
        name={name}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export default InputTextArea;
