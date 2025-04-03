import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-card-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Featherstats
              </span>
            </Link>
            <p className="text-sm text-foreground">
              Simple, privacy-friendly web analytics that help you understand your audience.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-foreground hover:text-foreground/80 text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-foreground hover:text-foreground/80 text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-foreground hover:text-foreground/80 text-sm">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-foreground hover:text-foreground/80 text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-foreground hover:text-foreground/80 text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground hover:text-foreground/80 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-foreground hover:text-foreground/80 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-foreground hover:text-foreground/80 text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/gdpr" className="text-foreground hover:text-foreground/80 text-sm">
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
