import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase/config';
import { Feather } from '@expo/vector-icons';
import { utcToZonedTime, format } from 'date-fns-tz';
import { uk } from 'date-fns/locale';

import { doc, setDoc, addDoc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';

const CommentsScreen = ({ route }) => {
  const { postId, postPhoto, autorPostId } = route.params;
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);

  const { userId, login, avatar } = useSelector(state => state.auth);

  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    getAllComments();
  }, []);

  const createComment = async () => {
    const date = new Date();
    const timezone = 'Europe/Kiev';
    const localDate = utcToZonedTime(date, timezone);
    const formattedDate = format(localDate, 'd MMMM, yyyy | HH:mm', {
      locale: uk,
    });

    await addDoc(collection(db, 'posts', postId, 'comments'), {
      comment,
      login,
      date: formattedDate,
      autorCommentId: userId,
      avatar,
    });
    const commentRef = doc(db, 'posts', postId);
    await setDoc(commentRef, { commentsQuantity: allComments.length + 1 }, { merge: true });
    setComment('');
    keyboardHide();
  };

  const getAllComments = async () => {
    const commentsQuery = query(collection(db, 'posts', postId, 'comments'), orderBy('date'));
    onSnapshot(commentsQuery, data =>
      setAllComments(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    );
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View>
          <View style={{ marginBottom: 32 }}>
            <Image source={{ uri: postPhoto }} style={styles.postPhoto} />
          </View>
          <FlatList
            style={{ maxHeight: screenHeight * 0.35 }}
            data={allComments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={
                  autorPostId === item.autorCommentId
                    ? styles.commentRevercedField
                    : styles.commentField
                }
              >
                <View
                  style={
                    autorPostId === item.autorCommentId ? { marginLeft: 16 } : { marginRight: 16 }
                  }
                >
                  <Image source={{ uri: item.avatar }} style={styles.authorAvatar} />
                </View>
                <View
                  style={
                    autorPostId === item.autorCommentId
                      ? { ...styles.commentWrapper, borderTopRightRadius: 0 }
                      : { ...styles.commentWrapper, borderTopLeftRadius: 0 }
                  }
                >
                  <Text style={styles.commentText} numberOfLines={3} ellipsizeMode="tail">
                    {item.comment}
                  </Text>
                  <View>
                    <Text
                      style={
                        autorPostId === item.autorCommentId
                          ? { ...styles.date, marginRight: 'auto' }
                          : { ...styles.date, marginLeft: 'auto' }
                      }
                    >
                      {item.date}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
        style={{ position: 'absolute', left: 16, right: 16, bottom: 16 }}
      >
        <View style={{ marginBottom: 16 }}>
          <TextInput
            style={styles.commentInput}
            placeholder="Коментувати..."
            placeholderTextColor="#BDBDBD"
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity style={styles.commentBtn} onPress={createComment}>
            <Feather name="arrow-up" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 32,
  },
  postPhoto: {
    width: '100%',
    height: 240,
    borderRadius: 8,
  },
  commentField: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  commentRevercedField: {
    flexDirection: 'row-reverse',
    marginBottom: 24,
  },
  authorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 100,
  },
  commentLogin: {
    marginRight: 16,
  },
  commentWrapper: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 6,
  },
  commentText: {
    marginBottom: 8,
    fontFamily: 'Roboto-Regular',
    fontStyle: 'normal',
    fontSize: 13,
    lineHeight: 18,
    color: '#212121',
    overflow: 'hidden',
  },
  date: {
    fontFamily: 'Roboto-Regular',
    fontStyle: 'normal',
    fontSize: 10,
    lineHeight: 12,
    color: '#BDBDBD',
  },
  commentInput: {
    padding: 16,
    paddingRight: 58,
    position: 'relative',
    height: 50,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderStyle: 'solid',
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
  },
  commentBtn: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: '#FF6C00',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CommentsScreen;
