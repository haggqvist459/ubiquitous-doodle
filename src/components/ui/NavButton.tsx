type Props = {
  isExpanded: boolean
  onClick: () => void
}

const NavButton = ({ isExpanded, onClick }: Props) => {
  return (
    <div
      className="w-10 flex flex-col gap-2 cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`w-full h-1 bg-primary-text rounded-sm transition-all duration-500 ease-in-out
          ${isExpanded ? "-rotate-[33deg] scale-110 origin-right" : "rotate-0 origin-right"}`}
      />
      <div
        className={`w-full h-1 bg-primary-text rounded-sm transition-all duration-500 ease-in-out
          ${isExpanded ? "opacity-0" : "opacity-100"}`}
      />
      <div
        className={`w-full h-1 bg-primary-text rounded-sm transition-all duration-500 ease-in-out
          ${isExpanded ? "rotate-[33deg] scale-110 origin-right" : "rotate-0 origin-right"}`}
      />
    </div>
  )
}
export default NavButton;