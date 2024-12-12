import { useRouter } from 'next/router';
import React from "react";
const ProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const navigateToHome = () => {
    router.push('/');
  };

  return (
    <div>
      <h1>Product Page</h1>
      <p>Product ID: {id}</p>
      <button onClick={navigateToHome}>Go to Home</button>
    </div>
  );
};

export default ProductPage;
