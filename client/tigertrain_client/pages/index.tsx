import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Example Checklist Question</title>
  <link rel="stylesheet" href="main.css" />
  <main>
    <nav>
      <ul>
        <div className="logo-cont">
          <img id="logo" src="../img/logo.png" />
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
        <img id="pfp" src="../img/draco-pfp.png" />
      </div>
    </nav>
    <div className="page-ele-cont">
      {/* <div class="prog-bar-cont"></div> */}
      <div className="quest-ans-cont">
        <div className="quest-box-cont">
          <div className="quest-text-cont">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="quest-img-cont">
            <img src="https://placehold.co/900x400" />
          </div>
        </div>
        <div className="ans-box-cont">
          <div className="ans-text-cont">
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Enim
              scelerisque dapibus erat pulvinar augue mollis duis potenti
              euismod. Etiam aliquet est torquent; cursus dui congue egestas.
            </p>
          </div>
          <div className="ans-input-cont">
            <ul>
              <li>
                <input
                  type="checkbox"
                  id="box1"
                  name="box1"
                  defaultValue="loremipsum"
                />
                <label htmlFor="box1"> Lorem Ipsum</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="box2"
                  name="box2"
                  defaultValue="loremipsum"
                />
                <label htmlFor="box2"> Lorem Ipsum</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="box3"
                  name="box3"
                  defaultValue="loremipsum"
                />
                <label htmlFor="box3"> Lorem Ipsum</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="box4"
                  name="box4"
                  defaultValue="loremipsum"
                />
                <label htmlFor="box4"> Lorem Ipsum</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="box5"
                  name="box5"
                  defaultValue="loremipsum"
                />
                <label htmlFor="box5"> Lorem Ipsum</label>
              </li>
            </ul>
          </div>
          <div className="submit-btn-cont">
            <button id="submit-btn">Submit</button>
          </div>
        </div>
      </div>
      <div className="time-box-cont">
        <ul>
          <li>
            <button>START</button>
          </li>
          <li>
            <div className="time">
              <span className="hours">00</span>
              <p>:</p>
              <span className="minutes">15</span>
              <p>:</p>
              <span className="seconds">00</span>
            </div>
          </li>
          <li>
            <button>RESET</button>
          </li>
        </ul>
      </div>
    </div>
  </main>
  <footer>
    <img className="lockup" src="../img/PU_lockup.png" alt="lockup" />
    <div className="credits">
      <p>Website created by Anupta Argo '26 and Jeremy Michoma '26</p>
    </div>
    <div className="foottext">
      <p>TigerTrain</p>
      <p>© 2024 The Trustees of Princeton University</p>
      <p>
        <a href="#">Copyright Infringement </a> |
        <a href="#"> Privacy Notice </a>
      </p>
    </div>
  </footer>
</>

  );
}