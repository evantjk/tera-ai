import { Link } from 'react-router-dom';

export default function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-deep-matte-charcoal/95 backdrop-blur-sm border-b border-off-white-bone/10">
      <div className="max-w-[120rem] mx-auto px-8 py-6">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-heading text-off-white-bone tracking-tight">
            TERA
          </Link>
          
          <div className="flex gap-8 items-center">
            <button
              onClick={() => scrollToSection('services')}
              className="text-base text-off-white-bone/80 hover:text-muted-terracotta transition-colors duration-300"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('timeline')}
              className="text-base text-off-white-bone/80 hover:text-muted-terracotta transition-colors duration-300"
            >
              Timeline
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-base text-off-white-bone/80 hover:text-muted-terracotta transition-colors duration-300"
            >
              Contact
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
