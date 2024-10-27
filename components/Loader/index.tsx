import React from "react";

/**
 * Loader component
 *
 * This is a functional React component that renders a loading spinner.
 * The spinner is centered both horizontally and vertically within its container
 * and has a top padding of 4 units.
 *
 * The spinner itself is a div with a circular shape, achieved by applying
 * rounded-full class. It has a height and width of 16 units, and a top border
 * with a width of 4 units and a blue color. The spinner is animated with a
 * spinning effect using the animate-spin class.
 *
 * @returns {JSX.Element} A JSX element representing the loading spinner.
 */
const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center pt-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
    </div>
  );
};

export default Loader;
