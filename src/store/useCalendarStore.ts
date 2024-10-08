import { create } from 'zustand';

type Calendar = {
  currentDate: Date;
  event: Event| null;
  setCurrentDate: (date: Date) => void;
  setEvent: (event: Event) => void;
};

type Event = {
  eventName: string,
  Date: Date;
  Category: string
}

export const useCalendarStore = create<Calendar>(set => ({
  currentDate: new Date(),  
  event: null,
  setCurrentDate: (date) => set({ currentDate: date }),
  setEvent: (event) => set({ event: event }),
}));
