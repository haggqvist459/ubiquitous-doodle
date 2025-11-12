import { ArrowCircle } from "@/components/icons"

const LoadingComponent = () => {


  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <div className="animate-spin">
        <ArrowCircle />
      </div>
    </div>
  )
}

export default LoadingComponent;