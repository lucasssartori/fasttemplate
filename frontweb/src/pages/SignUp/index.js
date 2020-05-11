import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { GoSignIn } from 'react-icons/go';
import { MdPermIdentity } from 'react-icons/md';

import Input from '~/components/SimpleInput';
import Button from '~/components/Button';
import { Form } from './styles';

import { signUpRequest } from '~/store/modules/auth/actions';

// import logo from '../../assets/images/fastfeet-logo.png';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('O e-mail é obrigatório'),
        password: Yup.string()
          .min(6, 'No mínimo 6 caracteres')
          .required('A senha é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, email, password } = data;

      dispatch(signUpRequest(name, email, password));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          label="SEU NOME"
          placeholder="Seu nome"
        />
        <Input
          name="email"
          type="email"
          label="SEU E-MAIL"
          placeholder="Seu e-mail"
        />
        <Input
          name="password"
          type="password"
          label="SUA SENHA"
          placeholder="Sua senha"
        />
        <Button
          type="submit"
          title="Entrar no Sistema"
          loading={loading}
          IconButton={GoSignIn}
        />
      </Form>
      <Button
        type="submit"
        title="Cadastrar no Sistema"
        loading={loading}
        IconButton={MdPermIdentity}
      />
    </>
  );
}
