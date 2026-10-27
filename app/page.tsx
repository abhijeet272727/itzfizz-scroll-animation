"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const topStats = [
  { value: "575 mph", label: "Cruising Speed" },
  { value: "40,000 ft", label: "Max Altitude" },
];

const bottomStats = [
  { value: "7,500 nm", label: "Flight Range" },
  { value: "12 hrs", label: "Max Endurance" },
];

export default function Home() {
  const container = useRef<HTMLElement | null>(null);
  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;

      const plane = root.querySelector(".airplane");
      const strip = root.querySelector(".reveal-strip");

      if (!plane || !strip) return;

      const startLeft = -2;
      const endLeft = 107;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      timeline.fromTo(
        plane,
        { left: `${startLeft}%` },
        { left: `${endLeft}%`, ease: "none", duration: 1 },
        0
      );

      const updateReveal = () => {
        const planeRect = plane.getBoundingClientRect();
        const sectionRect = strip.getBoundingClientRect();
        const planeCenter =
          planeRect.left + planeRect.width / 2 - sectionRect.left;
        const revealWidth = Math.max(
          0,
          Math.min(sectionRect.width, planeCenter)
        );

        gsap.set(strip, {
          clipPath: `inset(0 ${sectionRect.width - revealWidth}px 0 0)`,
        });
      };

      timeline.eventCallback("onUpdate", updateReveal);

      updateReveal();

      timeline.fromTo(
        ".stat-card",
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          duration: 0.3,
        },
        0.4
      );

      ScrollTrigger.refresh();
    },
    { scope: container }
  );

  return (
    <main
      ref={container}
      className="hero-container relative h-[300vh] overflow-clip bg-[#17191B] text-[#F5F4F0]"
    >
      <section className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute right-[5%] top-[12%] z-0 flex flex-col gap-4 sm:right-[10%] sm:flex-row lg:right-[15%]">
          {topStats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card w-48 rounded-lg border border-white/10 bg-[#C96A2B] p-6 sm:w-56 sm:p-8"
            >
              <p className="mb-2 text-4xl font-semibold tracking-tight text-[#F5F4F0] sm:text-5xl">
                {stat.value}
              </p>
              <p className="text-xs text-white/70 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-[12%] right-[15%] z-0 flex flex-col gap-4 sm:right-[20%] sm:flex-row lg:right-[30%]">
          {bottomStats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card w-48 rounded-lg border border-white/10 bg-[#C96A2B] p-6 sm:w-56 sm:p-8"
            >
              <p className="mb-2 text-4xl font-semibold tracking-tight text-[#F5F4F0] sm:text-5xl">
                {stat.value}
              </p>
              <p className="text-xs text-white/70 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="absolute left-0 right-0 top-1/2 z-[9] h-32 -translate-y-1/2 bg-[#C96A2B] sm:h-48 lg:h-56" />

        <div
          className="reveal-strip absolute left-0 right-0 top-1/2 z-10 flex h-32 -translate-y-1/2 items-center overflow-hidden border-y border-white/10 bg-[#55585B] sm:h-48 lg:h-56"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <h1 className="whitespace-nowrap pl-[5%] text-[4rem] font-semibold tracking-wide text-[#C96A2B] sm:text-7xl lg:text-[9rem]">
            WELCOME ITZFIZZ
          </h1>
        </div>

        <img
          src={`${process.env.GITHUB_PAGES === "true" ? "/itzfizz-scroll-animation" : ""}/airplane.png`}
          alt="Airplane top view"
          className="airplane pointer-events-none absolute top-1/2 z-20 w-48 -translate-x-1/2 -translate-y-1/2 sm:w-72 lg:w-[26rem]"
          style={{ left: "-8%" }}
        />
      </section>
    </main>
  );
}