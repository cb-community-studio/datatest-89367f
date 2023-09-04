import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
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

const ItemCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const [product, setproduct] = useState([])

    useEffect(() => {
        set_entity({});
    }, [props.show]);
    const onSave = async () => {
        let _data = {
            ItemID: _entity.ItemID,
            Product: _entity.Product,
            SubTotal: _entity.SubTotal,
        };

        setLoading(true);
        try {
            const result = await client.service("item").create(_data);
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
                    .service("product")
                    .find({ query: { $limit: 100 } })
                    .then((res) => {
                        setproduct(res.data);
                    })
                    .catch((error) => {
                        console.log({ error });
                        props.alert({ title: "Product", type: "error", message: error.message || "Failed get product" });
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
    const productOptions = product.map((elem) => ({ label: elem.ProductID, value: elem._id }));

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="item-create-dialog-component">
            <div>
                <p className="m-0">Name:</p>
                <InputText className="w-full mb-3" value={_entity?.ItemID} onChange={(e) => setValByKey("ItemID", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Product:</p>
                <Dropdown value={_entity?.Product} options={productOptions} onChange={(e) => setValByKey("Product", e.value)} />
            </div>
            <div>
                <p className="m-0">SubTotal:</p>
                <InputText type="number" className="w-full mb-3" value={_entity?.SubTotal} onChange={(e) => setValByKey("SubTotal", e.target.value)}  />
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

export default connect(null, mapDispatch)(ItemCreateDialogComponent);
