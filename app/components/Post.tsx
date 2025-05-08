import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { TPost } from "../api/axios/posts/types/Post";
import { CommonStyles } from "../utils/styles";

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
      <View style={CommonStyles.card}>
        <View style={CommonStyles.cardContent}>
          <Text style={[CommonStyles.title, { fontSize: 15 }]}>
            {post.title}
          </Text>
          <Text style={CommonStyles.description}>{post.body}</Text>
        </View>
      </View>
    </Link>
  );
};

// Keep any custom styles that aren't in CommonStyles
const styles = StyleSheet.create({});

export default Post;
