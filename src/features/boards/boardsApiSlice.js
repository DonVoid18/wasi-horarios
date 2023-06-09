import { apiSlice } from "../../app/api/apiSlice";

export const boardsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => "/boards",
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "Board", id: "LIST" },
              ...result.map(({ _id }) => ({ type: "Board", id: _id })),
            ]
          : [{ type: "Board", id: "LIST" }],
    }),
    addNewBoard: builder.mutation({
      query: (newBoard) => ({
        url: "/boards",
        method: "POST",
        body: newBoard,
      }),
      invalidatesTags: [{ type: "Board", id: "LIST" }],
    }),
    updateBoard: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: "/boards",
        method: "PATCH",
        body: { id, ...patch },
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            apiSlice.util.updateQueryData("getBoards", undefined, (draft) => {
              let a = draft?.find((board) => board?._id === args?.id);
              a.nameBoard = args?.nameBoard;
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    deleteBoard: builder.mutation({
      query: (id) => ({
        url: `/boards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => {
        return [
          { type: "Board", id: arg },
          { type: "Course", id: "LIST" },
        ];
      },
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useAddNewBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardsApiSlice;
