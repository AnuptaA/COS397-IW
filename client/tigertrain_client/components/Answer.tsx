export default function Answer() {
  return (
    <div className="ans-box-cont">
      <div className="ans-text-cont">
        <p>
          Enter your answer as a sequence of comma-separated integers. (ex:
          0,3,1,2,5,6,7,4,9,8)
        </p>
      </div>
      <div className="ans-input-cont">
        <form>
          <label htmlFor="user-ans">Type here:</label>
          <br />
          <input type="text" id="user-ans" name="user-ans" />
          <br />
        </form>
      </div>
      <div className="submit-btn-cont">
        <button id="submit-btn">SUBMIT</button>
      </div>
    </div>
  );
}
