import { TComment } from "@/app/api/axios/posts/types/Comments";
import Loader from "@/app/components/Loader";
import { Colors } from "@/app/utils/colors";
import { StyleSheet, Text, View } from "react-native";

interface CommentsProps {
  comments: TComment[];
  isLoading: boolean;
  isError: boolean;
}

const Comments = ({ comments, isLoading, isError }: CommentsProps) => {
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Text>Error</Text>
      ) : (
        comments.map((comment) => (
          <View key={comment.id} style={styles.commentContainer}>
            <Text style={styles.nameText}>{comment.name}</Text>
            <Text style={styles.emailText}>{comment.email}</Text>
            <Text style={styles.bodyText}>{comment.body}</Text>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  commentContainer: {
    borderRadius: 15,
    padding: 20,
    backgroundColor: Colors.white,
    marginBottom: 10,
    minHeight: 120,
  },
  nameText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  emailText: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 5,
  },
  bodyText: {
    fontSize: 13,
    color: `${Colors.grayBlack}40`,
    marginTop: 10,
  },
});

export default Comments;
