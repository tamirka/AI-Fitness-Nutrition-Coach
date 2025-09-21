
export enum Goal {
  FAT_LOSS = 'Fat Loss',
  MUSCLE_GAIN = 'Muscle Gain',
}

export enum Experience {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}

export enum Equipment {
  FULL_GYM = 'Full Gym',
  HOME_GYM = 'Home Gym (dumbbells/bands)',
  NO_EQUIPMENT = 'No Equipment',
}

export enum Diet {
  NO_RESTRICTION = 'No Restriction',
  VEGAN = 'Vegan',
  VEGETARIAN = 'Vegetarian',
  HALAL = 'Halal',
  KETO = 'Keto',
}

export interface FormData {
  name: string;
  goal: Goal;
  experience: Experience;
  equipment: Equipment;
  diet: Diet;
  allergies: string;
}
