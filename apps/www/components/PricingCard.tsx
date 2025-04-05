import { ReactNode } from 'react';
import Button from './Button';
import { getWebAppURL } from '@/lib/utils';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface Price {
  amount: number;
  billingPeriod: 'monthly' | 'yearly';
  currency: string;
}

interface PricingCardProps {
  name: string;
  description: string;
  prices: Price[];
  features: PricingFeature[];
  popular?: boolean;
  monthlyPageviews: number;
  maxDomains: number;
  dataRetentionDays: number;
  selectedBillingPeriod: 'monthly' | 'yearly';
}

const PricingCard = ({
  name,
  description,
  prices,
  features,
  popular,
  monthlyPageviews,
  maxDomains,
  dataRetentionDays,
  selectedBillingPeriod,
}: PricingCardProps) => {
  // Ensure we always have a valid price by defaulting to the first price if the selected period isn't found
  const selectedPrice = prices.find(p => p.billingPeriod === selectedBillingPeriod) ?? prices[0];
  const isFree = prices.every(p => p.amount === 0);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: selectedPrice!.currency,
    minimumFractionDigits: 0,
  }).format(selectedPrice!.amount);

  const formattedPageviews = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(monthlyPageviews);

  return (
    <div className={`relative flex flex-col p-8 bg-card rounded-2xl shadow-sm ${popular ? 'ring-2 ring-primary-dark' : 'ring-1 ring-card-border'}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-primary-dark">
            Most popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground">{name}</h3>
        <p className="mt-2 text-foreground-muted">{description}</p>
      </div>

      <div className="mb-6">
        <p className="flex items-baseline">
          <span className="text-4xl font-bold tracking-tight text-foreground">{formattedPrice}</span>
          <span className="ml-1 text-sm font-semibold text-foreground-muted">/{selectedBillingPeriod === 'yearly' ? 'year' : 'month'}</span>
        </p>
        <p className="mt-1 text-sm text-foreground-muted/80">Excl. VAT</p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="ml-3 text-foreground-muted">{formattedPageviews} pageviews/month</span>
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="ml-3 text-foreground-muted">Up to {maxDomains} domain{maxDomains > 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="ml-3 text-foreground-muted">{dataRetentionDays} days data retention</span>
        </div>
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <svg
              className={`w-5 h-5 ${feature.included ? 'text-primary' : 'text-foreground-muted'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={feature.included ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"}
              />
            </svg>
            <span className={`ml-3 ${feature.included ? 'text-gray-600' : 'text-gray-400'}`}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-4 flex-1">
      </div>

      <Button
        href={getWebAppURL(`signup?plan=${name}&period=${selectedBillingPeriod}&currency=${selectedPrice!.currency}`)}
        variant={popular ? 'primary' : 'outline'}
        className="w-full mt-8"
      >
        {isFree ? 'Get Started for Free' : 'Get Started'}
      </Button>
    </div>
  );
};

export default PricingCard;
