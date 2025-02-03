/**
 * GET 요청 (쿼리 파라미터 포함)
 * @param {string} endpoint - API endpoint
 * @param {object} params - 요청에 필요한 쿼리 파라미터
 * @returns {Promise<object>} - 응답 데이터
 */
const getRequest = async (endpoint, params = {}) => {
    try {
        const response = await axiosInstance.get(endpoint, { params });
        console.log("data : " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error(`GET 요청 실패: ${endpoint}`, error);
        throw error;
    }
};

/**
 * POST 요청 (바디에 데이터 포함)
 * @param {string} endpoint - API endpoint
 * @param {object} data - 요청 바디에 포함될 데이터
 * @returns {Promise<object>} - 응답 데이터
 */
const postRequest = async (endpoint, data = {}) => {
    try {
        const response = await axiosInstance.post(endpoint, data);
        console.log("data : " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error(`POST 요청 실패: ${endpoint}`, error);
        throw error;
    }
};

/**
 * PUT 요청 (바디에 데이터 포함)
 * @param {string} endpoint - API endpoint
 * @param {object} data - 요청 바디에 포함될 데이터
 * @returns {Promise<object>} - 응답 데이터
 */
const putRequest = async (endpoint, data = {}) => {
    try {
        const response = await axiosInstance.put(endpoint, data);
        console.log("data : " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error(`PUT 요청 실패: ${endpoint}`, error);
        throw error;
    }
};

/**
 * DELETE 요청 (쿼리 파라미터 포함)
 * @param {string} endpoint - API endpoint
 * @param {object} params - 요청에 필요한 쿼리 파라미터
 * @returns {Promise<object>} - 응답 데이터
 */
const deleteRequest = async (endpoint, params = {}) => {
    try {
        const response = await axiosInstance.delete(endpoint, { params });
        console.log("data : " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error(`DELETE 요청 실패: ${endpoint}`, error);
        throw error;
    }
};

