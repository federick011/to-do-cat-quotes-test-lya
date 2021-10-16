import React, { useState, createRef } from "react";
//Styles
import './css/SectionsStyle.css'
//Components
import ToDoContentComponent from "./ToDoContentComponent";

//props => [0] = isTabletOrMobile, [1] = isPortrait
export default function MainSectionComponent({props})
{
    const [styleSection, setStyleSection] = useState("section-one");
    if(!props[0] && !props[1])
    {

    }
    return(
        <main className="main-body">
            <section className="section-one">
                <div className="to-do-list-body">
                    <div className="add-to-do-cont">
                        <h2>Agregar To Do!</h2>
                        {(!props[0] && !props[1]) && (<h3>Version Escritorio</h3>)}
                        {(props[0] || props[1]) && (<h3>Version para Moviles</h3>)}
                        
                        <ToDoContentComponent />
                    </div>
                </div>
            </section>
        </main>
    );
}