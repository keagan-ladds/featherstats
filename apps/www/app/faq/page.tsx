import PageLayout from '@/components/layouts/PageLayout';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is Featherstats?',
    answer: 'Featherstats is a lightweight, privacy-focused web analytics tool that helps you understand your website traffic without compromising user privacy.',
  },
  {
    question: 'How does Featherstats protect user privacy?',
    answer: 'We do not use cookies or collect any personally identifiable information. All data is aggregated and anonymized, and we comply with GDPR and other privacy regulations.',
  },
  {
    question: 'Can I try Featherstats for free?',
    answer: 'Yes! Our free plan includes up to 10,000 monthly pageviews, 1 domain, and 90 days of data retention. No credit card required.',
  },
  {
    question: 'How do I install Featherstats?',
    answer: 'Simply add our lightweight tracking script to your website. We provide easy integration guides for all major platforms and frameworks.',
  },
  {
    question: 'What data does Featherstats collect?',
    answer: 'We collect basic analytics data such as page views, referrers, and device types. All data is anonymized and aggregated to protect user privacy.',
  },
];

export default function FAQ() {
  return (
    <PageLayout
      title="Frequently Asked Questions"
      subtitle="Find answers to common questions about Featherstats"
    >
      <div className="space-y-12">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {faq.question}
            </h2>
            <p className="text-gray-600">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
