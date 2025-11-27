
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do you provide certificates for your jewelry?",
    answer: "Yes, all our diamond and precious stone jewelry comes with certificates from recognized gemological institutes like GIA, IGI, or our in-house certification for quality assurance."
  },
  {
    question: "What is your return and exchange policy?",
    answer: "We offer a 30-day return and exchange policy for unworn items in their original condition. Custom-made pieces have different terms which will be discussed at the time of order."
  },
  {
    question: "Do you offer jewelry cleaning and maintenance?",
    answer: "Yes, we provide complimentary cleaning and maintenance services for all jewelry purchased from us. We also offer professional repair services for damaged pieces."
  },
  {
    question: "Can you resize rings and adjust jewelry?",
    answer: "Absolutely! Our skilled craftsmen can resize rings and adjust most jewelry pieces. The cost and timeline depend on the complexity of the adjustment required."
  },
  {
    question: "Do you create custom jewelry pieces?",
    answer: "Yes, we specialize in custom jewelry design. Our expert designers work with you to create unique pieces that reflect your personal style and preferences."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, bank transfers, and offer financing options for larger purchases. We also accept partial payments for custom orders."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 3-5 business days within the country. Express shipping is available for 1-2 day delivery. International shipping times vary by location."
  },
  {
    question: "Is my jewelry insured during shipping?",
    answer: "Yes, all shipments are fully insured and tracked. We use secure packaging and trusted shipping partners to ensure your jewelry arrives safely."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our jewelry and services
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gray-50 rounded-lg px-6 border border-gray-200"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-black">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
