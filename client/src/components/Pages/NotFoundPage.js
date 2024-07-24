import React from "react";
import { Link } from "react-router-dom";
function NotFoundPage() {
  return (
    <div className="container text-center mx-auto">
      <h1 className="text-5xl p-10">
        <span className="text-red-600">Error 404 </span>
        <br />
        NOT FOUND
      </h1>
      {/* Me link navigojme pa bere refresh faqen
            ndersa me a href behet refresh faqja
            */}
      <Link className="py-1 px-2 border shadow hover:bg-slate-50" to="/">
        Go home
      </Link>
    </div>
  );
}

export default NotFoundPage;
