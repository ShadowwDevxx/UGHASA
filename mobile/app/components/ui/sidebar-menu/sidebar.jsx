import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SidebarMenu = () => {
  const [activeItem, setActiveItem] = useState('Home');

  const handleMenuItemPress = (itemName) => {
    setActiveItem(itemName);
    // Perform any additional actions based on the selected menu item
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeItem === 'Home' && styles.activeMenuItem,
        ]}
        onPress={() => handleMenuItemPress('Home')}
      >
        <Text style={styles.menuItemText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeItem === 'Profile' && styles.activeMenuItem,
        ]}
        onPress={() => handleMenuItemPress('Profile')}
      >
        <Text style={styles.menuItemText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeItem === 'Settings' && styles.activeMenuItem,
        ]}
        onPress={() => handleMenuItemPress('Settings')}
      >
        <Text style={styles.menuItemText}>Settings</Text>
      </TouchableOpacity>
      {/* Add more menu items as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  menuItem: {
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  activeMenuItem: {
    backgroundColor: '#ddd',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SidebarMenu;
