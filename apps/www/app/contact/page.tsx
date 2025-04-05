import PageLayout from '@/components/layouts/PageLayout';


export default function FAQ() {
  return (
    <PageLayout
      title="Contact Us"
      subtitle="Have questions, feedback, or need support? We're here to help."
    >
      <div>
        <p>
          You can reach us anytime by email at:
        </p>

        <p>
          📧 <a href="mailto:hello@featherstats.com">hello@featherstats.com</a>
        </p>

        <p>
          We typically respond within 1–2 business days.
        </p>

        <hr />

        <p>
          For legal or privacy-related inquiries, please also use the same address with the subject line <strong>"Privacy"</strong> or <strong>"Legal"</strong> so we can route it correctly.
        </p>

        <p>
          Thank you for using Featherstats!
        </p>
      </div>

    </PageLayout>
  );
}
