'use client';
import { useEffect, useRef, useState } from "react";
import { TABS } from "./utils";
import Realtime from "./components/Realtime";
import * as tf from '@tensorflow/tfjs';
import cocoSsd from '@tensorflow-models/coco-ssd';

const Home = () => {
  const [activeTab, setActiveTab] = useState(TABS.UPLOAD);

  return (
    <div className="h-screen px-8 py-2">
      <h1 className="font-bold text-center text-7xl text-transparent 
        bg-clip-text bg-gradient-to-b from-white via-gray-50 to-gray-900">
        DETECTOR
      </h1>
      <p className="text-center text-gray-500 text-sm">
        An AI-powered object detection app
      </p>

      <div className="mt-2 rounded-sm flex justify-center items-center w-full">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
          <li className="me-2" role="presentation">
            <button
              className={`tab-button ${activeTab === TABS.UPLOAD ? 'tab-active' : ''}`}
              type="button"
              role="tab"
              onClick={() => setActiveTab(TABS.UPLOAD)}
            >
              Upload Images
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`tab-button ${activeTab === TABS.REALTIME ? 'tab-active' : ''}`}
              type="button"
              role="tab"
              onClick={() => setActiveTab(TABS.REALTIME)}
            >
              Realtime
            </button>
          </li>
        </ul>
      </div>

      <div className="mt-4">
        {activeTab === TABS.UPLOAD && (
          <div>
            <h2 className="text-center">Coming Soon</h2>
          </div>
        )}
        {activeTab === TABS.REALTIME && (
            <Realtime />
        )}
      </div>
    </div>  
  );
}

export default Home;