import React,{useEffect} from 'react';
import Layout from './Layout';
import FormAddProducts from '../components/FormAddProcucts'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/AuthSlice'

const AddProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <FormAddProducts/>
    </Layout>
  )
}

export default AddProducts
