const checkAuth = async () => {
    try {
        const res = await api.get("/users/me", { withCredentials: true });
        return res.data.data.user;
    } catch (err) {
        console.error(
            "JWT không hợp lệ hoặc chưa login:",
            err.response?.data.message
        );
    }
};
export default checkAuth;