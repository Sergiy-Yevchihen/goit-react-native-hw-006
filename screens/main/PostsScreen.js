import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native';

import MapScreen from '../nestedScreens/MapScreen';
import CommentsScreen from '../nestedScreens/CommentsScreen';
import DefaultPostsScreen from '../nestedScreens/DefaultPostsScreen';
import { Feather } from '@expo/vector-icons';
import { authSignOutUser } from '../../redux/auth/authOperation';

const NestedScreen = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{
          headerTitle: 'Публікації',
          headerTitleAlign: 'center',
          headerStyle: {
            height: 88,
            backgroundColor: '#FFFFFF',
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowOffset: { width: 0, height: 0.5 },
            shadowRadius: 1.35914,
          },
          headerTitleStyle: {
            fontFamily: 'Roboto-Medium',
            fontStyle: 'normal',
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.408,
          },
          headerTintColor: '#212121',
          headerLeft: null,
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 19 }} onPress={signOut}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
        name="DefaultPosts"
        component={DefaultPostsScreen}
      />
      <NestedScreen.Screen
        options={{
          headerTitle: 'Карта',
          headerTitleAlign: 'center',
          headerStyle: {
            height: 88,
            backgroundColor: '#FFFFFF',
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowOffset: { width: 0, height: 0.5 },
            shadowRadius: 1.35914,
          },
          headerTitleStyle: {
            fontFamily: 'Roboto-Medium',
            fontStyle: 'normal',
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.408,
          },
          headerTintColor: '#212121',
        }}
        name="Map"
        component={MapScreen}
      />
      <NestedScreen.Screen
        options={{
          headerTitle: 'Коментарі',
          headerTitleAlign: 'center',
          headerStyle: {
            height: 88,
            backgroundColor: '#FFFFFF',
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowOffset: { width: 0, height: 0.5 },
            shadowRadius: 1.35914,
          },
          headerTitleStyle: {
            fontFamily: 'Roboto-Medium',
            fontStyle: 'normal',
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.408,
          },
          headerTintColor: '#212121',
        }}
        name="Comments"
        component={CommentsScreen}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
