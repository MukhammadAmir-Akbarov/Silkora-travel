import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Pillars } from "@/components/Pillars";
import { AiPlanner } from "@/components/AiPlanner";
import { Destinations } from "@/components/Destinations";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { CtaBanner } from "@/components/CtaBanner";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pillars />
        <AiPlanner />
        <Destinations />
        <Services />
        <About />
        <Testimonials />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
