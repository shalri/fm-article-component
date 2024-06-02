"use client";
import Image from "next/image";
import { Articles, shareLinks } from "../lib/data";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Article({ articleTitle }: { articleTitle: string }) {
  const article = Articles.find(
    (article) => article.title.toLowerCase() === articleTitle.toLowerCase(),
  );
  const [share, setShare] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScreenWidth = () => {
      setIsWideScreen(window.innerWidth > 640);
      // Close share links when screen dimensions change
      setTooltipVisible(false);
      setShare(false);
      setAnimate(false);
    };

    updateScreenWidth();
    window.addEventListener("resize", updateScreenWidth);

    const handleOutsideClick = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setTooltipVisible(false);
        setShare(false);
        setAnimate(false);
      }
    };

    const handleEscKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setTooltipVisible(false);
        setShare(false);
        setAnimate(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscKeyPress);
    };
  }, []);

  const handleClick = () => {
    if (isWideScreen) {
      setTooltipVisible(!tooltipVisible);
    } else {
      setAnimate(!animate);
      setShare(!share);
    }
  };

  if (!article) {
    return <div>No articles to show</div>;
  }

  return (
    <article
      className={cn(
        "relative grid max-w-[400px] grid-rows-1 rounded-xl bg-white tracking-[0.01rem] sm:max-w-[732px] sm:grid-cols-[40%_60%]",
        !isWideScreen ? "overflow-hidden" : "",
      )}
    >
      <div className="relative h-[200px] w-full overflow-hidden sm:h-auto sm:w-full sm:rounded-l-xl">
        <Image
          src={article.img}
          alt="Article Image"
          width={640}
          height={640}
          priority
          className="-mt-4 h-full object-cover object-top sm:-mr-4 sm:mt-0 sm:w-full sm:object-left"
        />
      </div>
      <section className="flex flex-col items-center justify-center pt-8">
        <h1 className="mb-3 mt-1 px-8 text-[1.025rem] font-bold leading-[1.50rem] tracking-[0.0125rem] text-ac-very-dark-grayish-blue sm:px-10 sm:text-xl sm:leading-[1.75rem]">
          {article.heading}
        </h1>
        <p className="px-8 text-ac-desaturated-dark-blue sm:px-10">
          {article.intro}
        </p>
        <footer
          className={cn(
            "relative mt-8 flex w-full items-center justify-between sm:mb-2 sm:mt-4",
            share && animate
              ? "fade-in-bounce bg-ac-very-dark-grayish-blue"
              : "bg-white pb-6",
          )}
        >
          {share ? (
            <div
              ref={shareRef}
              className="sm:px-10text-ac-light-grayish-blue -mr-16 flex h-16 flex-grow items-center justify-start rounded-b-xl px-8"
            >
              <h3 className="pr-4 text-body uppercase tracking-[0.4rem] text-ac-grayish-blue">
                share
              </h3>
              <ul className="flex items-center gap-4">
                {shareLinks.map((link) => (
                  <li key={link.site}>
                    <a href={link.url} target="_blank">
                      <Image src={link.icon} alt={link.site} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="">
              <div className=" flex items-center justify-center gap-4 px-8 sm:px-10">
                <Image
                  src={article.author.img}
                  width={40}
                  height={40}
                  alt={`${article.author.name} avatar`}
                  className="rounded-full"
                />
                <div>
                  <h2 className="font-bold text-ac-very-dark-grayish-blue">
                    {article.author.name}
                  </h2>
                  <p className="text-ac-grayish-blue">{article.date}</p>
                </div>
              </div>
            </div>
          )}
          {tooltipVisible && (
            <div
              ref={shareRef}
              className="fade-in-bounce tooltip -right-[70px] -top-[5rem] mt-2 rounded-lg bg-ac-very-dark-grayish-blue px-8 py-4 shadow-lg"
            >
              <div className="flex">
                <h3 className="top-full z-50 pr-4 text-body uppercase tracking-[0.4rem] text-ac-grayish-blue">
                  share
                </h3>
                <ul className="flex items-center gap-4">
                  {shareLinks.map((link) => (
                    <li key={link.site}>
                      <a target="_blank" href={link.url}>
                        <Image src={link.icon} alt={link.site} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <button
            // ref={shareRef}
            onClick={handleClick}
            className={cn(
              "mr-8 flex h-8 w-8 items-center justify-center rounded-full",
              share
                ? "bg-ac-desaturated-dark-blue"
                : "bg-ac-light-grayish-blue",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="13"
              className={cn(share ? "fill-white" : "fill-[#6E8098]")}
            >
              <path d="M15 6.495L8.766.014V3.88H7.441C3.33 3.88 0 7.039 0 10.936v2.049l.589-.612C2.59 10.294 5.422 9.11 8.39 9.11h.375v3.867L15 6.495z" />
            </svg>
          </button>
        </footer>
      </section>
    </article>
  );
}
