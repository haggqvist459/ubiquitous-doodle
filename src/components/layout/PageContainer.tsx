
type Props = {
  children: React.ReactNode;
};

const PageContainer = ({
  children,
}: Props) => {


  return (
    <section className={`flex flex-col mx-auto w-11/12 py-5`}>
      <div className="">
        {children}
      </div>
    </section>
  )
};

export default PageContainer;
