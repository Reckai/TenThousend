import { getComments } from "@/app/api/axios/posts/requests/[id]/comments";
import { getPost } from "@/app/api/axios/posts/requests/[id]/post";
import { TComment } from "@/app/api/axios/posts/types/Comments";
import { TPost } from "@/app/api/axios/posts/types/Post";
import Loader from "@/app/components/Loader";
import { Colors } from "@/app/utils/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import MainHeader from "../components/MainHeader";
import Comments from "./components/Comments";

const Post = () => {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { data, isLoading, isError } = useQuery<TPost>({
    queryKey: ["post", id],
    queryFn: () => getPost(Number(id)),
  });

  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery<TComment[]>({
    queryKey: ["comments", id],
    queryFn: () => getComments(Number(id)),
  });

  const { height } = useWindowDimensions();
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Text>Error</Text>
      ) : (
        <View style={styles.mainContainer}>
          <MainHeader
            backgroundColor={Colors.white}
            style={{
              height: height * 0.3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.headerContent}>
              <FontAwesome
                name="angle-left"
                onPress={() => navigation.goBack()}
                size={32}
                color="black"
              />
              <Text style={[styles.title, { textAlign: "center" }]}>
                {data?.title}
              </Text>
              <View style={styles.imageContainer}>
                <Image
                  source={require("@/assets/images/recipe.png")}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            </View>
          </MainHeader>

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.contentContainer}>
              <Text
                style={[styles.description, { color: `${Colors.grayBlack}40` }]}
              >
                {t("post.About")}
              </Text>

              <View style={[styles.content, { marginTop: 20 }]}>
                <Text
                  style={[
                    styles.description,
                    {
                      lineHeight: 32,
                      fontSize: 15,
                      fontWeight: 400,
                      fontFamily: "Inter",
                    },
                  ]}
                >
                  {data?.body}
                </Text>
              </View>

              <View>
                <Text
                  style={[
                    styles.description,
                    { color: `${Colors.grayBlack}40` },
                  ]}
                >
                  {t("post.Comments")}
                </Text>
                <Comments comments={comments || []} />
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryGray,
  },
  mainContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: 20,
    padding: 20,
  },
  content: {
    borderRadius: 15,
    padding: 20,
    backgroundColor: Colors.white,
    marginBottom: 10,
    minHeight: 120,
  },
  headerContent: {
    width: "100%",
    height: "100%",
    padding: 20,
    position: "relative",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  description: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default Post;
