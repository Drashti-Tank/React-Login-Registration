import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Alert, Row, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'The passwords do not match').required('Please confirm your password'),
  acceptTerms: yup.bool().oneOf([true], 'You must accept the terms and conditions')
});

function RegistrationForm() {
  const mynav = useNavigate();

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) });
  const [submitError, setSubmitError] = useState('');

  const onSubmit = (data) => {
    // try {
    //   // Make API call here to submit the form data
    //   const response = await fetch('https://real-pear-fly-kilt.cyclic.app/accounts/register', {
    //     method: 'POST',
    //     headers: { 
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    //   });

    //   if (!response.ok) {
    //     throw new Error('Failed to submit form data');
    //   }
    //   setSubmitError('');
    // } catch (error) {
    //   setSubmitError(error.message);
    // }

    // API call
    axios.post('https://real-pear-fly-kilt.cyclic.app/accounts/register', data)
      .then(response => {
        if (response.status === 200) {
          toast.success('Registration successful');
          mynav('/login')
        }
      })
      .catch(error => {
        if (error.response) {
          // handle response error
          const errorData = error.response.data;
          setSubmitError(errorData.errorMsg);
        } else if (error.request) {
          // handle request error
          setSubmitError("Request failed. Please try again later.");
        } else {
          // handle other error
          setSubmitError("Something went wrong. Please try again later.");
        }
      });

    console.log(data);
  };

  return (
    <Row className='col-lg-12 justify-content-center bg-white mt-4'>
      <Card className='col-lg-6 shadow bg-offwhite p-4 m-5'>
        <Card.Title className='text-center'>Registration Form</Card.Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mt-2' controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Select your title </option>
              <option value="1">Mr.</option>
              <option value="2">Mrs.</option>
              <option value="3">Ms.</option>
            </Form.Select>
            {/* <Form.Control type="text" placeholder="Title" {...register('title')} isInvalid={errors.title} /> */}
            {errors.title && <Form.Control.Feedback type="invalid">{errors.title.message}</Form.Control.Feedback>}
          </Form.Group>
          <Form.Group className='mt-2' controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your first name" {...register('firstName')} isInvalid={errors.firstName} />
            {errors.firstName && <Form.Control.Feedback type="invalid">{errors.firstName.message}</Form.Control.Feedback>}
          </Form.Group>
          <Form.Group className='mt-2' controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your last name" {...register('lastName')} isInvalid={errors.lastName} />
            {errors.lastName && <Form.Control.Feedback type="invalid">{errors.lastName.message}</Form.Control.Feedback>}
          </Form.Group>
          <Form.Group className='mt-2' controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" {...register('email')} isInvalid={errors.email} />
            {errors.email && <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>}
          </Form.Group>
          {/* <Form.Group controlId="phoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="tel" placeholder="Enter your phone number" {...register('phoneNumber')} isInvalid={errors.phoneNumber} />
        {errors.phoneNumber && <Form.Control.Feedback type="invalid">{errors.phoneNumber.message}</Form.Control.Feedback>}
      </Form.Group> */}
          <Form.Group className='mt-2' controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters long' } })} isInvalid={errors.password} />
            {errors.password && <Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>}
          </Form.Group>
          <Form.Group className='mt-2' controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm your password" {...register('confirmPassword', { validate: (value) => value === watch('password') || 'The passwords do not match' })} isInvalid={errors.confirmPassword} />
            {errors.confirmPassword && <Form.Control.Feedback type="invalid">{errors.confirmPassword.message}</Form.Control.Feedback>}
          </Form.Group>
          <Form.Group className='mt-2' controlId="acceptTerms">
            <Form.Check type="checkbox" label="I accept the terms and conditions" {...register('acceptTerms', { required: 'You must accept the terms and conditions' })} isInvalid={errors.acceptTerms} />
            {errors.acceptTerms && <Form.Control.Feedback type="invalid">{errors.acceptTerms.message}</Form.Control.Feedback>}
          </Form.Group>
          <Button className='mt-2' variant="primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</Button>
          {submitError && <Alert variant="danger">{submitError}</Alert>}
        </Form>
      </Card>
    </Row>
  );
}

export default RegistrationForm;