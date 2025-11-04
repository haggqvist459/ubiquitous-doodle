
type Props = {
  children: React.ReactNode;
};

const PageContainer = ({
  children,
}: Props) => {


  return (
    <section className={`flex flex-col mx-auto w-full`}>
      <div className="">
        {children}
      </div>
    </section>
  )
};

export default PageContainer;
