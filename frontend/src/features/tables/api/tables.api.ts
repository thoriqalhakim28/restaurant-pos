import { api } from "@/lib/axios";
import type { TableListResponse } from "../types/tables.types";

export async function getTablesRequest() {
    const res = await api.get<TableListResponse>(`/table-list`);

    return res.data;
}
