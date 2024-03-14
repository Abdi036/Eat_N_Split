const intial = [
  {
    name: "Hope Kumela",
    image: "placeholder.jpg",
    message: "You owe Clark 7$",
  },
  {
    name: "Hope Kumela",
    image: "placeholder.jpg",
    message: "Sarah owes you 50$",
  },
  {
    name: "Hope Kumela",
    image: "placeholder.jpg",
    message: "you and Jonas are even",
  },
];

export default function App() {
  return (
    <div>
      <Header />
      <div className="App">
        <Friends />
        <Split />
      </div>
    </div>
  );
}
function Header() {
  return (
    <div className="container">
      <h1>Eat And Split</h1>
    </div>
  );
}

function Friends() {
  return (
    <div>
      {intial.map((friend) => (
        <div className="Friends_container">
          <div className="profile_pic_container">
            <img
              className="profile_pic"
              src={`img/${friend.image}`}
              alt={friend.name}
            />
          </div>
          <div style={{ width: "150px" }}>
            <h4>{friend.name}</h4>
            <p>{friend.message}</p>
          </div>
          <Button>select</Button>
        </div>
      ))}
      <AddFriends />
    </div>
  );
}

function Button({ children }) {
  return (
    <div>
      <button className="buttons select">{children}</button>
    </div>
  );
}

function AddFriends() {
  return (
    <div>
      <div class="center-container">
        <form>
          <div class="form_container">
            <label for="friend_name">Friend Name</label>
            <input type="text" />
          </div>
          <div class="form_container">
            <label for="image_url">Image URL</label>
            <input type="text" />
          </div>
          <button className="AddBtn">Add</button>
        </form>
      </div>
      <button className="closeBtn">Close</button>
    </div>
  );
}

function Split() {
  return (
    <div class="split_bill_container">
      <div className="Form_wrapper">
        <h2 style={{ paddingBottom: "20px" }}>SPLIT A BILL WITH X</h2>
        <form>
          <div class="input_container">
            <label for="bill_value">Bill value</label>
            <input type="number" />
          </div>
          <div class="input_container">
            <label for="your_expense">Your expense</label>
            <input type="number" />
          </div>
          <div class="input_container">
            <label for="xs_expense">X's expense</label>
            <input type="number" disabled />
          </div>
          <div>
            <label>Who is paying the bill?</label>
            <select>
              <option>You</option>
              <option>Your Friend</option>
            </select>
          </div>
        </form>
        <button className="buttons splitBtn">Split</button>
      </div>
    </div>
  );
}
