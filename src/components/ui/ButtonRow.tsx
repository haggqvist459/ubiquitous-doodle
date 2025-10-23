import { FilterOptionType } from "@/types";

const BG_CLASSES = [
  "bg-lightblue",
  "bg-darkblue",
  "bg-purple",
  "bg-pink",
  "bg-orange",
  "bg-yellow",
  "bg-green",
] as const;

const BORDER_CLASSES = [
  "border-lightblue",
  "border-darkblue",
  "border-purple",
  "border-pink",
  "border-orange",
  "border-yellow",
  "border-green",
] as const;

type Props = {
  items: FilterOptionType[];
  selected: FilterOptionType[] | null;
  filterCategory: "types" | "cuisines";
  onClick: (filterCategory: "types" | "cuisines", filter: FilterOptionType) => void;
};

const ButtonRow = ({ items, selected = [], filterCategory, onClick }: Props) => {
  const rows: React.ReactNode[] = [];
  const pattern = [4, 5];
  let index = 0;
  let patternIndex = 0;

  while (index < items.length) {
    const rowSize = pattern[patternIndex % pattern.length];
    const rowItems = items.slice(index, index + rowSize);

    rows.push(
      <div key={index} className="flex flex-wrap justify-center gap-2 my-2">
        {rowItems.map((item, i) => {
          const colorIndex = (index + i) % BG_CLASSES.length;
          const bg = BG_CLASSES[colorIndex];
          const border = selected?.some((s) => s.id === item.id)
            ? "border-primary-text font-medium"
            : BORDER_CLASSES[colorIndex];

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onClick(filterCategory, item)}
              className={`${bg} ${border} text-primary-text text-sm py-1 px-2.5 border-2 rounded-2xl`}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    );

    index += rowSize;
    patternIndex++;
  }

  return <>{rows}</>;
};

export default ButtonRow;