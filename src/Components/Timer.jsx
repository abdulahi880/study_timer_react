import React from "react";

export default function Timer({
  switchStage,
  getTickingTime,
  startTimer,
  stage,
  ticking,
  seconds,
  isTimeUp,
  reset,
}) {
  const options = ["Pomodoro", "Short Break", "Long Break"];
  const buttonColor =
    stage === 0
      ? "#CE93D8" // study timer color
      : stage === 1
      ? "#80CBC4" // Short Break color
      : "#90CAF9"; // Long Break color

  return (
    <>
      <div className="flex justify-center items-center flex-col w-11/12 sm:w-10/12 mx-auto pt-5 pb-5 rounded">
        <div className="flex gap-5 text-black items-center">
          {options.map((option, index) => {
            return (
              <h1
                key={index}
                className={`${
                  index === stage ? "bg-gray-600 bg-opacity-30" : ""
                } p-1 rounded cursor-pointer transition-all`}
                onClick={() => switchStage(index)}
              >
                {option}
              </h1>
            );
          })}
        </div>

        <div className="mt-10 mb-10">
          <h1 className="max-sm:text-9xl font-extrabold tracking-tight text-9xl text-center">
            {getTickingTime().toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`px-16 py-2 text-2xl rounded-md uppercase font-bold text-black transition-all`}
            style={{ backgroundColor: buttonColor }}
            onClick={startTimer}
          >
            {ticking ? "Stop" : "Start"}
          </button>
          {isTimeUp}
        </div>
        {ticking && (
          <button
            className="uppercase text-red-500 font-bold mt-3"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>
    </>
  );
}
