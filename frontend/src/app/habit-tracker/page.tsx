import Image from "next/image";
export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col items-center p-8">
      <header className="w-full flex items-center justify-between mb-4 px-6 py-4 bg-black shadow-md rounded-lg transition">
        {/* <h1 className="text-3xl font-bold text-gray-800"><a href="#">Habit Tracker</a></h1> */}
        <h1 className="text-3xl font-bold text--stone-50 flex items-center gap-4">
          <a href="./home" className="relative inline-block after:content-[''] after:block after:h-0.5 after:bg-current after:w-0 after:transition-all after:duration-300 hover:after:w-full">Home</a>
          <span className="border-l border-gray-300 h-6 mx-2"></span>
          <a href="./habit-tracker" className="relative inline-block after:content-[''] after:block after:h-0.5 after:bg-current after:w-0 after:transition-all after:duration-300 hover:after:w-full">Habit Tracker</a>
        </h1>


        <a
          href="https://github.com/jockey12"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:scale-105 transition-transform duration-200 ease-in-out"
        >
          <Image
            src="/github-mark.svg"
            alt=""
            width={24}
            height={24}
          />
          <span className="hidden sm:inline"></span>
        </a>
      </header>

      <main className="w-full max-w-xl flex flex-col gap-8">
        <section>
          <h2 className="text-xl font-bold text-black mb-4">Your Habits</h2>
          <ul className="space-y-4">
            {/* Example habit item, replace with dynamic list later */}
            <li className="bg-white rounded shadow p-4 flex items-center justify-between">
              <span className="font-medium text-gray-700">Drink Water</span>
              <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
                Mark Done
              </button>
            </li>
            <li className="bg-white rounded shadow p-4 flex items-center justify-between">
              <span className="font-medium text-gray-700">Exercise</span>
              <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
                Mark Done
              </button>
            </li>
          </ul>
        </section>
        <button className="bg-blue-600 text-white py-2 px-4 rounded font-semibold hover:bg-blue-700 transition self-end">
          + Add Habit
        </button>
      </main>
      <footer className="mt-12 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Jockey101. All rights reserved.

      </footer>
    </div>
  )
};
