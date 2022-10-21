import { useState, useEffect } from "react";
import { Animal, BreedListAPIResponse } from "./APIResponsesTypes";

// localCache can have anything as a key so we need to let TypeScript know that. We have a generic "index" key that could be anything, and we're letting TypeScript know that only string arrays can be set as values.
const localCache: {
  [index: string]: string[];
} = {};

// Like Animal, we can only have one of three possible strings for our Status so we can make that explicit and TypeScript can keep track of that.
type Status = "unloaded" | "loading" | "loaded";

export default function useBreedList(animal: Animal): [string[], Status] {
  // Since [] and "unloaded" aren't explcit enough for TypeScript know that those are a string[] or a Status, we can cast them to TypeScript definitely knows what they are.
  const [breedList, setBreedList] = useState([] as string[]);
  const [status, setStatus] = useState("unloaded" as Status);

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      // Again we have to cast our API response into the type we know it's going to be.
      const json = (await res.json()) as BreedListAPIResponse;
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
