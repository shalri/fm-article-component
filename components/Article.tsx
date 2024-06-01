"use client";
import Image from "next/image";
import { Articles, shareLinks } from "../lib/data";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Article({ articleTitle }: { articleTitle: string }) {
  const article = Articles.find(
    (article) => article.title.toLowerCase() === articleTitle.toLowerCase(),
  );
  const [share, setShare] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const updateScreenWidth = () => {
      setIsWideScreen(window.innerWidth > 640);
    };

    updateScreenWidth();
    window.addEventListener("resize", updateScreenWidth);

    return () => window.removeEventListener("resize", updateScreenWidth);
  }, []);

  const handleClick = () => {
    if (isWideScreen) {
      console.log("hello");
    } else {
      setAnimate(!animate);
      setShare(!share);
    }
  };

  if (!article) {
    return <div>No articles to show</div>;
  }

  return (
    <article className="grid max-w-[400px] grid-rows-1 overflow-hidden rounded-xl bg-white tracking-[0.01rem] sm:max-w-[732px] sm:grid-cols-[40%_60%]">
      <div className="relative h-[200px] w-full overflow-hidden sm:h-auto sm:w-full">
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
            "mt-8 flex w-full items-center justify-between sm:mb-2 sm:mt-4",
            share && animate
              ? "fade-in-bounce bg-ac-very-dark-grayish-blue"
              : "bg-white pb-6",
          )}
        >
          {share ? (
            <div className="sm:px-10text-ac-light-grayish-blue -mr-16 flex h-16 flex-grow items-center justify-start rounded-b-xl px-8">
              <h3 className="pr-4 text-body uppercase tracking-[0.4rem] text-ac-grayish-blue">
                share
              </h3>
              <ul className="flex items-center gap-4">
                {shareLinks.map((link) => (
                  <li key={link.site}>
                    <a href={link.url}>
                      <Image src={link.icon} alt={link.site} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="fade-in-bounce">
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
          <button
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
