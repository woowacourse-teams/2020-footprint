import axios from 'axios';
import { setAccessTokenCookie } from '../../util/TokenUtils';

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_NO_CONTENT = 204;

const DIRECTION_ASC = 'asc';

const DEFAULT_SIZE = 10;
const DEFAULT_SORTED_BY = 'id';
const DEFAULT_DIRECTION = 'desc';
const DEFAULT_URL = 'https://back.capzzang.co.kr';

export const loginUser = (email, password, handleReset) => {
  axios
    .post(DEFAULT_URL + '/login', {
      email,
      password,
    })
    .then(async (response) => {
      const tokenResponse = await response.data;
      setAccessTokenCookie(tokenResponse.accessToken);
      document.location.href = '/home';
    })
    .catch((error) => {
      handleReset();
    });
};

export const savePostImages = async (formData, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  try {
    return await axios.post(DEFAULT_URL + '/posts/images', formData, config).then((response) => {
      if (response.status === HTTP_STATUS_CREATED) {
        return response;
      }
    });
  } catch (error) {
    redirectLoginWhenUnauthorized(error);
  }
};

export const createPost = async (postData, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  try {
    const response = await axios.post(DEFAULT_URL + '/posts', postData, config);
    if (response.status === HTTP_STATUS_CREATED) {
      document.location.href = response.headers.location;
    }
  } catch (error) {
    redirectLoginWhenUnauthorized(error);
  }
};

export const createPostReport = async (postId, data, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  try {
    const response = await axios.post(DEFAULT_URL + '/post-reports', data, config);
    if (response.status === HTTP_STATUS_CREATED) {
    }
  } catch (error) {
    redirectLoginWhenUnauthorized(error);
  }
};

export const updatePost = async (postId, postUpdateData, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  try {
    const response = await axios.put(DEFAULT_URL + `/posts/${postId}`, postUpdateData, config);
    if (response.status === HTTP_STATUS_OK) {
      document.location.href = `/posts/${postId}`;
    }
  } catch (error) {
    redirectLoginWhenUnauthorized(error);
  }
};

export const createUser = (email, nickname, password, authNumber, handleReset) => {
  axios
    .post(DEFAULT_URL + '/join', {
      email,
      nickname,
      password,
      authNumber,
    })
    .then((response) => {
      alert('회원가입을 축하드립니다.');
      document.location.href = '/login';
    })
    .catch((error) => {
      alert('회원가입에 실패하였습니다.');
      handleReset();
    });
};

export const checkJoined = (email) => {
  axios
    .get(DEFAULT_URL + `/check-joined?email=${email}`)
    .then((response) => {
      alert('사용 가능한 이메일입니다.');
    })
    .catch((error) => {});
};

export const sendAuthMail = (email, setIsEmailDisabled, setMailAuthToggle, setIsMailSent) => {
  axios
    .post(DEFAULT_URL + '/mail-auth/send', {
      email,
    })
    .then((response) => {
      alert('인증 메일을 전송했습니다.');
      setIsEmailDisabled(true);
      setMailAuthToggle('인증 번호 확인');
      setIsMailSent(true);
    })
    .catch((error) => {
      alert('인증 메일 발송 실패하였습니다.');
    });
};

export const checkAuthNumber = (email, authNumber, setIsAuthNumberDisabled) => {
  axios
    .post(DEFAULT_URL + '/mail-auth/check', {
      email,
      authNumber,
    })
    .then((response) => {
      alert('인증되었습니다.');
      setIsAuthNumberDisabled(true);
    })
    .catch((error) => {
      alert('인증번호를 확인해주세요.');
    });
};
export const saveProfilePhoto = async (formData, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  try {
    const response = await axios.post(DEFAULT_URL + '/users/images', formData, config);
    if (response.status === HTTP_STATUS_CREATED) {
      return response.data;
    }
  } catch (error) {
    redirectLoginWhenUnauthorized(error);
  }
};

export const updateUser = async (nickname, imageId, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  try {
    await axios.put(
      DEFAULT_URL + '/users/me',
      {
        nickname,
        imageId,
      },
      config,
    );
    document.location.href = '/users/me';
  } catch (error) {
    redirectLoginWhenUnauthorized(error);
  }
};

export const createComment = async (postId, writing, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  try {
    const response = await axios.post(DEFAULT_URL + `/posts/${postId}/comments`, { writing }, config);
    if (response.status === HTTP_STATUS_CREATED) {
      return true;
    }
  } catch (error) {
    redirectLoginWhenUnauthorized(error);
  }
  return false;
};

export const createPendingSector = async (sector, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  try {
    const response = await axios.post(DEFAULT_URL + `/sectors`, sector, config);
    if (response.status === HTTP_STATUS_CREATED) {
      return response.data;
    }
  } catch (error) {}
};

export const pressPostZzang = async (postId, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  try {
    const response = await axios.post(DEFAULT_URL + `/posts/${postId}/zzangs`, {}, config);
    if (response.status === HTTP_STATUS_NO_CONTENT) {
      return true;
    }
  } catch (error) {
    redirectLoginWhenUnauthorized(error);
  }
  return false;
};

export const findMyInfo = (accessToken) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Auth-Token': accessToken,
    },
  };
  return axios
    .get(DEFAULT_URL + '/users/me', config)
    .then(async (response) => {
      const userResponse = await response.data;
      return userResponse;
    })
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
    });
};

export const findCurrentPostsFromPage = async (page, accessToken, mainAreaId, sectorId) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  return await axios
    .get(
      DEFAULT_URL +
        `/posts?` +
        `page=${page}&` +
        `size=${DEFAULT_SIZE}&` +
        `sortedBy=${DEFAULT_SORTED_BY}&` +
        `direction=${DEFAULT_DIRECTION}&` +
        `areaId=${mainAreaId}&` +
        `sectorIds=${sectorId}`,
      config,
    )
    .then((response) => response.data.content)
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
    });
};

export const findMyAwards = async (accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  return await axios
    .get(DEFAULT_URL + `/awards/me`, config)
    .then((response) => response.data)
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
    });
};

export const findAllOtherAwards = async (accessToken, userId) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  return await axios
    .get(DEFAULT_URL + `/users/${userId}/awards`, config)
    .then((response) => response.data)
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
    });
};

export const findMyPostsFromPage = async (mainAreaId, page, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  return await axios
    .get(
      DEFAULT_URL +
        `/posts/me?` +
        `page=${page}&` +
        `size=${DEFAULT_SIZE}&` +
        `sortedBy=${DEFAULT_SORTED_BY}&` +
        `direction=${DEFAULT_DIRECTION}&` +
        `areaId=${mainAreaId}&` +
        `sectorIds=`,
      config,
    )
    .then((response) => response.data.content)
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
    });
};

export const findOtherPostsFromPage = async (otherUserId, page, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  return await axios
    .get(
      DEFAULT_URL +
        `/users/${otherUserId}/posts?` +
        `page=${page}&` +
        `size=${DEFAULT_SIZE}&` +
        `sortedBy=${DEFAULT_SORTED_BY}&` +
        `direction=${DEFAULT_DIRECTION}`,
      config,
    )
    .then((response) => response.data.content)
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
    });
};

export const findRankedPostsFromPage = async (mainAreaId, criteria, page, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  return await axios
    .get(
      DEFAULT_URL +
        `/ranking?` +
        `page=${page}&` +
        `size=${DEFAULT_SIZE}&` +
        `sortedBy=${DEFAULT_SORTED_BY}&` +
        `direction=${DEFAULT_DIRECTION}&` +
        `criteria=${criteria}&` +
        `areaId=${mainAreaId}&` +
        `sectorIds=`,
      config,
    )
    .then((response) => response.data.content)
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
    });
};

export const findAreasFromPage = async (page, accessToken, keyword) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  return await axios
    .get(
      DEFAULT_URL +
        `/areas?` +
        `page=${page}&` +
        `size=${DEFAULT_SIZE}&` +
        `sortedBy=${DEFAULT_SORTED_BY}&` +
        `direction=${DIRECTION_ASC}&` +
        `keyword=${keyword}`,
      config,
    )
    .then((response) => {
      return response.data.content;
    })
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
      throw error.response;
    });
};

export const findAllSimpleSectors = async (accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  const response = await axios.get(DEFAULT_URL + `/sectors/simple`, config).catch((error) => {
    redirectLoginWhenUnauthorized(error);
  });
  return response.data;
};

export const findSectorsFromPage = async (page, accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  const response = await axios
    .get(
      DEFAULT_URL +
        `/sectors?` +
        `page=${page}&` +
        `size=${DEFAULT_SIZE}&` +
        `sortedBy=${DEFAULT_SORTED_BY}&` +
        `direction=${DIRECTION_ASC}`,
      config,
    )
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
    });
  return response.data.content;
};

export const findAllMySector = async (accessToken) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  return await axios
    .get(DEFAULT_URL + '/sectors/me', config)
    .then((response) => {
      if (response.status === HTTP_STATUS_OK) {
        return response.data.content;
      }
    })
    .catch((error) => {});
};

export const findPost = async (accessToken, postId) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Auth-Token': accessToken,
    },
  };
  return await axios
    .get(DEFAULT_URL + '/posts/' + postId, config)
    .then((response) => {
      if (response.status === HTTP_STATUS_OK) {
        return response.data;
      }
    })
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
      document.location.href = '/home';
    });
};

export const findCommentsByPostId = async (accessToken, postId) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Auth-Token': accessToken,
    },
  };
  return await axios
    .get(DEFAULT_URL + `/posts/${postId}/comments`, config)
    .then((response) => {
      if (response.status === HTTP_STATUS_OK) {
        return response.data;
      }
    })
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
    });
};

export const findOthersProfileById = async ({ accessToken, userId }) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Auth-Token': accessToken,
    },
  };
  return axios
    .get(DEFAULT_URL + '/users/' + userId, config)
    .then(async (response) => {
      const userResponse = await response.data;
      return userResponse;
    })
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
    });
};

export const getMyNotification = (accessToken, setNotifications) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Auth-Token': accessToken,
    },
  };
  axios
    .get(DEFAULT_URL + `/notifications/me`, config)
    .then((response) => {
      setNotifications(response.data);
    })
    .catch((error) => {});
};

export const getUnreadNotificationCount = (accessToken, setUnreadNotification) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Auth-Token': accessToken,
    },
  };
  axios
    .get(DEFAULT_URL + `/notifications/me`, config)
    .then((response) => {
      const unreadCount = response.data.filter((x) => x.isRead === false).length;
      setUnreadNotification(unreadCount);
    })
    .catch((error) => {});
};

export const readNotification = (accessToken, id) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Auth-Token': accessToken,
    },
  };
  axios
    .put(DEFAULT_URL + `/notifications/${id}/read`, null, config)
    .then((response) => {})
    .catch((error) => {});
};

export const findSector = async (accessToken, sectorId) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Auth-Token': accessToken,
    },
  };
  return await axios
    .get(DEFAULT_URL + '/sectors/' + sectorId, config)
    .then((response) => {
      if (response.status === HTTP_STATUS_OK) {
        return response.data;
      }
    })
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
      document.location.href = '/home';
    });
};

export const deletePost = (accessToken, postId) => {
  const config = {
    headers: {
      'X-Auth-Token': accessToken,
    },
  };
  axios
    .delete(DEFAULT_URL + '/posts/' + postId, config)
    .then((response) => {
      if (response.status !== HTTP_STATUS_NO_CONTENT) {
        throw new Error("올바르지 않은 응답코드 수신");
      }
      alert("자랑글이 정상적으로 삭제되었습니다!");
      document.location.href = '/home';
    })
    .catch((error) => {
      redirectLoginWhenUnauthorized(error);
      if (error.response && error.response.status !== 403) {
        alert("비정상적인 원인에 의해 글 삭제에 실패하였습니다. 사이트 운영자에게 문의해주세요..");
      }
    });
};

const redirectLoginWhenUnauthorized = (error) => {
  if (error.response && error.response.status === 403) {
    document.location.href = '/login';
  }
};
