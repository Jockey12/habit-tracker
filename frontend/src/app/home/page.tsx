import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col items-center p-8">
      <header className="w-full flex items-center justify-between mb-4 px-6 py-4 bg-gray-100 shadow-md rounded-lg transition">
        <h1 className="text-3xl font-bold text-gray-800"><a href="/habit-tracker">Habit Tracker</a></h1>
        <a
          href="https://github.com/jockey12"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:scale-105 transition-transform duration-200 ease-in-out"
        >
          <Image
            src="/github-mark.svg"
            alt="GitHub Profile"
            width={24}
            height={24}
          />
        </a>
      </header>
      <span className="font-bold text-white text-3xl mb-4">Welcome to Habit Tracker</span>
      <p className="w-full max-w-xl text-center mt-8 text-gray-200">Habit tracker is a simple app to track your daily habits. It allows you to add, mark, and view your habits in a user-friendly interface. The app is built with Next.js and Tailwind CSS for a modern look and feel.</p>

    </div >
  )
};
