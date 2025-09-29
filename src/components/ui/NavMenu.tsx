import { NavLink } from "react-router-dom";
import { NAVBAR_OPTIONS } from "@/utils";


type Props = {
  isExpanded: boolean
}

const NavMenu = ({ isExpanded }: Props) => {

  const linkClass = ({ isActive }: { isActive: boolean }) => isActive
    ? 'text-primary-text underline decoration-2 hover:text-primary-text' //active link classes 
    : 'text-primary-text' //inactive` link classes 

  const menuItems = Object.values(NAVBAR_OPTIONS).map(({ route, id, text }) => (
    <NavLink to={route} key={id} className={linkClass}>
      <span className="text-lg font-semibold hover:font-bold">{text}</span>
    </NavLink>
  ))


  return (
    <div className="relative overflow-hidden transition-all duration-500 ease-in-out" style={{ height: isExpanded ? '36px' : '0px' }}>
      <div className="relative w-full mx-auto">
        <div className={`flex px-3 items-center justify-end overflow-x-auto whitespace-nowrap space-x-4 duration-500 ease-in-out ${isExpanded ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {menuItems}
        </div>
        {/* <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-10 bg-gradient-to-r from-primary/80 to-transparent" />  */}
        {/* <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-10 bg-gradient-to-l from-primary/80 to-transparent" /> */}
      </div>
    </div>
  );
}

export default NavMenu;
