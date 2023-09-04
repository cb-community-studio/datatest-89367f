import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import client from "../../services/restClient";


const SingleItemPage = (props) => {
    const history = useHistory();
    const urlParams = useParams();
    const [data, setData] = useState();
    const [product, setproduct] = useState([]);
    useEffect(() => {
        //on mount
        client
            .service("item")
            .get(urlParams.singleItemId, { query: { $populate: ["Product"] }})
            .then((res) => {
                setData(res || {});
                const product = Array.isArray(res.Product)
            ? res.Product.map((elem) => ({ _id: elem._id, ProductID: elem.ProductID }))
            : res.Product
                ? [{ _id: res.Product._id, ProductID: res.Product.ProductID }]
                : [];
        setproduct(product);
                setproduct(res?.Product?.map((elem) => ({ _id: elem._id, ProductID: elem.ProductID })) || []);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Item", type: "error", message: error.message || "Failed get item" });
            });
    }, []);

    const goBack = () => {
        history.replace("/item");
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Item</h3>
                </div>
                <p>item/{urlParams.singleItemId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            {/* <label className="text-sm">Name</label>
                    <p className="m-0" >{data?.ItemID}</p>
                    <label className="text-sm">Product</label>
                    <p className="m-0" >{data?.Product}</p>
                    <label className="text-sm">SubTotal</label>
                    <p className="m-0" >{data?.SubTotal}</p> */}
            <label className="text-sm">Product</label>
            {product.map((elem) => (
                    <Link key={elem._id} to={`/product/${elem._id}`}>
                        <div className="card">
                            <p>{elem.ProductID}</p>
                        </div>
                    </Link>
                ))}
                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    return {};
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    //
});

export default connect(mapState, mapDispatch)(SingleItemPage);
