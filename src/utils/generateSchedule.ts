import {IntervalType} from '../types/types';

export function generateSchedule(repeats: number): IntervalType[] {
  if (repeats === 1) {
    return ['pomodoroTimeInMS', 'longBreakTimeInMS'];
  } else if (repeats === 2) {
    return [
      'pomodoroTimeInMS',
      'shortBreakTimeInMS',
      'pomodoroTimeInMS',
      'longBreakTimeInMS',
    ];
  } else {
    const schedule: IntervalType[] = [];
    for (let i = 0; i < repeats; i++) {
      schedule.push('pomodoroTimeInMS', 'shortBreakTimeInMS');
    }
    schedule.pop();
    schedule.push('longBreakTimeInMS');
    return schedule;
  }
}
