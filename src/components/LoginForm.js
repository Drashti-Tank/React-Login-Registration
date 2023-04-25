import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, /*Container*/ Row, /*Col*/ Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css' 
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
});

const Login = ({ setToggle }) => {
  const mynav = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    // try {
    //   await axios.post('https://real-pear-fly-kilt.cyclic.app/accounts/authenticate', values);
    //   setSuccess(true);
    //   setError(null);
    // } catch (error) {
    //   setSuccess(false);
    //   setError(error.response.data.message);
    // }
    axios.post('https://real-pear-fly-kilt.cyclic.app/accounts/authenticate', values)
      .then(response => {
        if (response.status === 200) {
          mynav('/profile')
          console.log(response);
          localStorage.setItem('TOKEN', JSON.stringify(response.data));
          setToggle(true);
          setSuccess(true);
          setError(null);
          toast.success('Login successful');

        }
      })

      .catch(error => {
        setSuccess(false);
        setError(error.response.data.message);
        toast.error('Invalid User');
      });

  };

  return (
    // <Container>
      <Row className="justify-content-lg-center mt-5">
        <Card className='col-6 justify-content-center shadow bg-offwhite p-4 m-5'>
          <Card.Title className='text-center'>Login Form</Card.Title>
          {/* <Col> */}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className='mt-2' controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" {...register('email')} />
                {errors.email && <Alert variant="danger">{errors.email.message}</Alert>}
              </Form.Group>

              <Form.Group className='mt-2' controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" {...register('password')} />
                {errors.password && <Alert variant="danger">{errors.password.message}</Alert>}
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">Login successful!</Alert>}

              <Button className='mt-2' variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          {/* </Col> */}
        </Card>
      </Row>
    // </Container>
  );
};

export default Login;
