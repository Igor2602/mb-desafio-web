import request from '@/services/plugins/request';

export default {
  async getHome(payload, success, error, done) {
    return await request(
      {
        method: 'get',
        url: `${process.env.VITE__BASE_PATH_EXAMPLE}/api/v1/cadastro`,
      },
      success,
      error,
      done
    );
  },

  async postHome(payload, success, error, done) {
    return await request(
      {
        method: 'post',
        url: `${process.env.VITE__BASE_PATH_EXAMPLE}/api/v1/cadastro`,
        body: payload,
      },
      success,
      error,
      done
    );
  },
};
