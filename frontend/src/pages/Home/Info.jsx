import React from "react";
import Container from "../../components/Container/Container";
import { info } from "./content";
import Box from "../../components/Box/Box";
import IconWithText from "./components/IconWithText";
import AdSlot from "../../components/AdSlot/AdSlot";

export default function Info() {
  return (
    <Container>
      <Box isHorizontal>
        {info.map((box, idx) => (
          <IconWithText
            key={idx}
            icon={box.icon}
            title={box.title}
            description={box.description}
          />
        ))}
      </Box>
    </Container>
  );
}
