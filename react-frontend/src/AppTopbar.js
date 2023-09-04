import React, { useRef } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";

const AppTopbar = (props) => {
    const history = useHistory();
    const userMenuRef = useRef(null);

    const toggleUserMenu = (e) => userMenuRef.current.toggle(e);
    const items = [
        {
            label: "Account",
            icon: "pi pi-flag",
            command: () => history.push("/account"),
        },
        {
            label: "LogOut",
            icon: "pi pi-fw pi-sign-out",
            template: (item) => {
                return (
                    <ul className="p-menu-list p-reset border-top-1 border-200">
                        <li className="p-menu-list p-reset">
                            <a className="p-menuitem-link" onClick={onLogout} role="menuitem">
                                <span className={"p-menuitem-icon pi pi-sign-out text-primary"}></span>
                                <span className={"p-menuitem-text text-primary"}>{item.label}</span>
                            </a>
                        </li>
                    </ul>
                );
            },
        },
    ];

    const onLogout = async () => {
        try {
            await props.logout();
            history.replace("/");
            toggleUserMenu();
        } catch (error) {
            console.log("error", error);
        }
    };
    return (
        <div className="layout-topbar">
            <Link to="/">
                <div className="cursor-pointer min-w-max flex align-items-end">
                    {/* <img src={"assets/logo/cb-logo.svg"} height={30} className="mb-1" /> */}
                    <h3 className="text-red-500" style={{ fontFamily: "MarlinGeo", fontWeight: "bolder", margin: 0 }}>
                        react-frontend
                    </h3>
                </div>
            </Link>

            {props.showSideMenuButton ? (
                <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                    <i className="pi pi-bars" />
                </button>
            ) : null}

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
                {props.onSettings ? (
                    <li>
                        <button className="p-link layout-topbar-button" onClick={props.onSettings}>
                            <i className="pi pi-cog" />
                            <span>Settings</span>
                        </button>
                    </li>
                ) : null}
                {props.onAccount ? (
                    <li>
                        <button className="p-link layout-topbar-button" onClick={props.onAccount}>
                            <i className="pi pi-user" />
                            <span>Profile</span>
                        </button>
                    </li>
                ) : null}
                {props.isLoggedIn ? (
                    <Button className="p-button-rounded p-button-outlined ml-3" style={{ zIndex: 20 }} icon="pi pi-user" label={props.user?.email} onClick={toggleUserMenu} aria-controls="user-popup-menu" aria-haspopup />
                ) : (
                    <Button label="login" className="p-button-rounded" onClick={() => history.push("/login")} />
                )}
            </ul>
            <Menu
                model={items}
                popup
                ref={userMenuRef}
                id="user-popup-menu"
                onClick={() => {
                    toggleUserMenu();
                }}
            />
        </div>
    );
};

const mapState = (state) => {
    const { isLoggedIn, user } = state.auth;
    return { isLoggedIn, user };
};
const mapDispatch = (dispatch) => ({
    logout: () => dispatch.auth.logout(),
});

export default connect(mapState, mapDispatch)(AppTopbar);
