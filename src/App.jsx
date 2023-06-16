import React, { useState,useEffect } from "react";
import ToDoList from "./ToDoList";

const App = () => {

    const [inputList, setInputList] = useState();
    const [items, setItems] = useState([]);

    const itemEvents = (event) => {
        setInputList(event.target.value);
    };

    const listOfItems = () => {
        setItems((oldItems) => {
            return [...oldItems, inputList];
        })
        setInputList('');

    };

    const deleteItems = (id) => {
        setItems((oldItems) => {
            return oldItems.filter((arrElem, index) => {
                return index !== id;
            });
        });
    }

    // Load items from local storage on component mount
    useEffect(() => {
        const storedItems = localStorage.getItem("todoItems");
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        }
    }, []);

    // Save items to local storage whenever the items state updates
    useEffect(() => {
        localStorage.setItem("todoItems", JSON.stringify(items));
    }, [items]);

    return (
        <>
            <div className="main_div">
                <div className="center_div">
                    <br />
                    <h1>ToDo List</h1>
                    <br />
                    <div className="input-add-btn">
                        <input type="text" placeholder="Add a Items" onChange={itemEvents} value={inputList} />
                        <button onClick={listOfItems}>+</button>
                    </div>
                    <ol>
                        {items.map((itemVal, index) => {
                            return <ToDoList key={index} id={index} text={itemVal} onSelect={deleteItems} />
                        })}
                    </ol>
                </div>
            </div>
        </>
    );
};

export default App;