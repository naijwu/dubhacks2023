import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";

const ProgressBar = ({ page }: { page: number }) => {
  return (
    <HStack
      className="progress-bar"
      justifyContent="center"
      ml="10px"
      spacing="0px"
    >
      <Box
        zIndex="2"
        mr="-10px"
        w="75px"
        h="75px"
        bgColor="#C2F9C9"
        borderRadius="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight="bold"
      >
        <Text>1</Text>
      </Box>
      <Box
        zIndex="1"
        mr="-10px"
        w="350px"
        h="21px"
        bgColor={page >= 2 ? "#C2F9C9" : "white"}
      ></Box>
      <Box
        zIndex="2"
        mr="-10px"
        w="75px"
        h="75px"
        bgColor={page >= 2 ? "#C2F9C9" : "white"}
        borderRadius="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight="bold"
      >
        2
      </Box>
      <Box
        zIndex="1"
        mr="-10px"
        w="350px"
        h="21px"
        bgColor={page >= 3 ? "#C2F9C9" : "white"}
      ></Box>
      <Box
        zIndex="2"
        w="75px"
        h="75px"
        bgColor={page >= 3 ? "#C2F9C9" : "white"}
        borderRadius="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight="bold"
      >
        3
      </Box>
    </HStack>
  );
};

export default ProgressBar;
