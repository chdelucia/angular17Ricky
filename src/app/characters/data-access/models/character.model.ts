import { Location } from './location.model';
import { Origin } from './origin.model';

export interface Character {
  id: string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string[];
  created: string;
}
