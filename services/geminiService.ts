
import { GoogleGenAI, Type } from "@google/genai";
import { SocialPost } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateBlogPost = async (transcript: string): Promise<string> => {
  const prompt = `
    Based on the following transcript, write a compelling and well-structured blog post.
    The blog post should have a catchy title, an introduction, several sub-headed sections, and a concluding paragraph.
    The tone should be authoritative yet accessible, in the style of a successful entrepreneur like Alex Hormozi.
    Use clear, direct language and provide actionable insights.

    Transcript:
    ---
    ${transcript}
    ---

    Blog Post:
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating blog post:", error);
    throw new Error("Failed to generate blog post.");
  }
};

export const generateSocialPosts = async (transcript: string): Promise<SocialPost[]> => {
  const prompt = `
    Analyze the following transcript and generate 3 social media posts for different platforms (Twitter, LinkedIn, Instagram).
    For each post, provide the platform and the content. The content should be engaging and tailored to the platform's audience.
    Use an energetic and direct tone. Include relevant hashtags.

    Transcript:
    ---
    ${transcript}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              platform: {
                type: Type.STRING,
                description: 'The social media platform (e.g., "Twitter", "LinkedIn", "Instagram").',
              },
              content: {
                type: Type.STRING,
                description: 'The full text content for the social media post.',
              },
            },
            required: ["platform", "content"],
          },
        },
      },
    });

    const jsonString = response.text;
    const posts = JSON.parse(jsonString);
    
    // Type guard to ensure the parsed data matches our SocialPost interface
    return posts.filter(
        (post: any): post is SocialPost => 
        typeof post === 'object' &&
        post !== null &&
        'platform' in post &&
        'content' in post &&
        ['Twitter', 'LinkedIn', 'Instagram'].includes(post.platform)
    );

  } catch (error) {
    console.error("Error generating social posts:", error);
    throw new Error("Failed to generate social media posts.");
  }
};


export const generateImage = async (transcript: string): Promise<string> => {
    const summaryPrompt = `
        Summarize the core topic or main idea of the following transcript in 5-7 words. This summary will be used to generate a thumbnail image. Focus on the most visually representable concept.
        
        Transcript:
        ---
        ${transcript}
        ---

        Summary for image prompt:
    `;

    try {
        const summaryResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: summaryPrompt,
        });

        const imagePrompt = `Create a visually stunning and professional thumbnail image. Style: digital art, vibrant colors, clean, modern, engaging. Subject: ${summaryResponse.text}. The image should be eye-catching and suitable for a blog or YouTube video.`;
        
        const imageResponse = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: imagePrompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '16:9',
            },
        });

        if (imageResponse.generatedImages && imageResponse.generatedImages.length > 0) {
            return imageResponse.generatedImages[0].image.imageBytes;
        } else {
            throw new Error("No image was generated.");
        }

    } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image.");
    }
};
