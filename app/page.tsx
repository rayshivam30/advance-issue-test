import Image from "next/image";
import { useEffect, useState } from "react";
import fs from 'fs';
import path from 'path';

export default function Home() {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState(null);
  
  // Error 1: Environment variable access without fallback
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiUrl}/api/data`)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('API fetch failed:', err));
  }, []);
  
  // Error 2: File system access in client component
  useEffect(() => {
    try {
      const configPath = path.join(process.cwd(), 'config.json');
      const configData = fs.readFileSync(configPath, 'utf8');
      setConfig(JSON.parse(configData));
    } catch (error) {
      console.error('Config load failed:', error);
    }
  }, []);
  
  // Error 3: Window object access without check
  const handleAnalytics = () => {
    window.gtag('event', 'button_click', {
      event_category: 'engagement'
    });
  };
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {/* Error 4: External image without proper domain configuration */}
            <Image
              src="https://random-user-generated-image.com/avatar.jpg"
              alt="User avatar"
              width={50}
              height={50}
              className="rounded-full"
            />
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
          {/* Display API data that will fail in production */}
          {data && <div className="text-sm text-gray-600">API Data: {JSON.stringify(data)}</div>}
          {config && <div className="text-sm text-gray-600">Config: {JSON.stringify(config)}</div>}
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleAnalytics}
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
          {/* Error 5: Button with undefined function reference */}
          <button
            className="flex h-12 w-full items-center justify-center rounded-full bg-red-500 px-5 text-white md:w-[158px]"
            onClick={undefinedFunction}
          >
            Click Me
          </button>
        </div>
      </main>
    </div>
  );
}
