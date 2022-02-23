import LineItem from "./LineItem";


const Itemlists = ({ items, handleCheck, handleDelete }) => {
    return (
        <ul>
            {/* modifying the arrays with the .map() method */}
            {items.map((item) => (
                <LineItem
                    key={item.id}
                    item={item}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
            )
            )}
        </ul>
    );
};

export default Itemlists;
