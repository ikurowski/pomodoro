const millisecondsToTime = (
  milliseconds: number,
  onlyMinutes: boolean = false,
) => {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
  const hours = Math.floor(milliseconds / 1000 / 60 / 60);

  if (onlyMinutes) {
    return hours > 0 ? `${hours * 60 + minutes}` : minutes.toString();
  }

  const timeArr = [
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ];
  if (hours > 0) {
    timeArr.unshift(hours.toString());
  }
  return timeArr.join(':');
};

export default millisecondsToTime;
