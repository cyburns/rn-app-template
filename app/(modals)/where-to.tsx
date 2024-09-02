import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { defaultStyles } from "@/constants/Style";
import Animated, {
  FadeIn,
  SlideInDown,
  FadeOut,
} from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { whereToPlaces } from "@/constants/data/data";
import { TextInput } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
// @ts-ignore
import DatePicker from "react-native-modern-datepicker";

const today = new Date().toISOString().substring(0, 10);
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const guestGroups = [
  {
    name: "Adults",
    text: "Ages 13 or above",
    count: 0,
  },
  {
    name: "Children",
    text: "Ages 2-12",
    count: 0,
  },
  {
    name: "Infants",
    text: "Under 2",
    count: 0,
  },
];

const Where = () => {
  const [openCard, setOpenCard] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0);
  const [groups, setGroups] = useState(guestGroups);

  const [selectedCityTitle, setSelectedCityTitle] = useState("Any city");
  const [selectedDate, setSelectedDate] = useState("Any day");
  const [selectedGroupSize, setSelectedGroupSize] = useState<number>(0);

  const router = useRouter();

  const handleClearAll = () => {
    setSelectedPlace(0);
    setGroups(guestGroups.map((item) => ({ ...item, count: 0 })));
    setSelectedCityTitle("Any city");
    setSelectedDate("Any day");
    setSelectedGroupSize(0);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BlurView intensity={70} tint="light" style={styles.container}>
        {/* Where */}
        <View style={styles.card}>
          {openCard != 0 && (
            <AnimatedTouchableOpacity
              onPress={() => {
                Haptics.ImpactFeedbackStyle.Light;
                setOpenCard(0);
              }}
              style={styles.cardPreview}
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(200)}
            >
              <Text style={styles.previewText}>Where</Text>
              <Text style={styles.previewdData}>{selectedCityTitle}</Text>
            </AnimatedTouchableOpacity>
          )}

          {openCard == 0 && <Text style={styles.cardHeader}>Where to?</Text>}
          {openCard == 0 && (
            <>
              <Animated.View
                entering={FadeIn.duration(10)}
                exiting={FadeOut.duration(10)}
                style={styles.cardBody}
              >
                <View style={styles.searchSection}>
                  <Ionicons
                    style={styles.searchIcon}
                    name="search"
                    size={20}
                    color={Colors.darkGray}
                  />
                  <TextInput
                    style={styles.inputField}
                    placeholder="Search destinations"
                    placeholderTextColor={Colors.darkGray}
                  />
                </View>
              </Animated.View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.placesContainer}
              >
                {whereToPlaces.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedPlace(index);
                      setSelectedCityTitle(item.title);
                    }}
                    key={index}
                  >
                    <Image
                      source={require("../../assets/images/boston-where-to.png")}
                      style={
                        selectedPlace == index
                          ? styles.placeSelected
                          : styles.place
                      }
                    />
                    <Text
                      style={[
                        { paddingTop: 6 },
                        selectedPlace === index
                          ? { fontFamily: "mon-sb" }
                          : { fontFamily: "mon" },
                      ]}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}
        </View>

        {/* When */}
        <View style={styles.card}>
          {openCard != 1 && (
            <AnimatedTouchableOpacity
              onPress={() => {
                Haptics.ImpactFeedbackStyle.Light;
                setOpenCard(1);
              }}
              style={styles.cardPreview}
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(200)}
            >
              <Text style={styles.previewText}>When</Text>
              <Text style={styles.previewdData}>{selectedDate}</Text>
            </AnimatedTouchableOpacity>
          )}

          {openCard == 1 && (
            <Text style={styles.cardHeader}>When's your dinner?</Text>
          )}

          {openCard == 1 && (
            <Animated.View style={styles.cardBody}>
              <DatePicker
                onSelectedChange={(date: string): string | void =>
                  setSelectedDate(date)
                }
                options={{
                  defaultFont: "mon",
                  headerFont: "mon-sb",
                  mainColor: Colors.primary,
                  borderColor: "transparent",
                }}
                current={today}
                selected={today}
                mode={"calendar"}
              />
            </Animated.View>
          )}
        </View>

        {/* Who */}
        <View style={styles.card}>
          {openCard != 2 && (
            <AnimatedTouchableOpacity
              onPress={() => {
                Haptics.ImpactFeedbackStyle.Light;
                setOpenCard(2);
              }}
              style={styles.cardPreview}
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(200)}
            >
              <Text style={styles.previewText}>Who</Text>
              <Text style={styles.previewdData}>
                {selectedGroupSize > 0 ? selectedGroupSize : "Add"} guests
              </Text>
            </AnimatedTouchableOpacity>
          )}

          {openCard == 2 && (
            <Text style={styles.cardHeader}>Who's coming?</Text>
          )}

          {openCard == 2 && (
            <Animated.View style={styles.cardBody}>
              {groups.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.guestItem,
                    index + 1 < guestGroups.length ? styles.itemBorder : null,
                  ]}
                >
                  <View>
                    <Text style={{ fontFamily: "mon-sb", fontSize: 14 }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "mon",
                        fontSize: 14,
                        color: Colors.darkGray,
                      }}
                    >
                      {item.text}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        const newGroups = [...groups];

                        newGroups[index].count =
                          newGroups[index].count > 0
                            ? newGroups[index].count - 1
                            : 0;

                        setGroups(newGroups);

                        setSelectedGroupSize(
                          selectedGroupSize > 1 ? selectedGroupSize - 1 : 0
                        );
                      }}
                    >
                      <Ionicons
                        name="remove-circle-outline"
                        size={26}
                        color={
                          groups[index].count > 0
                            ? Colors.darkGray
                            : Colors.lightGray
                        }
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontFamily: "mon",
                        fontSize: 16,
                        minWidth: 18,
                        textAlign: "center",
                      }}
                    >
                      {item.count}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        const newGroups = [...groups];
                        newGroups[index].count++;
                        setGroups(newGroups);
                        setSelectedGroupSize(selectedGroupSize + 1);
                      }}
                    >
                      <Ionicons
                        name="add-circle-outline"
                        size={26}
                        color={Colors.darkGray}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </Animated.View>
          )}
        </View>

        {/* FOOTER */}
        <Animated.View style={defaultStyles.footer} entering={SlideInDown}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={handleClearAll}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "mon-sb",
                  textDecorationLine: "underline",
                }}
              >
                Clear all
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
              onPress={() => router.back()}
            >
              <Ionicons
                name="search-outline"
                size={24}
                style={defaultStyles.btnIcon}
                color={Colors.white}
              />
              <Text style={defaultStyles.btnText}>Search</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </BlurView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    margin: 14,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20,
  },
  cardHeader: {
    fontFamily: "mon-b",
    fontSize: 24,
    paddingTop: 20,
    paddingLeft: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
  },
  cardPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  searchSection: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.darkGray,
    borderRadius: 8,
    marginBottom: 8,
  },
  searchIcon: {
    padding: 10,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white,
  },
  placesContainer: {
    flexDirection: "row",
    gap: 25,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  place: {
    borderColor: Colors.lightGray,
    borderWidth: 2,
    borderRadius: 10,
    width: 120,
    height: 120,
  },
  placeSelected: {
    borderColor: Colors.darkGray,
    borderWidth: 2,
    borderRadius: 10,
    width: 120,
    height: 120,
  },
  previewText: {
    fontFamily: "mon-sb",
    fontSize: 14,
    color: Colors.darkGray,
  },
  previewdData: {
    fontFamily: "mon-sb",
    fontSize: 14,
    color: Colors.darkGray,
  },
  guestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.darkGray,
  },
});

export default Where;
