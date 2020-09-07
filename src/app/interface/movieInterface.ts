export interface Movie {
    id: number;
    title: string;
    duration: number;
    production: string;
    description: string;
    direction: string;
    cast: string;
    release_date: string;
    hours: Hours;
    cover: string;
    year: number;
    note: number;
}

export interface Hours{
    hour1: string;
    hour2?: string;
}