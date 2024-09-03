import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { defaultStyles } from "@/constants/Style";
import { Link } from "expo-router";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  FadeInRight,
  FadeOutLeft,
} from "react-native-reanimated";
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
  const [pressedItem, setPressedItem] = useState<number | null>(null);
  const listRef = useRef<BottomSheetFlatListMethods>(null);

  // This may not be the intended behavior but it fixes an issue for now
  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [refresh]);

  // Use for "updating" the view's data after category change
  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [category]);

  const renderRow = ({ item, index }: { item: any; index: number }) => {
    return (
      <ListItem
        item={item}
        index={index}
        pressedItem={pressedItem}
        setPressedItem={setPressedItem}
      />
    );
  };

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

const ListItem = ({
  item,
  index,
  pressedItem,
  setPressedItem,
}: {
  item: any;
  index: number;
  pressedItem: number | null;
  setPressedItem: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const onPressIn = () => {
    setPressedItem(index);
    scale.value = withSpring(0.923, { damping: 10, stiffness: 100 });
  };

  const onPressOut = () => {
    setPressedItem(null);
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
  };

  return (
    <Link href={`/listing/${item.id}`} asChild>
      <Pressable
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Animated.View
          style={[styles.listing]}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          <Image
            source={require("../assets/images/maple-farm.jpg")}
            style={styles.image}
          />

          <View
            style={{
              position: "absolute",
              left: 33,
              top: 30,
              backgroundColor: Colors.primary,
              borderRadius: 30,
              alignSelf: "flex-start",
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 10,
              paddingHorizontal: 15,
            }}
          >
            <FontAwesome5
              name="location-arrow"
              size={16}
              color={Colors.white}
              style={{ marginRight: 5 }}
            />
            <Text
              style={{
                fontFamily: "mon-sb",
                color: Colors.white,
                fontSize: 16,
              }}
            >
              South Woods
            </Text>
          </View>

          <TouchableOpacity style={styles.bookmark}>
            <Ionicons name="bookmark-outline" size={30} color={Colors.white} />
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
              <MaterialIcons name="device-hub" size={16} />
              <Text style={{ fontFamily: "mon-sb" }}>
                {item.devices_connected} Devices
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={{ fontFamily: "mon-sb", color: Colors.darkGray }}>
              Two low vacuum pressure alerts
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={{ fontFamily: "mon-sb", color: Colors.darkGray }}>
              One high tank level alert
            </Text>
          </View>
        </Animated.View>
      </Pressable>
    </Link>
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
    height: 250,
    borderRadius: 30,
    marginBottom: 10,
  },
  info: {
    textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 16,
    marginTop: 4,
  },
  bookmark: {
    position: "absolute",
    right: 33,
    top: 33,
  },
});

export default Listings;
