import SearchInput from '@/components/common/SearchInput';
import SearchRegionResult from '@/components/map/SearchRegionResult';
import useSearchLocation from '@/hooks/useSearchLocation';
import React, {useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';

function LocationStartScreen() {
  const [keyword, setKeyword] = useState('');
  const {regionInfo} = useSearchLocation(keyword);

  const handleChangeKeyword = (text: string) => {
    setKeyword(text);
  };

  return (
    <View style={styles.container}>
      <SearchInput
        autoFocus
        value={keyword}
        onChangeText={handleChangeKeyword}
        placeholder="검색할 장소를 입력하세요."
        onSubmit={() => Keyboard.dismiss()}
      />
      <SearchRegionResult regionInfo={regionInfo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default LocationStartScreen;
