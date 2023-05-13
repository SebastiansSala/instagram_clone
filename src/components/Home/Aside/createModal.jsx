import React from "react";

export default function CreateModal({setSelectState, selectState}) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50" onClick={() => setSelectState(prevState => ({...prevState, Create: false}))}>
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-end">
          
        </div>
        <div className="mt-4"></div>
      </div>
    </div>
  );
}
