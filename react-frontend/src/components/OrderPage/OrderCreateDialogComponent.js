import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';

import { Dropdown } from 'primereact/dropdown';



const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const OrderCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const [item, setitem] = useState([])
    const [users, setusers] = useState([])

    useEffect(() => {
        set_entity({});
    }, [props.show]);
    const onSave = async () => {
        let _data = {
            OrderID: _entity.OrderID,
            ItemID: _entity.ItemID,
            total: _entity.total,
            Name: _entity.Name,
        };

        setLoading(true);
        try {
            const result = await client.service("order").create(_data);
            props.onHide();
            props.alert({ type: "success", title: "Create", message: "Created successfully" });
            props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };
     useEffect(() => {
                //on mount
                client
                    .service("item")
                    .find({ query: { $limit: 100 } })
                    .then((res) => {
                        setitem(res.data);
                    })
                    .catch((error) => {
                        console.log({ error });
                        props.alert({ title: "Item", type: "error", message: error.message || "Failed get item" });
                    });
            }, []);
    useEffect(() => {
                //on mount
                client
                    .service("users")
                    .find({ query: { $limit: 100 } })
                    .then((res) => {
                        setusers(res.data);
                    })
                    .catch((error) => {
                        console.log({ error });
                        props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                    });
            }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };
    const itemOptions = item.map((elem) => ({ label: elem.ItemID, value: elem._id }));
    const usersOptions = users.map((elem) => ({ label: elem.name, value: elem._id }));

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="order-create-dialog-component">
            <div>
                <p className="m-0">Name:</p>
                <InputText className="w-full mb-3" value={_entity?.OrderID} onChange={(e) => setValByKey("OrderID", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">ItemID:</p>
                <MultiSelect value={_entity?.ItemID} options={itemOptions} onChange={(e) => setValByKey("ItemID", e.value)} />
            </div>
            <div>
                <p className="m-0">total:</p>
                <InputText type="number" className="w-full mb-3" value={_entity?.total} onChange={(e) => setValByKey("total", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Name:</p>
                <Dropdown value={_entity?.Name} options={usersOptions} onChange={(e) => setValByKey("Name", e.value)} />
            </div>
                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    return {}
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(null, mapDispatch)(OrderCreateDialogComponent);
