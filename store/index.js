"use client";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import businessReducer from "./business/businessSlice";
import authReducer from "./auth/authSlice";
import planReducer from "./Plan/planSlice";
import { businessApi } from "./business/businessService";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "./auth/authService";
import { offerApi } from "./offers/offerService";
import { jobApi } from "./job/JobService";
import { informationApi } from "./information-list/informationService";
import { realEstateApi } from "./real-estate/realEstateService";
import { mainCategoryApi } from "./main-category/mainCategoryService";
import { planApi } from "./Plan/PlanService";
import { userApi } from "./user/userService";
import { commonApi } from "./common api/commonService";
import { blogApi } from "./blogs/blogService";
import { newsApi } from "./news/newsService";
import { communityApi } from "./community/communityService";
import { subscriptionApi } from "./subscription/subscriptionService";
import { footerApi } from "./footer/footerServices";
import { productApi } from "./products/productService";
const persistConfig = {
  key: "user",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: authReducer,
    business: businessReducer,
    plan: planReducer,
    [authApi.reducerPath]: authApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [offerApi.reducerPath]: offerApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [businessApi.reducerPath]: businessApi.reducer,
    [planApi.reducerPath]: planApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [communityApi.reducerPath]: communityApi.reducer,
    [footerApi.reducerPath]: footerApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
    [realEstateApi.reducerPath]: realEstateApi.reducer,
    [informationApi.reducerPath]: informationApi.reducer,
    [mainCategoryApi.reducerPath]: mainCategoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(jobApi.middleware)
      .concat(planApi.middleware)
      .concat(communityApi.middleware)
      .concat(realEstateApi.middleware)
      .concat(informationApi.middleware)
      .concat(mainCategoryApi.middleware)
      .concat(businessApi.middleware)
      .concat(offerApi.middleware)
      .concat(productApi.middleware)
      .concat(blogApi.middleware)
      .concat(footerApi.middleware)
      .concat(newsApi.middleware)
      .concat(subscriptionApi.middleware)
      .concat(commonApi.middleware),
  devTools: false,
});
setupListeners(store.dispatch);
export let persistor = persistStore(store);
export default store;
