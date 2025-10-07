
type Props = {
  children: React.ReactNode;
};


const SectionWrapper = ({ children }: Props) => {
  return (
    <section className="flex flex-col px-5 gap-x-2 border border-primary-text rounded"> 
      {children}
    </section>
  );
}

export default SectionWrapper;