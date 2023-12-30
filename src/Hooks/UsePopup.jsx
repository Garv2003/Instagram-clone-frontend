// import React, { useState, useEffect, useRef } from "react";

// const Popup = ({ isOpen, handleClose, children }) => {
//   const showHideClassName = isOpen ? "modal display-block" : "modal display-none";

//   return (
//     <div className={showHideClassName}>
//       <section className="modal-main">
//         {children}
//         <button onClick={handleClose}>Close</button>
//       </section>
//     </div>
//   );
// };

// const App = () => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const popupRef = useRef(null);

//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (popupRef.current && !popupRef.current.contains(event.target)) {
//         setIsPopupOpen(false);
//       }
//     };

//     if (isPopupOpen) {
//       document.addEventListener("mousedown", handleOutsideClick);
//     } else {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, [isPopupOpen]);

//   const openPopup = () => {
//     setIsPopupOpen(true);
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//   };

//   return (
//     <div>
//       <h1>Hello React!</h1>
//       <button onClick={openPopup}>Open Popup</button>
//       <Popup isOpen={isPopupOpen} handleClose={closePopup} ref={popupRef}>
//         <h2>Popup Content</h2>
//         <p>This is a simple popup in React.</p>
//       </Popup>
//     </div>
//   );
// };

// export default App;