import { useCallback, useRef, useState } from "react";

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [loading, setLoading] = useState(false);

  const openCamera = useCallback(async () => {
    try {
      setLoading(true);

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
      });

      setStream(mediaStream);
      setIsOpen(true);

      return mediaStream;
    } catch (error) {
      console.error("Camera error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const attachVideo = useCallback(() => {
    if (!videoRef.current || !stream) return;

    videoRef.current.srcObject = stream;
    videoRef.current.play();
  }, [stream]);

  const capture = useCallback(() => {
    if (!videoRef.current) return null;

    const video = videoRef.current;

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    ctx.drawImage(video, 0, 0);

    return canvas.toDataURL("image/jpeg", 0.9);
  }, []);

  const closeCamera = useCallback(() => {
    stream?.getTracks().forEach((track) => track.stop());

    setStream(null);
    setIsOpen(false);
  }, [stream]);

  return {
    videoRef,
    isOpen,
    loading,
    stream,
    openCamera,
    closeCamera,
    attachVideo,
    capture,
  };
}