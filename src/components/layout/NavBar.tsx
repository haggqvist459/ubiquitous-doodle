import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/utils'
import { NavMenu, NavButton } from '@/components';

const NavBar = () => {

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <header className='bg-primary'>
      <div className='flex items-center justify-between px-5'>
        <NavLink className='py-3' to={ROUTES.HOME}>
          <div className='flex flex-col text-primary-text'>
            <span className='text-2xl md:text-3xl font-bold'>Moomin</span>
            <span className='text-xl md:text-2xl font-bold'>Mugs</span>
          </div>
        </NavLink>
        <NavButton isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} />
      </div>
      <NavMenu isExpanded={isExpanded}/>
    </header>
  )
}

export default NavBar;


/* Replace text with a tilted mug */