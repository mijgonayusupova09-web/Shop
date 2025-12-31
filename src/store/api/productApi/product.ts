import { baseApi } from "../../../utils/api";

interface ProductsResponse {
 data: {
   products: Product[];
 }
}

export interface Product {
  id: number;
  productName: string;
  price: number;
  discountPrice?: number;
  image: string;
  description: string;
  brand?: string;
  categoryId?: number;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, void>({
      query: () => '/Product/get-products',
      providesTags: ['Product'],
    }),
    
    getProductById: builder.query<Product, number>({
      query: (id) => `/Product/get-product-by-id/${id}`, 
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
