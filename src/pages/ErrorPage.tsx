import { Link } from "react-router-dom";
import { ROUTES } from "@/utils";
import { PageContainer, Heading, ErrorComponent } from "@/components";

const ErrorPage = () => {
  return (
    <PageContainer>
      <div className="mt-5 px-5">
        <Heading title="Error" headingType="section-heading" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <ErrorComponent />
        <span>Return to <Link to={ROUTES.HOME} className="underline decoration">home page</Link> </span>
      </div>
    </PageContainer>
  );
}

export default ErrorPage;