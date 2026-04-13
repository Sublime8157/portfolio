const InputTextArea = ({ placeholder = "", name = "", classname = "" }) => {
  return (
    <div>
      <textarea
        type="textarea"
        className={`focus:outline-0 focus:border-b-gray-500 p-2 text-xs text-text-paragraph border-b border-stroke h-9 w-full ${classname}`}
        name={name}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export default InputTextArea;
