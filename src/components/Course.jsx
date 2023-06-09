import Spinner from "./Spinner";
import { useDeleteCourseMutation } from "../features/courses/coursesApiSlice";
const Course = ({
  _id,
  nameCourse,
  board,
  timeCourseOpen,
  timeCourseClosed,
  funtModal,
}) => {
  // const [deleteCourse, { isLoading: isLoadingDel }] = useDeleteCourseMutation();
  // const handleDelete = () => {
  //   deleteCourse({ id, idBoard: board })
  //     .unwrap()
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const transformHor = (value) => {
    const hor = value.split(":");
    const suma = parseInt(hor[0]) * 60 + parseInt(hor[1]);
    if (suma >= 720) {
      let res = `${parseInt(hor[0]) - 12}`;

      if (suma >= 720 && suma <= 779) {
        res = `${parseInt(hor[0])}`;
      }
      // tarde
      return res.length === 1 ? `0${res}:${hor[1]} pm` : `${res}:${hor[1]} pm`;
    } else {
      // mañana
      return `${value} am`;
    }
  };

  return (
    <div
      onClick={() => {
        console.log("Abriendo modal con id " + _id);
        funtModal;
      }}
      className="transition duration-200 ease-in-out hover:bg-gray-300 cursor-pointer w-full flex flex-col justify-center items-center gap-1 h-28 rounded-default px-3 py-2 bg-[#e9ecef]"
    >
      <h2 className="font-extrabold text-lg text-center line-clamp-2">
        {nameCourse}
      </h2>
      <p className="text-center font-medium">
        {transformHor(timeCourseOpen)} - {transformHor(timeCourseClosed)}
      </p>
    </div>
  );
};
export default Course;
