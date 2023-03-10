import {Dispatch, SetStateAction} from 'react';

export function getArrayElement(
  sourceArray: string[],
  setDestinationArray: Dispatch<SetStateAction<string[]>>,
) {
  // Get a random element from the source array
  const randomIndex = Math.floor(Math.random() * sourceArray.length);
  const element = sourceArray[randomIndex];

  // Add the element to the destination array
  setDestinationArray((prevArr: string[]) => [...prevArr, element]);
}
