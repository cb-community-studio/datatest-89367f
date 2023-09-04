import React, { useState, useEffect, useRef } from "react";
import "./ProjectLayout.css";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import { AppMenu } from "../../AppMenu";

import PrimeReact from "primereact/api";
import { BreadCrumb } from "primereact/breadcrumb";

const ProjectLayout = (props) => {
    const [layoutMode, setLayoutMode] = useState("static");
    const [layoutColorMode, setLayoutColorMode] = useState("light");
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);

    const copyTooltipRef = useRef();
    const location = useLocation();

    PrimeReact.ripple = true;

    let menuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };

    const menu = [
        // {
        //     label: "Home",
        //     items: [
        //         {
        //             label: "Projects",
        //             icon: "pi pi-fw pi-home",
        //             to: "/projects",
        //         },
        //     ],
        // },
        {
            label: "Dashboard",
            items: [
                { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" },
                // ~add-nav-link~
            ],
        },
    ];

    const breadcrumbHome = { icon: "pi pi-home", url: "/project" }; // todo change all breadcrumb items to custom with history.push instead of url(because url will refresh the page)
    // const breadcrumbItems = [{ label: "Computer" }, { label: "Notebook" }, { label: "Accessories" }, { label: "Backpacks" }, { label: "Item" }];

    const getBreadCrumbItems = () => {
        const currentPathSplit = location.pathname
            .replace("/project", "")
            .split("/")
            .filter((i) => i);
        // const currentPathSplit = ["data", "A", "b", "c", "d"]; //dummy
        let bread = [];
        for (let i = 0; i < currentPathSplit.length; i++) {
            let url = "/project";
            for (let j = 0; j <= i; j++) {
                url = url + "/" + currentPathSplit[j];
            }
            bread.push({ label: currentPathSplit[i], url });
        }
        // console.log("bread", bread);
        return bread;
    };

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };

    return (
        <div>
            <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    <div className="card card-w-title">
                        <BreadCrumb home={breadcrumbHome} model={getBreadCrumbItems()} className="mb-3" />
                        <div>
                            <h5 className="m-0">
                                <span style={{ color: "grey" }}>Project: </span>
                                {props.selectedProject?.projectName}
                            </h5>
                        </div>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    const { selectedProject } = state.project;
    return { selectedProject };
};
const mapDispatch = (dispatch) => ({
    //
});

export default connect(mapState, mapDispatch)(ProjectLayout);
