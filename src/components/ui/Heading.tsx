type Props = {
  title: string,
  headingType?: 'section-heading' | 'main-heading' | 'sub-heading'
}

const Heading = ({ 
  title,
  headingType = 'main-heading'
}: Props) => {
  return (
    <h3 className={headingType}>
      {title || '\u00A0'}
    </h3>
  )
}

export default Heading;