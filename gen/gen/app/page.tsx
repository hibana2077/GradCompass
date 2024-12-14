"use client";
import React from "react";
import { ContainerScroll } from "../components/ui/container-scroll-animation";
import Image from "next/image";

const imageLoader = () => {
  return `https://github.com/hibana2077/GradCompass/blob/main/assets/landingpage.png?raw=true`
}

export default function Home() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
            Data Meets Decisions. <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              Succeed smarter.
              </span>
            </h1>
          </>
        }
      >
        <Image
          // src={`../images/hero.png`}
          // src={`https://github.com/hibana2077/GradCompass/blob/main/assets/landingpage.png?raw=true`}
          src={`hero.png`}
          loader={imageLoader}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
