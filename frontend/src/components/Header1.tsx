import "../styles/header.css";

const Header1 = () => {
  const name = localStorage.getItem('name') || ""
  const id = localStorage.getItem('') || ""
  return (
    <div className="header-box">
      <div className="greeting-name">Welcome, {name}</div>
      <div className="uidno">UID-Fin{id.slice(2,10)}</div>
    </div>
  );
};

export default Header1;
