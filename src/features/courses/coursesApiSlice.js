import { apiSlice } from "../../app/api/apiSlice";
export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: (id) => `/boards/${id}/courses`,
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "Course", id: "LIST" },
              ...result.map(({ _id }) => ({ type: "Course", id: _id })),
            ]
          : [{ type: "Course", id: "LIST" }],
    }),
    addNewCourse: builder.mutation({
      query: ({ id, course }) => ({
        url: `/boards/${id}/courses`,
        method: "POST",
        body: course,
      }),
      invalidatesTags: [{ type: "Course", id: "LIST" }],
    }),
    updateCourse: builder.mutation({
      query: (updatedCourse) => ({
        url: `/boards/${id}/courses`,
        method: "PATCH",
        body: updatedCourse,
      }),
      invalidatesTags: [{ type: "Course", id: "LIST" }],
    }),
    deleteCourse: builder.mutation({
      query: ({ id, idBoard }) => ({
        url: `/boards/${id}/courses`,
        method: "DELETE",
      }),
      async onQueryStarted({ id, idBoard }, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getCourses", idBoard, (courses) => {
              // delete
              return courses?.filter((course) => course?._id !== id);
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useAddNewCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} = coursesApiSlice;
