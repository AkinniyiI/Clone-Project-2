interface ButtonWithIconProps {
  icon: string;
  text: string;
  textColor: string;
  color: string;
  hover: string;
}

const ButtonWithIcon = ({
  icon,
  text,
  textColor,
  color,
  hover,
}: ButtonWithIconProps) => {
  return (
    <button
      type="button"
      className={`${color} ${textColor} ${hover} flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2 whitespace-nowrap sm:w-54`}
    >
      <img src={`${icon}`} alt="icon" className="h-4 w-4 flex" />
      {text}
    </button>
  );
};

export default ButtonWithIcon;
