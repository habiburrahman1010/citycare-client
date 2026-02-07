import { useSearchParams, useNavigate } from "react-router";
import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BoostSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const issueId = searchParams.get("issueId");
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionId && issueId) {
            axiosSecure.patch("/issues/boost-success", { sessionId })
                .then(() => {
                    Swal.fire("Boost Successful!", "Your issue priority is now high.", "success");
                    navigate(`/issues/${issueId}`);
                })
                .catch(() => {
                    Swal.fire("Error", "Failed to update boost.", "error");
                    navigate(`/issues/${issueId}`);
                });
        }
    }, [sessionId, issueId]);

    return <p className="text-center mt-10">Processing boost...</p>;
};

export default BoostSuccess;
