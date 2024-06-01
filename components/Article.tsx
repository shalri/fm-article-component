"use client";
import Image from "next/image";
import { Articles, shareLinks } from "../lib/data";
import shareIcon from "../public/images/icon-share.svg";
import { useState } from "react";

export default function Article({ articleTitle }: { articleTitle: string }) {
  const article = Articles.find(
    (article) => article.title.toLowerCase() === articleTitle.toLowerCase(),
  );
  const [share, setShare] = useState(false);

  const handleClick = () => {};

  if (!article) {
    return <div>No articles to show</div>;
  }

  return (
    <article className="flex flex-col items-center justify-center rounded-lg bg-white tracking-[0.01rem]">
      <div className="relative h-[200px] w-full overflow-hidden rounded-t-lg">
        <Image
          src={article.img}
          alt="Article Image"
          width={640}
          height={640}
          priority
          className="-mt-4 object-cover object-top"
        />
      </div>
      <div className="px-8 pb-6 pt-8">
        <h1 className="mb-3 mt-1 text-[1.025rem] font-bold leading-normal tracking-[0.0125rem] text-ac-very-dark-grayish-blue">
          {article.heading}
        </h1>
        <p className="text-ac-desaturated-dark-blue">{article.intro}</p>
        <div className="mt-8 flex w-full items-center justify-between">
          <div className="flex gap-4">
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
          <button
            onClick={handleClick}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-ac-light-grayish-blue"
          >
            <Image src={shareIcon} alt="share icon" className="object-center" />
          </button>
        </div>
      </div>
    </article>
  );
}
