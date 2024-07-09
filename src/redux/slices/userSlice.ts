import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, User, Movie } from "../../utils/UserInterface";
import localforage from "localforage";

// Function to fetch current user from localStorage
const fetchCurrentUser = (): User | null => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) as User : null;
};

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
    Comments: {
        comments: []
    }
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
        addComment(state, action: PayloadAction<{ username: string; comment: string }>) {
            const newComment = {
                username: action.payload.username,
                comment: action.payload.comment
            };

            state.Comments.comments.push(newComment);

            // Update local storage with comments array
            localforage.setItem('comments', state.Comments.comments);
        }
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
    addComment
} = userSlice.actions;

export default userSlice.reducer;