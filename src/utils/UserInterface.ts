
export interface User {
  username: string;
  name: string;
  email: string;
  password: string;
  fav?: (string | undefined)[] | undefined// Added fav field as a string array
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

export interface UserState {
  isSearch: boolean;
  loading: boolean;
  Movie: Movie[];
  currentUser: User | null;
  Comments: {
      comments: { username: string; comment: string }[];
  };
}