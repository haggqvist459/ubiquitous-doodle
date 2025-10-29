import type { DropdownOption } from './types';

type Props = {
  id: string
  label: string
  defaultValue?: string
  value: string | number
  required?: boolean
  options: DropdownOption[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Dropdown = ({
  id,
  label,
  defaultValue = '',
  value,
  required = false,
  options,
  onChange
}: Props) => {


  return (
    <div className="w-full">
      <label htmlFor={id} className="label">{label}</label>
      <div className='w-full relative'>
        <select
          required={required}
          id={id}
          value={value}
          onChange={onChange}
          className="dropdown-text pr-4 truncate"
        >
          <option value="">{defaultValue}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value ?? ''}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className='absolute top-0.5 right-0.5 flex items-center pointer-events-none'>
          <svg className='w-5 h-5 text-primary-text' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24' >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Dropdown;