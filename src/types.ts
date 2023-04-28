export type Priority = "very-high" | "high" | "normal" | "low" | "very-low";

export interface Options<TData, TError = unknown> {
  onSuccess?: (data: TData) => void;
  onError?: (data: TError) => void;
}
