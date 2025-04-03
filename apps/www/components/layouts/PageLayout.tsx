import { ReactNode } from 'react';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const PageLayout = ({ title, subtitle, children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow mt-12">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-lg leading-8 text-gray-600">
                {subtitle}
              </p>
            )}
          </div>
          <div className="prose prose-lg prose-blue mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
