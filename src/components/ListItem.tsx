import hexToRgba from "hex-to-rgba";

import { ALL_TECH_COLORS as techColors } from "@constants/colors";

const ListItem = ({ category }: { category: keyof typeof techColors }) => {
  const categoryBare = category
    .toLowerCase()
    .split(".")
    .shift() as keyof typeof techColors;

  return (
    <li
      className="font-mono leading-none text-[0.6875rem] rounded-md py-[0.2rem] px-[0.25rem] dark:[filter:brightness(1.25)] flex items-center"
      style={{
        backgroundColor: hexToRgba(
          (categoryBare && techColors[categoryBare]) || "#ccc",
          0.25
        ),
        border: `1px solid ${hexToRgba(
          (categoryBare && techColors[categoryBare]) || "#ccc",
          0.3
        )}`,
      }}
    >
      <span>{category}</span>
    </li>
  );
};

export default ListItem;
