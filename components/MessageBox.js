export default function MessageBox({ setModalBox, message }) {
  const modalClose = () => {
    setModalBox("none");
  };
  return (
    <div className="MessageBox">
      <p className="message">{message}</p>
      <button id="send" onClick={modalClose}>
        Закрыть
      </button>
    </div>
  );
}
