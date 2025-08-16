export default function AddCall() {
  return (
    <>
      <h1>Add a call</h1>
      <form>
        <div className="mb-3">
          <label>Phone number</label>
          <input type="number" id="input-phone-number"></input>
        </div>
        <div className="mb-3">
          <label>Recruiter name</label>
          <input type="text" id="input-recruiter-name"></input>
        </div>
        <div className="mb-3">
          <label>Notes</label>
          <textarea id="notes"></textarea>
        </div>
        <div className="mb-3">
          <input type="submit"></input>
        </div>
      </form>
    </>
  )
}