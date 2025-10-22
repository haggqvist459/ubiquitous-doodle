import { ErrorIcon } from "@/components/icons";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <ErrorIcon />
      <span className="text-primary-text mt-2">Something went wrong. <br/> Try reloading the page.</span>
    </div>
  );
}

export default Error;