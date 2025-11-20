import { useState, useRef } from 'react'
import { FavouriteType } from "../types";
import { Trashcan } from '@/components';

type Props = {
  favourite: FavouriteType
}

const FavouriteListItem = ({ favourite }: Props) => {

  const [showDelete, setShowDelete] = useState(false)
  const touchStartX = useRef(0);


  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const SWIPE_THRESHOLD = 30;

    if (deltaX < -SWIPE_THRESHOLD) {
      setShowDelete(true);
    } else if (deltaX > SWIPE_THRESHOLD) {
      setShowDelete(false);
    }
    touchStartX.current = 0;
  };


  return (
    <div className="w-full flex justify-between items-baselin"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full flex flex-col border-b my-2">
        <span className="font-medium text-primary-text">{favourite.title}</span>
        <span className="font-light text-primary-text">
          {new Date(favourite.createdAt).toLocaleDateString()}
        </span>
      </div>
      {showDelete &&
        <div className="">
          <Trashcan />
        </div>
      }
    </div>
  )
}

export default FavouriteListItem;