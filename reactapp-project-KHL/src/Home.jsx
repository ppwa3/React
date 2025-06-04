import { useState } from "react";

const productData = [
  [
    { name: "토아스 앰플", img: "/images/ampule.PNG" },
  ],
  [
    { name: "튠", img: "/images/tune.png" },
  ],
  [
    { name: "토아스 재생크림", img: "/images/cream.jpg" }
  ]
];

function Home() {

  const [page, setPage] = useState(0);

  const nextPage = () => {
    setPage((prev) => (prev + 1) % productData.length);
  };
  return (<>
    <section className="best-sellers">
      <h2 style={{ margin: '10px', paddingTop: '10px' ,marginBottom: '60px', marginTop: '0px'}}> 𝐵𝑒𝑙𝑢𝑠ℎ𝑖 𝐵𝑒𝑠𝑡𝑠𝑒𝑙𝑙𝑒𝑟 </h2>
      <div className="product-grid">
        <section className="category-highlight fade-in">
          {productData[page].map((product, idx) => (
            <div key={idx} className="category-card">
              <img src={product.img} alt={product.name} className="category-image" />
              <p>{product.name}</p>
            </div>
          ))}
        </section>
        <button onClick={nextPage}>다음 보기 ➡</button>
        
      </div>
    </section>
  </>)
}
export default Home; 