import {IntervalType} from '../types/types';

export function generateSchedule(
  repeats: number,
  turnOfBreaks: boolean,
): IntervalType[] {
  const intervals: IntervalType[] = [];
  const shortBreak = 'shortBreakTimeInMS';
  const longBreak = 'longBreakTimeInMS';

  for (let i = 0; i < repeats; i++) {
    intervals.push('pomodoroTimeInMS');
    if (!turnOfBreaks) {
      intervals.push(shortBreak);
    }
  }

  if (!turnOfBreaks) {
    intervals.pop();
    intervals.push(longBreak);
  }

  return intervals;
}
