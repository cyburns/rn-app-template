import { View, Text } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";

const ModalHeaderText = () => {
  const [active, setActive] = useState(0);

  return (
    <GestureHandlerRootView>
      <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
        <TouchableOpacity onPress={() => setActive(0)}>
          <Text
            style={{
              fontFamily: "mon-sb",
              fontSize: 18,
              color: active === 0 ? Colors.black : Colors.darkGray,
              textDecorationLine: active === 0 ? "underline" : "none",
            }}
          >
            Restaurants
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActive(1)}>
          <Text
            style={{
              fontFamily: "mon-sb",
              fontSize: 18,
              color: active === 1 ? Colors.black : Colors.darkGray,
              textDecorationLine: active === 1 ? "underline" : "none",
            }}
          >
            Bars
          </Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

export default ModalHeaderText;
