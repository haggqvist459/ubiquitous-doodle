
type Props = {
  label?: string,
  value: string | number | null
}

const Output = ({
  label,
  value
}: Props) => {
  return (
    <div className="flex flex-col w-full">
      {label !== undefined && (
        <span className="label">{label || '\u00A0'}</span>
      )}
      <span className="output-text">
        {value || `No ${label?.toLowerCase() || 'value'} added for this recipe.`}
      </span>
    </div>
  )
}

export default Output;