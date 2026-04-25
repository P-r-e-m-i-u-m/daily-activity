// Auto-generated type definitions - 2026-04-25
// Build: 1777140740
export interface ApiResponse<T> { data: T; status: number; message: string; timestamp: string; }
export interface PaginatedResponse<T> { items: T[]; total: number; page: number; hasMore: boolean; }
export interface ErrorResponse { code: string; message: string; details?: unknown; requestId: string; }
export type RequestStatus = "pending" | "processing" | "completed" | "failed" | "cancelled";
export type UserRole = "admin" | "moderator" | "user" | "guest";
export type LogLevel = "error" | "warn" | "info" | "http" | "debug";
