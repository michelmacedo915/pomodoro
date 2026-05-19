import { Session } from '../types';

export function calculateStreak(sessions: Session[]) {
  const today = new Date().toDateString();
  const dates = new Set(
    sessions
      .filter(s => s.completed)
      .map(s => new Date(s.completedAt).toDateString())
  );
  
  let current = 0;
  let date = new Date();
  
  // Check if today is in dates, if not check yesterday
  // We allow skipping today if it's still early
  if (!dates.has(date.toDateString())) {
    date.setDate(date.getDate() - 1);
  }

  while (dates.has(date.toDateString())) {
    current++;
    date.setDate(date.getDate() - 1);
  }
  
  // Find longest
  let longest = 0;
  let currentStreak = 0;
  let prevDate: Date | null = null;

  const sortedDates = Array.from(dates)
    .map(d => new Date(d))
    .sort((a, b) => a.getTime() - b.getTime());

  for (let i = 0; i < sortedDates.length; i++) {
    const d = sortedDates[i];
    if (!prevDate) {
      currentStreak = 1;
    } else {
      const diffTime = Math.abs(d.getTime() - prevDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }
    }
    if (currentStreak > longest) {
      longest = currentStreak;
    }
    prevDate = d;
  }

  return { current, longest: Math.max(current, longest), lastSessionDate: today };
}
