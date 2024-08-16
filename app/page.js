"use client";
import React, { useEffect, useState } from "react";
import Chip from "@/Components/Chip/Chip";
import Table from "@/Components/Table/Table";
import moment from "moment";
import Status from "@/Components/Chip/Status";
import Pagination from "@/Components/Pagination/Pagination";
import Drawer from "@/Components/Drawer/Drawer";
import Filter from "@/Components/Filter";

const Page = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;
  const [filters, setFilters] = useState({
    status: "",
    paymentStatus: "",
    deliveryMethod: "",
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const columns = [
    { Header: "Order Id", accessor: (row) => row._id.$oid },
    {
      Header: "Creating date",
      accessor: (row) => `${moment(row?.createdAt?.$date).format("MMM Do YY")}`,
    },
    {
      Header: "Customer info",
      accessor: (row) => (
        <div>
          <h2>{row.shipping?.name}</h2>
          <h2 className="text-[#E46A11]">{row.shipping?.phone}</h2>
          <h2>{row.shipping?.address}</h2>
        </div>
      ),
    },
    { Header: "Total", accessor: (row) => ` ${row?.totalAmount.grandTotal}` },
    { Header: "Quantity", accessor: (row) => `${row.products?.length} items` },
    {
      Header: "Payment status",
      accessor: (row) => (
        <div>
          <Status status={row?.payment?.status} />
        </div>
      ),
    },
    {
      Header: "Delivery method",
      accessor: (row) => row.delivery.deliveryMethod,
    },
    {
      Header: "Status",
      accessor: (row) => (
        <div className="rounded-lg w-fit p-2 bg-[#E5EFFF]">
          <h2 className="text-sm font-semibold text-[#667085]">
            {row?.status}
          </h2>
        </div>
      ),
    },
    {
      Header: "+",
      accessor: (row) => (
        <div className="rounded-lg w-fit p-2 bg-[#E5EFFF] flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_1_1722"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="25"
              height="24"
            >
              <path
                d="M24.0039 0L24.0039 24L0.00390139 24L0.00390244 -1.04907e-06L24.0039 0Z"
                fill="white"
              />
            </mask>
            <g mask="url(#mask0_1_1722)">
              <path
                d="M16.0039 12C16.0039 13.1 16.9039 14 18.0039 14C19.1039 14 20.0039 13.1 20.0039 12C20.0039 10.9 19.1039 10 18.0039 10C16.9039 10 16.0039 10.9 16.0039 12ZM14.0039 12C14.0039 10.9 13.1039 10 12.0039 10C10.9039 10 10.0039 10.9 10.0039 12C10.0039 13.1 10.9039 14 12.0039 14C13.1039 14 14.0039 13.1 14.0039 12ZM8.00391 12C8.00391 10.9 7.10391 10 6.00391 10C4.90391 10 4.00391 10.9 4.00391 12C4.00391 13.1 4.90391 14 6.00391 14C7.10391 14 8.00391 13.1 8.00391 12Z"
                fill="#2166F0"
              />
            </g>
          </svg>
        </div>
      ),
    },
  ];

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    async function fetchOrders() {
      const query = new URLSearchParams({
        page: currentPage,
        limit: pageSize,
        ...filters,
      }).toString();

      const res = await fetch(`/api/orders?${query}`);
      const { data, meta } = await res.json();

      setOrders(data);
      setTotalPages(meta?.totalPages);
    }

    fetchOrders();
  }, [currentPage, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="conatiner m-5 bg-white rounded">
      <div className="grid grid-cols-12 gap-4 mx-auto">
        <div className="flex items-center md:col-span-2 col-span-12 border border-[fontColor] rounded p-3 fontColor">
          <div className="flex gap-2 items-center">
            <svg
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.5 1.49999C5.5 1.03975 5.1269 0.666656 4.66667 0.666656C4.20643 0.666656 3.83333 1.03975 3.83333 1.49999H3C1.61929 1.49999 0.5 2.61928 0.5 3.99999V14.8333C0.5 16.214 1.61929 17.3333 3 17.3333H13C14.3807 17.3333 15.5 16.214 15.5 14.8333V3.99999C15.5 2.61928 14.3807 1.49999 13 1.49999H12.1667C12.1667 1.03975 11.7936 0.666656 11.3333 0.666656C10.8731 0.666656 10.5 1.03975 10.5 1.49999H5.5ZM13.8333 4.83332V3.99999C13.8333 3.53975 13.4602 3.16666 13 3.16666H12.1667C12.1667 3.62689 11.7936 3.99999 11.3333 3.99999C10.8731 3.99999 10.5 3.62689 10.5 3.16666H5.5C5.5 3.62689 5.1269 3.99999 4.66667 3.99999C4.20643 3.99999 3.83333 3.62689 3.83333 3.16666H3C2.53976 3.16666 2.16667 3.53975 2.16667 3.99999V4.83332H13.8333ZM2.16667 6.49999V14.8333C2.16667 15.2936 2.53976 15.6667 3 15.6667H13C13.4602 15.6667 13.8333 15.2936 13.8333 14.8333V6.49999H2.16667Z"
                fill="#667085"
              />
            </svg>
            <h2>Select Date</h2>
          </div>
        </div>
        <div className="md:col-span-9 col-span-12">
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-4 border border-[fontColor] rounded-l p-3">
              <h2 className="fontColor">Total Revenue</h2>
              <h3 className="font-bold text-black">$12,084</h3>
            </div>
            <div className="col-span-4 border border-[fontColor] p-3">
              <h2 className="fontColor">Order item</h2>
              <h3 className="font-bold text-black">184</h3>
            </div>
            <div className="col-span-4 border border-[fontColor] rounded-r p-3">
              <h2 className="fontColor">Return item</h2>
              <h3 className="font-bold text-black">12</h3>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-3" />
      {/* filter chip */}
      <div className="grid grid-cols-12 gap-3 mx-auto">
        <div className="md:col-span-8 col-span-12">
          <div className="grid grid-cols-12 gap-3">
            <div className="md:col-span-2 col-span-12 max-w-fit border rounded py-1 flex items-center px-1 bg-[selectedChip]">
              <Chip title="All orders" count="340" type={true} />
            </div>
            <div className="md:col-span-2 col-span-12 max-w-fit border rounded py-2 px-1">
              <Chip title="Processing" count="2" />
            </div>
            <div className="md:col-span-2 col-span-12 max-w-fit border rounded py-2 px-1">
              <Chip title="Confirmed" count="67" />
            </div>
            <div className="md:col-span-2 col-span-12 max-w-fit border rounded py-2 px-1">
              <Chip title="Shipping" count="32" />
            </div>
          </div>
        </div>
        <div className="md:col-span-3 col-span-12">
          <div className="grid grid-cols-12 gap-3 mx-auto">
            <div className="md:col-span-8 col-span-12 flex items-center gap-2 border px-3  py-2 rounded fontColor">
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1_1622)">
                  <path
                    d="M14.9387 13.1748L11.1576 9.39365C11.1574 9.39344 11.1574 9.39311 11.1576 9.39292C11.967 8.43835 12.4373 7.24252 12.4951 5.99234C12.6578 2.60531 9.96249 -0.121083 6.57384 0.0041482C3.589 0.117127 1.19525 2.51087 1.08227 5.49571C0.957068 8.88439 3.68349 11.5797 7.07055 11.4169C8.32067 11.359 9.51643 10.8887 10.471 10.0794C10.4712 10.0792 10.4715 10.0792 10.4718 10.0794L14.253 13.8606C14.4438 14.0485 14.7509 14.0461 14.9387 13.8553C15.1246 13.6665 15.1246 13.3636 14.9387 13.1748ZM2.17123 6.81197C1.79898 5.15032 2.28522 3.51042 3.43691 2.35876C4.5886 1.20709 6.22845 0.720828 7.89015 1.0931C9.46227 1.44541 11.0563 3.03931 11.4086 4.61128C11.7811 6.27311 11.2948 7.9132 10.1431 9.06495C8.99132 10.2167 7.35115 10.703 5.68932 10.3305C4.11735 9.9781 2.52354 8.38396 2.17123 6.81197Z"
                    fill="#05060F"
                    fillOpacity="0.6"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_1622">
                    <rect width="15.0769" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <h2>Searching order...</h2>
            </div>
            <div
              className="md:col-span-4 col-span-12 mx-auto cursor-pointer"
              onClick={toggleDrawer}
            >
              <div className="border rounded p-2 flex items-center gap-2">
                <svg
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0026 8.16146H4.0026C3.6026 8.16146 3.33594 7.89479 3.33594 7.49479C3.33594 7.09479 3.6026 6.82812 4.0026 6.82812H12.0026C12.4026 6.82812 12.6693 7.09479 12.6693 7.49479C12.6693 7.89479 12.4026 8.16146 12.0026 8.16146Z"
                    fill="#05060F"
                    fillOpacity="0.6"
                  />
                  <path
                    d="M10.0026 12.1615H6.0026C5.6026 12.1615 5.33594 11.8948 5.33594 11.4948C5.33594 11.0948 5.6026 10.8281 6.0026 10.8281H10.0026C10.4026 10.8281 10.6693 11.0948 10.6693 11.4948C10.6693 11.8948 10.4026 12.1615 10.0026 12.1615Z"
                    fill="#05060F"
                    fillOpacity="0.6"
                  />
                  <path
                    d="M14.0026 4.16146H2.0026C1.6026 4.16146 1.33594 3.89479 1.33594 3.49479C1.33594 3.09479 1.6026 2.82812 2.0026 2.82812H14.0026C14.4026 2.82812 14.6693 3.09479 14.6693 3.49479C14.6693 3.89479 14.4026 4.16146 14.0026 4.16146Z"
                    fill="#05060F"
                    fillOpacity="0.6"
                  />
                </svg>
                <p className="fontColor font-bold">Filters</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer}>
        <div className="my-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Filters your orders</h2>
            <h2
              className="textColor underline cursor-pointer"
              onClick={() => {
                setFilters({
                  status: "",
                  paymentStatus: "",
                  deliveryMethod: "",
                });
              }}
            >
              Reset
            </h2>
          </div>
          <div onClick={toggleDrawer} className="cursor-pointer">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1725 9.99394C11.498 10.3194 11.498 10.847 11.1725 11.1724C10.8471 11.4979 10.3194 11.4979 9.994 11.1724L5.99995 7.17845L2.00601 11.1725C1.68058 11.4979 1.15294 11.4979 0.8275 11.1725C0.502061 10.847 0.502056 10.3194 0.82749 9.99396L4.82143 5.99995L0.827331 2.00592C0.501891 1.68049 0.501893 1.15285 0.827332 0.82742C1.15277 0.501986 1.68041 0.501984 2.00585 0.827419L5.99993 4.82143L9.99386 0.827434C10.3193 0.501994 10.8469 0.50199 11.1724 0.827425C11.4978 1.15286 11.4978 1.68049 11.1724 2.00593L7.17845 5.99993L11.1725 9.99394Z"
                fill="#858D9D"
              />
            </svg>
          </div>
        </div>
        <Filter onFilterChange={handleFilterChange} />
      </Drawer>
      <hr className="my-3" />
      <Table
        columns={columns}
        data={orders}
        pageSize={pageSize}
        currentPage={currentPage}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      
    </div>
  );
};

export default Page;
