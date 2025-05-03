import React from "react";
import { createProduct, viewProductInfo } from "../services/web3Service";

export default function TestWeb3Service() {
  const handleTest = async () => {
    try {
      // Yeni ürün oluştur
      await createProduct("Ankara", 1714676400, 1719853200);
      alert("Ürün başarıyla eklendi!");

      // Eklenen ürünü görüntüle
      const product = await viewProductInfo(0);
      console.log("Ürün Bilgileri:", product);
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  return <button onClick={handleTest}>Web3 Service Test</button>;
}
