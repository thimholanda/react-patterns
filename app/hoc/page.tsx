"use client";

import { PropsWithChildren, useState } from "react";

interface CounterProps {
  render: (counter: number, handleCounter: () => void) => void;
  children?: React.ReactNode;
}

const withName = <P extends object>(Component: React.ComponentType<P>): ((props: PropsWithChildren<P> & { name: string }) => JSX.Element) => {
  const WrappedComponent = ({ name, children, ...rest }: PropsWithChildren<P> & { name: string }) => {
    return (
      <Component {...(rest as P)}>
        <h1 className="text-4xl text-center my-5">{name}</h1>
        {children}
      </Component>
    );
  };
  WrappedComponent.displayName = `WithName(${Component.displayName || Component.name || "Component"})`;
  return WrappedComponent;
};

const Counter = ({ render, children }: CounterProps) => {
  const [counter, setCounter] = useState(0);

  const handleCounter = () => {
    setCounter((val) => ++val);
  };
  return (
    <>
      {children}
      {render(counter, handleCounter)}
    </>
  );
};

export default function RenderPropsAndHOC() {
  const ComponentWithName = withName<CounterProps>(Counter);

  return (
    <ComponentWithName
      name="Contador"
      render={(counter: number, handleCounter: () => void) => (
        <div className="mx-auto flex flex-col text-center justify-center items-center bg-white max-w-[200px] p-5 rounded-lg shadow-lg">
          <h1 className="text-3xl mb-5">{counter}</h1>
          <button
            className="
            flex
            justify-center
            rounded-md
            px-3
            py-2
            text-sm
            font-semibold
            focus-visible: outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            border-none
            outline-none
            bg-sky-500
            hover:bg-sky-600 
            focus-visible:outline-sky-600
            "
            type="button"
            onClick={handleCounter}
          >
            Add to counter
          </button>
        </div>
      )}
    ></ComponentWithName>
  );
}
