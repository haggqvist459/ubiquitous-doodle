import { ErrorIcon } from "@/components/icons";

type Props = {
  errorMessage?: string
}

const ErrorComponent = ({ errorMessage }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <ErrorIcon />
      <span className="text-primary-text mt-2">Something went wrong. </span>
      {errorMessage &&
        <>
          <span className="text-primary-text"><br /> Error message: <br/></span>
          <span className="text-primary-text mt-2">{errorMessage}</span>
        </>
      }

    </div>
  );
}

export default ErrorComponent;