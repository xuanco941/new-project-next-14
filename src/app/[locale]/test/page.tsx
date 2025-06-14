"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as PIXI from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v8";

// import spineJson from "/public/assets-game/TX3D/dice.json";
// import spineAtlas from "/public/assets-game/TX3D/dice.atlas";

// interface ImageData {
//   id: number;
//   startX: number;
//   startY: number;
//   endX: number;
//   endY: number;
// }

// export default function MovingImageEffect() {
//   const [images, setImages] = useState<ImageData[]>([]);
//   const [counter, setCounter] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const box2Ref = useRef<HTMLDivElement>(null);

//   const moveImage = (event: React.MouseEvent<HTMLDivElement>) => {
//     if (!containerRef.current || !box2Ref.current) return;

//     const containerRect = containerRef.current.getBoundingClientRect();

//     // Lấy tọa độ trung tâm của Box1
//     const box1Rect = event.currentTarget.getBoundingClientRect();
//     const startX = box1Rect.left + box1Rect.width / 2 - containerRect.left - 30;
//     const startY = box1Rect.top + box1Rect.height / 2 - containerRect.top - 30;

//     // Lấy tọa độ trung tâm của Box2
//     const box2Rect = box2Ref.current.getBoundingClientRect();
//     const endX = box2Rect.left + box2Rect.width / 2 - containerRect.left - 30;
//     const endY = box2Rect.top + box2Rect.height / 2 - containerRect.top - 30;

//     setImages((prevImages) => [
//       ...prevImages,
//       { id: counter, startX, startY, endX, endY },
//     ]);
//     setCounter((prev) => prev + 1);
//   };

//   const removeImage = (id: number) => {
//     setImages((prevImages) => prevImages.filter((img) => img.id !== id));
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
//     >
//       {/* Ảnh bay */}
//       {images.map((img) => (
//         <motion.img
//           key={img.id}
//           width={60}
//           src="/assets-game/TX3D/chip10k.png"
//           alt="Flying Image"
//           className="absolute"
//           style={{ left: img.startX, top: img.startY }} // Đặt vị trí ban đầu
//           animate={{ left: img.endX, top: img.endY }} // Di chuyển đến vị trí đích
//           transition={{ type: "spring", stiffness: 50, duration: 1.5 }}
//           onAnimationComplete={() => removeImage(img.id)}
//         />
//       ))}

//       {/* Box1 và Box2 */}
//       <div className="flex space-x-[200px]">
//         <div
//           className="w-32 h-32 bg-blue-500 flex items-center justify-center text-white cursor-pointer"
//           onClick={moveImage}
//         >
//           Box 1
//         </div>
//         <div
//           ref={box2Ref}
//           className="w-32 h-32 bg-red-500 flex items-center justify-center text-white cursor-pointer"
//         >
//           Box 2
//         </div>
//       </div>
//     </div>
//   );
// }

export default function TX3D() {
  const canvasRef = useRef<HTMLDivElement>(null);

  const Run = async () => {
    if (!canvasRef.current) return;

    // Lấy kích thước của canvasRef
    const { width, height } = canvasRef.current.getBoundingClientRect();

    const app = new PIXI.Application();
    await app.init({
      width,  // Kích thước theo canvasRef
      height,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: "#fff",
    });

    // Gắn canvas của Pixi vào trong div thay vì document.body
    canvasRef.current.appendChild(app.view);

    // Load assets
    PIXI.Assets.add({ alias: "diceData", src: "/assets-game/TX3D/dice.json" });
    PIXI.Assets.add({ alias: "diceAtlas", src: "/assets-game/TX3D/dice.atlas" });

    await PIXI.Assets.load(["diceData", "diceAtlas"]);

    // Tạo object Spine
    const dice = Spine.from({
      skeleton: "diceData",
      atlas: "diceAtlas",
      scale: 0.2,
    });

    dice.state.data.defaultMix = 0.2;

    // Center theo kích thước mới
    dice.x = width / 2;
    dice.y = height / 2;

    // Set animation
    dice.state.setAnimation(0, "animation", true);

    app.stage.addChild(dice);
  };

  useEffect(() => {
    Run();
  }, []);

  return <div ref={canvasRef} style={{ width: "200px", height: "200px", overflow: "hidden", background: "#fff" }} />;
}
