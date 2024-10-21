export default function Footer() {
  return (
    <footer>
      <img
        className="lockup"
        src="/img/misc/PU_lockup.png"
        alt="Princeton lockup"
      />
      <div className="credits">
        <p>Website created by Anupta Argo '26 and Jeremy Michoma '26</p>
      </div>
      <div className="foottext">
        <p>TigerTrain</p>
        <p>© 2024 The Trustees of Princeton University</p>
        <p>
          <a href="https://www.princeton.edu/content/copyright-infringement">
            Copyright Infringement
          </a>{" "}
          |<a href="https://www.princeton.edu/privacy-notice">Privacy Notice</a>
        </p>
      </div>
    </footer>
  );
}
