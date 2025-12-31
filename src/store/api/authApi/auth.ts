import { baseApi } from "../../../utils/api";

export interface AuthResponse {
  data: string;
  token: string
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, { userName: string; password: string }>({
      query: (body) => ({
        url: "/Account/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<AuthResponse, { fullName: string; email: string; password: string }>({
      query: (body) => ({
        url: "/Auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
