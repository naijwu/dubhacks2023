import { HStack, Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const ProgressBar = ({ page }: { page: number }) => {
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    // Update the current page state whenever the "page" prop changes
    setCurrentPage(page);
  }, [page]);

  const getTransitionDuration = (pageNumber: number) => {
    // Determine the transition duration based on the page number
    const baseDuration = 1; // Base duration in seconds
    const transitionSpeed = currentPage >= pageNumber ? "slow" : "fast";
    return `${baseDuration * (transitionSpeed === "slow" ? 2 : 0.5)}s`;
  };

  const getColor = (pageNumber: number) => {
    // Determine the background color based on the page number
    return pageNumber <= currentPage ? "#C2F9C9" : "white";
  };

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
        bgColor={getColor(1)}
        borderRadius="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight="bold"
        style={{ transition: `background-color ${getTransitionDuration(1)}` }}
      >
        <Text>1</Text>
      </Box>
      <Box
        zIndex="1"
        mr="-10px"
        w="350px"
        h="21px"
        bgColor={getColor(2)}
        style={{ transition: `background-color ${getTransitionDuration(2)}` }}
      ></Box>
      <Box
        zIndex="2"
        mr="-10px"
        w="75px"
        h="75px"
        bgColor={getColor(2)}
        borderRadius="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight="bold"
        style={{ transition: `background-color ${getTransitionDuration(2)}` }}
      >
        2
      </Box>
      <Box
        zIndex="1"
        mr="-10px"
        w="350px"
        h="21px"
        bgColor={getColor(3)}
        style={{ transition: `background-color ${getTransitionDuration(3)}` }}
      ></Box>
      <Box
        zIndex="2"
        w="75px"
        h="75px"
        bgColor={getColor(3)}
        borderRadius="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight="bold"
        style={{ transition: `background-color ${getTransitionDuration(3)}` }}
      >
        3
      </Box>
    </HStack>
  );
};

export default ProgressBar;
