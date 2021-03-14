import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
// ICONS
import Icon_FontAwesome from 'react-native-vector-icons/FontAwesome';
// STYLE GUIDE
import {STYLE_COLOR} from '~/util/StyleGuide';

const ItemBookmarkTag = ({bookmark, toggleBookmark}) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmark);
  const handleToggle = () => {
    setIsBookmarked(!isBookmarked);
    toggleBookmark();
  };
  return (
    <TouchableOpacity
      onPress={() => handleToggle()}
      style={styles.bookmark_btn}>
      {isBookmarked ? (
        <Icon_FontAwesome
          style={[styles.bookmark_btn__icon, styles.bookmark_btn__icon_on]}
          name="bookmark"
        />
      ) : (
        <Icon_FontAwesome
          style={[styles.bookmark_btn__icon, styles.bookmark_btn__icon_off]}
          name="bookmark-o"
        />
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  bookmark_btn: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bookmark_btn__icon: {
    fontSize: 30,
  },
  bookmark_btn__icon_on: {
    color: STYLE_COLOR.PRIMARY,
  },
  bookmark_btn__icon_off: {
    color: STYLE_COLOR.DEFAULT,
  },
});

export default ItemBookmarkTag;
