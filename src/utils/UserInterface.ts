
export interface User {
  username: string;
  name: string;
  email: string;
  password: string;
  fav?: (string | undefined)[] | undefined;
comments?:{Title:string,comment:string}[];
}


export interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: { Source: string; Value: string; }[]; // Ensure Ratings matches expected structure
  Poster: string;
  Response: string;
}
export interface Comments {
  Title: string;
  comment: string;
  rating:string
  name?: string;
}
export interface UserState {
  isSearch: boolean;
  loading: boolean;
  Movie: Movie[];
  currentUser: User | null;
  // Comments?:  Comments[]|[];

}