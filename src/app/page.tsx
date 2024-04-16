"use client";

import { MicAudioButton, DesktopAudioButton } from "@/components/GetUserAudio";
import SideBar from "@/components/SideBar";
import React, { useEffect, useRef, useState } from "react";
import ModifiedEditor, { ModifiedEditorHandle } from "@/components/Editor";

const bmcId = process.env.BMC_ID as string;
//if (bmcId == "") throw new Error("Buy me a coffee key not found");

export default function Home() {
  const editorRef = useRef<ModifiedEditorHandle>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    // Make a GET request to the /api/search endpoint with searchQuery as a query parameter
    const response = await fetch(
      `/api/search?query=${encodeURIComponent(searchQuery)}`
    );

    // Parse the JSON response
    const results = await response.json();

    console.log(results);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("data-name", "BMC-Widget");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
    script.setAttribute("data-id", bmcId);
    script.setAttribute("data-description", "Thank you for your support!");
    script.setAttribute(
      "data-message",
      "This website is free to use. Do you want to help support it?"
    );
    script.setAttribute("data-color", "#2b2b2b");
    script.setAttribute("data-position", "right");
    script.setAttribute("data-x_margin", "18");
    script.setAttribute("data-y_margin", "18");
    script.async = true;
    script.onload = function () {
      var evt = document.createEvent("Event");
      evt.initEvent("DOMContentLoaded", false, false);
      window.dispatchEvent(evt);
    };
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <SideBar></SideBar>
      <main className="flex flex-col items-center justify-between pt-4 pl-24">
        {/* <div className="h-full w-[15%] min-w-[20rem] absolute left-0 top-0 bg-gray-200"></div> */}

        {/* <form onSubmit={handleSearch}>
          <div className="flex flex-row gap-2 rounded-full bg-[#252525] p-1 max-w-[30rem] min-w-[10rem]">
            <img className="px-1" src="search.svg" alt="yo"></img>
            <input type="text" placeholder="Search" className="bg-transparent text-white w-full outline-none" />
          </div>
        </form> */}

        <div>
          <h1
            style={{
              fontSize: "60px",
              fontWeight: "450",
              marginBottom: "20px",
            }}
          ></h1>
        </div>

        <div className="flex flex-row">
          <div className="bg-transparent text-white w-full outline outline-2 rounded-full px-4 py-1 outline-[#505050]">
            <div className="flex flex-row gap-2">
              <MicAudioButton editorRef={editorRef} />
              <DesktopAudioButton editorRef={editorRef} />
              <img className="px-1" src="volume.svg" alt=""></img>
              <img className="px-1" src="play.svg" alt=""></img>
            </div>
          </div>
        </div>

        <div>
          <ModifiedEditor ref={editorRef}></ModifiedEditor>
        </div>

        {/* <button className="fixed bottom-5 right-5 h-12 w-12 rounded-full"></button> */}

        {/* <div className="bg-gray-200 fixed items-end flex h-1/32 w-1/4 left-100 top-5 p-2.5 rounded-full">
          <button
            className="absolute right-12 top-1 h-3 w-3 rounded-full bg-green-500"
          ></button>
          <button
            className="absolute right-7 top-1 h-3 w-3 rounded-full bg-yellow-500"
          ></button>
          <button
            className="absolute right-2 top-1 h-3 w-3 rounded-full bg-red-500"
          ></button>
        </div> */}
      </main>
    </>
  );
}
