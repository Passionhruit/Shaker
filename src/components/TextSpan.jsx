import React from "react";
import { motion, useAnimationControls } from "framer-motion";
import { styled } from "styled-components";
import { useState } from "react";

const StSpan = styled(motion.span)`
  font-size: 5rem;
  font-weight: 500;
  display: inline-block;
  &:hover {
    color: #f5e162;
  }
`;

function TextSpan({ children }) {
  const controls = useAnimationControls();
  const [isPlaying, setIsPlaying] = useState(false);
  const rubberBand = () => {
    controls.start({
      transform: [
        "scale3d(1, 1, 1)",
        "scale3d(1.4, 0.55, 1)",
        "scale3d(0.75, 1.25, 1)",
        "scale3d(1.25, 0.85, 1)",
        "scale3d(0.9, 1.05, 1)",
        "scale3d(1, 1, 1)",
      ],
    });
    setIsPlaying(true);
  };
  return (
    <StSpan
      animate={controls}
      onMouseOver={() => {
        if (!isPlaying) {
          rubberBand();
        }
      }}
      onAnimationComplete={() => setIsPlaying(false)}
    >
      {children}
    </StSpan>
  );
}

export default TextSpan;
