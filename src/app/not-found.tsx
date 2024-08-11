import DotPattern from "@/components/ui/bg-dot-pattern";
import { Button } from "@/components/ui/button";
import TextRevealByWord from "@/components/ui/text-reveal-scroll";
import { VelocityScroll } from "@/components/ui/velocity-scroll";
import { cn } from "@/lib/utils";
import { ArrowBigLeftDashIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <section className="min-h-screen pointer-events-none relative w-full flex-between flex-col py-32">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]"
        )}
      />
      <Button
        variant={"default"}
        className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2"
        asChild
      >
        <Link href="/">
          Go Home <ArrowBigLeftDashIcon className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <VelocityScroll
        text=" 404 "
        default_velocity={5}
        className="font-title text-center text-2xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-3xl lg:text-4xl md:leading-[5rem]"
      />
      <TextRevealByWord text="Error . Page not  found !" />
      <VelocityScroll
        text="Not Found "
        default_velocity={5}
        className="font-title text-center text-2xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-3xl lg:text-4xl md:leading-[5rem]"
      />
    </section>
  );
}
