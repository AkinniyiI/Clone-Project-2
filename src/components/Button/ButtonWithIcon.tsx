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
    <div
      className={`${color} ${textColor} ${hover} h-10 w-54 px-4 py-2 flex items-center justify-center gap-2 rounded-xl border border-gray-200`}
    >
      <img src={`${icon}`} alt="icon" className="h-4 w-4 flex" />
      {text}
    </div>
  );
};

export default ButtonWithIcon;
