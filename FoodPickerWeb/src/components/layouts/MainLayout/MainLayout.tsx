import NavBar from "../../common/navBar/navBar";
import React from "react";
import MainFooter from "../../common/MainFooter/MainFooter";
import './MainLayout.css'

function MainLayout( props: {children: React.ReactNode}){
    return(
        <div className="MainLayout">
            <svg width="100%" id="svg" viewBox="0 0 1440 490" xmlns="http://www.w3.org/2000/svg" className="background-svg1"><path d="M 0,500 L 0,187 C 100.60512820512821,235.04358974358973 201.21025641025642,283.08717948717947 280,264 C 358.7897435897436,244.9128205128205 415.7641025641026,158.6948717948718 484,118 C 552.2358974358974,77.3051282051282 631.7333333333332,82.13333333333333 721,121 C 810.2666666666668,159.86666666666667 909.302564102564,232.77179487179487 994,228 C 1078.697435897436,223.22820512820513 1149.0564102564103,140.77948717948715 1221,121 C 1292.9435897435897,101.22051282051284 1366.4717948717948,144.11025641025643 1440,187 L 1440,500 L 0,500 Z" stroke="none" strokeWidth="0" fill="#c7ccdb" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-0"></path></svg>
            <NavBar />
            <main>
                {props.children}
            </main>
            <MainFooter />
        </div>
    )
}
export default MainLayout;