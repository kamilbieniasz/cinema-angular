export interface Price {
    normalTicket: number;
    familyTicket: number;
    reducedTicket: number;
    wednesdayTicket: number;
    horrorsNightTicket: number;
    classicMovieTicket: number;
}

export interface RootObject {
    price: Price[];
}