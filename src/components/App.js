// import React from "react";
import Footer from "./Footer";
import Content from "./Content";
import Header from "./Header";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import { useState, useEffect } from "react";
import apiRequest from "./apiRequest";
import '../styles/index.css'

const App = () => {
  // getters and setters in vanilla JS
  // using use state hooks in react js
  const API_URL = 'https://react-list-server.herokuapp.com/items';

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  // useEffect() runs once the components load.
  useEffect(() => {
    // rendering on load time after depency has been updated
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Did not receive the expected data')
        const listItems = await response.json();
        // console.log(listItems);
        setItems(listItems);
        setFetchError(null)
      } catch (err) {
        console.log(err.message);
        setFetchError(err.message);
      } finally {
        setIsLoading(false)
      }
    }

    setTimeout(() => {
      // IIFE
      (async () => await fetchItems())()
    }, 2000);

  }, []);

  // adding new items
  const addItem = async (item) => {
    // getting the last elements in array since arays start from index 0
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result)
  }

  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result)
  }

  const handleDelete = async (id) => {
    // returning new array with id's that are not equal to the id passed to the function
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    // console.log(newItem);
    addItem(newItem)
    setNewItem('');
  }

  return (

    <div className="App d-flex d-flex-col">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main className="d-flex justify-content-start d-flex-col items-center">
        {isLoading && <p>Loading items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLocaleLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
        }
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
