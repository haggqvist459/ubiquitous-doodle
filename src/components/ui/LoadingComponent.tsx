import { ArrowCircle } from "@/components/icons"

type Props = {
  height?: string
}
const LoadingComponent = ({ height = 'min-h-[300px]'  }: Props) => {


  return (
    <div className={`flex flex-col items-center justify-center ${height}`}>
      <div className="animate-spin">
        <ArrowCircle />
      </div>
    </div>
  )
}

export default LoadingComponent;