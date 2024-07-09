// useAuth.ts

import localforage from 'localforage';
import { User } from '../utils/UserInterface';


export const Register = async (newUser: User) => {
    try {
      
        const savedUsers = (await localforage.getItem<User[]>('User')) || [];
        const updatedUsers = [...savedUsers, newUser];
        const existingUser = savedUsers.find((user) => user.email === newUser.email);
        if (existingUser) {
            throw new Error(`User alredy exsit Please login`)
        }else{

            
            await localforage.setItem('User', updatedUsers);
           
        }
    } catch (error) {
        console.error('Error during registration:', error);
        return error;
    }
};

export default {  Register }; // Exporting an object with named exports
