export interface CreateProductDTO {
    name?: string;
    description?: string;
    price?: number;
    discount_price?: number;
    sku?: string;
    status?: string;
    brand_id?: string;
    stock_quantity?: number;
    weight_gram?: number;
    star?: number;
    image_url?: string;
    id_category?: number | string;
  }
  
export interface UpdateProductDTO extends CreateProductDTO {}
  