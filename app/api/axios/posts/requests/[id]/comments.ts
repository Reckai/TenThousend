import { dummyApi } from "../../instanse";
import { TComment } from "../../types/Comments";

export const getComments = async (id: number): Promise<TComment[]> => {
  try {
    const response = await dummyApi.get<TComment[]>(`/posts/${id}/comments`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get post", { cause: error });
  }
};
