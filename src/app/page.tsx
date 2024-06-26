import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
          style={{ height: "50vh" }} // Asegura que no exceda la altura de la ventana gráfica
        >
          <div
            className="absolute -top-1/4 left-1/2 w-[90vw] max-w-[1155px] aspect-[1155/678] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-2xl py-10 sm:py-5 lg:py-15">
          <div className="text-center">
            <Image
              src="/meetcode_logo.png"
              width={200}
              height={200}
              alt="meetcode logo"
              className="inline-block"
            />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Find awesome programmers to work with and learn from
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
              This platform is a place where you can find other programmers to
              work with on projects, learn from, and share your knowledge with.
              We have a community of programmers who are passionate about coding
              and are always looking for new projects to work on. Whether you
              are a beginner or an expert, you can find someone to collaborate
              with here.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/browse"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-0 inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
          style={{ height: "50vh" }} // Reduce la altura para limitar el desbordamiento
        >
          <div
            className="absolute bottom-0 left-1/2 w-[90vw] max-w-[1155px] aspect-[1155/678] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
