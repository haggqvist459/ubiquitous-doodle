
type Props = {
  children: React.ReactNode;
};


const SectionWrapper = ({ children }: Props) => {
  return (
    <section className="w-full flex flex-col gap-2 border border-primary-text rounded"> 
      {children}
    </section>
  );
}

export default SectionWrapper;