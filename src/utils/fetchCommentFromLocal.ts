import localforage from "localforage";
import { Comments } from "./UserInterface";

export const fetchComments = async (): Promise<Comments[] | []> => {
    try {
      const savedComments = await localforage.getItem<Comments[]>("comment");
      return savedComments || []; // Return saved comments or empty array if null or undefined
    } catch (error) {
      console.error('Error fetching comments from localforage:', error);
      return []; // Return empty array on error
    }
  };