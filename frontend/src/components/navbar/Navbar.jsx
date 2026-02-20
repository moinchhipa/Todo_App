import "./Navbar.css"

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <i class="fa-solid fa-circle-check"></i> DoneIt
        </a>
        <button className="logout-btn">Logout</button>
      </div>
    </nav>
  ); 
}

export default Navbar;
