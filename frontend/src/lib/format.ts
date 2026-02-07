export const formatCurrencyIDR = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(price);
};
