import { useState } from "react";
const initial = [
  {
    id: 118834,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933272,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 496476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showaddFriends, setShowaddFriends] = useState(false);
  const [Friend, setFriend] = useState(initial);

  // to display and hide button
  function handleShowAddFriend() {
    setShowaddFriends(!showaddFriends);
  }

  // To render new friend to the component
  function handleAddFriend(friend) {
    setFriend((F) => [...Friend, friend]);
  }

  return (
    <div>
      <Header />
      <div className="App">
        <div>
          <Friends Friend={Friend} showaddFriends={showaddFriends} />
          {showaddFriends && <AddFriends OnhandleAddFriend={handleAddFriend} />}
          <Button onClick={handleShowAddFriend}>
            {showaddFriends ? "Close" : "Add Friends"}
          </Button>
        </div>

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

function Friends({ Friend }) {
  return (
    <div>
      {Friend.map((friend, index) => (
        <div key={index} className="Friends_container">
          <div className="profile_pic_container">
            <img className="profile_pic" src={friend.image} alt={friend.name} />
          </div>
          <div style={{ width: "150px" }}>
            <h4>{friend.name}</h4>
            {friend.balance < 0 && (
              <p>
                You owe {friend.name} {Math.abs(friend.balance)}$
              </p>
            )}
            {friend.balance > 0 && (
              <p>
                {friend.name} owes you {Math.abs(friend.balance)}$
              </p>
            )}
            {friend.balance === 0 && <p>You and {friend.name} are even</p>}
          </div>
          <Button>select</Button>
        </div>
      ))}
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <div className="btnContainer">
      <button className="buttons select" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

function AddFriends({ OnhandleAddFriend }) {
  const [name, setFriendName] = useState("");
  const [image, setFriendImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    OnhandleAddFriend(newFriend);
    setFriendName("");
    setFriendImage("https://i.pravatar.cc/48");
  }

  return (
    <div>
      <div className="center-container">
        <form onSubmit={handleSubmit}>
          <div className="form_container">
            <label>Friend Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setFriendName(e.target.value)}
            />
          </div>
          <div className="form_container">
            <label>Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setFriendImage(e.target.value)}
            />
          </div>
          <button className="AddBtn">Add</button>
        </form>
      </div>
    </div>
  );
}

function Split() {
  return (
    <div className="split_bill_container">
      <div className="Form_wrapper">
        <h2 style={{ paddingBottom: "20px" }}>SPLIT A BILL WITH X</h2>
        <form>
          <div className="input_container">
            <label>Bill value</label>
            <input type="number" />
          </div>
          <div className="input_container">
            <label>Your expense</label>
            <input type="number" />
          </div>
          <div className="input_container">
            <label>X's expense</label>
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
