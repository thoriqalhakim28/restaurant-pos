export type TableStatus = "available" | "occupied" | "reserved" | "inactive";

export interface Table {
    id: number;
    table_number: number;
    status: TableStatus;
    created_at: string;
    updated_at: string;
}

export interface TableListResponse {
    success: boolean;
    message: string;
    data: Table[];
}
