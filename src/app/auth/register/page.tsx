import RegisterForm from "@/components/auth/RegisterForm";
import { Card } from "@/components/ui/card";

export default function Register() {
  return (
    <>
      <div className="max-w-5xl mx-auto my-30">
        <Card className="p-10">
          <h2 className="text-3xl font-bold text-center">Register Now and Start Shopping</h2>
          <RegisterForm />
        </Card>
      </div>
    </>
  );
}
