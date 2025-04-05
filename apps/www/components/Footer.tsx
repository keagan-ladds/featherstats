import Link from 'next/link';
import { BrandLogo } from './BrandLogo';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-card-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-8">
            <div className="space-y-2">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  Featherstats
                </span>
              </Link>
              <p className="text-sm text-foreground max-w-sm">
                Simple, lightweight & privacy-friendly web analytics that help you understand your audience.
              </p>
            </div>
            <div>
              <Link href="https://keaganladds.com/" className='space-y-1'>
                <BrandLogo />
                
              </Link>
            </div>
          </div>


          <div>
            <h3 className="font-semibold mb-4 text-foreground">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#features" className="text-foreground-muted hover:text-foreground/80 text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-foreground-muted hover:text-foreground/80 text-sm">
                  Pricing
                </Link>
              </li>
              {/* <li>
                <Link href="/docs" className="text-foreground-muted hover:text-foreground/80 text-sm">
                  Documentation
                </Link>
              </li> */}
            </ul>
          </div>
          {/* 
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-foreground-muted hover:text-foreground/80 text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-foreground-muted hover:text-foreground/80 text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground-muted hover:text-foreground/80 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div> */}

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-foreground-muted hover:text-foreground/80 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-foreground-muted hover:text-foreground/80 text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/gdpr" className="text-foreground-muted hover:text-foreground/80 text-sm">
                  GDPR Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-card-border">
          <p className="text-center text-sm text-foreground-muted">
            © {new Date().getFullYear()} Featherstats. Privacy-first analytics for the modern web.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
