import { RouteComponentProps } from 'react-router-dom'

export interface CategoryInterface {
  name: string;
  id: string;
  icon: string;
}

export interface PostInterface {
  id: string;
  title: string;
  description: string;
  author: string;
  created: string;
  updated: string;
  cover: string;
  content: string;
  categoryId: string;
}

// SelectCate interfaces
export interface SelectCateStateInterface {
  selectedCategory: CategoryInterface | null;
}

export interface SelectCatePropsInterface {
  history: RouteComponentProps['history']
  location: RouteComponentProps['location']
  categories: CategoryInterface[];
}

// Posts Interfaces
export interface PostsPropsInterface {
  location: RouteComponentProps['location']
  posts: PostInterface[];
  categories: CategoryInterface[];
}
