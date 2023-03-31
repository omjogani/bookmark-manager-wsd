import { useState, useEffect } from "react";
import React from "react";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import Bookmarks from "./scenes/bookmarks";
import Form from "./scenes/form";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddBookmark from "./scenes/bookmarks/AddBookmark";
import AddBookmarkGroup from "./scenes/bookmark_group/AddBookmarkGroup";
import UpdateBookmark from "./scenes/bookmarks/UpdateBookmark";

export default function Wrapper() {
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData == null) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/addbookmarkgroup" element={<AddBookmarkGroup />} />
          <Route path="/addbookmark" element={<AddBookmark />} />
          <Route path="/updatebookmark" element={<UpdateBookmark />} />
          <Route path="/contact" element={<Form />} />
        </Routes>
      </main>
    </div>
  );
}
