import { Link } from "react-router-dom";
const Board = ({ index, _id: id, nameBoard, createdAt }) => {
  const date = createdAt.substring(0, 10).split("-");
  // const [deleteBoard, { isLoading: isLoadingDel }] = useDeleteBoardMutation();
  // const [updateBoard, { isLoading: isLoadingUpd }] = useUpdateBoardMutation();

  // const handleDelete = async () => {
  //   try {
  //     await deleteBoard(id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const handleUpdate = async () => {
  //   await updateBoard({ id, nameBoard: nBoard })
  //     .unwrap()
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       setBoardNameUpd(false);
  //     });
  // };

  const colors = [
    "bg-gradient-to-r from-indigo-800 to-indigo-900",
    "bg-gradient-to-r from-blue-600 to-indigo-600",
    "bg-gradient-to-tl from-green-600 via-teal-600 to-blue-600",
    "bg-gradient-to-r from-gray-700 to-gray-800",
    "bg-gradient-to-r from-purple-700 to-indigo-700",
    "bg-gradient-to-r from-red-800 to-red-900",
    "bg-gradient-to-r from-green-700 to-teal-700",
    "bg-gradient-to-r from-gray-800 to-gray-900",
    "bg-gradient-to-r from-gray-800 to-gray-900",
    "bg-gradient-to-r from-red-800 to-red-900",
    "bg-gradient-to-r from-yellow-800 to-yellow-900",
    "bg-gradient-to-r from-green-800 to-green-900",
    "bg-gradient-to-r from-blue-800 to-blue-900",
  ];

  const bgColor = colors[index % colors.length];
  return (
    <Link
      to={`boards/${id}/courses`}
      className={`h-28 w-full px-5 py-4 rounded-default bg-gradient-to-tr ${bgColor} transition duration-300 ease-in-out hover:scale-105 focus:scale-105`}
    >
      <div className="w-full h-full flex flex-col justify-between">
        <h3 className="text-lg text-white font-semibold line-clamp-2">
          {nameBoard}
        </h3>
        <p className="text-right text-xs text-gray-100 font-semibold">
          {date[2]}/{date[1]}/{date[0]}
        </p>
      </div>
    </Link>
  );
};

export default Board;
