import hexToRgba from "hex-to-rgba";

import { ALL_TECH_COLORS as techColors } from "@constants/colors";

const ListItem = ({ category }: { category: keyof typeof techColors }) => {
  return (
    <li
      className="font-mono text-xs rounded-md py-0.5 px-1.5 dark:[filter:brightness(1.25)] flex items-center"
      key={category}
      style={{
        backgroundColor: hexToRgba(techColors[category] || "#ccc", 0.25),
        border: `1px solid ${hexToRgba(techColors[category] || "#ccc", 0.3)}`,
      }}
    >
      {techColors[category] ? (
        <span
          className="inline-block w-1 h-1 mr-1.5 rounded-full"
          style={{
            backgroundColor: String(techColors[category]),
          }}
        ></span>
      ) : null}
      <span>{category}</span>
    </li>
  );
};

export default ListItem;
