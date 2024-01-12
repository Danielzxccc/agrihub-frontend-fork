import { ComponentProps, ReactNode } from "react";

interface OutletContainerProps extends ComponentProps<"div"> {
  children: ReactNode;
}

const OutletContainer = ({ children, className }: OutletContainerProps) => (
  <div
    className={`flex flex-col w-full min-h-full px-0 md:px-7 xl:px-16 py-10 ${className}`}
  >
    {children}
  </div>
);

export default OutletContainer;
