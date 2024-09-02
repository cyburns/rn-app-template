import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { defaultStyles } from "@/constants/Style";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState(false);

  // Load user data on mount
  useEffect(() => {
    if (!user) {
      return;
    }

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);
  }, [user]);

  // Update Clerk user data
  const onSaveUser = async () => {
    try {
      await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setEdit(false);
    }
  };

  // Capture image from camera roll
  // Upload to Clerk as avatar
  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  };

  return (
    <GestureHandlerRootView style={defaultStyles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>

          {edit ? (
            <TouchableOpacity onPress={onSaveUser}>
              <Ionicons
                name="checkmark-outline"
                size={24}
                color={Colors.black}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setEdit(true)}>
              <Text style={styles.editText}>{isSignedIn && "Edit"}</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "mon-sb",
              fontSize: 18,
              marginBottom: 8,
              color: Colors.darkGray,
            }}
          >
            Log in to start buying and selling.
          </Text>
        </View>

        {user && (
          <View style={styles.profile}>
            <TouchableOpacity onPress={onCaptureImage}>
              <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", gap: 6 }}>
              {!edit && (
                <View style={styles.editRow}>
                  <Text style={{ fontFamily: "mon-sb", fontSize: 28 }}>
                    Hi, I'm {firstName}
                  </Text>
                </View>
              )}
              {edit && (
                <View style={styles.editRow}>
                  <TextInput
                    placeholder="First Name"
                    value={firstName || ""}
                    onChangeText={setFirstName}
                    style={[defaultStyles.inputField, { width: 100 }]}
                  />
                  <TextInput
                    placeholder="Last Name"
                    value={lastName || ""}
                    onChangeText={setLastName}
                    style={[defaultStyles.inputField, { width: 100 }]}
                  />
                </View>
              )}
            </View>
            <Text style={{ color: Colors.darkGray, marginBottom: 10 }}>
              Joined on {user?.createdAt!.toLocaleDateString()}
            </Text>

            <View style={styles.divider} />
          </View>
        )}

        <View>
          {user && (
            <>
              <Text
                style={{
                  fontFamily: "mon-sb",
                  fontSize: 28,
                  marginLeft: 24,
                  marginBottom: 8,
                }}
              >
                About
              </Text>
              <Text
                style={{
                  color: Colors.darkGray,
                  marginLeft: 24,
                  marginBottom: 24,
                }}
              >
                {email}
              </Text>
            </>
          )}
          <View style={styles.card}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "mon-sb",
                    fontSize: 18,
                    marginBottom: 8,
                  }}
                >
                  Sell your reservations
                </Text>
                <Text style={{ color: Colors.darkGray }}>
                  List your reservations and {"\n"}start earning.
                </Text>
              </View>
              <Image
                source={require("../../assets/images/rest-rend.png")}
                style={styles.image}
              />
            </View>
          </View>
        </View>

        {user && (
          <View style={{ padding: 24 }}>
            <View style={styles.divider} />
          </View>
        )}

        {isSignedIn && (
          <TouchableOpacity style={styles.btnOutline} onPress={() => signOut()}>
            <Text style={styles.btnOutlineText}>Log out</Text>
          </TouchableOpacity>
        )}

        {!isSignedIn && (
          <Link href={"/(modals)/login"} asChild>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Log in</Text>
            </TouchableOpacity>
          </Link>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 24,
  },
  container: {
    padding: 5,
  },
  header: {
    fontFamily: "mon-sb",
    fontSize: 32,
  },
  profile: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    gap: 14,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 16,
    marginHorizontal: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    gap: 14,
    marginBottom: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.darkGray,
  },
  editRow: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
  },
  editText: {
    fontSize: 18,
    paddingTop: 8,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: Colors.black,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.darkGray,
    marginVertical: 5,
  },
  btn: {
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 24,
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "mon-b",
  },
  image: {
    height: 100,
    width: 100,
  },
  btnOutline: {
    marginLeft: 24,
    width: "40%",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.darkGray,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: Colors.black,
    fontSize: 16,
  },
});

export default Profile;
