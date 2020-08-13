import axios from 'axios';

const DEFAULT_SIZE = 50;
const DEFAULT_SORTEDBY = 'id';
const DEFAULT_DIRECTION = 'desc';

export const getAllCurrentPosts = async (page, accessToken) => {
  console.log('page :' + page, 'accessToken :' + accessToken);
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
        `sortedBy=${DEFAULT_SORTEDBY}&` +
        `direction=${DEFAULT_DIRECTION}&` +
        `areaIds=&` +
        `sectorIds=`,
      config,
    )
    .catch((error) => {
      alert(`최근 글을 가져올 수 없습니다! error : ${error}`);
    });
  return response.data.content;
};
