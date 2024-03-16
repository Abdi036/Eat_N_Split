import { useState } from "react";
const initial = [
  {
    id: 118834,
    name: "Boni",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933272,
    name: "Hope",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 496476,
    name: "Segni",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showaddFriends, setShowaddFriends] = useState(false);
  const [Friend, setFriend] = useState(initial);
  const [selected, setSelected] = useState(null);

  function handleSelected(friend) {
    setSelected((cur) => (cur?.id === friend.id ? null : friend));
    setShowaddFriends(false);
  }

  // to display and hide button
  function handleShowAddFriend() {
    setSelected(null);
    setShowaddFriends(!showaddFriends);
  }

  // To render new friend to the component
  function handleAddFriend(friend) {
    setFriend((F) => [...Friend, friend]);
  }

  function handleSplitBill(value) {
    setFriend((friends) =>
      friends.map((friend) =>
        friend.id === selected.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelected(null);
  }

  return (
    <div>
      <Header />
      <div className="App">
        <div>
          <Friends
            Friend={Friend}
            showaddFriends={showaddFriends}
            Onselected={handleSelected}
            selected={selected}
          />

          {showaddFriends && <AddFriends OnhandleAddFriend={handleAddFriend} />}

          <Button onClick={handleShowAddFriend}>
            {showaddFriends ? "Close" : "Add Friends"}
          </Button>
        </div>

        {selected && (
          <Split selected={selected} onSplitBill={handleSplitBill} />
        )}
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

function Friends({ Friend, Onselected, selected }) {
  return (
    <div>
      {Friend.map((friend) => {
        const isSelected = friend.id === selected?.id;
        return (
          <div
            key={friend.id}
            className={`Friends_container ${isSelected ? "selected" : ""}`}
          >
            <div className="profile_pic_container">
              <img
                className="profile_pic"
                src={friend.image}
                alt={friend.name}
              />
            </div>
            <div style={{ width: "150px" }}>
              <h4>{friend.name}</h4>
              {friend.balance < 0 && (
                <p className="red">
                  You owe {friend.name} {Math.abs(friend.balance)}$
                </p>
              )}
              {friend.balance > 0 && (
                <p className="green">
                  {friend.name} owes you {Math.abs(friend.balance)}$
                </p>
              )}
              {friend.balance === 0 && <p>You and {friend.name} are even</p>}
            </div>
            <Button onClick={() => Onselected(friend)}>
              {isSelected ? "close" : "Select"}
            </Button>
          </div>
        );
      })}
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

function Split({ selected, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [userExpense, setExpense] = useState("");

  const paidBy = bill - userExpense;

  const [whoIsPaying, setwhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !userExpense) return;
    onSplitBill(whoIsPaying === "user" ? paidBy : -userExpense);
  }
  return (
    <div className="split_bill_container">
      <div className="Form_wrapper">
        <h2 style={{ paddingBottom: "20px" }}>
          SPLIT A BILL WITH {selected.name}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="input_container">
            <label>Bill value</label>
            <input
              type="number"
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
            />
          </div>
          <div className="input_container">
            <label>Your Expense</label>
            <input
              type="number"
              value={userExpense}
              onChange={(e) =>
                setExpense(
                  Number(e.target.value) > bill
                    ? userExpense
                    : Number(e.target.value)
                )
              }
            />
          </div>
          <div className="input_container">
            <label>{selected.name}'s userExpense</label>
            <input type="number" disabled value={paidBy} />
          </div>
          <div>
            <label>Who is paying the bill?</label>
            <select
              value={whoIsPaying}
              onChange={(e) => setwhoIsPaying(e.target.value)}
            >
              <option value="user">You</option>
              <option value="Friend">{selected.name}</option>
            </select>
          </div>
          <Button>Split bill</Button>
        </form>
      </div>
    </div>
  );
}
