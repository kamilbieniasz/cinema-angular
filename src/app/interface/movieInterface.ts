// export interface Movie {
//     id: number;
//     title: string;
//     duration: number;
//     production: string;
//     description: string;
//     direction: string;
//     cast: string;
//     release_date: string;
//     date: Date[];
//     hours: Hours;
//     cover: string;
//     places: Place[];
//     year: number;
//     note: number;
// }

// export interface Hours{
//     hour1: string;
//     hour2?: string;
// }
// export interface Place {
//     number: number;
//     free: boolean;
// }
// export interface Date {
//     day: number;
// }

// export interface Date {
//     day: number;
// }

// export interface Hour {
//     hour: string;
// }

// export interface Place {
//     number: number;
//     free: boolean;
// }

// export interface Movie {
//     id: number;
//     title: string;
//     duration: number;
//     production: string;
//     description: string;
//     direction: string;
//     cast: string;
//     release_date: Date;
//     date: Date[];
//     hours: Hour[];
//     cover: string;
//     places: Place[];
//     year: number;
//     note: number;
// }

export interface Place {
  number: number;
  free: boolean;
}

export interface Hour {
  hour: string;
  places: Place[];
}

export interface Date {
  day: number;
  hours: Hour[];
}

export interface Hour2 {
  hour: string;
}

export interface Movie {
  id: number;
  title: string;
  duration: number;
  production: string;
  description: string;
  direction: string;
  cast: string;
  release_date: Date;
  trailer: string;
  date: Date[];
  hours: Hour2[];
  cover: string;
  year: number;
  note: number;
}