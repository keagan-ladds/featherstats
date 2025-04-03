'use client'
import { useState } from 'react';
import PricingCard from '../PricingCard';

type BillingPeriod = 'monthly' | 'yearly';

interface Price {
  amount: number;
  billingPeriod: BillingPeriod;
  currency: string;
}

interface PricingPlan {
  name: string;
  description: string;
  prices: Price[];
  monthlyPageviews: number;
  maxDomains: number;
  dataRetentionDays: number;
  features: { text: string; included: boolean; }[];
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Free',
    description: 'Perfect for personal projects and small websites.',
    prices: [
      { amount: 0, billingPeriod: 'monthly', currency: 'USD' },
      { amount: 0, billingPeriod: 'yearly', currency: 'USD' }
    ],
    monthlyPageviews: 10000,
    maxDomains: 1,
    dataRetentionDays: 90,
    features: [],
  },
  {
    name: 'Growth',
    description: 'For growing businesses that need more power.',
    prices: [
      { amount: 9, billingPeriod: 'monthly', currency: 'USD' },
      { amount: 90, billingPeriod: 'yearly', currency: 'USD' }
    ],
    monthlyPageviews: 50000,
    maxDomains: 3,
    dataRetentionDays: 365,
    popular: true,
    features: [],
  },
  {
    name: 'Scale',
    description: 'For larger businesses with high traffic needs.',
    prices: [
      { amount: 18, billingPeriod: 'monthly', currency: 'USD' },
      { amount: 180, billingPeriod: 'yearly', currency: 'USD' }
    ],
    monthlyPageviews: 100000,
    maxDomains: 10,
    dataRetentionDays: 365,
    features: [],
  },
];

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose a plan that grows with your website.
          </p>
          
          <div className="inline-flex items-center p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                billingPeriod === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Yearly billing
              <span className="ml-1.5 text-blue-600">Save 15%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard 
              key={index} 
              {...plan} 
              selectedBillingPeriod={billingPeriod}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Need more pageviews or custom features?{' '}
            <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact us
            </a>{' '}
            for enterprise pricing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
