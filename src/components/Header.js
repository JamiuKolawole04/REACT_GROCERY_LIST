

// destructuring title from props
// Header = (props)
// <h1>{props.title}</h1>
const Header = ({ title }) => {
    return (
        <header className='d-flex justify-content-between items-center'>
            {/* <h1> Groceries list</h1> */}
            <h1>{title}</h1>

        </header>
    )
}

Header.defaultProps = {
    title: 'Default title',

}

export default Header;
