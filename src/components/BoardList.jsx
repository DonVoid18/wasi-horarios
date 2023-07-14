import Board from "./Board";
import {
  useGetBoardsQuery,
  useAddNewBoardMutation,
} from "../features/boards/boardsApiSlice";
import Spinner from "./Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBorderAll } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
const BoardList = () => {
  const { data: boards, isLoading } = useGetBoardsQuery();
  const [addNewBoard, { isLoading: isLoadNewBoard }] = useAddNewBoardMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    addNewBoard({ nameBoard: data.nameBoard })
      .unwrap()
      .then(() => {
        handleCloseModal();
        reset();
      });
  };
  return (
    <div>
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <h2 className="text-2xl font-bold mb-2">Crear nuevo board</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <label
              htmlFor="nameBoard"
              className="flex items-center text-base font-semibold"
            >
              {errors.nameBoard && (
                <span className="text-xs text-error">
                  {errors.nameBoard?.message}
                </span>
              )}
            </label>
            <div className="relative mt-1">
              <input
                id="nameBoard"
                {...register("nameBoard", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 5,
                    message: "Como minimo 5 caracteres",
                  },
                })}
                placeholder="Nombre del board"
                className="input"
                type="text"
              />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleCloseModal}
              className="btn-modal bg-black text-white"
            >
              Salir
            </button>
            <button
              type="submit"
              disabled={isLoadNewBoard}
              className={`btn-modal bg-primary ${
                isLoadNewBoard && "cursor-no-drop"
              }`}
            >
              {isLoadNewBoard ? (
                <span className="w-full flex justify-center">
                  <Spinner />
                </span>
              ) : (
                "¡Listo!"
              )}
            </button>
          </div>
        </form>
      </Modal>
      <div>
        <h2 className="text-2xl font-bold flex gap-3 items-center dark:text-white">
          <FontAwesomeIcon icon={faBorderAll} />
          <span>MIS TABLEROS</span>
          {isLoading && (
            <span>
              <Spinner />
            </span>
          )}
        </h2>
      </div>
      <div className="grid grid-cols-5 gap-5 pt-5">
        <button
          onClick={handleOpenModal}
          className="h-28 text-3xl text-gray-300 rounded-default border-dashed border-gray-300 border-4 cursor-pointer flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        {boards?.map((board, index) => (
          <Board key={index} index={index} {...board}></Board>
        ))}
      </div>
    </div>
  );
};

export default BoardList;
