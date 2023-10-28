import { Button, Divider, Input } from "@packages/agrihub-ui";

import { useForm } from "react-hook-form";
import useLoginUserMutation from "@hooks/api/useUserLoginMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserLogin, UserLoginSchema } from "./schema";

import { Link, useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";

import { useSignIn } from "react-auth-kit";

export default function UserLoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserLogin>({
    mode: "onBlur",
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      username: "emman",
      password: "emman123"
    }
  });

  const signIn = useSignIn();

  const { mutateAsync: userLogin } = useLoginUserMutation();

  const onLoginSubmit = async (data: any) => {
    try {
      const { user } = await userLogin(data);

      const authState = {
        username: user?.username,
        email: user?.email
      };

      if (
        signIn({
          expiresIn: 24 * 60 * 60,
          token: "Tekken",
          tokenType: "Bearer",
          authState
        })
      ) {
        navigate("/feed"); //non-existent
      } else {
        throw new Error("Unknown Error");
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onLoginSubmit)}>
      <div className="">
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            label="Username"
            {...register("username")}
            errorMessage={errors.username?.message}
          />
        </div>

        <div className="flex flex-col gap-3 mt-5">
          <Input
            type="password"
            label="Password"
            {...register("password")}
            errorMessage={errors.password?.message}
          />
        </div>

        <div className="mt-10">
          <Button label="Login" variant="primary" isLoading={true} />

          <div className="py-5">
            <Divider label={"or"} color="#00000011" />
          </div>

          <Button
            label={"Sign up with Google"}
            icon={<FcGoogle />}
            variant="outlined"
          />

          <Link to={"/account/signup"}>
            <Button
              label="Sign up with Email"
              variant="outlined"
              className="mt-5"
              icon={<MdEmail />}
            />
          </Link>
        </div>
      </div>
    </form>
  );
}