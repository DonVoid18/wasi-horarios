import { useNavigate, useParams } from "react-router-dom";
import { useDeleteBoardMutation } from "../features/boards/boardsApiSlice";
import { useGetCoursesQuery } from "../features/courses/coursesApiSlice";

const TestTable = () => {
  const { id } = useParams();
  const [deleteBoard] = useDeleteBoardMutation();
  const { data: courses = [], isLoading, isError } = useGetCoursesQuery(id);
  const navigate = useNavigate();
  const handleDelete = () => {
    deleteBoard(id) // Agregar la opción { force: true }
      .unwrap()
      .then((res) => {
        console.log(res);
        navigate("/", { replace: true });
      });
  };
  console.log(isLoading);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  return (
    <div>
      <button className="btn bg-red-500" onClick={handleDelete}>
        Eliminar board
      </button>
    </div>
  );
};
export default TestTable;
