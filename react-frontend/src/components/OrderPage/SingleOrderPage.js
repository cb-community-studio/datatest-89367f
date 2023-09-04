import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import client from "../../services/restClient";


const SingleOrderPage = (props) => {
    const history = useHistory();
    const urlParams = useParams();
    const [data, setData] = useState();
    const [item, setitem] = useState([]);
    const [users, setusers] = useState([]);
    useEffect(() => {
        //on mount
        client
            .service("order")
            .get(urlParams.singleOrderId, { query: { $populate: ["ItemID","Name"] }})
            .then((res) => {
                setData(res || {});
                const item = Array.isArray(res.ItemID)
            ? res.ItemID.map((elem) => ({ _id: elem._id, ItemID: elem.ItemID }))
            : res.ItemID
                ? [{ _id: res.ItemID._id, ItemID: res.ItemID.ItemID }]
                : [];
        setitem(item);
                setitem(res?.ItemID?.map((elem) => ({ _id: elem._id, ItemID: elem.ItemID })) || []);
                const users = Array.isArray(res.Name)
            ? res.Name.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.Name
                ? [{ _id: res.Name._id, name: res.Name.name }]
                : [];
        setusers(users);
                setusers(res?.Name?.map((elem) => ({ _id: elem._id, name: elem.name })) || []);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Order", type: "error", message: error.message || "Failed get order" });
            });
    }, []);

    const goBack = () => {
        history.replace("/order");
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Order</h3>
                </div>
                <p>order/{urlParams.singleOrderId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            {/* <label className="text-sm">Name</label>
                    <p className="m-0" >{data?.OrderID}</p>
                    <label className="text-sm">ItemID</label>
                    <p className="m-0" >{data?.ItemID}</p>
                    <label className="text-sm">total</label>
                    <p className="m-0" >{data?.total}</p>
                    <label className="text-sm">Name</label>
                    <p className="m-0" >{data?.Name}</p> */}
            <label className="text-sm">ItemID</label>
            {item.map((elem) => (
                    <Link key={elem._id} to={`/item/${elem._id}`}>
                        <div className="card">
                            <p>{elem.ItemID}</p>
                        </div>
                    </Link>
                ))}
            <label className="text-sm">Name</label>
            {users.map((elem) => (
                    <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div className="card">
                            <p>{elem.name}</p>
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

export default connect(mapState, mapDispatch)(SingleOrderPage);
