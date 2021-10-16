import React, { useState, useRef, createRef, useEffect } from "react";
//animation
import { motion } from "framer-motion";

//cont => [0] = Lista de items, [1]=Busqueda por filtro
export default function ToDoContentComponent()
{
    
    //============================================
    let valorInputText = createRef();//La referencia para traer el valor del texto
    let ValorTextActuli = createRef();//La referencia del texto para cuando actulicemos un item ToDo
    let ValorNumFrases = createRef();//Cantidad maxima de frases
    //tomamos el valor del nuevo To Do
    const [reAddToDo, setReAddToDo] = useState([]);
    const [IdItems, setIdItems] = useState(0);//Para aumentar el id de los items y que no se repitan
 
    function FunAddToDo()
    {
        //Vemos que no este vacio el input text
        if(valorInputText.current.value !== '')
        {   
            setIdItems(IdItems+1)
            const AddItem = {
                iditemlist: IdItems,
                itema: valorInputText.current.value,
                completa: false
            }
            //Agregamos nuevos items a la lista
            setReAddToDo([...reAddToDo, AddItem]);
        }      
        else
            alert("Debes ingresar alguna tarea!!!")
    }
    //Buscamos ToDos por filtro
    const [filtrarToDo, setFiltrarToDo] = useState("");
    const [textBuscar, setTextBuscar] = useState("Buscar");
 
    function FilToDo()
    {
        if(textBuscar === "Buscar")
        {
            setTextBuscar("Dejar de Buscar");
            setFiltrarToDo(valorInputText.current.value);
        }
        else
        {
            setTextBuscar("Buscar");
            setFiltrarToDo("");
        }
    }

    //==================================
    //Una funcion para ocular los items que ya se realizaron
    function BorrarToDo(valor)
    {
        const ToDoABorrar = reAddToDo.filter((item) => item.iditemlist !== valor);
        setReAddToDo(ToDoABorrar);

    }

    //Actulizar ToDos
    const [isEdicion, setIsEdicion] = useState(-1);//Para abrir y cerrar la ventana de edicione el
    function ActualizarToDo(valor)
    {
        setIsEdicion(valor);  
    }

    function AceptToDoEdit(valor)//El boton Aceptar llmara esta funcion al editar un ToDo
    {
        const ActuToDo = reAddToDo.map((item)=>{
            if(item.iditemlist === valor)
            {
                return{
                    ...item,
                    itema: ValorTextActuli.current.value,
                    completa: false
                }
            }
            return item
        });

        setReAddToDo(ActuToDo);
        setIsEdicion(-1);//Cerramos la ventana de edicon
    }
    //Hecho la lista, cuando la tarea se marca completa muestra un texto diciendo Tarea Completa
    function HechoToDoEdit(valor)
    {
        const ActuToDo = reAddToDo.map((item)=>{
            if(item.iditemlist === valor && !item.completa)
            {
                return{
                    ...item,
                    itema: "Tarea Completa: "+item.itema,
                    completa: true
                }
            }
            return item
        });

        setReAddToDo(ActuToDo);
    }

    //Creamos las frase de gatos
    const [catfact, setCatFact] = useState();
    async function TraerFactsCats01() {
        fetch('https://catfact.ninja/fact?max_length=140')
        .then(res => res.json())
        .then(json => setCatFact(json));
    }
    //Usamo el useEffect para llmar a la API cada que invocamos la funcion GeneCatFacts() que contiene IdItems
    useEffect(() => {
        TraerFactsCats01();
    }, [IdItems])

    function GeneCatFacts()
    {
        console.log("Frases max "+ValorNumFrases.current.value);
        let maxNumFrases = ValorNumFrases.current.value;
        if(maxNumFrases <= 5)
        {
            for (let index = 0; index < maxNumFrases; index++) {
                setIdItems(IdItems+1)
                const AddItem = {
                iditemlist: IdItems,
                itema:  catfact.fact,
                completa: false
                }
                //Agregamos nuevos items a la lista
                setReAddToDo([...reAddToDo, AddItem]);
            }
        }  
    }

    //Creamos la lista de todos
    const ContListToDo = () =>{
        let Items = [];
        reAddToDo.map((item, index) => {
            if(filtrarToDo === "")//Mostramos todos los ToDos si no se esta haciendo ninguna busqueda
            {   
                Items[index] = (
                    <motion.div initial={{opacity:0, scale:0}} 
                    animate={{opacity:1, scale:1}}
                    className="to-do-itself" key={index}>
                        {(isEdicion !== -1 && isEdicion === item.iditemlist) && DivEdicion/*Mostramos la ventana de edicion */}
                        
                            {(!item.completa) && (
                                <p>
                                    {item.itema}
                                </p>
                                )}
                            {(item.completa) && (
                                <p style={{color:"green"}}>
                                    {item.itema}
                                </p>
                            )}
                        <hr/>
                        <div className="to-do-itself-options">
                            <button id="button-hecho" placeholder="Hecho" onClick={() => HechoToDoEdit(item.iditemlist)}>Hecho</button>
                            <button id="button-delete" placeholder="Borrar" onClick={() => BorrarToDo(item.iditemlist)}>Borrar</button>
                            <button id="button-edit" placeholder="Editar" onClick={() => ActualizarToDo(item.iditemlist)}>Editar</button>
                        </div>
                    </motion.div>
                )
            }
            else if(item.itema === filtrarToDo || item.itema === ("Tarea Completa: "+filtrarToDo))//Si se hace una busque buscamos los Todos que conincidan
            {
                Items[index] = (
                    <motion.div initial={{opacity:0, scale:0}} 
                    animate={{opacity:1, scale:1}} 
                    className="to-do-itself" key={index}>
                        {(isEdicion !== -1 && isEdicion === item.iditemlist) && DivEdicion/*Mostramos la ventana de edicion */}

                        {(!item.completa) && (
                                <p>
                                    {item.itema}
                                </p>
                                )}
                            {(item.completa) && (
                                <p style={{color:"green"}}>
                                    {item.itema}
                                </p>
                            )}
                        <hr/>
                        <div className="to-do-itself-options">
                            <button id="button-hecho" placeholder="Hecho" onClick={() => HechoToDoEdit(item.iditemlist)}>Hecho</button>
                            <button id="button-delete" placeholder="Borrar" onClick={() => BorrarToDo(item.iditemlist)}>Borrar</button>
                            <button id="button-edit" placeholder="Editar" onClick={() => ActualizarToDo(item.iditemlist)}>Editar</button>
                        </div>
                    </motion.div>
                )
            } 
        });

        return(
            Items
        );
    }
    //Div de Edicion de ToDos
    const DivEdicion = (
        <motion.div initial={{opacity:0, scale:0, y:-100}}
        animate={{opacity:1, scale:1, y:0}}
        className="edit-div">
            <h4>Edita tu ToDo</h4>
                <input ref={ValorTextActuli} id="my-input-edit" type="text" placeholder="Actulizar ToDo!!"/>
                <button id="my-button-edit-acept" placeholder="Aceptar" onClick={() => AceptToDoEdit(isEdicion)}>Aceptar</button>
            </motion.div>
    );
    //Div para crear frases aleatorias de la API
    const CatFactsDiv =(
        <div className="main-cat-div">
            <input ref={ValorNumFrases} placeholder="Agrega una cantidad" type="text" id="number-cat-facts" pattern="[0-9]*"/>
            <button id="cat-fact-button" placeholder="Frase de gatos" onClick={GeneCatFacts}>Hechos Felinos</button>
        </div>
    );
    return(
        <React.Fragment>
            <div className="cont-inputs">
                <input ref={valorInputText} id="my-input" type="text" placeholder="Agregar o Buscar To Do!!" />
                <button id="my-button" placeholder="Agregar" onClick={FunAddToDo}>Agregar</button>
                <button id="my-button-buscar" placeholder="Buscar" onClick={FilToDo}>{textBuscar}</button>
            </div>

            {CatFactsDiv}

            <div className="list-to-do-cont">
                <ContListToDo/>
            </div>
        </React.Fragment>
        
    );
}