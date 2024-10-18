export default function NavBar() {
  return (
    <nav>
      <ul>
        <div className="logo-cont">
          <img id="logo" src="img/misc/logo.png" alt="logo" />
        </div>
        <li id="nav-options">
          <a href="#">DSA Questions</a>
        </li>
        <li id="nav-options">
          <a href="#">Study Plan</a>
        </li>
        <li id="nav-options">
          <a href="#">Timed Exams</a>
        </li>
      </ul>
      <div className="pfp-cont">
        <img id="pfp" src="img/misc/draco-pfp.png" alt="Profile" />
      </div>
    </nav>
  );
}
