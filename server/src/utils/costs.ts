// import {
//   type ImagesResponse,
//   ImageEditParams,
//   Usage,
// } from "openai/resources/images";

// type TokenPricing = {
//   input: number;
//   cached: number;
//   output?: number;
// };

// type Resolution =
//   | "256x256"
//   | "512x512"
//   | "1024x1024"
//   | "1024x1536"
//   | "1535x1024"
//   | "1024x1792"
//   | "1792x1024";

// type Quality = "low" | "medium" | "high" | "standard" | "hd";

// type ImagePricing = {
//   [quality in Quality]?: {
//     [resolution in Resolution]?: number;
//   };
// };

// // pricing for GPT-image-1
// const TOTAL_TOKENS: number = 1000000; // Cost per million tokens for GPT-image-1

// // text tokens
// const TEXT_INPUT_TOKENS_PRICE: number = 5; // $5 per TOTAL_TOKENS tokens for GPT-image-1
// const TEXT_INPUT_CACHED_TOKENS_PRICE: number = 1.25; // $1.25 per TOTAL_TOKENS tokens for GPT-image-1

// // image tokens
// const IMAGE_INPUT_TOKENS_PRICE: number = 10; // $10 per TOTAL_TOKENS input tokens for GPT-image-1
// const IMAGE_CACHED_TOKENS_PRICE: number = 2.5; // $2.50 per TOTAL_TOKENS cached tokens for GPT-image-1
// const IMAGE_OUTPUT_TOKENS_PRICE: number = 40; // $40 per TOTAL_TOKENS output tokens for GPT-image-1

// const SINGLE_TOKEN_PRICE = {
//   text: {
//     input: TEXT_INPUT_TOKENS_PRICE / TOTAL_TOKENS,
//     cached: TEXT_INPUT_CACHED_TOKENS_PRICE / TOTAL_TOKENS,
//   },
//   image: {
//     input: IMAGE_INPUT_TOKENS_PRICE / TOTAL_TOKENS,
//     cached: IMAGE_CACHED_TOKENS_PRICE / TOTAL_TOKENS,
//     output: IMAGE_OUTPUT_TOKENS_PRICE / TOTAL_TOKENS,
//   },
// };

// // pricing per image Generation
// const SINGLE_IMAGE_PRICE: { [model: string]: ImagePricing } = {
//   "gpt-image-1": {
//     low: {
//       "1024x1024": 0.011,
//       "1024x1536": 0.016,
//       "1535x1024": 0.016,
//     },
//     medium: {
//       "1024x1024": 0.042,
//       "1024x1536": 0.063,
//       "1535x1024": 0.063,
//     },
//     high: {
//       "1024x1024": 0.167,
//       "1024x1536": 0.25,
//       "1535x1024": 0.25,
//     },
//   },
//   "dall-e-2": {
//     standard: {
//       "1024x1024": 0.004,
//       "1024x1792": 0.008,
//       "1792x1024": 0.008,
//     },
//     hd: {
//       "1024x1024": 0.008,
//       "1024x1792": 0.012,
//       "1792x1024": 0.012,
//     },
//   },
//   "dall-e-3": {
//     standard: {
//       "256x256": 0.011,
//       "512x512": 0.016,
//       "1024x1024": 0.016,
//     },
//   },
// };

// // must be used inside try/catch block or call it as this: if (costPerImage({model, quality, resolution}) !== undefined)
// const costPerImageGeneration = ({
//   model,
//   quality,
//   resolution,
// }: {
//   model: string;
//   quality: Quality;
//   resolution: Resolution;
// }): number => {
//   const modelPricing = SINGLE_IMAGE_PRICE[model];

//   if (!modelPricing) {
//     throw new Error(`Unknown model: ${model}`);
//   }

//   const qualityPricing = modelPricing[quality];
//   if (!qualityPricing) {
//     throw new Error(`Quality "${quality}" not available for model "${model}"`);
//   }

//   const price = qualityPricing[resolution];
//   if (price === undefined) {
//     throw new Error(
//       `Resolution "${resolution}" not available for model "${model}" with quality "${quality}"`
//     );
//   }

//   return price;
// };

// const SINGLE_TOKEN_PRICE = {
//   text: {
//     input: TEXT_INPUT_TOKENS_PRICE / TOTAL_TOKENS,
//     cached: TEXT_INPUT_CACHED_TOKENS_PRICE / TOTAL_TOKENS,
//   },
//   image: {
//     input: IMAGE_INPUT_TOKENS_PRICE / TOTAL_TOKENS,
//     cached: IMAGE_CACHED_TOKENS_PRICE / TOTAL_TOKENS,
//     output: IMAGE_OUTPUT_TOKENS_PRICE / TOTAL_TOKENS,
//   },
// };

// const usage = {
//   input_tokens: 1334, //
//   output_tokens: 1000,
//   input_tokens_details: {
//     image_tokens: 1800,
//     text_tokens: 200,
//   },
//   total_tokens: 2000,
// };

// const { input_tokens, output_tokens } = usage;
// const { image_tokens, text_tokens } = input_tokens_details;

// const text_tokens_cost = text_tokens * SINGLE_TOKEN_PRICE.text.input;
// const imag_tokens_cost = image_tokens * SINGLE_TOKEN_PRICE.image.input;
// const output_tokens_cost = output_tokens * SINGLE_TOKEN_PRICE.image.output;

// const totalCost = text_tokens_cost + imag_tokens_cost + output_tokens_cost;

// /**
//  * Calculate image generation cost based on token usage.
//  * @param usage - The token usage data returned by OpenAI API
//  * @param useCache - Whether this request used cached prompt/image (affects pricing)
//  * @returns Total cost in USD
//  */
// function calculateImageGenerationCost(usage: Usage, useCache = false): number {
//   const {
//     input_tokens_details: { image_tokens, text_tokens },
//     output_tokens,
//   } = usage;

//   const textInputPrice = useCache
//     ? SINGLE_TOKEN_PRICE.text.cached
//     : SINGLE_TOKEN_PRICE.text.input;
//   const imageInputPrice = useCache
//     ? SINGLE_TOKEN_PRICE.image.cached
//     : SINGLE_TOKEN_PRICE.image.input;

//   const cost =
//     text_tokens * textInputPrice +
//     image_tokens * imageInputPrice +
//     output_tokens * SINGLE_TOKEN_PRICE.image.output;

//   return parseFloat(cost.toFixed(6)); // return cost rounded to 6 decimals
// }

// // function calculateCosts(usage, quality, size) {
// //   const inputRate = 0.00001; // $10 / 1M
// //   const outputRate = 0.00004; // $40 / 1M

// //   const inputCost = usage.input_tokens * inputRate;
// //   const outputCost = usage.output_tokens * outputRate;

// //   const qualitySizeCost = 0.063; // eg. $0.063

// //   return {
// //     imageCost: qualitySizeCost,
// //     tokenCost: inputCost + outputCost,
// //     totalCost: qualitySizeCost + inputCost + outputCost,
// //   };
// // }

// // export const calculateImageCost = (
// //   response: any
// // ): {
// //   imageCost: number;
// //   tokenCost: number;
// //   totalCost: number;
// // } => {
// //   const {
// //     model,
// //     quality,
// //     resolution,
// //     input_tokens,
// //     output_tokens,
// //     image_tokens,
// //     text_tokens,
// //   } = response;

// //   const imageCost = costPerImageGeneration({
// //     model,
// //     quality,
// //     resolution,
// //   });

// //   const inputTokens = response.usage?.input_tokens || 0;
// //   const outputTokens = response.usage?.output_tokens || 0;

// //   const tokenCost =
// //     inputTokens * SINGLE_TOKEN_PRICE.text.input +
// //     inputTokens * SINGLE_TOKEN_PRICE.text.cached +
// //     outputTokens * SINGLE_TOKEN_PRICE.image.output +
// //     inputTokens * SINGLE_TOKEN_PRICE.image.input +
// //     inputTokens * SINGLE_TOKEN_PRICE.image.cached;

// //   const totalCost = imageCost + tokenCost;

// //   return {
// //     imageCost,
// //     tokenCost,
// //     totalCost,
// //   };
// // };
