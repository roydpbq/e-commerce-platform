import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // get current route
  const { search } =  useLocation();
  // parse the path
  const sp = new URLSearchParams(search);
  // get redirect path. get '/' if the path doesn't exist
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if(userInfo){
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      const res = await login({ email, password }).unwrap();
      // Testing
      console.log(res);
      // 
      dispatch(setCredentials({ ...res, }));
      navigate(redirect);
    }catch(err){
      toast.error(err?.data?.message || err.error);
      // Testing
      console.log(`Error message : ${err}`);
      //
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Button 
          type='submit' 
          variant='primary' 
          className='mt-2' 
          disabled={ isLoading }
        >
          Sign In
        </Button>

        { isLoading && <Loader /> }
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={ redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;