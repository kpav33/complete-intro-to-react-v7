// This allows us to resuse these response types anywhere we reference the API responses and have an enforceable shape that TypeScript knows what to do with.

// We made Animal a type instead of an interface. This confuses people a lot and the sum of the answer is it frequently doesn't matter which you choose. The general advice is "use interfaces unless you need type aliases". Here we wanted to have a type alias that just allows a few different strings, something an interface can't do but a type can.
export type Animal = "dog" | "cat" | "bird" | "reptile" | "rabbit";

export interface Pet {
  id: number;
  name: string;
  animal: Animal;
  description: string;
  breed: string;
  images: string[];
  city: string;
  state: string;
}

export interface PetAPIResponse {
  numberOfResults: number;
  startIndex: number;
  endIndex: number;
  hasNext: boolean;
  pets: Pet[];
}

export interface BreedListAPIResponse {
  animal: Animal;
  breeds: string[];
}
