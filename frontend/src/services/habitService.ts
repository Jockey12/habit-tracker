export interface Habit {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  title: string;
  description: string;
  frequency: string;
  completed: boolean;
}

export interface CreateHabitData {
  title: string;
  description: string;
  frequency: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const habitService = {
  async getAll(): Promise<Habit[]> {
    const response = await fetch(`${API_URL}/api/habits`);
    if (!response.ok) {
      throw new Error('Failed to fetch habits');
    }
    return response.json();
  },

  async getById(id: number): Promise<Habit> {
    const response = await fetch(`${API_URL}/api/habits/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch habit');
    }
    return response.json();
  },

  async create(data: CreateHabitData): Promise<Habit> {
    const response = await fetch(`${API_URL}/api/habits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, completed: false }),
    });
    if (!response.ok) {
      throw new Error('Failed to create habit');
    }
    return response.json();
  },

  async update(id: number, data: Partial<CreateHabitData>): Promise<Habit> {
    const response = await fetch(`${API_URL}/api/habits/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update habit');
    }
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/api/habits/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete habit');
    }
  },

  async toggleCompletion(id: number): Promise<Habit> {
    const response = await fetch(`${API_URL}/api/habits/${id}/toggle`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      throw new Error('Failed to toggle habit completion');
    }
    return response.json();
  },
};
