'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { habitService, Habit, CreateHabitData } from "@/services/habitService";

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<CreateHabitData>({
    title: '',
    description: '',
    frequency: 'daily',
  });

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      setLoading(true);
      const data = await habitService.getAll();
      setHabits(data || []);
    } catch (error) {
      console.error('Failed to load habits:', error);
      setHabits([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await habitService.create(formData);
      setFormData({ title: '', description: '', frequency: 'daily' });
      setShowModal(false);
      loadHabits();
    } catch (error) {
      console.error('Failed to create habit:', error);
      alert('Failed to create habit. Please try again.');
    }
  };

  const handleToggleCompletion = async (id: number) => {
    try {
      await habitService.toggleCompletion(id);
      loadHabits();
    } catch (error) {
      console.error('Failed to toggle habit:', error);
      alert('Failed to update habit. Please try again.');
    }
  };

  const handleDeleteHabit = async (id: number) => {
    if (!confirm('Are you sure you want to delete this habit?')) {
      return;
    }
    try {
      await habitService.delete(id);
      loadHabits();
    } catch (error) {
      console.error('Failed to delete habit:', error);
      alert('Failed to delete habit. Please try again.');
    }
  };

  return (
    <div className="font-sans min-h-screen flex flex-col items-center p-8">
      <header className="w-full flex items-center justify-between mb-4 px-6 py-4 bg-black shadow-md rounded-lg transition">
        <h1 className="text-3xl font-bold text-stone-50 flex items-center gap-4">
          <a href="/home" className="relative inline-block after:content-[''] after:block after:h-0.5 after:bg-current after:w-0 after:transition-all after:duration-300 hover:after:w-full">Home</a>
          <span className="border-l border-gray-300 h-6 mx-2"></span>
          <a href="/habit-tracker" className="relative inline-block after:content-[''] after:block after:h-0.5 after:bg-current after:w-0 after:transition-all after:duration-300 hover:after:w-full">Habit Tracker</a>
        </h1>

        <a
          href="https://github.com/jockey12"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-stone-50 hover:text-gray-300 hover:scale-105 transition-transform duration-200 ease-in-out"
        >
          <Image
            src="/github-mark-white.svg"
            alt="GitHub Profile"
            width={24}
            height={24}
          />
          <span className="hidden sm:inline"></span>
        </a>
      </header>

      <main className="w-full max-w-xl flex flex-col gap-8">
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Your Habits</h2>
          {loading ? (
            <div className="text-white text-center py-8">Loading habits...</div>
          ) : habits.length === 0 ? (
            <div className="text-white text-center py-8">
              No habits yet. Click &quot;+ Add Habit&quot; to create one!
            </div>
          ) : (
            <ul className="space-y-4">
              {habits.map((habit) => (
                <li
                  key={habit.ID}
                  className={`rounded shadow p-4 flex items-center justify-between ${
                    habit.completed ? 'bg-green-100' : 'bg-white'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${habit.completed ? 'text-green-700 line-through' : 'text-gray-700'}`}>
                        {habit.title}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                        {habit.frequency}
                      </span>
                    </div>
                    {habit.description && (
                      <p className="text-sm text-gray-600 mt-1">{habit.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleCompletion(habit.ID)}
                      className={`px-3 py-1 rounded transition ${
                        habit.completed
                          ? 'bg-gray-500 text-white hover:bg-gray-600'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {habit.completed ? 'Undo' : 'Done'}
                    </button>
                    <button
                      onClick={() => handleDeleteHabit(habit.ID)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded font-semibold hover:bg-blue-700 transition self-end"
        >
          + Add Habit
        </button>
      </main>

      {/* Modal for adding habits */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Habit</h3>
            <form onSubmit={handleAddHabit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Drink Water"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Drink 8 glasses of water"
                  rows={3}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select
                  id="frequency"
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormData({ title: '', description: '', frequency: 'daily' });
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Add Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="mt-12 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Jockey12. All rights reserved.
      </footer>
    </div>
  );
}
