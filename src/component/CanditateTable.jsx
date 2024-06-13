import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./table.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function CandidateTable() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios
      .get("https://jobapi.abhiseducampus.com/api/candidates/all")
      .then((response) => {
        setCandidates(response.data);
      });
  }, []);

  const handleDeleteCandidate = (id) => {
    axios
      .delete(`https://jobapi.abhiseducampus.com/api/candidates/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setCandidates((prevCandidates) =>
            prevCandidates.filter((candidate) => candidate._id !== id)
          );
          toast.success("Candidate deleted successfully", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          console.error("Failed to delete candidate.");
          toast.error("Failed to delete candidate", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting candidate:", error);
        toast.error("Error deleting candidate", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Candidate List</h1>
        <div className="export-button">
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            table="table-to-export"
            filename="candidates"
            sheet="candidates"
            buttonText="Export to Excel"
          />
        </div>
      </div>

      <div className="table-container">
        <div className="table-scroll">
          <table id="table-to-export" className="min-w-full table-auto border">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Job Role</th>
                <th>Slot</th>
                <th>Resumes</th>
                <th>Academic Qualification</th>
                <th>College Name</th>
                <th>Percentage</th>
                <th>Skills</th>
                <th>Experience</th>
                <th>Certification</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Address</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate._id}>
                  <td>{candidate.name}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.mobile}</td>
                  <td>{candidate.jobrole}</td>
                  <td>{candidate.slot}</td>
                  <td>
                    <button>
                      <a
                        href={`https://jobapi.abhiseducampus.com/${candidate.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume
                      </a>
                    </button>
                  </td>
                  <td>{candidate.academicQualification}</td>
                  <td>{candidate.collegeName}</td>
                  <td>{candidate.percentage}</td>
                  <td>{candidate.skills}</td>
                  <td>
                    {candidate.experiencebox ? candidate.experience : "No"}
                  </td>
                  <td>
                    {candidate.Completion ? candidate.certification : "No"}
                  </td>
                  <td>{candidate.gender}</td>
                  <td>{candidate.dob}</td>
                  <td>{candidate.address}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteCandidate(candidate._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default CandidateTable;
