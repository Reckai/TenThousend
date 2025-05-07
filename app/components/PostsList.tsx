import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TPost } from "../api/axios/posts/types/Post";
import { Colors } from "../utils/colors";

interface PostsProps {
  posts: TPost[];
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <ScrollView style={styles.postsContainer}>
      {posts.map((post) => (
        <Link
          href={{
            pathname: "/(main)/post/[id]",
            params: { id: post.id },
          }}
          key={post.id}
        >
          <View style={styles.blockContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.TitleText}>{post.title}</Text>
              <Text style={styles.descriptionText}>{post.body}</Text>
            </View>
          </View>
        </Link>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
  },
  blockContainer: {
    borderRadius: 15,
    padding: 20,
    backgroundColor: Colors.white,
    marginBottom: 10,
    minHeight: 120,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 8,
  },
  TitleText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 13,
    color: `${Colors.grayBlack}40`,
  },
});

export default Posts;
