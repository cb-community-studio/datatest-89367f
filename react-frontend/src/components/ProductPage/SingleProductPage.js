import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import client from "../../services/restClient";


const SingleProductPage = (props) => {
    const history = useHistory();
    const urlParams = useParams();
    const [data, setData] = useState();
    
    useEffect(() => {
        //on mount
        client
            .service("product")
            .get(urlParams.singleProductId, { query: { $populate: [] }})
            .then((res) => {
                setData(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Product", type: "error", message: error.message || "Failed get product" });
            });
    }, []);

    const goBack = () => {
        history.replace("/product");
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Product</h3>
                </div>
                <p>product/{urlParams.singleProductId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            {/* <label className="text-sm">ProductID</label>
                    <p className="m-0" >{data?.ProductID}</p>
                    <label className="text-sm">Name</label>
                    <p className="m-0" >{data?.ProductName}</p>
                    <label className="text-sm">Description</label>
                    <p className="m-0" >{data?.Description}</p>
                    <label className="text-sm">Price</label>
                    <p className="m-0" >{data?.Price}</p> */}
            
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

export default connect(mapState, mapDispatch)(SingleProductPage);
