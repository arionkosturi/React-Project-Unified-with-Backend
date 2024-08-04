import React from "react";
import Alert from "./Alert";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

function Buttons({
  handleHighlighted,
  CheckHighlighted,
  handleEdit,
  handleDelete,
  article,
}) {
  return (
    <div className="flex flex-row xl:flex-col gap-2 align-bottom justify-items-end">
      {/* Featured Article Button */}
      {article.isPublished && (
        <Alert
          handleFunction={handleHighlighted}
          alertTriggerButton={
            <div>
              <CheckHighlighted
                isHighlighted={
                  article.isHighlighted === true ? "Featured" : "Feature"
                }
                className={
                  article.isHighlighted === true
                    ? "border flex w-24 md:w-32 h-9 mt-2 px-2 bg-green-400 hover:bg-green-500 sm:flex justify-center gap-2"
                    : "border flex  w-24 md:w-32 h-9 mt-2 px-2 bg-amber-400 hover:bg-amber-500 sm:flex justify-center gap-2"
                }
              />
            </div>
          }
          alertTitle="Jeni i sigurt?"
          alertMessage={
            article.isPublished & article.isHighlighted &&
            "Deshiron ta heqesh artikullin highlighted?"
              ? article.isPublished &&
                (article.isHighlighted === true
                  ? "Deshiron ta heqesh artikullin nga Highlighted?"
                  : "Artikulli nuk eshte i publikuar dhe nuk do te shfaqet ne highlighted!")
              : "Deshiron ta besh artikullin Highlighted?"
          }
        />
      )}
      {!article.isPublished && (
        <div>
          <CheckHighlighted
            isHighlighted={
              article.isHighlighted === true ? "Featured" : "Feature"
            }
            className={
              article.isHighlighted === true
                ? "border opacity-50 w-20 md:w-32 h-9 mt-2 px-2 bg-green-500 hover:bg-green-500 flex justify-center gap-2"
                : "border opacity-50 w-20 md:w-32 h-9 mt-2 px-2 bg-amber-500 hover:bg-amber-500 flex justify-center gap-2"
            }
          />
        </div>
      )}

      <button
        onClick={handleEdit}
        className="border mt-2 w-20 md:w-32 h-9 flex bg-yellow-200 hover:bg-yellow-500 gap-2 justify-center "
      >
        <p className="py-1 ms-2 flex">Edit</p>
        <FaPencilAlt className="m-2 " />
      </button>

      {/* Delete Button */}
      <Alert
        handleFunction={handleDelete}
        alertTriggerButton={
          <div className="w-24 md:w-32 mt-2 hover:text-slate-100 text-white border h-9  flex bg-red-500 hover:bg-red-600 gap-2 justify-center ">
            <p className="py-1 ms-2 flex ">Delete</p>
            <FaTrash className="mt-2 me-2" />
          </div>
        }
        alertTitle="Jeni i sigurt?"
        alertMessage="Jeni duke fshire artikullin nga serveri. Jeni te sigurt per kete veprim?"
      />
    </div>
  );
}

export const PublishBtn = ({ handlePublish, article, CheckPublished }) => {
  return (
    <Alert
      handleFunction={handlePublish}
      alertTriggerButton={
        <div>
          <CheckPublished
            isPublished={
              article.isPublished === true ? "Published" : "Archived"
            }
            className={
              article.isPublished === true
                ? "border w-20 md:w-32 h-9 mt-2 px-2 bg-green-400 hover:bg-green-500 flex justify-center gap-2"
                : "border w-20 md:w-32 h-9 mt-2 px-2 bg-red-400 hover:bg-red-500 flex justify-center gap-2"
            }
          />
        </div>
      }
      alertTitle="Jeni i sigurt?"
      alertMessage={
        article.isPublished === true
          ? "Deshiron ta arkivosh artikullin?"
          : "Deshiron ta Publikosh artikullin?"
      }
    />
  );
};
export default Buttons;
