
type Props = {
  strokeWidth?: number
}


const ArrowIcon = ({ strokeWidth = 2 }: Props) => {
  return (
    <svg className='w-5 h-5 text-primary-text' fill='none' stroke='currentColor' strokeWidth={strokeWidth} viewBox='0 0 24 24' >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default ArrowIcon;