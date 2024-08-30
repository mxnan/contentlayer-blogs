import DotPattern from "@/components/custom/bg-dot-pattern";
import { FadeText } from "@/components/custom/fade-text";
import { FormSection } from "@/components/form-section";
import { cn } from "@/lib/utils";

export async function generateMetadata() {
  return {
    title: "Contact",
    description: "Contact Page",
    alternates: {
      canonical: `https://mxnan.com/contact`,
    },
  };
}
export default function ContactPage() {
  return (
    <section className="flex-1 relative">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
        )}
      />
        <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)] "
        )}
      />
      <div className="max-w-2xl mx-auto space-y-8 py-24">
        <FadeText
          text="Connect with me ?"
          direction="left"
          framerProps={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { duration: 1, delay: 0.3, type: "spring" },
            },
          }}
          className="scroll-m-10 uppercase tracking-tight
          text-3xl md:text-5xl
          drop-shadow-2xl font-bold 
          bg-clip-text text-transparent bg-gradient-to-r from-gray-500 dark:from-stone-500 to-stone-950 dark:to-white"
        />
        <p className="font-light max-md:text-sm md:ml-6">
          Looking for new opportunities. Let&apos;s get in touch.
        </p>
        <FormSection className="pt-8 px-6" />
      </div>
    </section>
  );
}
