export interface CreateCategoryDTO {
    name: string;
    parent_id?: number;
  }
  
  export interface UpdateCategoryDTO {
    id_category: number;
    name?: string;
    parent_id?: number;
  }
  
  export interface CategoryResponseDTO {
    id_category: number;
    name: string | null;
    parent_id: number | null;
    parent_name: string | null;
    children: {
      id_category: number;
      name: string | null;
    }[];
    created_at: Date;
    product_count: number;
  }
  