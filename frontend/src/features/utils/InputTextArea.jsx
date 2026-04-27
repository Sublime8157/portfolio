const InputTextArea = ({
  placeholder = "",
  name = "",
  classname = "",
  onChange = () => {},
  ...props
}) => {
  return (
    <textarea
      type="textarea"
      className={`focus:outline-0 focus:border-b-gray-500 p-2 text-xs text-text-paragraph border-b border-stroke h-9 w-full ${classname}`}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      {...props}
    ></textarea>
  );
};

export default InputTextArea;
