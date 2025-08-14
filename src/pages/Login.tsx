import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { api } from "@/lib/api";

// ✅ Import useAuth to use login from context
import { useAuth } from "@/hooks/use-Auth";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Please enter your password." }),
});

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = React.useState(false);

  const { login } = useAuth(); // ✅ use login from auth context

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const res = await api.login(data as { email: string; password: string });
      // console.log("Token received from API:", res.authToken);
      // ✅ Store token using AuthContext, not localStorage directly
      login(res.authToken);

      toast({
        title: "Login successful!",
        description: "Welcome back to SeekSpark.",
      });

      setTimeout(() => navigate("/"), 1500);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Invalid credentials";

      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-md mx-auto py-12 px-4">
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-600 mt-2">Login to access your account</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-job-blue focus:ring-job-blue"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-job-blue hover:text-job-darkBlue">
                    Forgot password?
                  </a>
                </div>

                <Button type="submit" className="w-full bg-job-blue hover:bg-job-darkBlue">
                  Login
                </Button>
              </form>
            </Form>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  className="text-job-blue hover:text-job-darkBlue font-medium"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
