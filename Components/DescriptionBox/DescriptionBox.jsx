import React from "react";
import './DescriptionBox.css'
const DescriptionBox = () => {
    return (
        <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">
                    Description
                </div>
                <div className="descriptionbox-nav-box fade">
                    Reviews (122)
                </div>
            </div>
            <div className="descriptionbox-description">
                <p>
                    An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet.It serves as a virtual marketplace where bussiness and individuals can showcase their products,interact with customer, and conduct transaction without the need for physical presence. E-commerce websites have gained immense popularity due to thier convenience,accessibility, and the gobal reach they offer.
                </p>
                <p>
                    E-commerce websites typically display products or services along with detailed descriptions,images,prices,and any availability variations.Each products ususally has its own dedicated pages with relevant information.
                </p>
            </div>

        </div>
    )
}
export default DescriptionBox