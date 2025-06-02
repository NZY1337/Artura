export * from "./costs";

export const createStorageUrl = (userId: string, index: number): string => {
    return `${userId}/generated-${userId}-${Date.now()}-${index}.png`;
}