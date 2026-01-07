function MessageBox({ setModalBox, message }) {
  const modalClose = () => {
    setModalBox("none");
    // window.location.href = "/";
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

export default MessageBox;
