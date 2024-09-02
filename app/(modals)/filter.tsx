import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Style";
import Animated, { SlideInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const priceRangeArray = [
  { id: 1, title: "Free", icon: "cube-outline" },
  { id: 2, title: "Under $150", icon: "flower-outline" },
  { id: 3, title: "Under $250", icon: "flame-outline" },
  { id: 4, title: "Under $350", icon: "diamond-outline" },
];

const tableSizeOptions = [
  { id: 0, title: "Any" },
  { id: 1, title: "2-top" },
  { id: 2, title: "4-top" },
  { id: 3, title: "6-top" },
  { id: 4, title: "8+" },
];

const Filter = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [selectedTableSize, setSelectedTableSize] = useState<number>(0);

  const router = useRouter();

  const handleClearAll = () => {
    setSelectedCard(null);
    setSelectedTableSize(0);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.header}>Price</Text>

      {/* PRICE*/}

      <View style={styles.gridContainer}>
        {priceRangeArray.map((item) => (
          <TouchableOpacity onPress={() => setSelectedCard(item.id)}>
            <View style={styles.gridItem} key={item.id}>
              <View
                style={[
                  styles.card,
                  selectedCard === item.id
                    ? {
                        borderColor: Colors.black,
                        borderWidth: 1,
                        backgroundColor: Colors.veryLightGray,
                      }
                    : { borderColor: Colors.lightGray, borderWidth: 1 },
                ]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flex: 1, gap: 30 }}>
                    {/* @ts-ignore */}
                    <Ionicons name={item.icon} size={28} color="black" />
                    <Text
                      style={{
                        fontFamily: "mon-sb",
                        fontSize: 16,
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.divider} />

      <Text style={styles.header}>Table size</Text>

      {/* TABLE SIZE */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sizesContainer}
      >
        {tableSizeOptions.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedTableSize(item.id);
            }}
            key={index}
          >
            <View
              style={[
                styles.tableSize,
                selectedTableSize === item.id
                  ? {
                      borderRadius: 16,
                      borderColor: Colors.black,
                      borderWidth: 1,
                      backgroundColor: Colors.black,
                    }
                  : { borderColor: Colors.lightGray, borderWidth: 1 },
              ]}
            >
              <Text
                style={
                  selectedTableSize === item.id
                    ? { color: Colors.white }
                    : { color: Colors.black }
                }
              >
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
            style={[styles.btn, { paddingHorizontal: 24 }]}
            onPress={() => router.back()}
          >
            <Text style={defaultStyles.btnText}>Filter results</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontFamily: "mon-sb",
    fontSize: 24,
    marginLeft: 5,
    paddingTop: 26,
    paddingHorizontal: 24,
  },
  gridContainer: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  gridItem: {
    width: (width - 42) / 2,
  },
  card: {
    backgroundColor: Colors.white,
    padding: 18,
    borderRadius: 16,
    margin: 7,
  },
  divider: {
    marginTop: 24,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.darkGray,
    marginVertical: 5,
  },
  sizesContainer: {
    flexDirection: "row",
    gap: 15,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  tableSize: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  btn: {
    backgroundColor: Colors.black,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Filter;
