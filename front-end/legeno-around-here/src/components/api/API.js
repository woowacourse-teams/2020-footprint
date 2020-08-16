import axios from 'axios';

const DEFAULT_SIZE = 50;
const DEFAULT_SORTED_BY = 'id';
const DEFAULT_DIRECTION = 'desc';

export const getAllCurrentPosts = async (mainAreaId, page, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  const response = await axios
    .get(
      `http://localhost:8080/posts?` +
        `page=${page}&` +
        `size=${DEFAULT_SIZE}&` +
        `sortedBy=${DEFAULT_SORTED_BY}&` +
        `direction=${DEFAULT_DIRECTION}&` +
        `areaIds=${mainAreaId}&` +
        `sectorIds=`,
      config,
    )
    .catch((error) => {
      console.log(`최근 글을 가져올 수 없습니다! error : ${error}`);
      document.location.href = '/login';
    });
  return response.data.content;
};

export const getAllAreas = async (page, accessToken, keyword) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  const response = await axios
    .get(
      `http://localhost:8080/areas?` +
        `page=${page}&` +
        `size=${DEFAULT_SIZE}&` +
        `sortedBy=${DEFAULT_SORTED_BY}&` +
        `direction=${DEFAULT_DIRECTION}&` +
        `keyword=${keyword}`,
      config,
    )
    .catch(() => {
      alert(`해당하는 지역이 없습니다!`);
    });
  return response.data.content;
};
