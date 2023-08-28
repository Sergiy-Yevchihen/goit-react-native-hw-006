import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { Camera } from 'expo-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { storage, db } from '../../firebase/config';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { useSelector } from 'react-redux';

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState('');
  const [location, setLocation] = useState(null);
  const [titlePhoto, setTitlePhoto] = useState('');
  const [place, setPlace] = useState('');

  const { userId, login, avatar } = useSelector(state => state.auth);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    await MediaLibrary.createAssetAsync(photo.uri);
    setPhoto(photo.uri);
  };

  const sendPhoto = async () => {
    uploadPostToServer();
    navigation.navigate('DefaultPosts');
    setPhoto('');
    setTitlePhoto('');
    setLocation('');
    setPlace('');
  };

  const deletePhoto = () => {
    setPhoto('');
    setTitlePhoto('');
    setLocation('');
    setPlace('');
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const createdDate = Date.now();

    await addDoc(collection(db, `posts`), {
      photo,
      titlePhoto,
      location,
      place,
      userId,
      login,
      avatar,
      createdDate,
      likes: 0,
    });
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Доступ до камери не наданий!</Text>;
  }

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    const imageRef = ref(storage, `postImage/${uniquePostId}`);
    await uploadBytes(imageRef, file);
    const processedPhoto = await getDownloadURL(imageRef);
    return processedPhoto;
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} ref={setCamera}>
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                style={{ width: '100%', height: 240, borderRadius: 8 }}
                source={{ uri: photo }}
              />
            </View>
          )}
          <TouchableOpacity onPress={takePhoto} style={styles.cameraBtn}>
            <FontAwesome name="camera" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </Camera>
      </View>
      <Text style={styles.photoText}>{photo ? 'Редагувати фото' : 'Завантажте фото'}</Text>
      <TextInput
        style={{ ...styles.input, marginBottom: 16 }}
        placeholder="Назва..."
        placeholderTextColor="#BDBDBD"
        value={titlePhoto}
        onChangeText={setTitlePhoto}
      />
      <View style={{ marginBottom: 32, position: 'relative' }}>
        <TextInput
          style={{ ...styles.input, paddingLeft: 24 }}
          placeholder="Місцевість..."
          placeholderTextColor="#BDBDBD"
          value={place}
          onChangeText={setPlace}
        />
        <Feather
          name="map-pin"
          size={20}
          color="#BDBDBD"
          style={{ position: 'absolute', bottom: 13 }}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={sendPhoto}
          activeOpacity={0.8}
          style={photo ? { ...styles.sendBtn, backgroundColor: '#FF6C00' } : styles.sendBtn}
        >
          <Text style={photo ? { ...styles.btnTitle, color: '#FFFFFF' } : styles.btnTitle}>
            Опубліковати
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={deletePhoto} style={styles.deleteBtn}>
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  cameraContainer: {
    position: 'relative',
    marginTop: 32,
    marginBottom: 8,
    height: 240,
    overflow: 'hidden',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E8E8E8',
    borderRadius: 8,
  },
  camera: {
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraBtn: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoText: {
    marginBottom: 32,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    height: 49,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#E8E8E8',
    borderStyle: 'solid',
    backgroundColor: '#FFFFFF',
  },
  takePhotoContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  sendBtn: {
    marginBottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 51,
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
  },
  btnTitle: {
    fontFamily: 'Roboto-Regular',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  deleteBtn: {
    marginBottom: 34,
    width: 70,
    height: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
  },
});

export default CreatePostsScreen;
