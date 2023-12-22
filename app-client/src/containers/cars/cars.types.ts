import { IFileItem } from '../../services/types';
export interface ICars {
  id?: string;
  plate?: string;
  manufacture?: string;
  model?: string;
  rentPerDay?: number;
  capacity?: number;
  description?: string;
  availableAt?: string;
  transmission?: string;
  available?: boolean;
  type?: string;
  year?: string;
  options?: string[];
  specs?: string[];
  
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  image?: IFileItem;
}
