import { type ImagesResponse, ImageEditParams } from "openai/resources/images";

export interface ImageCostDetails {
  imageCost: number;
  tokenCost: number;
  totalCost: number;
}

export interface ImageProps {
  id: string;
  projectId: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ImageGenerationResponseProps
  extends ImagesResponse,
    ImageEditParams,
    ImageCostDetails {}
