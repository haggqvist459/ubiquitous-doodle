import { useLanguage } from "@/contexts";
import { translateText } from "@/utils/";

const Footer = () => {

  const { language } = useLanguage();

  const isStandalone =
  window.matchMedia('(display-mode: standalone)').matches ||
  (typeof window.navigator !== 'undefined' &&
    (window.navigator as any).standalone === true);

  return (
    <footer className={`bg-primary flex justify-center ${isStandalone ? 'h-15 pb-2 ' : 'h-10'}`}>
      <a href="https://github.com/haggqvist459/ubiquitous-doodle" target='_blank' className='underline text-sm text-primary-text mt-3'>{translateText("footer", "codeGitHub", language)}</a>
    </footer>
  )
}

export default Footer;