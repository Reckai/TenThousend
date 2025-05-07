import { dummyApi } from "../../instanse";
import { TPost } from "../../types/Post";

export const getPost = async (id: number): Promise<TPost> => {
  try {
    const response = await dummyApi.get<TPost>(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get post", { cause: error });
  }
};
