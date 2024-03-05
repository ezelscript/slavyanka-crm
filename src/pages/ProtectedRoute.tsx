import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { checkSession } from "../backend/authorization";
import AppLayout from "../components/layout/AppLayout";
import Loader from "../components/ui/Loader";

function ProtectedRoute() {
  const { data: session, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkSession,
  });

  if (isLoading) return <Loader isFullScreen={true} />;
  if (!session && !isLoading) return <Navigate to="/login" replace />;

  return <AppLayout />;
}

export default ProtectedRoute;
