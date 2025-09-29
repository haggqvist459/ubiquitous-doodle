
type Props = {
  id: string
  label?: string
  value: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: () => void,
  onBlur?: () => void,
  inputType?: string
  required?: boolean
  allowDecimals?: boolean
  autoComplete?: string 
}

const Input = ({
  label,
  value,
  placeholder,
  id,
  inputType = 'text',
  required = true,
  allowDecimals = false,
  onChange,
  onBlur,
  onFocus,
  autoComplete
}: Props) => {
  return (
    <div className="flex flex-col w-full">
      {label !== undefined && (
        <div className="flex space-x-1">
          <label htmlFor={id} className="label">{label || '\u00A0'}</label>
        </div>
      )}
      <input
        className='input-text no-spinner'
        id={id}
        placeholder={placeholder}
        inputMode={inputType === 'number' ? (allowDecimals ? 'decimal' : 'numeric') : undefined}
        value={value}
        type={inputType}
        step={allowDecimals ? "any" : "1"}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        autoComplete={autoComplete}
      />

    </div>
  )
}

export default Input;