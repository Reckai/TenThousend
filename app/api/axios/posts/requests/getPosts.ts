import { dummyApi } from "@/app/api/axios/posts/instanse";
import { TPosts } from "../types/Posts";

type TPostsReponse = TPosts;

export const getPosts = async (): Promise<TPostsReponse> => {
  try {
    const response = await dummyApi.get<TPostsReponse>("/posts");
    return response.data;
  } catch (error) {
    throw new Error("Failed to get posts", { cause: error });
  }
};
