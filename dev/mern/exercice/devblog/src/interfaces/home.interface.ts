import { RouteComponentProps } from 'react-router-dom'


export interface CategoryInterface {
  name: string;
  _id: string;
  icon: string;
}

export interface CategoryInterfaceState {
  name: string;
  _id?: string;
  icon: string;
}

export interface PostInterface {
  _id: string;
  title: string;
  description: string;
  created: string;
  updated: string;
  cover: string;
  content: string;
  categoryId: string;
  authorId: string;
}

export interface PostInterfaceState {
  _id?: string;
  title: string;
  description: string;
  cover: string;
  content: string;
  categoryId: string;
  authorId: string;
}


// SelectCate interfaces
export interface SelectCateStateInterface {
  selectedCategory: CategoryInterface | null;
}

// Posts Interfaces
export interface PostsPropsInterface {
  location: RouteComponentProps['location'];
  history: RouteComponentProps['history'];
}
