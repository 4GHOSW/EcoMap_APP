import EncryptedStorage from 'react-native-encrypted-storage';
import {atom} from 'recoil';

export interface SearchHistory {
  id: string;
  name: string;
  address: string;
  distance: string;
  path: string;
  latitude: number;
  longitude: number;
}

export const searchHistoryState = atom<SearchHistory[]>({
  key: 'searchHistoryState',
  default: [],
  effects: [
    ({setSelf, onSet}) => {
      // 앱 시작시 저장된 검색 기록 불러오기
      const loadSearchHistory = async () => {
        try {
          const savedHistory = await EncryptedStorage.getItem('searchHistory');
          if (savedHistory) {
            setSelf(JSON.parse(savedHistory));
          }
        } catch (error) {
          console.error('Failed to load search history:', error);
        }
      };

      loadSearchHistory();

      // 검색 기록이 변경될 때마다 저장
      onSet((newValue, _) => {
        EncryptedStorage.setItem(
          'searchHistory',
          JSON.stringify(newValue),
        ).catch(error => {
          console.error('Failed to save search history:', error);
        });
      });
    },
  ],
});
