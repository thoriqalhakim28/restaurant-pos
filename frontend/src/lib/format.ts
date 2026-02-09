export const formatCurrencyIDR = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(price);
};

export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export function formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}
