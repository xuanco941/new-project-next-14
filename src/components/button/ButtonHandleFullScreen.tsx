import { Tooltip, Typography } from "@mui/material";
import { useI18n } from "@/locales/clients";
import { useTheme } from "@/providers/theme/ThemeProvider";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { useCallback, useEffect, useState } from "react";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import useDetect from "@/hooks/useDetect";
import { createPortal } from "react-dom";
import { Toaster } from "sonner";

export default function FullScreen({
  elementId = "element-id-full-screen",
  callback,
}: {
  elementId?: string;
  callback?: () => void;
}) {
  const t = useI18n();
  const { theme } = useTheme();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { isMobile } = useDetect();

  const handleFullScreen = useCallback(() => {
    if (!elementId) return;

    const el = document.getElementById(elementId);
    if (!el) {
      console.warn(`Element with id "${elementId}" not found.`);
      return;
    }

    if (!document.fullscreenElement) {
      // Tạo wrapper
      const wrapper = document.createElement("div");
      wrapper.id = "fullscreen-wrapper";
      wrapper.style.padding = isMobile ? "1dvh 1vw" : "1dvh 5vw";
      wrapper.style.background = theme.bgDefault; // Tùy bạn chọn
      wrapper.style.width = "100%";
      wrapper.style.height = "100%";
      wrapper.style.boxSizing = "border-box";
      wrapper.style.display = "flex";
      wrapper.style.alignItems = "center";
      wrapper.style.justifyContent = "center";

      // Lưu lại cha cũ để sau này gắn lại
      const parent = el.parentElement;
      if (!parent) return;
      const placeholder = document.createElement("div");
      placeholder.id = "fullscreen-placeholder";
      parent.replaceChild(placeholder, el);

      // Thêm el vào wrapper
      wrapper.appendChild(el);
      document.body.appendChild(wrapper);

      // Fullscreen wrapper
      wrapper.requestFullscreen?.().catch((err) => {
        console.error("Failed to enter fullscreen:", err);
      });
    } else {
      document.exitFullscreen?.().catch((err) => {
        console.error("Failed to exit fullscreen:", err);
      });
    }

    if (callback) {
      callback();
    }
  }, [elementId, callback]);

  useEffect(() => {
    const onChange = () => {
      // if (!document.fullscreenElement) {
      //     console.log('Đã thoát fullscreen');
      // }
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFull = !!document.fullscreenElement;
      setIsFullScreen(isFull);

      if (!isFull) {
        // Khi thoát fullscreen
        const wrapper = document.getElementById("fullscreen-wrapper");
        const el = document.getElementById(elementId);
        const placeholder = document.getElementById("fullscreen-placeholder");

        if (wrapper && el && placeholder) {
          wrapper.removeChild(el);
          placeholder.parentElement?.replaceChild(el, placeholder);
          wrapper.remove();
          placeholder.remove();
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [elementId]);

  return (
    <>
      <Tooltip
        placement="top"
        title={
          <Typography
            sx={{ color: "#fff", fontWeight: "bold", fontSize: "10px" }}
          >
            Chế độ toàn màn hình
          </Typography>
        }
      >
        {isFullScreen ? (
          <CloseFullscreenIcon
            onClick={handleFullScreen}
            sx={{
              fontSize: { xs: "20px", md: "25px" },
              cursor: "pointer",
              color: theme.fgTertiary,
              "&:hover": { color: theme.colorPrimary },
            }}
          />
        ) : (
          <OpenInFullIcon
            onClick={handleFullScreen}
            sx={{
              fontSize: { xs: "20px", md: "25px" },
              cursor: "pointer",
              color: theme.fgTertiary,
              "&:hover": { color: theme.colorPrimary },
            }}
          />
        )}
      </Tooltip>
      <FullscreenToastProvider />
    </>
  );
}

function FullscreenToastProvider() {
  const [fullscreenElement, setFullscreenElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreenElement(document.fullscreenElement as HTMLElement | null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  if (!fullscreenElement) return null;

  return createPortal(
    <Toaster
      richColors
      position="top-center"
      theme="light"
      closeButton={true}
    />,
    fullscreenElement
  );
}
