import { Color } from "@/interfaces/Color";
import { Typography } from "../Typography";

type ColorBoxProps = {
  color: Color;
};

const ColorBox = ({ color }: ColorBoxProps) => {
  return (
    <div
      key={color.bgClass}
      className="flex h-40 w-24 flex-col rounded-lg shadow-lg dark:bg-white"
    >
      <div className={`h-20 ${color.bgClass} rounded-t-lg`}></div>
      <div className="mx-3 my-3">
        <Typography
          variant="lg"
          customWeight="medium"
          customColor="text-gray-900"
        >
          {color.code}
        </Typography>
        <Typography variant="md" customColor="text-gray-500">
          {color.hex}
        </Typography>
      </div>
    </div>
  );
};

export default ColorBox;
