"use client";

import Image from "next/image";
import { useState } from "react";
import { tabs as defaultTabs } from "./TabsData";

const EventTabs = ({ tabs = defaultTabs }) => {
  const [activeTab, setActiveTab] = useState(() => (tabs[0] ? tabs[0].id : ""));
  const currentTab = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <div className="mt-10 w-full">
      <div className="flex justify-between border-b border-white/40">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-4 pb-1 text-xs text-white transition-opacity duration-200 ${
                isActive
                  ? "border-accent opacity-100"
                  : "border-transparent opacity-60 hover:opacity-80"
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 max-h-76 rounded-2xl bg-secondary p-4 px-4 text-sm overflow-scroll no-scrollbar">
        {currentTab?.image && (
          <div className=" flex justify-center items-center">
            <Image
              src={currentTab.image}
              alt={currentTab.imageAlt ?? "Venue layout"}
              width={350}
              height={350}
              priority={currentTab.id === "layout"}
            />
          </div>
        )}

        {currentTab?.summary && (
          <p className="leading-7 lg:text-justify">{currentTab.summary}</p>
        )}

        {currentTab?.highlights && currentTab.highlights.length > 0 && (
          <div className="mt-6">
            <p className="text-white">Highlights:</p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              {currentTab.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {currentTab?.cta && (
          <p className="mt-4 text-white/90">{currentTab.cta}</p>
        )}

        {currentTab?.terms && (
          <div className=" space-y-5">
            {currentTab.terms.map((term) => (
              <div key={term.title}>
                <p className="font-semibold text-white">{term.title}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-white/90">
                  {term.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {currentTab?.meta && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {currentTab.meta.map((meta) => (
              <div
                key={meta.label}
                className="rounded-2xl border border-white/5 bg-white/5 p-4"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  {meta.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {meta.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {currentTab?.faqs && (
          <div className="space-y-5">
            {currentTab.faqs.map((item, index) => (
              <div key={item.question}>
                <p className="font-semibold text-white">
                  {`${index + 1}. ${item.question}`}
                </p>
                <p className="mt-2 text-white/90">{item.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventTabs;