
export enum AppStep {
  Upload,
  SelectContent,
  Display,
}

export enum ContentType {
  BlogPost = 'BlogPost',
  SocialPosts = 'SocialPosts',
  Image = 'Image',
}

export interface SocialPost {
  platform: 'Twitter' | 'LinkedIn' | 'Instagram';
  content: string;
}

export interface GeneratedContent {
  blogPost?: string;
  socialPosts?: SocialPost[];
  image?: string; // base64 encoded image
}
