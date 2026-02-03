import { useSearchParams, useNavigate } from 'react-router';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import UseAuth from '../../../hooks/UseAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccessfull = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId || !user?.email) return;

    axiosSecure
      .patch('/premium-success', {
        sessionId,
        email: user.email,
      })
      .then(() => {
        Swal.fire('Success', 'You are now Premium!', 'success');
        navigate('/dashboard/profile');
      })
      .catch(err => {
        console.log(err);
        Swal.fire('Error', 'Payment verification failed', 'error');
      });
  }, [sessionId, user, axiosSecure, navigate]);

  return <p className="p-6 text-center">Processing payment...</p>;
};

export default PaymentSuccessfull;
