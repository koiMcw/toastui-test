const BASE_URL = "http://localhost:8080";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 요청 타임아웃 (10초)
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    /*
    async (config) => {

        const accessToken = Cookies.get("accessToken");
        const refreshToken = Cookies.get("refreshToken");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        // Access Token 검증
        if (accessToken && isTokenExpired(accessToken)) {
            console.log("accessToken 만료 되었습니다. refreshToken을 이용하여 accessToken을 새로 발급합니다.");
            try {
                const newAccessToken = await refreshAccessToken(refreshToken);
                if (newAccessToken) {
                    console.log("쿠키에 새로운 Access Token이 저장되었습니다.");
                    Cookies.set("accessToken", newAccessToken, { path: "/", httpOnly: false });
                    config.headers.Authorization = `Bearer ${newAccessToken}`;
                } else {
                    handleSessionExpired();
                }
            } catch (error) {
                handleSessionExpired();
            }
        }
        return config;
    },
    (error) => Promise.reject(error);
    */
    // Token 무시, 모든 요청 허용
    async (config) => {

        // 특정 조건에서 token을 무시하도록 처리
        if (!config.headers.ignoreToken) {
            const token = localStorage.getItem('token'); // 토큰을 로컬스토리지에서 가져옴
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } else {
            // ignoreToken 헤더가 있으면 Authorization 헤더 제거
            delete config.headers.ignoreToken;
        }
        return config;
    },
    (error) => {
        // 요청 오류 처리
        return Promise.reject(error);
    }
);

// 토큰 만료 여부 검사
const isTokenExpired = (token) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
};

// Refresh Token을 사용하여 Access Token 갱신
const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await axios.post(BASE_URL + "/api/auth/refresh", {
            refreshToken,
        });
        return response.data.accessToken;
    } catch (error) {
        console.error("토큰 갱신 실패:", error);
        return null;
    }
};

// 세션 만료 처리
const handleSessionExpired = () => {
    alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    window.location.href = "/email-login";
};

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => {
        // 응답 처리 로직
        return response;
    },
    (error) => {
        // 응답 오류 처리 로직
        return Promise.reject(error);
    }
);
