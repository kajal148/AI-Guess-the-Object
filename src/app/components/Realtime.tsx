'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import { renderBox } from "../utils";

const Realtime = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  
  const loadModel = async () => {
    setIsLoading(true);

    await tf.setBackend('webgl'); //setting the backend to webgl
    await tf.ready();

    const model = await cocoSsd.load();
    setIsLoading(false);

    intervalRef.current = setInterval(() => {
      capture(model);
    }, 1000);
  }

  const capture = async (model: any) => {
    if (webcamRef.current !== null &&
      webcamRef.current?.video?.readyState === 4) {

      const video = webcamRef.current?.video;

      if (video && video.readyState === 4) {
        const predictions = await model.detect(video);

        const context = canvasRef.current?.getContext("2d");
        renderBox(predictions, context);

      } else {
        console.log("Video not ready yet");
      }
    }
  };

  const showmyVideo = () => {
    if (
      webcamRef.current && webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const width = webcamRef.current.video.videoWidth;
      const height = webcamRef.current.video.videoHeight;

      //set the height and widht of the video before sending it to the model
      webcamRef.current.video.width = width;
      webcamRef.current.video.height = height;
    }
  };

  useEffect(() => {
    loadModel();
    showmyVideo();

    return () => {
      if (intervalRef?.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
      <div className="flex flex-col items-center justify-center relative w-full h-full">
          <Webcam 
            ref={webcamRef}
            className="rounded-lg"
            muted
            audio={false}
            videoConstraints={{
              facingMode: "user"
            }}
            mirrored={true}
          />
          <canvas ref={canvasRef}
            className="absolute top-0 left-50 z-1000"
            width={webcamRef.current?.video?.videoWidth}
            height={webcamRef.current?.video?.videoHeight}
          />
      </div>
  )
}

export default Realtime;