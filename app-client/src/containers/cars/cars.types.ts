import { IFileItem } from '../../services/types';
export interface ICars {
  id?: string;
  name?: string;
  price?: number;
  sizes_id?: number;
  updatedBy?: string;
  updatedAt?: string;
  createdBy?: string;
  createdAt?: string;
  photo?: IFileItem;
}
