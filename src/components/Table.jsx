import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useGetCoursesQuery,
  useAddNewCourseMutation,
} from "../features/courses/coursesApiSlice";
import { useDeleteBoardMutation } from "../features/boards/boardsApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faTrashCan,
  faSquarePlus,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import Spinner from "./Spinner";
import { useForm } from "react-hook-form";
import ContainerCruces from "./ContainerCruces";
import BoardNotFound from "./BoardNotFound";
import SkeletonCourses from "./SkeletonCourses";
import { initTable } from "../components/TableOperation";
import { useModal } from "../hook/useModal";
const Table = () => {
  const [isModalOpen, setIsModalOpen, toggleModal] = useModal(false);
  const [isModalOpen2, setIsModalOpen2, toggleModal2] = useModal(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: courses = [], isLoading, isError } = useGetCoursesQuery(id);
  const [addNewCourse, { isLoading: isLoadNewCourse }] =
    useAddNewCourseMutation();
  const [deleteBoard, { isLoading: isLoadDeleteBoard }] =
    useDeleteBoardMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [viewTable, coursesCruces] = initTable(courses);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleDeleteBoard = () => {
    deleteBoard(id)
      .unwrap()
      .then(() => {
        setModalOpen1(false);
        navigate("/", { replace: true });
      });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    const course = {
      nameCourse: data.nameCourse,
      timeCourseOpen: data.openCourse,
      timeCourseClosed: data.finishCourse,
      dayWeek: data.dayWeek,
    };
    addNewCourse({ id, course })
      .unwrap()
      .then(() => {
        handleCloseModal();
        reset();
      });
  };

  if (isLoading) return <SkeletonCourses />;
  if (isError) return <BoardNotFound />;
  return (
    <div className="w-full px-5">
      <Modal isOpen={isModalOpen} onClose={() => toggleModal()}>
        <h2 className="text-2xl font-bold mb-2">Agregar un nuevo curso</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <div>
              <label
                htmlFor="nameCourse"
                className="flex items-center text-base font-semibold"
              >
                {errors.nameCourse && (
                  <span className="text-xs text-error">
                    {errors.nameCourse?.message}
                  </span>
                )}
              </label>
              <div className="relative mt-1">
                <input
                  id="nameCourse"
                  {...register("nameCourse", {
                    required: "Este campo es requerido",
                    minLength: {
                      value: 5,
                      message: "Como minimo 5 caracteres",
                    },
                  })}
                  placeholder="Nombre del curso"
                  className="input"
                  type="text"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="openCourse"
                className="flex items-center text-base font-semibold"
              >
                {errors.openCourse && (
                  <span className="text-xs text-error">
                    {errors.openCourse?.message}
                  </span>
                )}
              </label>
              <div className="relative mt-1">
                <input
                  id="openCourse"
                  {...register("openCourse", {
                    required: "Este campo es requerido",
                    minLength: {
                      value: 5,
                      message: "Como minimo 5 caracteres",
                    },
                  })}
                  placeholder="Hora de inicio"
                  className="input"
                  type="text"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="finishCourse"
                className="flex items-center text-base font-semibold"
              >
                {errors.finishCourse && (
                  <span className="text-xs text-error">
                    {errors.finishCourse?.message}
                  </span>
                )}
              </label>
              <div className="relative mt-1">
                <input
                  id="finishCourse"
                  {...register("finishCourse", {
                    required: "Este campo es requerido",
                    minLength: {
                      value: 5,
                      message: "Como minimo 5 caracteres",
                    },
                  })}
                  placeholder="Hora de cierre"
                  className="input"
                  type="text"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="dayWeek"
                className="flex items-center text-base font-semibold"
              >
                {errors.dayWeek && (
                  <span className="text-xs text-error">
                    {errors.dayWeek?.message}
                  </span>
                )}
              </label>
              <div className="relative mt-1">
                <input
                  id="dayWeek"
                  {...register("dayWeek", {
                    required: "Este campo es requerido",
                    minLength: {
                      value: 1,
                      message: "Como minimo 1 caracter",
                    },
                  })}
                  placeholder="Día de la semana"
                  className="input"
                  type="text"
                />
              </div>
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
              disabled={isLoadNewCourse}
              className={`btn-modal bg-primary ${
                isLoadNewCourse && "cursor-no-drop"
              }`}
            >
              {isLoadNewCourse ? (
                <span className="w-full flex justify-center">
                  <Spinner />
                </span>
              ) : (
                "Añadir"
              )}
            </button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={isModalOpen2} onClose={() => toggleModal2()}>
        <div>
          <h2 className="text-2xl font-bold mb-2">
            ¿Seguro de eliminar este board?
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setModalOpen1(!modalOpen1)}
              className="btn-modal bg-black text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoadDeleteBoard}
              onClick={handleDeleteBoard}
              className={`btn-modal bg-error text-white ${
                isLoadDeleteBoard && "cursor-no-drop"
              }`}
            >
              {isLoadDeleteBoard ? (
                <span className="w-full flex justify-center">
                  <Spinner />
                </span>
              ) : (
                "Eliminar"
              )}
            </button>
          </div>
        </div>
      </Modal>
      <div className="flex gap-2 pb-3 justify-between items-center">
        <div className="flex">
          <div className="text-2xl flex justify-center items-center gap-3">
            <div>
              <FontAwesomeIcon icon={faTable} />
            </div>
            <div className="font-bold rounded-md">CICLO 20</div>
            {isLoadNewCourse && (
              <span>
                <Spinner />
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <div>
            <button
              onClick={() => toggleModal()}
              className="btn-modal flex gap-2 bg-[#2247ff] text-white "
            >
              <span>
                <FontAwesomeIcon icon={faSquarePlus} />
              </span>
              <span>Nuevo curso</span>
            </button>
          </div>
          <div>
            <button className="btn-modal flex gap-2 bg-green-500 text-white">
              <span>
                <FontAwesomeIcon icon={faPrint} />
              </span>
              <span>Imprimir</span>
            </button>
          </div>
          <div>
            <button
              onClick={() => toggleModal2()}
              className="btn-modal bg-delete text-white"
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-0.5">
        <div className="w-full grid grid-cols-7 text-center gap-0.5">
          <div className="p-3 rounded-default text-base font-semibold tracking-wider text-white bg-black">
            LUNES
          </div>
          <div className="p-3 rounded-default text-base font-semibold tracking-widest text-white bg-black">
            MARTES
          </div>
          <div className="p-3 rounded-default text-base font-semibold tracking-widest text-white bg-black">
            MIÉRCOLES
          </div>
          <div className="p-3 rounded-default text-base font-semibold tracking-widest text-white bg-black">
            JUEVES
          </div>
          <div className="p-3 rounded-default text-base font-semibold tracking-widest text-white bg-black">
            VIERNES
          </div>
          <div className="p-3 rounded-default text-base font-semibold tracking-widest text-white bg-black">
            SÁBADO
          </div>
          <div className="p-3 rounded-default text-base font-semibold tracking-widest text-white bg-black">
            DOMINGO
          </div>
        </div>
        <div className={`grid grid-cols-7 gap-0.5`}>{viewTable}</div>
      </div>
      {coursesCruces?.length ? (
        <ContainerCruces data={coursesCruces} />
      ) : undefined}
    </div>
  );
};

export default Table;
