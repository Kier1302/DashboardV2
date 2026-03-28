import { useState, useEffect } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";


const ApproveRejectFiles = () => {
  const [files, setFiles] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await api.get("/api/files");
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleFileStatus = async (id, status) => {
    const commentText = comments[id] || '';
    try {
      await api.put(`/api/files/${id}`, { status, comment: commentText });
      // Clear comment
      setComments(prev => {
        const newCom = { ...prev };
        delete newCom[id];
        return newCom;
      });
      fetchFiles();
    } catch (error) {
      console.error("Error updating file status:", error);
    }
  };

  return (
    <>
      <Navbar /> {/* ✅ Navbar added here */}
      <div className="approval-section">
        <div className="page-container">
          <h3>✅ Approve / ❌ Reject Files</h3>
          <table>
            <thead>
              <tr>
                <th>File Name / URL</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {files.filter((file) => file.status === "pending").length > 0 ? (
                files
                  .filter((file) => file.status === "pending")
                  .map((file) => (
                    <tr key={file._id}>
                      <td>
                        {file.type === "file" ? (
                          <a
                            href={`${api.defaults.baseURL}${file.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {file.name}
                          </a>
                        ) : (
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {file.url}
                          </a>
                        )}
                        {file.comments && file.comments.length > 0 && (
                          <div style={{ marginTop: '10px', fontSize: '0.85em', color: '#666' }}>
                            {file.comments.map((c, index) => (
                              <div key={index} style={{ marginBottom: '4px' }}>
                                <strong>{c.author}</strong> <em>({new Date(c.timestamp).toLocaleString()})</em>: {c.text}
                              </div>
                            ))}
                          </div>
                        )}
                        <textarea
                          value={comments[file._id] || ''}
                          onChange={(e) => setComments(prev => ({ ...prev, [file._id]: e.target.value }))}
                          placeholder="Add comment (optional)"
                          rows={2}
                          style={{ width: '100%', marginTop: '8px', padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                      </td>
                      <td>
                        <button onClick={() => handleFileStatus(file._id, "accepted")}>
                          ✅ Accept
                        </button>
                        <button onClick={() => handleFileStatus(file._id, "rejected")}>
                          ❌ Reject
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="2">⚠️ No pending files.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ApproveRejectFiles;
