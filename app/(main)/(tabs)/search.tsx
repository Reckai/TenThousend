import { FontAwesome } from "@expo/vector-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { getPostsBySearch } from "@/app/api/axios/posts/requests/getPosts";
import { TPost } from "@/app/api/axios/posts/types/Post";
import { TPosts } from "@/app/api/axios/posts/types/Posts";
import Loader from "@/app/components/Loader";
import Post from "@/app/components/Post";
import { useDebounce } from "@/app/hooks/useDebounce";
import { Colors } from "@/app/utils/colors";

const SearchInput = ({
  control,
  name,
  placeholder,
}: {
  control: any;
  name: string;
  placeholder: string;
}) => (
  <View style={styles.searchContainer}>
    <FontAwesome
      name="search"
      size={24}
      color={Colors.grayBlack}
      style={styles.icon}
    />
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.grayBlack}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          accessibilityLabel={placeholder}
        />
      )}
    />
  </View>
);

const Search = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { control, watch } = useForm({ defaultValues: { search: "" } });
  const searchTerm = watch("search");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
  } = useInfiniteQuery<{ data: TPosts; nextPageCursor: number | null }, Error>({
    queryKey: ["posts", debouncedSearchTerm],
    queryFn: ({ pageParam = 0 }) =>
      getPostsBySearch({
        pageParam: pageParam as number,
        search: debouncedSearchTerm,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPageCursor,
  });

  const allPosts = React.useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderPostItem = ({ item }: { item: TPost }) => {
    return <Post post={item} />;
  };

  const renderListFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color={Colors.orange} />
      </View>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (isError) {
      return (
        <Text style={[styles.message, styles.error]}>
          {error instanceof Error ? error.message : t("search.error")}
        </Text>
      );
    }
    if (allPosts.length === 0) {
      return (
        <Text style={[styles.message, styles.empty]}>
          {debouncedSearchTerm ? t("search.noResults") : t("search.noPostsYet")}
        </Text>
      );
    }
    return (
      <FlatList
        data={allPosts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderListFooter}
        contentContainerStyle={styles.listContent}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      />
    );
  };

  return (
    <View style={styles.container}>
      <FontAwesome //
        name="angle-left"
        onPress={() => navigation.goBack()}
        size={32}
        color={Colors.grayBlack}
        style={styles.backButton}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{t("search.title")}</Text>
        <SearchInput
          control={control}
          name="search"
          placeholder={t("search.placeholder")}
        />
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 25 : 50,
  },
  backButton: {
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.grayBlack,
    marginTop: 10,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F8FA",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    marginVertical: 16,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.grayBlack,
    backgroundColor: "transparent",
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 40,
    color: Colors.grayBlack,
  },
  empty: {
    color: Colors.orange,
  },
  error: {
    color: Colors.orange,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },
});

export default Search;
