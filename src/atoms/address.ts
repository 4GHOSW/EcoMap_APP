import {atom} from 'recoil';

export const currentAddressState = atom<string>({
  key: 'currentAddressState',
  default: '현재 위치 가져오는 중...',
});

export const endLocationAddressState = atom<string>({
  key: 'endLocationAddressState',
  default: '',
});
