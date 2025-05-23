import { type ReactNode } from "react";

export interface CarouselProps {
    children: ReactNode;
    settings: Record<string, any>;
}