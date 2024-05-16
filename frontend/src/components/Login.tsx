import React from "react";
import { POST, PUT } from "../utils/requests";
import { Resolver, useForm } from "react-hook-form";
import { redirect, useNavigate } from "react-router-dom";
type FormValues = {
  name: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
          name: {
            type: "required",
            message: "This is required to participate.",
          },
        }
      : {},
  };
};
export default function Login() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((data) => {
    POST("/bidder", data)
      .then((response) => {
        if (response.id ? true : false) {
          sessionStorage.setItem("bidderId", response.id.toString());
          nav("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div>
      Login
      <form onSubmit={onSubmit}>
        <input
          {...register("name")}
          placeholder="enter youur name here to cont"
        />
        {errors?.name && <p>{errors.name.message}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
