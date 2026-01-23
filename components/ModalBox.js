export default function ModalBox({ setModalBox, children }) {
  return (
    <>
      <div className="echo" onClick={() => setModalBox("none")}>
        <div className="ModalBox" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </>
  );
}
