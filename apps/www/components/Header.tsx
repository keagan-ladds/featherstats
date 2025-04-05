import Link from 'next/link';
import Image from 'next/image'
import { getWebAppURL } from '@/lib/utils';

const Header = () => {
  return (
    <header className="fixed w-full bg-card/80 backdrop-blur-sm z-50 border-b border-card-border">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image className='size-10 rounded' src="/featherstats.png" width={64} height={64} alt="Featherstats logo"/>
          <span className="text-xl font-semibold tracking-tighter bg-foreground bg-clip-text text-transparent">
            Featherstats
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/#features" className="text-foreground hover:text-foreground/80 transition-colors">
            Features
          </Link>
          <Link href="/#pricing" className="text-foreground hover:text-foreground/80 transition-colors">
            Pricing
          </Link>
          {/* <Link href="/docs" className="text-foreground hover:text-foreground/80 transition-colors">
            Docs
          </Link>
          <Link href="/blog" className="text-foreground hover:text-foreground/80 transition-colors">
            Blog
          </Link> */}
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href={getWebAppURL("signup")}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors"
          >
            Get Started Free
          </Link>
          <button className="hidden p-2 text-foreground hover:text-foreground/80">
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
