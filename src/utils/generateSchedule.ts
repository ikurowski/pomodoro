import {IntervalType} from '../types/types';

export function generateSchedule(
  repeats: number,
  turnOffBreaks: boolean = false,
): IntervalType[] {
  const intervals: IntervalType[] = [];
  const shortBreak = 'shortBreakTimeInMS';
  const longBreak = 'longBreakTimeInMS';

  for (let i = 0; i < repeats; i++) {
    intervals.push('pomodoroTimeInMS');
    if (!turnOffBreaks) {
      intervals.push(shortBreak);
    }
  }

  if (!turnOffBreaks) {
    intervals.pop();
    intervals.push(longBreak);
  }

  return intervals;
}
