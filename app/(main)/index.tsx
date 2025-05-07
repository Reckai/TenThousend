import { TPost } from "@/app/api/axios/posts/types/Post";
import { RootState } from "@/app/redux/store";
import { Colors } from "@/app/utils/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

interface PostsProps {
  posts: TPost[];
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <ScrollView style={styles.postsContainer}>
      {posts.map((post) => (
        <View key={post.id} style={styles.blockContainer}>
          <View style={styles.personalAdviserContainer}>
            <View style={styles.personalAdviserTextContainer}>
              <Text style={styles.TitleText}>{post.title}</Text>
              <Text style={styles.descriptionText}>{post.body}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const Main = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();

  // Example posts data - replace this with your actual data
  const posts: TPost[] = [
    {
      id: 1,
      userid: 1,
      title: "First Post",
      body: "This is the content of the first post",
    },
    {
      id: 2,
      userid: 1,
      title: "Second Post",
      body: "This is the content of the second post",
    },
    {
      id: 3,
      userid: 1,
      title: "Third Post",
      body: "This is the content of the third post",
    },
    {
      id: 4,
      userid: 1,
      title: "Fourth Post",
      body: "This is the content of the fourth post",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primaryGray }}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { fontSize: 13 }]}>
          {t("profile.header")}
        </Text>
        <Text style={styles.headerText}>
          {user?.firstName ? `${user?.firstName} ${user?.lastName}` : ""}
        </Text>
      </View>

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

      <View style={styles.container}>
        <Posts posts={posts} />
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
