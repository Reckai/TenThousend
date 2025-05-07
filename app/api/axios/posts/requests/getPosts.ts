import { dummyApi } from "@/app/api/axios/posts/instanse";
import { isAxiosError } from "axios";
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

const LIMIT = 10;

export const getPostsBySearch = async ({
  pageParam = 0,
  search,
}: {
  pageParam: number;
  search: string;
}): Promise<{
  data: TPosts;
  nextPageCursor: number | null;
}> => {
  try {
    const params: {
      _start: number;
      _limit: number;
      title_like?: string;
      q?: string;
    } = {
      _start: pageParam,
      _limit: LIMIT,
    };

    if (search) {
      params.title_like = search;
    }

    const response = await dummyApi.get<TPosts>("/posts", { params });

    const posts = response.data;

    const nextPageCursor =
      posts.length === LIMIT ? pageParam + posts.length : null;

    return {
      data: posts,
      nextPageCursor,
    };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    if (isAxiosError(error)) {
      console.error(
        "Axios ошибка при загрузке постов:",
        error.response?.status,
        error.response?.data.error.message,
      );
    } else {
      console.error(
        "Ошибка при загрузке постов по поиску:",
        err.message,
        (err as any).cause,
      );
    }
    throw new Error("Network error", { cause: err });
  }
};
