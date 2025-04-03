import Link from 'next/link';

const Header = () => {
  return (
    <header className="fixed w-full bg-background/80 backdrop-blur-sm z-50 border-b border-foreground/10">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Featherstats
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/features" className="text-foreground hover:text-foreground/80 transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="text-foreground hover:text-foreground/80 transition-colors">
            Pricing
          </Link>
          <Link href="/docs" className="text-foreground hover:text-foreground/80 transition-colors">
            Docs
          </Link>
          <Link href="/blog" className="text-foreground hover:text-foreground/80 transition-colors">
            Blog
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/signup"
            className="hidden md:inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Get Started Free
          </Link>
          <button className="md:hidden p-2 text-foreground hover:text-foreground/80">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
