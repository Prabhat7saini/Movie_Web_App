import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, User, Movie, Comments } from "../../utils/UserInterface";
import localforage from "localforage";
// import { useEffect } from "react";

// Function to fetch current user from localStorage
const fetchCurrentUser = (): User | null => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) as User : null;
};
const fetchComments = async (): Promise<Comments[] | []> => {
    try {
      const savedComments = await localforage.getItem<Comments[]>("comment");
      return savedComments || []; // Return saved comments or empty array if null or undefined
    } catch (error) {
      console.error('Error fetching comments from localforage:', error);
      return []; // Return empty array on error
    }
  };

// console.log(`useeffect`,dbcommentdata)
const setMovieInlocalforage = async (email: string, password: string, fav: (string | undefined)[], name: string, username: string) => {
    const savedUsers = (await localforage.getItem<User[]>('User')) || [];
    const existingUserIndex = savedUsers.findIndex((user) => user.email === email);

    if (existingUserIndex === -1) {
        throw new Error(`User not found`);
    }

    const updatedUser: User = {
        email: email,
        password: password,
        username: username,
        fav: fav,
        name: name
    };

    savedUsers[existingUserIndex] = updatedUser;

    await localforage.setItem('User', savedUsers);
};

const initialState: UserState = {
    loading: false,
    Movie: [],
    currentUser: fetchCurrentUser(), // Initialize currentUser from localStorage
    isSearch: false,
    Comments:await fetchComments(),
   
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addFavMov(state, action: PayloadAction<string>) {
            if (state.currentUser) {
                const updatedFav = state.currentUser.fav ? [...state.currentUser.fav, action.payload] : [action.payload];

                state.currentUser = {
                    ...state.currentUser,
                    fav: updatedFav
                };

                localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
                setMovieInlocalforage(state.currentUser.email, state.currentUser.password, updatedFav, state.currentUser?.name, state.currentUser.username);
            }
        },
        setLoadingTrue(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setLoadingFalse(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setMovie(state, action: PayloadAction<Movie[]>) {
            state.Movie = action.payload;
        },
        setCurrentUser(state, action: PayloadAction<User | null>) {
            state.currentUser = action.payload;
            if (action.payload) {
                localStorage.setItem('currentUser', JSON.stringify(action.payload));
            } else {
                localStorage.removeItem('currentUser');
            }
        },
        removeFavMov(state, action: PayloadAction<string>) {
            if (state.currentUser && state.currentUser.fav) {
                const updatedFav = state.currentUser.fav.filter(movie => movie !== action.payload);
                state.currentUser = {
                    ...state.currentUser,
                    fav: updatedFav
                };

                localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
                setMovieInlocalforage(state.currentUser.email, state.currentUser.password, updatedFav, state.currentUser.name, state.currentUser.username);
            }
        },
        logoutCurrentUser(state, action: PayloadAction<null>) {
            state.currentUser = action.payload;
        },
        setIsSearch(state, action: PayloadAction<boolean>) {
            state.isSearch = action.payload
        },
       
    },
});

export const {
    addFavMov,
    setLoadingTrue,
    setLoadingFalse,
    setMovie,
    setCurrentUser,
    removeFavMov,
    logoutCurrentUser,
    setIsSearch,
  
} = userSlice.actions;

export default userSlice.reducer;