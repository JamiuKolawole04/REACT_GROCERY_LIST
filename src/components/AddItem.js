import { FaPlus } from "react-icons/fa";
import { useRef } from "react";
const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
    // use reference in react js
    const inputRef = useRef();

    return (
        <form className="addForm d-flex justify-content-start" onSubmit={handleSubmit}>
            <label htmlFor="addItem">Add Item</label>
            <input
                type="text"
                autoFocus
                ref={inputRef}
                id="addItem"
                placeholder="Add Item"
                required
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />

            <button
                type="submit"
                aria-label="Add Item"
                onClick={() => { inputRef.current.focus() }}
            >
                <FaPlus />
            </button>
        </form>
    );
};

export default AddItem;
