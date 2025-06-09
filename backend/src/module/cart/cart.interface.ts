export interface AddItemToCartDTO {
    userId: number;
    productId: number;
    quantity: number;
}

export interface CartItemResponseDTO {
  id_itemcart: number;
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  image_url?: string;
}