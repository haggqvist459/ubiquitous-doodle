import { useState } from 'react'
import { ArrowIcon } from '../icons'
type Props = {

}

const Filters = (props: Props) => {

  const [showTypes, setShowTypes] = useState(false)
  const [showCuisines, setShowCuisines] = useState(false)
  const [showSort, setShowSort] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) => isActive
    ? 'text-primary-text underline decoration-2 hover:text-primary-text' //active link classes 
    : 'text-primary-text' //inactive` link classes 


  return (
    <div className="px-3 w-full bg-primary flex flex-col items-center mx-auto">
      <div className="h-9 flex items-center justify-center space-x-5 font-medium">
        <button
          className="flex space-x-1 items-center"
          onClick={() => setShowTypes(prev => !prev)}
        >
          Types
          <div
            className={`transform transition-transform duration-300 ease-in-out ${showTypes ? 'rotate-0' : 'rotate-90'
              }`}
          >
            <ArrowIcon strokeWidth={3} />
          </div>
        </button>
        <button
          className="flex space-x-1 items-center"
          onClick={() => setShowCuisines(prev => !prev)}
        >
          Cuisines
          <div
            className={`transform transition-transform duration-300 ease-in-out ${showCuisines ? 'rotate-0' : 'rotate-90'
              }`}
          >
            <ArrowIcon strokeWidth={3} />
          </div>
        </button>
        <button
          className="flex space-x-1 items-center"
          onClick={() => setShowSort(prev => !prev)}
        >
          Sort by
          <div
            className={`transform transition-transform duration-300 ease-in-out ${showSort ? 'rotate-0' : 'rotate-90'
              }`}
          >
            <ArrowIcon strokeWidth={3} />
          </div>
        </button>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out transform overflow-hidden ${showTypes ? "translate-y-0 h-[32px]" : "-translate-y-full h-0"
          }`}
      >
        <div className="flex px-3 items-center justify-end overflow-x-auto whitespace-nowrap space-x-4">
          <span>Types content</span>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out transform overflow-hidden ${showCuisines ? "translate-y-0 h-[32px]" : "-translate-y-full h-0"
          }`}
      >
        <div className="flex px-3 items-center justify-end overflow-x-auto whitespace-nowrap space-x-4">
          <span>Cuisines content</span>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out transform overflow-hidden ${showSort ? "translate-y-0 h-[32px]" : "-translate-y-full h-0"
          }`}
      >
        <div className="flex px-3 items-center justify-end overflow-x-auto whitespace-nowrap space-x-4">
          <span>Sort content</span>
        </div>
      </div>
    </div>
  )
}

export default Filters;