import { View } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import ListingData from "@/constants/data/fake-listings.json";
import ListingDataGeo from "@/constants/data/fake-listings.geo.json";
import ListingMap from "@/components/ListingMap";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Page = () => {
  const [category, setCatagory] = useState("Trending");
  const items = useMemo(() => ListingData as any, []);
  const onDataChanged = (category: string) => {
    setCatagory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <GestureHandlerRootView style={{ flex: 1, borderRadius: 30 }}>
        <ListingMap listings={ListingDataGeo} />
        <ListingsBottomSheet listings={items} category={category} />
      </GestureHandlerRootView>
    </View>
  );
};

export default Page;
