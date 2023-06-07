import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Sidebar = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#fffff'}}>
        <View 
          style={{padding: 20, paddingBottom: 20, display: "flex", flexDirection: "column"}}>
           <View style={{backgroundColor:"black", width:90, height: 90, borderRadius: 1000}}></View>
          <Text className="text-[#103375] text-xl font-semibold pt-3">
            John Doe
          </Text>
          <Text className="text-[#103375] text-sm pt-3">
             john.joe@sts.edu.gh
          </Text>

        </View>
        <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 20}}>
          <View className="flex flex-row items-center gap-4">
            <Ionicons name="folder-outline" style={{color: "#133B8A"}} size={30} />
            <Text
              style={{
                color: "#103375",
                fontSize: 15,
              }}>
              Resources
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 20}}>
          <View className="flex flex-row items-center gap-4">
            <Ionicons name="calendar-outline" style={{color: "#133B8A"}} size={30} />
            <Text
              style={{
                color: "#103375",
                fontSize: 15,
              }}>
              Events
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 20}}>
          <View className="flex flex-row items-center gap-4">
            <Ionicons name="briefcase-outline" style={{color: "#133B8A"}} size={30} />
            <Text
              style={{
                color: "#103375",
                fontSize: 15,
              }}>
              Opportunities
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 20}}>
          <View className="flex flex-row items-center gap-4">
            <Ionicons name="mail-open-outline" style={{color: "#133B8A"}} size={30} />
            <Text
              style={{
                color: "#103375",
                fontSize: 15,
              }}>
              Polls & Elections
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      </DrawerContentScrollView>
      
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 20}}>
          <View className="flex flex-row items-center gap-4">
            <Ionicons name="settings-outline" style={{color: "#133B8A"}} size={30} />
            <Text
              style={{
                color: "#103375",
                fontSize: 15,
              }}>
              Settings
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 20}}>
          <View className="flex flex-row items-center gap-4">
            <Ionicons name="help-circle-outline" style={{color: "#133B8A"}} size={30} />
            <Text
              style={{
                color: "#103375",
                fontSize: 15,
              }}>
              Help
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 20}}>
          <View className="flex flex-row items-center gap-4">
            <Ionicons name="exit-outline" style={{color: "#133B8A"}} size={30} />
            <Text
              style={{
                color: "#103375",
                fontSize: 15,
              }}>
                Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sidebar;