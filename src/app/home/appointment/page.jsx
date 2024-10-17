"use client";
import React, { useEffect, useContext, useMemo, useState } from "react";
import { PostContext } from "../../context/PostContext";
import { useTable, useSortBy, usePagination, useGlobalFilter } from "react-table";

const Patient = () => {
  const [data, setData] = useState([]);
  const { userData } = useContext(PostContext);

  // Define the columns for the table
  const columns = useMemo(
    () => [
      {
        Header: "Patient ID",
        accessor: "patient_id", // maps to patient_id in the fetched data
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Contact",
        accessor: "contact",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Symptoms",
        accessor: "symptoms",
      },
      {
        Header: "Email",
        accessor: "email",
      },
    ],
    []
  );

  const emp_id = userData?.emp_id;
  console.log(emp_id);

  useEffect(() => {
    if (emp_id) {
      fetch(`http://localhost:3000/api/user/login?emp_id=${emp_id}`)
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setData(result);
        });
    }
  }, [emp_id]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    prepareRow,
    setPageSize,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

  const { pageIndex, pageSize, globalFilter } = state;

  return (
    <div className="px-4 py-2 sm:px-8 sm:py-4 lg:px-12 lg:py-6">
      <div className="table-container border border-gray-300 rounded-lg overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mx-4 mt-2 pb-2">
          <h1 className="text-xl font-semibold">Patient Details</h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pb-2 mx-4 mt-2">
          <div className="flex items-center gap-1 mb-2 sm:mb-0">
            <span>Show</span>
            <select
              className="select select-bordered select-sm"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[5, 10, 15, 20].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <span>Entries</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 input input-sm input-bordered">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={globalFilter || ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table {...getTableProps()} className="table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={column.id} // Added key here
                      className="text-center text-base"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={row.original.patient_id}> {/* Added key here */}
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} key={cell.column.id} className="text-center"> {/* Added key here */}
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-2">
            <div>
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                className="btn btn-square btn-outline btn-sm"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                {"<<"}
              </button>
              <button
                className="btn btn-outline btn-primary btn-sm"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </button>
              <button
                className="btn btn-outline btn-primary btn-sm"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next
              </button>
              <button
                className="btn btn-square btn-outline btn-sm"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;
