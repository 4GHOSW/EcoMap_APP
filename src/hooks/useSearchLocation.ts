import axios from 'axios';
import {useEffect, useState} from 'react';

import useDebounce from './useDebounce';

type Meta = {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
  same_name: {
    region: string[];
    keyword: string;
    selected_region: string;
  };
};

export type RegionInfo = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

type RegionResponse = {
  meta: Meta;
  documents: RegionInfo[];
};

function useSearchLocation(keyword: string) {
  const [regionInfo, setRegionInfo] = useState<RegionInfo[]>([]);
  const [pageParam, setPageParam] = useState(1);

  const debouncedSearchText = useDebounce(keyword, 300);

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get<RegionResponse>(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${debouncedSearchText}&page=${pageParam}`,
          {
            headers: {
              Authorization: `KakaoAK 12fa57755c63e3490dcf2f3f35c7d9a0`,
            },
          },
        );
        setRegionInfo(data.documents);
        console.log('data', data);
      } catch (error) {
        setRegionInfo([]);
        console.log('error' + error);
      }
    })();
  }, [debouncedSearchText]);

  return {regionInfo};
}

export default useSearchLocation;
