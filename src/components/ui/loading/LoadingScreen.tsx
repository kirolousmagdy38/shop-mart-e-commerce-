import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function LoadingScreen() {
  return (
    <div className="min-h-screen  flex justify-center  items-center ">
      <Button disabled size="sm">
        <Spinner data-icon="inline-start" />
        Loading...
      </Button>
    </div>
  );
}
