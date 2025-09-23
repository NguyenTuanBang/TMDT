const formatCurrency = (num) => {
    if (!num && num !== 0) return "";
    return num.toLocaleString("vi-VN");
};
export default formatCurrency;