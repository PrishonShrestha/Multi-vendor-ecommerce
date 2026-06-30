"use client";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { fetchProducts } from "@/lib/features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuth, useUser } from "@clerk/nextjs";
import { fetchCart, updateCart } from "@/lib/features/cart/cartSlice";
import { fetchAddress } from "@/lib/features/address/addressSlice";
import { fetchUserRatings } from "@/lib/features/rating/ratingSlice";

export default function PublicLayout({ children }) {
  const { user } = useUser();
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  // Fetch products
  useEffect(() => {
    dispatch(fetchProducts({}));
  }, []);

  // Fetch carts
  useEffect(() => {
    if (user) {
      dispatch(fetchCart({ getToken }));
      dispatch(fetchAddress({ getToken }));
      dispatch(fetchUserRatings({ getToken }));
    }
  }, [user]);

  // Upload cart
  useEffect(() => {
    if (user) {
      dispatch(updateCart({ getToken }));
    }
  }, [cartItems]);

  return (
    <>
      <Banner />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
