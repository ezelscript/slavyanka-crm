import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/ui/Loader";
import Fallback from "../../components/ui/Fallback";
import { ChildrenProps } from "../../types";

interface IProps extends ChildrenProps {
  queryKey: string[];
  queryFn: () => Promise<unknown>;
}

export const PageContext = createContext<Awaited<
  ReturnType<IProps["queryFn"]>
> | null>(null);

export default function PageProvider({ children, queryKey, queryFn }: IProps) {
  const { data, isLoading, error } = useQuery({ queryKey, queryFn });

  if (isLoading) return <Loader isFullScreen={true} />;
  if (error) return <Fallback error={error} />;

  return <PageContext.Provider value={data}>{children}</PageContext.Provider>;
}
