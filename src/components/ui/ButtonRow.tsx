type ButtonRowProps = {
  items: { id: string; name: string }[]
  reverse?: boolean
  largePattern?: boolean
  selectedIds?: string[]
};

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

const ButtonRow = ({ items, reverse = false, largePattern = false, selectedIds }: ButtonRowProps) => {

  const rows: React.ReactNode[] = [];

  const pattern = largePattern ? [4, 5] : [3, 4];
  let index = 0;

  while (index < items.length) {
    const rowSize = pattern[rows.length % pattern.length];
    const rowItems = items.slice(index, index + rowSize);

    rows.push(
      <div
        key={`row-${rows.length}`}
        className="flex flex-wrap justify-center gap-2 my-2"
      >
        {rowItems.map((item, i) => {
          const isSelected = selectedIds?.includes(item.id);
          const colorIndex = (index + i) % BG_CLASSES.length;
          const pick = reverse ? BG_CLASSES.length - 1 - colorIndex : colorIndex;

          const backgroundClass = BG_CLASSES[pick];
          const borderClass = isSelected
            ? "border-primary-text"
            : BORDER_CLASSES[pick];

          return (
            <button
              key={item.id}
              className={`${backgroundClass} ${borderClass} text-primary-text text-sm py-1 px-2.5 border-2 rounded-2xl hover:font-medium`}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    );

    index += rowSize;
  }

  return <>{rows}</>;
};

export default ButtonRow;