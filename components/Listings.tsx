import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { defaultStyles } from "@/constants/Style";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";

interface Props {
  listings: any[];
  category: string;
  refresh: number;
}

const Listings = ({ listings, category, refresh }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<BottomSheetFlatListMethods>(null);

  //this may now be proper behavior but it fixes an issue for now
  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [refresh]);

  // Use for "updating" the views data after category changed
  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [category]);

  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
      >
        <Animated.View
          style={styles.listing}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          <Image
            source={require("../assets/images/boston-chops-img.png")}
            style={styles.image}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 30,
              top: 30,
            }}
          >
            <Ionicons name="heart-outline" size={24} color={Colors.white} />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: "mon-sb",
                fontSize: 16,
              }}
            >
              {item.name}
            </Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Ionicons name={"star"} size={16} />
              <Text style={{ fontFamily: "mon-sb" }}>{item.review_score}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={{ fontFamily: "mon-sb", color: Colors.darkGray }}>
              {item.city}, {item.state}
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={{ fontFamily: "mon-sb", color: Colors.darkGray }}>
              {item.reservation_date}
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={{ fontFamily: "mon-sb", color: Colors.darkGray }}>
              {item.table_size}
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={defaultStyles.container}>
      <BottomSheetFlatList
        renderItem={renderRow}
        ref={listRef}
        data={isLoading ? [] : listings}
        ListHeaderComponent={
          <Text style={styles.info}>{listings.length} Reservations</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 5,
    marginVertical: 16,
  },
  image: {
    width: "100%",
    height: 350,
    borderRadius: 30,
    marginBottom: 16,
  },
  info: {
    textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 16,
    marginTop: 4,
  },
});

export default Listings;
