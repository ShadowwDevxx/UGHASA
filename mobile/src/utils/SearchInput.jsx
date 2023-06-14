import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { set } from "react-native-reanimated";

const SearchInput = ({ searchQuery, setQuery }) => {
  // const [isClicked, setClicked] = useState(false);
  return (
    <View className="flex items-center">
      <View className="w-full">
        <View className="w-full p-3 bg-gray-100 border-gray-300 rounded-full flex flex-row items-center">
          <MaterialIcons
            style={{
              paddingRight: 10,
            }}
            name="search"
            size={24}
            color="grey"
          />
          <TextInput
            returnKeyType="search"
            className="flex-1 px-3"
            placeholder="Search"
            value={searchQuery}
            onChangeText={text => setQuery(text)}
          />
          {searchQuery && (
            <TouchableOpacity
              onPress={() => {
                setQuery("");
              }}
            >
              <MaterialIcons
                style={{
                  paddingRight: 10,
                }}
                name="cancel"
                size={24}
                color="grey"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* <TouchableOpacity> <Text>Search</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({});
