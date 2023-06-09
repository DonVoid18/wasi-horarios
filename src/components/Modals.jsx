import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
const ModalCreateCourse = () => {
  const dispatch = useDispatch();
  const { isOpen, modalProps } = useSelector((state) => state.modal);

  const handleSubmit = (data) => {
    // do something with the form data
    // then close the modal
    dispatch(closeModal());
  };
  return (
    <div>
      <button
        onClick={() => dispatch(openModal({ title: "Agregar un nuevo curso" }))}
      >
        Abrir modal
      </button>
      <Modal isOpen={isOpen} onClose={() => dispatch(closeModal())}>
        <h2 className="text-2xl font-bold mb-2">{modalProps.title}</h2>
        <form onSubmit={handleSubmit}>// form fields here</form>
      </Modal>
    </div>
  );
};
