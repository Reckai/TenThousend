import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { TPost } from "../api/axios/posts/types/Post";
import { Colors } from "../utils/colors";

interface PostProps {
  post: TPost;
}

const Post = ({ post }: PostProps) => {
  return (
    <Link
      href={{
        pathname: "/(main)/post/[id]",
        params: { id: post.id },
      }}
    >
      <View style={styles.blockContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{post.title}</Text>
          <Text style={styles.descriptionText}>{post.body}</Text>
        </View>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
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
  titleText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 13,
    color: `${Colors.grayBlack}40`,
  },
});

export default Post;
