import { API, baseApi } from "../../../utils/api";

export interface ProductImage {
  images: string;
}

export interface ProductFromList {
  id: number;
  productName: string;
  price: number;
  discountPrice: number;
  hasDiscount: boolean;
  color: string;
  image: string;
}

export interface Product extends Omit<ProductFromList, "images"> {
  images: ProductImage[];
  description: string;
  brand: string;
  code: number;
  productName: string;
  brandId?: number;
  subCategoryId?: number;
  colorId?: number;
  categoryId?: number;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/Product/get-products',
      providesTags: ['Product'],
    }),
    
    // ✅ Add this endpoint to fetch a single product by ID
    getProductById: builder.query<Product, number>({
      query: (id) => `/Product/get-product-by-id?id=${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
