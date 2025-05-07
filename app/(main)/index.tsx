import MainHeader from "@/app/(main)/components/MainHeader";
import { RootState } from "@/app/redux/store";
import { Colors } from "@/app/utils/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { getPosts } from "../api/axios/posts/requests/getPosts";
import { TPost } from "../api/axios/posts/types/Post";
import Loader from "../components/Loader";
import Posts from "../components/PostsList";

const Main = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();
  const { height } = useWindowDimensions();

  const { data, isLoading, isError } = useQuery<TPost[]>({
    queryFn: () => getPosts(),
    queryKey: ["homePosts"],
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return;
  }
  const posts = data?.slice(0, 3) as TPost[];
  return (
    <View style={{ flex: 1, backgroundColor: Colors.primaryGray }}>
      <MainHeader
        backgroundColor={Colors.orange}
        style={{ height: height * 0.25 }}
      >
        <Text style={[styles.headerText, { fontSize: 13 }]}>
          {t("home.header")}
        </Text>
        <Text style={styles.headerText}>
          {user?.firstName ? `${user?.firstName} ${user?.lastName}` : ""}
        </Text>
      </MainHeader>

      <View style={styles.container}>
        <View style={styles.blockContainer}>
          <View style={styles.personalAdviserContainer}>
            <View style={styles.personalAdviserTextContainer}>
              <Text style={styles.TitleText}>Test Task</Text>
              <Text style={styles.descriptionText}>lorem ipsum</Text>
              <View style={styles.goToCallRow}>
                <Text style={styles.goToCallText}>Go to call</Text>
                <AntDesign
                  name="right"
                  size={18}
                  color={Colors.green}
                  style={{ marginLeft: 4 }}
                />
              </View>
            </View>
            <Image source={require("@/assets/images/personalAdviser.png")} />
          </View>
        </View>

        <View
          style={[
            styles.blockContainer,
            { backgroundColor: Colors.gray, padding: 20, width: "65%" },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
              flex: 1,
            }}
          >
            <View
              style={{
                height: 48,
                width: 48,
                backgroundColor: Colors.orange,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
                flexShrink: 0,
              }}
            >
              <Ionicons name="link-outline" size={24} color="white" />
            </View>
            <Text
              style={[
                styles.beforeWeStartTextContainer,
                styles.TitleText,
                { flex: 1 },
              ]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Link yor Bank Account
            </Text>
          </View>

          <View
            style={[
              {
                marginTop: 10,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <Text style={styles.beforeWeStartTextContainer}>2 step</Text>
            <AntDesign name="arrowright" size={24} color={Colors.white} />
          </View>
        </View>
      </View>

      <View style={[styles.container, { marginTop: 20 }]}>
        {isLoading ? (
          <Loader />
        ) : data ? (
          <Posts posts={posts} />
        ) : (
          <Text>No posts</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  postsContainer: {
    flex: 1,
  },
  personalAdviserContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  header: {
    flex: 0.4,
    backgroundColor: Colors.orange,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 20,
  },
  blockContainer: {
    borderRadius: 15,
    padding: 20,
    backgroundColor: Colors.white,
    marginBottom: 10,
    minHeight: 120,
  },
  personalAdviserTextContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 8,
  },
  goToCallRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    width: "70%",
    justifyContent: "space-between",
  },
  TitleText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 13,
    color: `${Colors.grayBlack}40`,
  },
  goToCallText: {
    color: Colors.green,
    fontWeight: "bold",
    fontSize: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
  },
  beforeWeStartTextContainer: {
    color: Colors.white,
  },
});

export default Main;
