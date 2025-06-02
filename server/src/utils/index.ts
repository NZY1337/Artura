export * from "./costs";

export const createStorageUrl = (userId: string): string => {
    return `${userId}/generated-${userId}-${Date.now()}.png`;
}