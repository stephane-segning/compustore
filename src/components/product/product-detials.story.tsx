import React from "react";
import ProductDetails from "./product-details";

export default {
    title: "Components/ProductDetails",
    component: ProductDetails,
};

export const Default = () => (
    <ProductDetails
        product={{
            name: "Amazing Camera",
            description: "This is a top-quality camera for professional photographers.",
            images: [
                { url: "https://cdn.mos.cms.futurecdn.net/4wpKrH93D37dDPTisdqGy4-1200-80.jpg", title: "Front View" },
                { url: "https://harrison-cameras.s3.amazonaws.com/h/s/USED-MFC.jpg", title: "Front View" },
                { url: "https://detec.in/cdn/shop/collections/dims_1200x1200.jpg?v=1633505296", title: "Front View" },
                { url: "https://amateurphotographer.com/wp-content/uploads/sites/7/2022/11/Fujifilm_X-T5_01_PA284136-acr.jpg?w=900", title: "Front View" },
                { url: "https://cdn.mos.cms.futurecdn.net/4wpKrH93D37dDPTisdqGy4-1200-80.jpg", title: "Front View" },
                { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXZTR0ZMBG8psGaiYErnNHP9YE8DSFO6Om_UvZz80sfpfNSQJ2AMOpXrVREamMMhDk3fI&usqp=CAU", title: "Side View" },
            ],
            prices: [{ price: 999.99, currency: "USD" }],
        }}
    />
);


